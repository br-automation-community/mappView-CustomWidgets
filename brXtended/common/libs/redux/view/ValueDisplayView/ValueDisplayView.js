'use strict';
define([
    'brease'
], function ({ enum: { Enum } }) {

    var ValueDisplayView = function (props, parent, self) {
        if (self === undefined) {
            this.create(props, parent);
            this.render(props);
            return this;
        } else {
            self.render(props);
            return self;
        }
    };

    var p = ValueDisplayView.prototype;
    const valueDisplayViewNode = document.createElement('OUTPUT');
    valueDisplayViewNode.classList.add('ValueDisplayView');
    const valueOutputNode = document.createElement('SPAN');
    valueOutputNode.classList.add('valueOutput');
    const unitOutputNode = document.createElement('SPAN');
    unitOutputNode.classList.add('unitOutput');
    const arrowOutputNode = document.createElement('SPAN');
    arrowOutputNode.classList.add('arrowOutput');

    p.create = function (props, parent) {
        this.el = $(valueDisplayViewNode.cloneNode());
        this.addElements(props);
        parent[0].appendChild(this.el[0]);
    };

    p.render = function render(props) {

        this.zIndex(props);

        this.visible(props);

        this.showUnit(props);

        this.orientation(props);

        this.ellipsis(props);

        this.position(props);

        this.updateElements(props);

    };

    p.position = function (props) {
        let elem = this.el[0];
        if (props.ellipsis === true || props.ellipsis === undefined) {
            elem.style.width = props.width + 'px';
        } else {
            elem.style.width = 'auto';
        }

        if (props.left !== undefined) {
            elem.style.left = props.left + 'px';
            elem.style.right = 'initial';
        }

        if (props.right !== undefined) {
            elem.style.right = props.right + 'px';
            elem.style.left = 'initial';
        }

        elem.style.height = props.height + 'px';
        elem.style.top = props.top + 'px';
    };

    p.ellipsis = function (props) {
        if (props.ellipsis === true) {
            this.el[0].classList.add('ellipsis');
        } else {
            this.el[0].classList.remove('ellipsis');
        }
    };

    p.zIndex = function (props) {
        if (props.selected !== undefined && props.selected) {
            this.el[0].style.zIndex = 5;
        } else {
            this.el[0].style.zIndex = 0;
        }
    };

    p.visible = function (props) {
        if (props.visible === true) {
            this.el[0].classList.remove('remove');
        } else {
            this.el[0].classList.add('remove');
        }
    };

    p.orientation = function (props) {
        if (props.orientation === Enum.Orientation.LTR || props.orientation === Enum.Orientation.RTL) {
            this.el[0].classList.add('horizontal');
        } else if (props.orientation === Enum.Orientation.BTT || props.orientation === Enum.Orientation.TTB) {
            this.el[0].classList.add('vertical');
        }
    };

    p.addElements = function addElements(props) {
        this.outputValEl = $(valueOutputNode.cloneNode()).text(props.value);
        this.outputUnitEl = $(unitOutputNode.cloneNode()).text(props.unitSymbol);
        this.outputArrowEl = $(arrowOutputNode.cloneNode());

        this.el.append([this.outputValEl, this.outputUnitEl, this.outputArrowEl]);
    };

    p.showUnit = function (props) {
        if (props.showUnit === true) {
            this.outputUnitEl[0].classList.remove('remove');
        } else {
            this.outputUnitEl[0].classList.add('remove');
        }
    };

    p.updateElements = function (props) {
        this.outputValEl.text(props.value);
        this.outputUnitEl.text(props.unitSymbol);
    };

    p.dispose = function dispose() {
        this.el[0].classList.remove('horizontal', 'vertical');
    };

    return ValueDisplayView;

});
