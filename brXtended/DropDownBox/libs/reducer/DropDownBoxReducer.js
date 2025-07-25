define([
    'widgets/brXtended/common/libs/redux/reducers/Text/TextReducer',
    'widgets/brXtended/common/libs/redux/reducers/Image/ImageReducer',
    'widgets/brXtended/common/libs/redux/reducers/Status/StatusReducer',
    'widgets/brXtended/common/libs/redux/reducers/Size/SizeReducer',
    'widgets/brXtended/common/libs/redux/reducers/List/ListReducer',
    'widgets/brXtended/common/libs/redux/reducers/Style/StyleReducer',
    'widgets/brXtended/common/libs/external/redux'
], function (TextReducer, ImageReducer, StatusReducer, SizeReducer, ListReducer, StyleReducer, Redux) {

    'use strict';

    return Redux.combineReducers({
        text: TextReducer,
        items: ListReducer,
        image: ImageReducer,
        status: StatusReducer,
        size: SizeReducer,
        style: StyleReducer
    });

});
