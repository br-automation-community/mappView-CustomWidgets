'use strict';
define(['brease'], function ({ core: { Utils }, services }) {

    /**
     * @class widgets.brXtended.common.libs.wfUtils.UtilsObject
     * Util used for caching svg xml string
    */

    var UtilsObject = {

        createFormatObject: function (defaultFormat, value, failMessage) {

            var obj = UtilsObject.parseObject(value, failMessage);
            obj = obj || {};
            if (Utils.isObject(defaultFormat) && defaultFormat.default) {
                obj.default = Utils.deepCopy(defaultFormat.default);
            }
            return obj;
        },

        parseObject: function (value, failMessage) {
            var result = null;
            if (Utils.isObject(value) || value === null) {
                result = value;

            } else if (services.language.isKey(value)) {
                var textKey = services.language.parseKey(value);
                result = Utils.parsePseudoJSON(services.language.getText(textKey), failMessage);
                if (!result) {
                    return null;
                }

            } else if (Utils.isString(value)) {
                result = Utils.parsePseudoJSON(value, failMessage);
                if (!result) {
                    return null;
                }
            }
            return result;
        }
    };

    return UtilsObject;

});
