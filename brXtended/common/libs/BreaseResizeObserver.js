'use strict';
define(['brease'], function ({ config, events: { BreaseEvent } }) {

    /**
    * @class widgets.brXtended.common.libs.BreaseResizeObserver
    * class to monitor size changes of a widget
    * @extends Object
    */
    var BreaseResizeObserver = function (elem, callback) {
            this.initialized = false;
            this.active = false;
            if (elem instanceof Element) {
                this.elem = elem;
            } else {
                this.elem = null;
                console.warn('BreaseResizeObserver parameter elem is not an instance of Element');
            }
            this.callback = typeof callback === 'function' ? callback : function () { };
            this.boundOnResize = this.onResize.bind(this);
        },
        p = BreaseResizeObserver.prototype;

    /**
    * @method init
    * setup eventlisteners to monitor size changes
    */
    p.init = function () {
        initEvents.call(this);
        this.initialized = true;
        this.active = true;
        this.callback();
    };

    /**
    * @method wake
    * setup eventlisteners to monitor size changes
    */
    p.wake = function () {
        initEvents.call(this);
        this.active = true;
        this.callback();
    };

    /**
    * @method suspend
    * remove eventlisteners to monitor size changes
    */
    p.suspend = function () {
        this.active = false;
        initEvents.call(this, true);
    };

    /**
    * @method dispose
    * remove eventlisteners to monitor size changes
    */
    p.dispose = function () {
        this.initialized = false;
        this.active = false;
        initEvents.call(this, true);
        this.elem = null;
        this.callback = null;
    };

    p.onResize = function (e) {
        if (e.target.contains(this.elem)) {
            this.callback();
        }
    };

    function initEvents(remove) {
        var fn = remove === true ? 'off' : 'on',
            nfn = remove === true ? 'removeEventListener' : 'addEventListener';
        if (!this.active) {
            $(this.elem instanceof Element ? this.elem.closest('.breaseFlexBoxItem') : null)[fn]('FlexSizeChanged', this.callback);
            if (config.editMode) {
                document.body[nfn](BreaseEvent.WIDGET_PROPERTIES_CHANGED, this.boundOnResize);
                document.body[nfn](BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, this.boundOnResize);
                document.body[nfn](BreaseEvent.WIDGET_RESIZE, this.boundOnResize);
            }
        }
    }

    return BreaseResizeObserver;
});
