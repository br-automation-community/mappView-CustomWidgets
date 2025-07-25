define(function () {

    'use strict';

    /**
     * @class widgets.brXtended.common.libs.redux.reducers.UseDigitGrouping.UseDigitGroupingActions
     * @iatMeta studio:visible
     * false
     */

    var UseDigitGroupingActions = {
        
        USEDIGITGROUPING_CHANGE: 'USEDIGITGROUPING_CHANGE',
        changeUseDigitGrouping: function (newValue) {
            return {
                type: UseDigitGroupingActions.USEDIGITGROUPING_CHANGE,
                useDigitGrouping: newValue
            };
        }
    };

    return UseDigitGroupingActions;

});
