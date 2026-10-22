define([
    '../../../common/libs/redux/reducers/Text/TextActions',
    '../../../common/libs/redux/reducers/Image/ImageActions',
    '../../../common/libs/redux/reducers/Status/StatusActions',
    '../../../common/libs/redux/reducers/Size/SizeActions',
    '../../../common/libs/redux/reducers/List/ListActions',
    '../../../common/libs/redux/reducers/Style/StyleActions'
], function (TextActions, ImageActions, StatusActions, SizeActions, ListActions, StyleActions) {

    'use strict';

    var DropDownBoxActions = _.assign({}, TextActions, ImageActions, StatusActions, SizeActions, ListActions, StyleActions);

    return DropDownBoxActions;

});
