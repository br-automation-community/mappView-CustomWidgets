'use strict';
define([
    'widgets/brXtended/common/libs/redux/reducers/List/ListActions',
    'widgets/brXtended/common/libs/redux/utils/UtilsList',
    'brease'
], function (ListActions, UtilsList, { core: { Utils } }) {

    const reducer = {

        [ListActions.UPDATE_ITEM_LIST]: function (state, action) {
            let newSelectedIndex = _getIndexForValue(action.itemList, state.selectedValue);
            let newItems = _markSelectedItem(action.itemList, newSelectedIndex);
            let newSelectedValue = UtilsList.getSelectedValueFromItems(newItems, newSelectedIndex);
            return _.assign({}, state, {
                itemList: newItems,
                selectedValue: newSelectedValue,
                selectedIndex: newSelectedIndex,
                previousSelectedIndex: state.selectedIndex,
                listSettings: _.assign({}, state.listSettings, {
                    listHeight: UtilsList.calculateListHeight(state.listSettings.fitHeight2Items,
                        action.itemList.length, state.listSettings.maxVisibleEntries, state.itemSettings.itemHeight)
                })
            });
        },
        [ListActions.UPDATE_SELECTED_ITEM]: function (state, action) {
            let newSelectedIndex = _parseSelectedIndex(action.selectedItemIndex, state.itemList.length);
            let newItems = _markSelectedItem(state.itemList, newSelectedIndex);
            let newSelectedValue = UtilsList.getSelectedValueFromItems(newItems, newSelectedIndex);
            return _.assign({}, state, {
                itemList: newItems,
                selectedIndex: newSelectedIndex,
                selectedValue: newSelectedValue,
                previousSelectedIndex: state.selectedIndex,
                listOpen: false
            });

        },
        [ListActions.UPDATE_SELECTED_VALUE]: function (state, action) {
            let newSelectedIndex = _getIndexForValue(state.itemList, action.selectedItemValue);
            let newItems = _markSelectedItem(state.itemList, newSelectedIndex);
            let newSelectedValue = UtilsList.getSelectedValueFromItems(newItems, newSelectedIndex);
            return _.assign({}, state, {
                itemList: newItems,
                selectedIndex: newSelectedIndex,
                selectedValue: newSelectedValue,
                previousSelectedIndex: state.selectedIndex,
                listOpen: false
            });

        },
        [ListActions.UPDATE_ITEM_SETTINGS]: function (state, action) {
            return _.assign({}, state, {
                itemSettings: {
                    itemHeight: action.itemSettings.itemHeight === undefined ? state.itemSettings.itemHeight : action.itemSettings.itemHeight,
                    imageAlign: action.itemSettings.imageAlign === undefined ? state.itemSettings.imageAlign : action.itemSettings.imageAlign
                }
            });

        },
        [ListActions.TOGGLE_LIST_STATUS]: function (state) {
            let newListStatus = !state.listOpen;
            return _.assign({}, state, {
                listOpen: newListStatus
            });

        },
        [ListActions.CLOSE_LIST]: function (state) {
            return _.assign({}, state, {
                listOpen: false
            });

        },
        [ListActions.OPEN_LIST]: function (state) {
            return _.assign({}, state, {
                listOpen: true
            });

        },
        [ListActions.UPDATE_LIST_SETTINGS]: function (state, action) {
            return _.assign({}, state, {
                listSettings: {
                    fitHeight2Items: action.listSettings.fitHeight2Items === undefined ? state.listSettings.fitHeight2Items : action.listSettings.fitHeight2Items,
                    listPosition: action.listSettings.listPosition === undefined ? state.listSettings.listPosition : action.listSettings.listPosition,
                    listWidth: action.listSettings.listWidth === undefined ? state.listSettings.listWidth : action.listSettings.listWidth,
                    listHeight: action.listSettings.listHeight === undefined ? state.listSettings.listHeight : action.listSettings.listHeight,
                    maxVisibleEntries: action.listSettings.maxVisibleEntries === undefined ? state.listSettings.maxVisibleEntries : action.listSettings.maxVisibleEntries,
                    cropToParent: action.listSettings.cropToParent === undefined ? state.listSettings.cropToParent : action.listSettings.cropToParent,
                    showTexts: action.listSettings.showTexts === undefined ? state.listSettings.showTexts : action.listSettings.showTexts,
                    showImages: action.listSettings.showImages === undefined ? state.listSettings.showImages : action.listSettings.showImages,
                    showTextsInButton: action.listSettings.showTextsInButton === undefined ? state.listSettings.showTextsInButton : action.listSettings.showTextsInButton,
                    showImagesInButton: action.listSettings.showImagesInButton === undefined ? state.listSettings.showImagesInButton : action.listSettings.showImagesInButton
                }
            });

        },
        [ListActions.SET_LIST_OFFLINE]: function (state) {
            return _.assign({}, state, {
                offline: true
            });

        },
        [ListActions.SET_LIST_ONLINE]: function (state) {
            return _.assign({}, state, {
                offline: false
            });

        }
    };

    const ListReducer = function ListReducer(state, action) {

        if (state === undefined) {
            return null;
        }

        let m = reducer[action.type];
        if (typeof m === 'function') {
            return m.call(this, state, action); 
        } else {
            return state;
        }
        
    };

    function _markSelectedItem(itemList, selectedIndex) {
        return itemList.map(function (item, index) {
            item.selected = index === selectedIndex;
            return item;
        });
    }

    function _getIndexForValue(itemList, selectedValue) {
        for (let i = 0; i < itemList.length; i = i + 1) {
            if (itemList[i].value === selectedValue) {
                return i;
            }
        }
        //Return item not found
        return 0;
    }

    function _parseSelectedIndex(selectedIndex, itemListLength) {
        let parsedIndex = 0;
        if ((Utils.isNumeric(selectedIndex) && (selectedIndex < itemListLength) && (selectedIndex > 0)) || selectedIndex === null) {
            parsedIndex = selectedIndex;
        } else if (selectedIndex === true) {
            parsedIndex = 1;
        } else {
            parsedIndex = 0;
        }
        return parsedIndex;
    }

    return ListReducer;

});
