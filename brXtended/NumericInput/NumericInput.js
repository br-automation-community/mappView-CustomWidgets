"use strict";
define([
    "widgets"
], function (
    widgets
) {
    /**
     * @class widgets.brXtended.NumericInput
     * #Description
     * Input field for numeric values
     * To edit values, an window for numeric input (=NumPad) will be shown
     *
     * @extends widgets.brease.NumericInput
     *
     * @aside example numinout
     *
     * @iatMeta category:Category
     * Numeric
     * @iatMeta description:short
     * Eingabe eines Wertes
     * @iatMeta description:de
     * Ermöglicht dem Benutzer einen numerischen Wert einzugeben
     * @iatMeta description:en
     * Enables the user to enter a numeric value
     */

    /**
     * @method getValue
     * @hide
     */

    // Widget error numbers
    const err_unkown = 10000;
    const err_invalid_color = 10001;

    var defaultSettings = {};

    const WidgetClass = widgets.brease.NumericInput.extend(
        function NumericInput() {
            widgets.brease.NumericInput.apply(this, arguments);
        }, defaultSettings);

    var p = WidgetClass.prototype;

    p.init = function () {
        this.addInitialClass("brXtendedNumericInput");

        // breaseNumericInput css class should not be added
        widgets.brease.NumericInput.prototype.init.call(this);
    };

    /**
     * @method setBackColorExt
     * @iatStudioExposed
     * Sets the back color of the widget.
     * @param {String} value The back color to be set
     */
    p.setBackColorExt = function (value) {
        var widget = this;
        var s = new Option().style;
        s.color = value;

        if (s.color !== "") {
            this.el.css("background-color", value);
        } else {
            widget._errorHandling(err_invalid_color);
        }
    };

    p._errorHandling = function _errorHandling(code) {
        console.log("NumericInput Error:" + code);

        var widget = this;
        /**
         * @event OnError
         * Fired when there is an error on the operation.
         * @iatStudioExposed
         * @param {Integer} response Number of error transmitted by the mapp component.
         */
        var ev = widget.createEvent("OnError", { response: code });
        if (ev !== undefined) {
            ev.dispatch();
        }

        // Send error to PLC logger
        if (!brease.config.editMode) {
            var m =
                "Error " +
                code +
                " in brXtended on page " +
                widget.settings.parentContentId +
                " at widget " +
                this.elem.id;
            brease.loggerService.log(
                Enum.EventLoggerId.CLIENT_SCRIPT_FAIL,
                Enum.EventLoggerCustomer.BUR,
                Enum.EventLoggerVerboseLevel.OFF,
                Enum.EventLoggerSeverity.ERROR,
                [],
                m
            );
        }
    };

    /**
     * @method openNumPadExt
     * @iatStudioExposed
     * Opens the numeric keypad.
     */
    p.openNumPadExt = function () {
        this._showNumPad(this);
    };

    p._createUnitEl = function () {
        return $("<span></span>").addClass("brXtendedNumericInput_unit");
    };
    p._onFocusIn = function () {
        if (this.isDisabled === true) {
            this.inputEl.blur();
        } else {
            this.focusInTime = Date.now();
            this.el.addClass("active");
        }
    };

    return WidgetClass;
});
