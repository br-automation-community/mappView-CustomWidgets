define(function () {

    'use strict';

    /**
     * @class widgets.brXtended.common.libs.redux.reducers.Style.StyleActions
     * @iatMeta studio:visible
     * false
     */

    var StyleActions = {
        
        STYLE_CHANGE: 'STYLE_CHANGE',
        styleChange: function (newStyle) {
            return {
                type: StyleActions.STYLE_CHANGE,
                style: newStyle
            };
        },
        ADDITIONAL_STYLE_CHANGE: 'ADDITIONAL_STYLE_CHANGE',
        additionalStyleChange: function (arStyles) {
            return {
                type: StyleActions.ADDITIONAL_STYLE_CHANGE,
                styles: arStyles
            };
        },
        THEME_CHANGE: 'THEME_CHANGE',
        themeChange: function () {
            return {
                type: StyleActions.THEME_CHANGE
            };
        }
    };

    return StyleActions;

});
