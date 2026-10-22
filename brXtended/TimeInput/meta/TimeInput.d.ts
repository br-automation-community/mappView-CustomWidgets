interface widgets_brXtended_TimeInput{
        
        /**
        * Sets focus on the widget element, if it can be focused and keyboardOperation=true
        */
        focus(): void;

        /**
        * Get the value of input field as time (ms)
        */
        getValue(): Time;

        /**
        * Sets the state of property "enable"
        */
        setEnable(value: boolean): void;

        /**
        * 
        */
        setStyle(value: StyleReference): void;

        /**
        * Set the value of input field as a time value (ms)
        */
        setValue(value: Time): void;

        /**
        * Sets the state of property "visible"
        */
        setVisible(value: boolean): void;

        /**
        * 
        */
        showTooltip(): void; 
        
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
        * Fired when the value changes.
        */
        valueChanged(handler: (e: { detail: { value: Time } }) => void):void;

        /**
        * Fired when the visibility of the widget changes.
        */
        visibleChanged(handler: (e: { detail: { value: boolean } }) => void):void;       
}
interface widgets_brXtended_TimeInput_private extends widgets_brXtended_TimeInput{
         
               
}