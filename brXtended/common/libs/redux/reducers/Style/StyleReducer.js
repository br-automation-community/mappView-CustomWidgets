define([
    'widgets/brXtended/common/libs/redux/reducers/Style/StyleActions',
    'widgets/brXtended/common/libs/redux/utils/UtilsStyle'
], function (StyleActions, UtilsStyle) {

    'use strict';

    var StyleReducer = function StyleReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case StyleActions.STYLE_CHANGE:
                state = _.assign({}, state, {
                    style: action.style,
                    styleToApply: UtilsStyle.addStylePrefix(state.stylePrefix, action.style)
                });
                return state;
            case StyleActions.ADDITIONAL_STYLE_CHANGE:
                state = _.assign({}, state, {
                    additionalStyleToApply: action.styles.map(function (style) {
                        return UtilsStyle.addStylePrefix(state.stylePrefix, style);
                    }).join(' ')
                });
                return state;
            default:
                return state;
        }
    };

    return StyleReducer;

});
