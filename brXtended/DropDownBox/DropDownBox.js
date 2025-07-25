'use strict';
define([
    'brease',
    'widgets',
    './libs/config/Config',
    './libs/view/DropDownBoxView/DropDownBoxView',
    './libs/config/InitState',
    './libs/reducer/DropDownBoxReducer',
    'widgets/brXtended/common/libs/external/redux',
], function (
    brease,
    widgets,
    Config,
    DropDownBoxView,
    InitState,
    DropDownBoxReducer,
    Redux,
)
{

    /**
     * @class widgets.brXtended.DropDownBox
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     *
     * DropDownBox
     * @extends widgets.brease.DropDownBox
     *
     * @iatMeta studio:visible
     * true
     * @iatMeta category:Category
     * Selector
     * @iatMeta description:short
     * DropDownliste von Texten
     * @iatMeta description:de
     * Zeigt eine DropDownliste, aus welcher der Benutzer Elemente auswählen kann
     * @iatMeta description:en
     * Displays a drop-down list where the user can select items
     */

    var defaultSettings = Config

    const WidgetClass = widgets.brease.DropDownBox.extend(
        function DropDownBox() {
            widgets.brease.DropDownBox.apply(this, arguments);
        }, defaultSettings),

    p = WidgetClass.prototype;

    p.init = function () {

        //Initialize superclass
        widgets.brease.DropDownBox.prototype.init.apply(this, arguments);
 
        // Calculate init state
        var initState = InitState.calculateInitState(this.settings, this.isEnabled(), this.isVisible());

        // Add additional property to init state
        initState.items.listSettings.listPositionExt = this.settings.listPositionExt;

        // Create store
        this.store = Redux.createStore(DropDownBoxReducer, initState);

        // Remove inherited view
        window.removeEventListener('addEventListener', this.focusHandler.onRender.bind(this.focusHandler));
        this.dropDownBoxView.dispose();
        this.submitQueue.clear();

        // Create View
        this.dropDownBoxView = new DropDownBoxView(this.store, this.el, this);

        // Subscribe master view to the store
        this.store.subscribe(this.dropDownBoxView.render.bind(this.dropDownBoxView));

        if (brease.config.isKeyboardOperationEnabled()) {
            // Update focus after a render of the view
            this.dropDownBoxView.addEventListener('ViewRendered', this.focusHandler.onRender.bind(this.focusHandler));
        }
    };

 return WidgetClass;

});
