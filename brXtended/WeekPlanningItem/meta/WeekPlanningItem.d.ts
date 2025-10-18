interface widgets_brXtended_WeekPlanningItem{
        
        /**
        * Sets focus on the widget element, if it can be focused and keyboardOperation=true
        */
        focus(): void;

        /**
        * Sets the state of property "enable"
        */
        setEnable(value: boolean): void;

        /**
        * 
        */
        setStyle(value: StyleReference): void;

        /**
        * Sets the visible text. This method can remove an optional textkey.
        */
        setText(text: string, keepKey?: boolean): void;

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
        * Fired when the visibility of the widget changes.
        */
        visibleChanged(handler: (e: { detail: { value: boolean } }) => void):void;       
}
interface widgets_brXtended_WeekPlanningItem_private extends widgets_brXtended_WeekPlanningItem{
         
               
}