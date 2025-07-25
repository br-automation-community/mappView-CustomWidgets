'use strict';
define([
    'brease'
], function ({ events: { BreaseEvent }, config: breaseConfig }) {

    var ThumbView = function (props, parent, self) {
        if (self === undefined) {
            this.create(props, parent);
            this.render(props);
            return this;
        } else {
            self.render(props);
            return self;
        }
    };

    var p = ThumbView.prototype;
    const thumbNode = document.createElement('DIV');
    thumbNode.classList.add('ThumbView');
    p.create = function (props, parent) {
        if (props.additionalId !== undefined) {
            this.id = parent[0].id + '_Thumb_' + props.additionalId;
        } else {
            this.id = parent[0].id + '_Thumb';
        }
        let clone = thumbNode.cloneNode();
        clone.setAttribute('id', this.id);
        clone.appendChild(document.createElement('IMG'));
        if (props.additionalClass !== undefined) {
            clone.classList.add(props.additionalClass);
        }
        this.el = $(clone);
        parent[0].appendChild(this.el[0]);
    };

    p.render = function (props) {
        let elem = this.el[0];
        if (props.thumbImage !== undefined && props.thumbImage !== '') {
            elem.querySelector('img').src = props.thumbImage;
            elem.querySelector('img').style.display = 'block';
        } else {
            elem.querySelector('img').style.display = 'none';
        }
        elem.style.left = props.left + 'px';
        elem.style.top = props.top + 'px';
        elem.style.height = props.thumbSize + 'px';
        elem.style.width = props.thumbSize + 'px';

        if (props.selected !== undefined && props.selected) {
            elem.style.zIndex = 5;
        } else {
            elem.style.zIndex = 0;
        }
        this.dragBehavior(props);
    };

    p.dragBehavior = function (props) {
        if (breaseConfig.editMode || !props.enabled) { return; }

        this.mouseMove = props.onMouseMove;
        this.mouseUp = props.onMouseUp;
        this.mouseDown = props.onMouseDown;

        if (props.selected) {
            $(document.body).on(BreaseEvent.MOUSE_MOVE, props.onMouseMove);
            $(document).on(BreaseEvent.MOUSE_UP, props.onMouseUp);
            $(window).on('blur', props.onMouseUp);
        } else {
            this.el.on(BreaseEvent.MOUSE_DOWN, props.onMouseDown);
        }
    };

    p.dispose = function dispose() {
        $(document.body).off(BreaseEvent.MOUSE_MOVE, this.mouseMove);
        $(document).off(BreaseEvent.MOUSE_UP, this.mouseUp);
        this.el.off(BreaseEvent.MOUSE_DOWN, this.mouseDown);
        $(window).off('blur', this.onMouseUp);
    };

    return ThumbView;

});
