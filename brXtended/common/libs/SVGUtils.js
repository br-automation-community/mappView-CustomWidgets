define(function () {

    'use strict';
    /**
    * @class widgets.brXtended.common.libs.SVGUtils
    * @extends core.javascript.Object
    */
    var SVGUtils = {};
    var NAMESPACE_SVG_ELEM;

    /**
    * @method importToSVGNamespace
    * @static
    * Creates SVG Elements like (g or path) with the correct namespaceURI. Used by
    * widgets with SVG tags as element template (e.g.: PieChartItem, BarChartItem,...)
    * in order to appear in the ContentEditor. Otherwise they won't be rendered. Returns a clone
    * from the passed element with the namespaceURI "http://www.w3.org/2000/svg"
    * @param {Element} elem
    * @return {Element}
    */
    SVGUtils.importToSVGNamespace = function (elem) {
        if (NAMESPACE_SVG_ELEM === undefined) {
            NAMESPACE_SVG_ELEM = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        }
        if (elem instanceof Element) {
            var parentNode = elem.parentNode;
            NAMESPACE_SVG_ELEM.innerHTML = elem.outerHTML;
            var newNode = NAMESPACE_SVG_ELEM.firstElementChild;
            parentNode.replaceChild(newNode, elem);
            return newNode;
        } else {
            return elem;
        }
    };
    return SVGUtils;
});
