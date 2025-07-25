'use strict';
define([
    'widgets/brXtended/common/libs/flux/stores/ImageStore/ImageTypes',
    'brease'
], function (ImageTypes, { enum: { Enum } }) {
    var ImageView = function (store, dispatcher, parent) {
        this.dispatcher = dispatcher;
        this.store = store;
        this.store.registerView(this);
        this.parent = parent;
        this.src = '';
        this._createElements();
    };
    const imageViewNode = document.createElement('DIV');
    imageViewNode.classList.add('ImageView');
    const spanHelperNode = document.createElement('SPAN');
    spanHelperNode.classList.add('ImageView', 'helper');
    spanHelperNode.style.display = 'none';
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgNode.style.display = 'none';
    ImageView.prototype._createElements = function _createElements() {
        this.el = $(imageViewNode.cloneNode())
            .height(this.store.getHeight())
            .width(this.store.getWidth()).css('background-repeat', 'no-repeat');

        this.svgEl = $(svgNode.cloneNode());
        this.spanHelper = $(spanHelperNode.cloneNode());
    
        this.el.append(this.spanHelper)
            .append(this.svgEl);
        
        this.parent.append(this.el);
    };

    ImageView.prototype.update = function update() {
        var view = this;
        view.el.height(this.store.getHeight()).width(this.store.getWidth());
        view.svgEl.css({ 'position': 'relative', 'bottom': 'auto', 'top': 'auto' });
        switch (view.store.getImageType()) {
            case ImageTypes.INVALID:
                view.el.css('background-image', '');
                view.svgEl.css('display', 'none');
                view.spanHelper.css('display', 'none');
                break;
            case ImageTypes.SVG:
                view.svgEl.css('display', '');
                view.el.css('background-image', '');
                view.spanHelper.css('display', 'none');
                view.svgEl.replaceWith(view.store.getSvgInline());
                view.svgEl = view.store.getSvgInline();
                switch (view.store.getImageSizeMode()) {
                    case Enum.SizeMode.CONTAIN:
                        view.svgEl.eq(0)[0].setAttribute('preserveAspectRatio', _getAspectRatio(view.store.getBackgroundAlignment()));
                        view.svgEl.eq(0)[0].setAttribute('width', '100%');
                        view.svgEl.eq(0)[0].setAttribute('height', '100%');
                        break;
                    case Enum.SizeMode.COVER:
                        view.svgEl.eq(0)[0].setAttribute('preserveAspectRatio', 'xMinYMin');
                        var imageWidth = view.svgEl.eq(0)[0].getAttribute('viewBox').split(' ').map(function (value) { return parseInt(value); })[2],
                            imageHeight = view.svgEl.eq(0)[0].getAttribute('viewBox').split(' ').map(function (value) { return parseInt(value); })[3];
                        var alignment = view.store.getBackgroundAlignment();
                        if (view.el.height() / view.el.width() > imageHeight / imageWidth) {
                            view.svgEl.eq(0)[0].setAttribute('width', view.el.height() / imageHeight * imageWidth);
                            view.svgEl.eq(0)[0].setAttribute('height', view.el.height());
                        } else {
                            view.svgEl.eq(0)[0].setAttribute('width', view.el.width());
                            view.svgEl.eq(0)[0].setAttribute('height', view.el.width() / imageWidth * imageHeight);
                        }
                        _alignItemOnCoverHorizontally(alignment[0], view.svgEl, view.el, view.svgEl.eq(0)[0].getAttribute('width'));
                        _alignItemOnCoverVertically(alignment[1], view.svgEl, view.el, view.svgEl.eq(0)[0].getAttribute('height'));
                        break;
                    case Enum.SizeMode.FILL:
                        view.svgEl.eq(0)[0].setAttribute('preserveAspectRatio', 'none');
                        view.svgEl.eq(0)[0].setAttribute('width', '100%');
                        view.svgEl.eq(0)[0].setAttribute('height', '100%');
                        break;
                    default:
                        break;
                }
                break;
            case ImageTypes.OTHER:
                view.svgEl.css('display', 'none');
                view.spanHelper.css('display', 'none');
                if (view.src === view.store.getImagePath()) {
                    view._readjustImageSize();
                } else {
                    view.src = view.store.getImagePath();
                    view.el.css('background-image', `url(${view.store.getImagePath()})`);
                    view._readjustImageSize();
                }
                break;
        }
    };

    ImageView.prototype._readjustImageSize = function _readjustImageSize() {
        let view = this;
        let imageSizeMode = view.store.getImageSizeMode();
        let backgroundSize = '';
        switch (imageSizeMode) {
            case Enum.SizeMode.CONTAIN:
            case Enum.SizeMode.COVER:
                backgroundSize = imageSizeMode;
                break;
            case Enum.SizeMode.FILL:
                backgroundSize = '100% 100%';
                break;
            default:
                backgroundSize = Enum.SizeMode.CONTAIN;
                break;
        }

        view.el.css({
            'background-position': view.store.getBackgroundAlignment().join(' '),
            'background-size': backgroundSize
        });
    };

    function _getAspectRatio(alignment) {
        var XAlign,
            YAlign;

        switch (alignment[0]) {
            case 'left':
                XAlign = 'Min';
                break;
            case 'center':
                XAlign = 'Mid';
                break;
            case 'right':
                XAlign = 'Max';
                break;
            default:
                XAlign = 'Min';
        }

        switch (alignment[1]) {
            case 'top':
                YAlign = 'Min';
                break;
            case 'center':
                YAlign = 'Mid';
                break;
            case 'bottom':
                YAlign = 'Max';
                break;
            default:
                YAlign = 'Min';
        }

        return 'x' + XAlign + 'Y' + YAlign;

    }

    function _alignItemOnCoverVertically(alignment, element, parentElement, elementHeight) {
        switch (alignment) {
            case 'bottom':
                element.css({ 'position': 'absolute', 'bottom': '0px', 'top': 'auto' });
                break;
            case 'top':
                element.css({ 'position': 'absolute', 'top': '0px', 'bottom': 'auto' });
                break;
            case 'center':
                var offsetCenterImage = parentElement.height() / 2 - elementHeight / 2;
                element.css({ 'position': 'absolute', 'top': offsetCenterImage + 'px', 'bottom': 'auto' });
                break;
        }
    }

    function _alignItemOnCoverHorizontally(alignment, element, parentElement, elementWidth) {
        switch (alignment) {
            case 'left':
                element.css({ 'position': 'absolute', 'left': '0px', 'right': 'auto' });
                break;
            case 'right':
                element.css({ 'position': 'absolute', 'left': 'auto', 'right': '0px' });
                break;
            case 'center':
                var offsetCenterImage = parentElement.width() / 2 - elementWidth / 2;
                element.css({ 'position': 'absolute', 'left': offsetCenterImage + 'px', 'right': 'auto' });
                break;
        }
    }

    return ImageView;

});
