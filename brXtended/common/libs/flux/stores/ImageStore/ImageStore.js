'use strict';
define([
    'widgets/brXtended/common/libs/flux/stores/ImageStore/ImageActionTypes',
    'widgets/brXtended/common/libs/flux/stores/ImageStore/ImageTypes',
    'widgets/brXtended/common/libs/wfUtils/UtilsImage',
    'brease'
], function (ImageActionTypes, ImageTypes, UtilsImage, { enum: { Enum }, core: { Utils } }) {

    var ImageStore = function ImageStore(dispatcher, initState) {
        dispatcher.registerStore(this);
        var defaultState = _getDefaultState();
        this.state = _mergeInitWithDefaultState(initState, defaultState);
        this.pending = [];
        this.subscribedViews = [];
        this.sourceOrder = [];
    };

    const storeProcessor = {

        [ImageActionTypes.INIT_IMAGE]: function (store) {
            _addPrefixToImageList(store);
            _setActualSelectedImage(store);
            store.processImage();
        },

        [ImageActionTypes.INIT_IMAGE_AFTER_PRELOAD]: function (store) {
            store.state.preloading = false;
        },

        [ImageActionTypes.SET_IMAGE_LIST]: function (store, action) {
            if (Array.isArray(action.data)) {
                store.state.imageList = action.data;
            } else {
                store.state.imageList = [''];
            }
            _addPrefixToImageList(store);
            _setActualSelectedImage(store);
            store.processImage();
        },

        [ImageActionTypes.SET_IMAGE_FROM_INDEX]: function (store, action) {
            if (Utils.isNumeric(action.data.index) === false) { return; }
            var imageToSet = Utils.isString(action.data.image) ? action.data.image : '';
            store.state.imageList[action.data.index] = imageToSet;
            _addPrefixToImageList(store);
            _setActualSelectedImage(store);
            store.processImage();
        },

        [ImageActionTypes.SET_IMAGE_INDEX]: function (store, action) {
            store.state.imageIndex = Utils.isNumeric(action.data) ? action.data : undefined;
            _setActualSelectedImage(store);
            store.processImage();
        },

        [ImageActionTypes.SET_PATH_PREFIX]: function (store, action) {
            var pathPrefix = Utils.isString(action.data) ? action.data : '';
            store.state.pathPrefix = pathPrefix;
            _addPrefixToImageList(store);
            _setActualSelectedImage(store);
            store.processImage();
        },

        [ImageActionTypes.SET_SIZE_MODE]: function (store, action) {
            store.state.sizeMode = action.data;
        },

        [ImageActionTypes.SET_BACKGROUND_ALIGNMENT]: function (store, action) {
            store.state.backgroundAlignment = action.data.split(' ');
        },

        [ImageActionTypes.SET_WIDTH]: function (store, action) {
            store.state.width = action.data;
        },

        [ImageActionTypes.SET_HEIGHT]: function (store, action) {
            store.state.height = action.data;
        },

        [ImageActionTypes.SET_VISIBLE]: function (store, action) {
            store.state.visible = action.data;
        },

        [ImageActionTypes.SET_USE_SVG_STYLING]: function (store, action) {
            store.state.useSVGStyling = action.data;
            store.processImage();
        }

    };

    ImageStore.prototype.newAction = function newAction(action) {

        var store = this;
        let m = storeProcessor[action.type];
        if (typeof m === 'function') {
            m(store, action); 
        }
        
        store.state.promise.then(function (imageType) {
            store.state.type = imageType;
            store.dispatchAction();
            store.pending = [];
        }, function () {
            store.pending = [];
        });
    };

    ImageStore.prototype.processImage = function processImage() {
        var store = this;
        if (store.pending) {
            store.pending.forEach(function (rejectPendingImage) { rejectPendingImage(); });
            store.pending = [];
        }
        store.state.promise = store._processImage(store);
    };

    ImageStore.prototype.dispatchAction = function dispatchAction() {
        var store = this;
        store.subscribedViews.forEach(function (view) {
            view.update();
        });
    };

    ImageStore.prototype.getImageType = function getImageType() {
        return this.state.type;
    };

    ImageStore.prototype.getImagePath = function getImagePath() {
        return this.state.actualImage;
    };

    ImageStore.prototype.getSvgInline = function getSvgInline() {
        return this.state.svgInline;
    };

    ImageStore.prototype.getImageSizeMode = function getImageSizeMode() {
        return this.state.sizeMode;
    };

    ImageStore.prototype.getBackgroundAlignment = function getBackgroundAlignment() {
        return this.state.backgroundAlignment;
    };

    ImageStore.prototype.getHeight = function getHeight() {
        return this.state.height;
    };

    ImageStore.prototype.getWidth = function getWidth() {
        return this.state.width;
    };

    ImageStore.prototype.getVisible = function getVisible() {
        return this.state.visible;
    };

    ImageStore.prototype.getUseSVGStyling = function getUseSVGStyling() {
        return this.state.useSVGStyling;
    };

    ImageStore.prototype.getPreloading = function getPreloading() {
        return this.state.preloading;
    };

    ImageStore.prototype.registerView = function registerView(view) {
        this.subscribedViews.push(view);
    };

    ImageStore.prototype._processImage = function (store) {
        var processImagePromise = new Promise(function (resolve, reject) {
            store.pending.push(reject);
            if (store.state.actualImage === undefined || store.state.actualImage === '') {
                resolve(ImageTypes.INVALID);
            } else if (UtilsImage.isStylable(store.state.actualImage) && store.state.useSVGStyling) {
                store.sourceOrder.push(store.state.actualImage);     
                UtilsImage.getInlineSvg(store.state.actualImage, false, store.sourceOrder).then(function (svgElement) {
                    store.state.svgInline = svgElement;
                    store.sourceOrder = [];
                    svgElement.remove();
                    svgElement = null;
                    resolve(ImageTypes.SVG);
                });
            } else {
                //Possible improvement: add a function to check if the image is present, if not, set type to INVALID
                resolve(ImageTypes.OTHER);
            }
        });
        return processImagePromise;
    };

    //Private methods
    function _addPrefixToImageList(store) {
        if (store.state.pathPrefix !== undefined && store.state.pathPrefix !== '') {
            store.state.imageListWithPrefix = store.state.imageList.map(function (image) {
                if (image !== undefined && image !== '') {
                    return store.state.pathPrefix + image;
                } else {
                    return '';
                }
            });
        } else {
            store.state.imageListWithPrefix = store.state.imageList;
        }
    }

    function _setActualSelectedImage(store) {
        var actualSelectedImage = store.state.imageListWithPrefix[store.state.imageIndex];
        store.state.actualImage = actualSelectedImage === undefined ? '' : actualSelectedImage;
    }

    function _getDefaultState() {
        return {
            imageList: [''],
            imageListWithPrefix: [''],
            imageIndex: 0,
            pathPrefix: '',
            sizeMode: Enum.SizeMode.CONTAIN,
            backgroundAlignment: ['left', 'top'],
            type: ImageTypes.INVALID,
            svgInline: $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 1 1 1"></svg>'),
            actualImage: '',
            height: 'auto',
            width: 'auto',
            visible: true,
            useSVGStyling: true,
            preloading: false
        };
    }

    function _mergeInitWithDefaultState(initState, defaultState) {
        if (initState === undefined || Utils.isObject(initState) === false) {
            return defaultState;
        } else {
            //Duplicate object to avoid reference from other store
            initState = JSON.parse(JSON.stringify(initState));
            return {
                imageList: initState.imageList !== undefined ? initState.imageList : defaultState.imageList,
                imageListWithPrefix: defaultState.imageListWithPrefix,
                imageIndex: initState.imageIndex !== undefined ? initState.imageIndex : defaultState.imageIndex,
                pathPrefix: initState.pathPrefix !== undefined ? initState.pathPrefix : defaultState.pathPrefix,
                sizeMode: initState.sizeMode !== undefined ? initState.sizeMode : defaultState.sizeMode,
                backgroundAlignment: initState.backgroundAlignment !== undefined ? initState.backgroundAlignment.split(' ') : defaultState.backgroundAlignment,
                type: defaultState.type,
                svgInline: defaultState.svgInline,
                actualImage: defaultState.actualImage,
                height: initState.height !== undefined ? initState.height : defaultState.height,
                width: initState.width !== undefined ? initState.width : defaultState.width,
                visible: initState.visible !== undefined ? initState.visible : defaultState.visible,
                useSVGStyling: initState.useSVGStyling !== undefined ? initState.useSVGStyling : defaultState.useSVGStyling,
                preloading: initState.preloading !== undefined ? initState.preloading : defaultState.preloading
            };
        }
    }

    return ImageStore;

});
