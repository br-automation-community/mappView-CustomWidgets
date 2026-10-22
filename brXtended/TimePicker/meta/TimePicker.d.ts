interface widgets_brXtended_TimePicker{
        
        /**
        * Sets focus on the widget element, if it can be focused and keyboardOperation=true
        */
        focus(): void;

        /**
        * 
        */
        showTooltip(): void; 
        
        /**
        * Fired when disabled element is clicked on.
        */
        disabledClick(handler: (e: { detail: { origin: string, hasPermission: boolean, horizontalPos: string, verticalPos: string } }) => void):void;

        /**
        * Fired when the widgets gets focus
        */
        focusIn(handler: () => void):void;

        /**
        * Fired when the widgets lost focus
        */
        focusOut(handler: () => void):void;       
}
interface widgets_brXtended_TimePicker_private extends widgets_brXtended_TimePicker{
         
               
}