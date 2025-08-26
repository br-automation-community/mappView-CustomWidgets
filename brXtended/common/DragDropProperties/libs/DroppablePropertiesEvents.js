define(function () {

    'use strict';

    /**
    * @class widgets.brXtended.common.DragDropProperties.libs.DroppablePropertiesEvents
    * @extends core.javascript.Object
    */

    /**
    * @cfg {Boolean} droppable=true
    * @iatCategory Behavior
    * Make widget droppable.
    */

    /**
    * @event OnDragEnter
    * @iatStudioExposed
    * Fired when element has onDragEnter.
    * @param {String} contentId content id of the widget that has been entering the droppable widget
    * @param {String} widgetId id of the widget that has been entering the droppable widget
    */

    /**
    * @event OnDragLeave
    * @iatStudioExposed
    * Fired when element has OnDragLeave.
    * @param {String} contentId content id of the widget that has been leaving the droppable widget
    * @param {String} widgetId id of the widget that has been leaving the droppable widget
    */

    /**
    * @event OnDrop
    * @iatStudioExposed
    * Fired when element has OnDrop.
    * @param {String} contentId content id of the widget that has been dropped on the droppable widget
    * @param {String} widgetId id of the widget that has been dropped on the droppable widget
    */

    return {};
});
