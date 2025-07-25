'use strict';
define(['brease',
    'widgets/brXtended/common/libs/BoxLayout',
    'widgets/brXtended/common/libs/wfUtils/UtilsCommon'
], function ({ services }, BoxLayout, Utils) {
    /**
    * @class widgets.brXtended.common.libs.redux.view.HTMLView.HTMLView
    *
    * This View is using following Utils:
    * {@link widgets.brXtended.common.libs.wfUtils.UtilsCommon UtilsCommon}
    */

    var HTMLView = function (props, parent) {
        this.render(props, parent);
    };

    var p = HTMLView.prototype;
    const htmlNode = (() => {
        let box = BoxLayout.createBox();
        box.classList.add('HTMLView');
        return box;
    })();
    /**
    * @method render
    * Renders the View
    * @param {Object} props
    * @param {String} props.html
    * @param {Object} props.textSettings
    * @param {Boolean} props.selected
    * @return {jQuery} parent
    */
    p.render = function render(props, parent) {
    
        let clone = htmlNode.cloneNode();
        this.el = $(clone);
        props.html = '' + props.html;
        //Check if we are fed HTML otherwise treat as text!
        if (props.html.startsWith('<')) {
            this.el.html(props.html);
        } else {
            this.el.addClass('TextView');
            this.span = $(document.createElement('SPAN'));
            Utils.addCssClasses(this.el, props.textSettings, props.selected);
           
            this.span.text(services.language.unescapeText(props.html));
            this.el.append(this.span);
        }
        parent.append(this.el);
    };

    p.dispose = function dispose() {
        if (this.span) {
            this.span.remove();
        }
        this.el.remove();
    };

    return HTMLView;

});
