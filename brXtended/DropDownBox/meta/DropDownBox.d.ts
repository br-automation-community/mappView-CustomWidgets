interface widgets_brXtended_DropDownBox{
        
        /**
        * Closes the list
        */
        close(): void;

        /**
        * Sets focus on the widget element, if it can be focused and keyboardOperation=true
        */
        focus(): void;

        /**
        * Returns selectedIndex.
        */
        getSelectedIndex(): Integer;

        /**
        * Returns selectedValue.
        */
        getSelectedValue(): string;

        /**
        * Opens the list
        */
        open(): void;

        /**
        * method to set the dataProvider
        */
        setDataProvider(value: ItemCollection): void;

        /**
        * Sets the state of property "enable"
        */
        setEnable(value: boolean): void;

        /**
        * Sets the selected entry based on an index
        */
        setSelectedIndex(index: Integer): void;

        /**
        * sets the selected entry based on a value
        */
        setSelectedValue(value: string): void;

        /**
        * 
        */
        setStyle(value: StyleReference): void;

        /**
        * Sets the state of property "visible"
        */
        setVisible(value: boolean): void;

        /**
        * 
        */
        showTooltip(): void;

        /**
        * Opens or closes the list depending on the actual status
        */
        toggle(): void; 
        
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
        * Fired when element has onDragEnter.
        */
        onDragEnter(handler: (e: { detail: { contentId: string, widgetId: string } }) => void):void;

        /**
        * Fired when element has OnDragLeave.
        */
        onDragLeave(handler: (e: { detail: { contentId: string, widgetId: string } }) => void):void;

        /**
        * Fired when element has OnDrop.
        */
        onDrop(handler: (e: { detail: { contentId: string, widgetId: string } }) => void):void;

        /**
        * Fired when selectedIndex or selectedValue changes.
        */
        selectedIndexChanged(handler: (e: { detail: { selectedIndex: Integer, selectedValue: string } }) => void):void;

        /**
        * Triggered when the list is opened or closed.
        */
        toggleStateChanged(handler: (e: { detail: { newValue: boolean } }) => void):void;

        /**
        * Fired when the visibility of the widget changes.
        */
        visibleChanged(handler: (e: { detail: { value: boolean } }) => void):void;       
}
interface widgets_brXtended_DropDownBox_private extends widgets_brXtended_DropDownBox{
         
               
}