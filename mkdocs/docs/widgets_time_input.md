## Description

This widget extends the standard **DateTimeInput** and is dedicated to the mappView/PLC datatype **TIME**.

* The bound value is a **TIME** (milliseconds), not a `DateTime`.
* Range is limited to one day: `0` up to `86399999` ms (`00:00:00.000` - `23:59:59.999`).
* No date and no time zone conversion: the value is a duration, so it behaves the same in every time zone.
* The picker is the **brXtended TimePicker**, an hour/minute/second wheel picker with an **optional millisecond wheel**.
* Milliseconds are supported in the display **and** in the picker wheel, with a configurable step.

## Usage

#### Properties

**value** *(Time, bindable)*

Current time value in milliseconds. Accepted inputs:

* a number of milliseconds (`0` ... `86399999`) - normal case,
* a `DateTime`/`Date`/ISO string: it is reduced to its UTC time-of-day.

Out-of-range values are clamped, never rejected:

| Input | Resulting value |
|---|---|
| `-5` | `0` |
| `86400000` | `86399999` |
| `3600000` | `3600000` (01:00:00.000) |

**format** *(String, localizable, default `HH:mm:ss`)*

Display format of the input field. It uses the **Globalize** tokens used by brease/mappView:

| Token | Meaning | Example |
|---|---|---|
| `HH` | hours, 24h, 2 digits | `09` |
| `mm` | minutes, 2 digits | `05` |
| `ss` | seconds, 2 digits | `07` |
| `fff` | milliseconds, 3 digits | `042` |

> :warning: **Warning:** Milliseconds use `f`/`ff`/`fff`. The token `S` does **not** exist and would be printed literally (`.SSS` is displayed as `.SSS`).

**showMilliseconds** *(Boolean, default `false`)*

* Displays the milliseconds in the input field (`format` is extended with `.fff`).
* Adds the millisecond wheel to the picker.

If `format` already contains a millisecond token (`f`/`F`), nothing is appended.

**millisecondStep** *(Integer, default `100`)*

Step of the millisecond wheel. Only values that are multiples of the step are offered:

| millisecondStep | Wheel values | Display |
|---|---|---|
| `1` | `000`, `001`, ... `999` | all milliseconds |
| `10` | `000`, `010`, ... `990` | 10 ms resolution |
| `100` | `000`, `100`, ... `900` | 100 ms resolution |

A value that is not a multiple of the step is snapped down to the closest existing wheel value.

Inherited properties are also available: `pickerPosition`, `submitOnChange`, `tabIndex`, `enable`, `visible`, `tooltip`, `style`, `permissionOperate`, `permissionView`, `draggable`, `left`, `top`, `width`, `height`, ...

#### Events

**ValueChanged**

Fired when the value changes.

* Arguments:
    * **value** (Time): new value in milliseconds

> :memo: **Note:** Unlike the standard `DateTimeInput`, this event carries a **TIME in ms** and not a `DateTime` string.

#### Actions

**SetValue**

Sets the value.

* Parameter: **value** (Time) in milliseconds

**GetValue**

Reads the current value (ReadAction).

* Return value: **value** (Time) in milliseconds

The usual actions are inherited as well: `SetEnable`, `SetVisible`, `SetStyle`, `Focus`, `ShowTooltip`, `setFormat`, `setShowMilliseconds`, `setMillisecondStep`, `setSubmitOnChange`, `setPickerPosition`, `setTabIndex`, `setEditable`.

#### Behavior details

* A click on the input field opens the TimePicker below/next to the widget, depending on `pickerPosition`.
* The picker shows **hour, minute and second** columns, plus a **millisecond** column when `showMilliseconds` is enabled.
* `reset` restores the value the picker was opened with, `enter` submits it.
* The picker is a singleton shared by all TimeInput widgets of the visualization.
* Keyboard and focus handling is inherited from `DateTimeInput` (arrow keys, tabbing between columns), except the millisecond column which is mouse/touch only.

> :bulb: **Tip:** When reading the value on the PLC side, bind the widget `value` to a variable of type **TIME** (DINT, milliseconds). No scaling is required.

#### Picker (TimePicker)

The popup is a separate widget, `widgets.brXtended.TimePicker`, delivered in the same library
(`brXtended/TimePicker`).

* It is **not** intended to be placed on a page: it is opened automatically by the TimeInput.
* It contains its own wheel implementation (`SliderWheel`), its own template and its own styles
  (`widgets_brXtended_TimePicker`), so it does not depend on the brease `DateTimePicker`.
* One instance is shared by all TimeInput widgets of the visualization.

## Requirements

Tested with

* Automation Studio 6.4
* mappView 6.7

May also work with lower version: **NO**

## Revision History

##### Version 1
- First release
