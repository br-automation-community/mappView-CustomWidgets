define(function () {

    'use strict';

    var TrackView = function (props, parent, self) {
        if (self === undefined) {
            this.create(props, parent);
            this.render(props);
            return this;
        } else {
            self.render(props);
            return self;
        }
    };

    var p = TrackView.prototype;
    const trackNode = document.createElement('DIV');
    trackNode.classList.add('TrackView');
    const arrowTopNode = document.createElement('DIV');
    arrowTopNode.classList.add('arrow', 'top');
    const arrowBottomNode = document.createElement('DIV');
    arrowBottomNode.classList.add('arrow', 'bottom');
    const arrowLeftNode = document.createElement('DIV');
    arrowLeftNode.classList.add('arrow', 'left');
    const arrowRightNode = document.createElement('DIV');
    arrowRightNode.classList.add('arrow', 'right');
    p.create = function (props, parent) {
        if (props.additionalId !== undefined) {
            this.id = parent[0].id + '_TrackView_' + props.additionalId;
        } else {
            this.id = parent[0].id + '_TrackView';
        }
        let clone = trackNode.cloneNode();
        clone.setAttribute('id', this.id);
        this.el = $(clone);
        if (props.additionalClass !== '' || props.additionalClass !== undefined) {
            this.el[0].classList.add(props.additionalClass);
            if (props.arrowClasses !== undefined) {          
                if (props.additionalClass === 'TrackYView') {
                    if (props.arrowClasses[0] === 'top' || props.arrowClasses[1] === 'bottom') {
                        this.arrowTop = $(arrowTopNode.cloneNode());
                        this.arrowBottom = $(arrowBottomNode.cloneNode());
                    }
                }
                if (props.additionalClass === 'TrackXView') {
                    if (props.arrowClasses[0] === 'left' || props.arrowClasses[1] === 'right') {
                        this.arrowLeft = $(arrowLeftNode.cloneNode());
                        this.arrowRight = $(arrowRightNode.cloneNode());
                    }
                }
            }
        }
        parent[0].appendChild(this.el[0]);

    };

    p.render = function render(props) {
        var left, top;
        if (props.arrowClasses !== undefined) {
            left = props.left + props.borderWidth.left;
            top = props.top + props.borderWidth.top;
        } else {
            left = props.left;
            top = props.top;
        }
       
        this.el[0].style.height = props.height + 'px';
        this.el[0].style.left = left + 'px';
        this.el[0].style.top = top + 'px';
        this.el[0].style.width = props.width + 'px';
        if ((props.arrowClasses !== undefined) && props.additionalClass === 'TrackXView') {
            this.container = document.querySelector('#' + props.widgetId + '_squareContainer');
            if (this.container !== null) {
                this.container.style.height = props.size + 'px';
                this.container.style.width = props.size + 'px';
                $(this.container).css({ 'margin-left': props.left });
            }
            
            this.el.append(this.arrowLeft);
            this.el.append(this.arrowRight);
            if (props.arrowClasses[0] === 'left') {
                this.arrowLeft.css({ 'margin-left': (props.width) - 18, 'margin-top': -18 + props.height / 2 });
            }
            if (props.arrowClasses[1] === 'right') {
                this.arrowRight.css({ 'margin-left': 0, 'margin-top': -18 + props.height / 2 });
            }
        }
        if ((props.arrowClasses !== undefined) && props.additionalClass === 'TrackYView') {
            this.container = document.querySelector('#' + props.widgetId + '_squareContainer');
            if (this.container !== null) {
                this.container.style.height = props.size + 'px';
                this.container.style.width = props.size + 'px';
                $(this.container).css({ 'margin-top': props.top });
            }
            this.el.append(this.arrowTop);
            this.el.append(this.arrowBottom);
            if (props.arrowClasses[0] === 'top') {
                this.arrowTop.css({ 'margin-top': props.height - 18, 'margin-left': -18 + props.width / 2 });
            }
            if (props.arrowClasses[1] === 'bottom') {
                this.arrowBottom.css({ 'margin-top': 0, 'margin-left': -18 + props.width / 2 });
            }
        }

    };

    p.dispose = function dispose() {

    };

    return TrackView;

});
