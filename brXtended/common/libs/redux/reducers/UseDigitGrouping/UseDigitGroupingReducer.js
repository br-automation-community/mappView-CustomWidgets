define([
    'widgets/brXtended/common/libs/redux/reducers/UseDigitGrouping/UseDigitGroupingActions'
], function (UseDigitGroupingActions) {

    'use strict';

    var UseDigitGroupingReducer = function (state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case UseDigitGroupingActions.USEDIGITGROUPING_CHANGE:
                state.useDigitGrouping = action.useDigitGrouping;
                return state;

            default:
                return state;
        }
    };

    return UseDigitGroupingReducer;

});
