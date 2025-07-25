interface widgets_brXtended_NumericInput{
        
        /**
        * Sets focus on the widget element, if it can be focused and keyboardOperation=true
        */
        focus(): void;

        /**
        * Opens the numeric keypad.
        */
        openNumPadExt(): void;

        /**
        * Sets the back color of the widget.
        */
        setBackColorExt(value: string): void;

        /**
        * Sets the state of property "enable"
        */
        setEnable(value: boolean): void;

        /**
        * 
        */
        setStyle(value: StyleReference): void;

        /**
        * Sets value which is displayed in the widget.
        */
        setValue(value: number): void;

        /**
        * Sets the state of property "visible"
        */
        setVisible(value: boolean): void;

        /**
        * 
        */
        showTooltip(): void;

        /**
        * Send value to the server, if binding for this widget exists.Usage of this method will only make sense, if submitOnChange=false, as otherwise changes are submitted automatically.
        */
        submitChange(): void; 
        
        /**
        * Fired when element is clicked on.
        */
        click(handler: (e: { detail: { origin: string, horizontalPos: string, verticalPos: string } }) => void):void;

        /**
        * Fired when disabled element is clicked on.
        */
        disabledClick(handler: (e: { detail: { origin: string, hasPermission: boolean, horizontalPos: string, verticalPos: string } }) => void):void;

        /**
        * Fired when operability of the widget changes.
        */
        enableChanged(handler: (e: { detail: { value: boolean } }) => void):void;

        /**
        * Fired when the widgets gets focus
        */
        focusIn(handler: () => void):void;

        /**
        * Fired when the widgets lost focus
        */
        focusOut(handler: () => void):void;

        /**
        * Fired when element has OnDragEnd.
        */
        onDragEnd(handler: (e: { detail: { contentId: string, widgetId: string } }) => void):void;

        /**
        * Fired when element has onDragEnter.
        */
        onDragEnter(handler: (e: { detail: { contentId: string, widgetId: string } }) => void):void;

        /**
        * Fired when element has OnDragLeave.
        */
        onDragLeave(handler: (e: { detail: { contentId: string, widgetId: string } }) => void):void;

        /**
        * Fired when element has OnDragStart.
        */
        onDragStart(handler: (e: { detail: { contentId: string, widgetId: string } }) => void):void;

        /**
        * Fired when element has OnDrop.
        */
        onDrop(handler: (e: { detail: { contentId: string, widgetId: string } }) => void):void;

        /**
        * Fired when there is an error on the operation.
        */
        onError(handler: (e: { detail: { response: Integer } }) => void):void;

        /**
        * Fired when index changes.
        */
        valueChanged(handler: (e: { detail: { value: number } }) => void):void;

        /**
        * Fired when the visibility of the widget changes.
        */
        visibleChanged(handler: (e: { detail: { value: boolean } }) => void):void;       
}
interface widgets_brXtended_NumericInput_private extends widgets_brXtended_NumericInput{
         
               
}