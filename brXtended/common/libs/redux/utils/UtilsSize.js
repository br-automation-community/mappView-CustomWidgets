'use strict';
define(['brease'], function ({ core: { Utils } }) {

    /**
     * @class widgets.brXtended.common.libs.redux.utils.UtilsSize
     */

    var UtilsSize = {};

    function _getComputedValue(value, minValue, maxValue) {
        if (!Utils.isPercentageValue(minValue) && !Utils.isPercentageValue(maxValue)) {
            minValue = parseInt(minValue, 10);
            maxValue = parseInt(maxValue, 10);
                
            if (minValue >= value) {
                value = minValue;
            } else if (value >= maxValue) {
                value = maxValue;
            }
        }

        return value;
    }

    /**
    * @method getWidth
    * @static
    * Returns the width of an Element
    * @param {Number | String} width
    * @param {Element} elem
    * @return {Number} 
    */
    UtilsSize.getWidth = function (width, elem) {
        var value = 0,
            styleElem = window.getComputedStyle(elem, null),
            minWidth = styleElem.getPropertyValue('min-width'),
            maxWidth = styleElem.getPropertyValue('max-width');

        if (isNaN(width) === false) {
            value = parseInt(width, 10);
        } else {
            $(elem).css('width', width);
            value = elem.offsetWidth;
        }

        value = _getComputedValue(value, minWidth, maxWidth);

        //bugfix for SVG
        if (value === undefined) {
            var scaleFactor = Utils.getScaleFactor(elem) || 1; // if element has width in % and is hidden scaleFactor would be 0
            value = elem.getBoundingClientRect().width / scaleFactor;
        }

        return value;
    };
    /**
    * @method setAndGetWidth
    * @static
    * Method that returns the inner width of an Element which is not a svg-element.
    * Currently this method is only used by the BaseSlider widget due of the 
    *   AuP 748960 BasicSlider has problem with drawing border and thumb if size is set in %
    * Returns the width of an Element
    * @param {Number | String} width
    * @param {Element} elem
    * @return {Number} 
    */
    UtilsSize.setAndGetWidth = function (width, elem) {
        var value,
            styleElem;

        elem.setAttribute('width', width);
        styleElem = window.getComputedStyle(elem, null);
        value = (isNaN(width) === false ? parseInt(width, 10) : elem.clientWidth - (parseInt(styleElem.paddingLeft, 10) + parseInt(styleElem.paddingRight, 10)));
        return Math.max(value, 0);
    };

    /**
    * @method getHeight
    * @static
    * Returns the height of an Element
    * @param {Number | String} height
    * @param {Element} elem
    * @return {Number} 
    */

    UtilsSize.getHeight = function (height, elem) {
        var value = 0,
            styleElem = window.getComputedStyle(elem, null),
            minHeight = styleElem.getPropertyValue('min-height'),
            maxHeight = styleElem.getPropertyValue('max-height');
            
        if (isNaN(height) === false) {
            value = parseInt(height, 10);
        } else {
            $(elem).css('height', height);
            value = elem.offsetHeight;
        }

        value = _getComputedValue(value, minHeight, maxHeight);

        //bugfix for SVG
        if (value === undefined) {
            var scaleFactor = Utils.getScaleFactor(elem) || 1; // if element has width in % and is hidden scaleFactor would be 0
            value = elem.getBoundingClientRect().height / scaleFactor;
        }

        return value;
    };
    /**
    * @method setAndGetHeight
    * @static
    * Method that returns the inner height of an Element which is not a svg-element.
    * Currently this method is only used by the BaseSlider widget due of the 
    *   AuP 748960 BasicSlider has problem with drawing border and thumb if size is set in %
    * Returns the height of an Element
    * @param {Number | String} height
    * @param {Element} elem
    * @return {Number} 
    */

    UtilsSize.setAndGetHeight = function (height, elem) {
        var value,
            styleElem;

        elem.setAttribute('height', height);
        styleElem = window.getComputedStyle(elem, null);
        value = (isNaN(height) === false ? parseInt(height, 10) : elem.clientHeight - (parseInt(styleElem.paddingTop, 10) + parseInt(styleElem.paddingBottom, 10)));
        return Math.max(value, 0);
    };

    return UtilsSize;
});
