## Description
This widget extends the standard group box. The following additional functions are available

* Additional property "verticalAnchorTop" as boolean

## Usage

#### Properties

**verticalAnchorTopExt**

This property is use to anchor top or bottom the items in a group box that already got "childPositioning" at "relative" and "alignment" at "vertical".

If "verticalAnchorTopExt" is "true" it's default value and there is no change at the standard group box.
If it's "false", list is inverted like this:

![](./images/groupbox1.png)

**alignItemsExt**

This property is used to align items horizontally within the group box. This property works only if "childPositioning" is set to "relative" and "alignment" is set to "horizontal". Possible values are:
- 'left top'
- 'left center'
- 'left bottom'
- 'center top'
- 'center center'
- 'center bottom'
- 'right top'
- 'right center'
- 'right bottom'



## Limitations

## Requirements

Tested with

* Automation Studio 6.3
* mappView 6.3

May also work with lower version: **YES**

## Revision History

##### Version 2
- Update widget to mappView 6.x
- Rename property "verticalAnchorTop" to "verticalAnchorTopExt"
- Add "alignItemsExt" style property to align items horizontal
- Update documentation for new properties

##### Version 1
- First release



