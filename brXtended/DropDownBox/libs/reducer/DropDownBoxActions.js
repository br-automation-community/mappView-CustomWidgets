define([
    'widgets/brXtended/common/libs/redux/reducers/Text/TextActions',
    'widgets/brXtended/common/libs/redux/reducers/Image/ImageActions',
    'widgets/brXtended/common/libs/redux/reducers/Status/StatusActions',
    'widgets/brXtended/common/libs/redux/reducers/Size/SizeActions',
    'widgets/brXtended/common/libs/redux/reducers/List/ListActions',
    'widgets/brXtended/common/libs/redux/reducers/Style/StyleActions'
], function (TextActions, ImageActions, StatusActions, SizeActions, ListActions, StyleActions) {

    'use strict';

    var DropDownBoxActions = _.assign({}, TextActions, ImageActions, StatusActions, SizeActions, ListActions, StyleActions);

    return DropDownBoxActions;

});
