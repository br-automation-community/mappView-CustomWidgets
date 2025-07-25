define([
    'widgets/brXtended/common/libs/BoxLayout',
    'widgets/brXtended/common/libs/wfUtils/UtilsImage'
], function (BoxLayout, UtilsImage) {

    'use strict';

    /**
     * @class widgets.brXtended.common.libs.redux.view.ImageView.ImageView
     * View displaying an Image
     */

    var ImageView = function (props, parent) {
        this.render(props, parent);
    };

    var p = ImageView.prototype;
    const imageViewNode = (() => {
        let box = BoxLayout.createBox();
        box.classList.add('ImageView');
        return box;
    })();
    /**
     * @method render
     * Renders the view
     * @param {jQuery} parent DOM element for the parent View
     * @param {Object} props Properties for the View
     * @param {String} props.image Path to the image
     */
    p.render = function render(props, parent) {
        this.el = $(imageViewNode.cloneNode());
        if (props.subClasses !== undefined && props.subClasses !== '') {
            this.el.addClass(props.subClasses);
        }
        if (UtilsImage.isStylable(props.image) && props.notStyleable !== true) {
            var that = this;
            this.imageDeferred = UtilsImage.getInlineSvg(props.image, false, undefined, props.cache);
            this.imageDeferred.done(function (svgElement) {
                that.image = svgElement;
                that.el.append(that.image);
            });
        } else {
            let img = new Image();
            img.setAttribute('src', props.image);
            this.image = $(img);
            this.el.append(this.image);
        }
        parent.append(this.el);
    };

    p.dispose = function dispose() {
        if (this.imageDeferred !== undefined) {
            if (this.imageDeferred.state() === 'pending') {
                this.imageDeferred.reject();
            }
        }
        this.image.remove();
        this.el.remove();
    };

    return ImageView;

});
