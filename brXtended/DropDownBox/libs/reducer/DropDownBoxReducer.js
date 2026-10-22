define([
    '../../../common/libs/redux/reducers/Text/TextReducer',
    '../../../common/libs/redux/reducers/Image/ImageReducer',
    '../../../common/libs/redux/reducers/Status/StatusReducer',
    '../../../common/libs/redux/reducers/Size/SizeReducer',
    '../../../common/libs/redux/reducers/List/ListReducer',
    '../../../common/libs/redux/reducers/Style/StyleReducer',
    '../../../common/libs/external/redux'
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
