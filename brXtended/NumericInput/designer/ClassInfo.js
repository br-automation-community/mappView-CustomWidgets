define(["widgets","brease"], function({brease:{NumericInput:{ClassInfo:s}}},{core:{Utils:U}}, e) {const classInfo={meta:{className:"widgets.brXtended.NumericInput",parents:["*"],children:[],inheritance:["widgets.brXtended.NumericInput","widgets.brease.NumericInput","brease.core.BaseWidget"],creator:"e8703a16a9acb5a00ea548e1e0fa962c",eventBindingApi:function (w) {
function a(e, f) { w.addServerEventListener(e, f); }
function c(...args) { const [{ action: a }] = args.slice(-1); return w[a](...args); }
return {
click: f => a('Click', f),
disabledClick: f => a('DisabledClick', f),
enableChanged: f => a('EnableChanged', f),
focusIn: f => a('FocusIn', f),
focusOut: f => a('FocusOut', f),
onDragEnd: f => a('OnDragEnd', f),
onDragEnter: f => a('OnDragEnter', f),
onDragLeave: f => a('OnDragLeave', f),
onDragStart: f => a('OnDragStart', f),
onDrop: f => a('OnDrop', f),
onError: f => a('OnError', f),
valueChanged: f => a('ValueChanged', f),
visibleChanged: f => a('VisibleChanged', f),
focus: function () { c({ origin: 'action', action: 'focus' }); },
openNumPadExt: function () { c({ origin: 'action', action: 'openNumPadExt' }); },
setBackColorExt: function (a1) { c(a1,{ origin: 'action', action: 'setBackColorExt' }); },
setEnable: function (a1) { c(a1,{ origin: 'action', action: 'setEnable' }); w._ebFVC({enable: 'getEnable'}, false);},
setStyle: function (a1) { c(a1,{ origin: 'action', action: 'setStyle' }); w._ebFVC({style: 'getStyle'}, false);},
setValue: function (a1) { c(a1,{ origin: 'action', action: 'setValue' }); w._ebFVC({value: 'getValue', node: 'getNode'}, false);},
setVisible: function (a1) { c(a1,{ origin: 'action', action: 'setVisible' }); w._ebFVC({visible: 'getVisible'}, false);},
showTooltip: function () { c({ origin: 'action', action: 'showTooltip' }); },
submitChange: function () { c({ origin: 'action', action: 'submitChange' }); }
};
},actions:{"Focus":{"method":"focus"},"OpenNumPadExt":{"method":"openNumPadExt"},"setAdditionalStyle":{"method":"setAdditionalStyle","parameter":{"styleName":{"name":"styleName","index":0,"type":"StyleReference"}}},"SetBackColorExt":{"method":"setBackColorExt","parameter":{"value":{"name":"value","index":0,"type":"String"}}},"setEditable":{"method":"setEditable","parameter":{"editable":{"name":"editable","index":0,"type":"Boolean"},"metaData":{"name":"metaData","index":1,"type":"Object"}}},"setEllipsis":{"method":"setEllipsis","parameter":{"ellipsis":{"name":"ellipsis","index":0,"type":"Boolean"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setFormat":{"method":"setFormat","parameter":{"format":{"name":"format","index":0,"type":"brease.config.MeasurementSystemFormat"}}},"setKeyboard":{"method":"setKeyboard","parameter":{"keyboard":{"name":"keyboard","index":0,"type":"Boolean"}}},"setLimitViolationPolicy":{"method":"setLimitViolationPolicy","parameter":{"limitViolationPolicy":{"name":"limitViolationPolicy","index":0,"type":"brease.enum.LimitViolationPolicy"}}},"setMaxValue":{"method":"setMaxValue","parameter":{"maxValue":{"name":"maxValue","index":0,"type":"Number"}}},"setMinValue":{"method":"setMinValue","parameter":{"minValue":{"name":"minValue","index":0,"type":"Number"}}},"setNode":{"method":"setNode","parameter":{"node":{"name":"node","index":0,"type":"brease.datatype.Node"}}},"setNumPadStyle":{"method":"setNumPadStyle","parameter":{"numPadStyle":{"name":"numPadStyle","index":0,"type":"String"}}},"setNumpadPosition":{"method":"setNumpadPosition","parameter":{"numpadPosition":{"name":"numpadPosition","index":0,"type":"brease.enum.Position"}}},"setOmitDisabledClick":{"method":"setOmitDisabledClick"},"setParentCoWiId":{"method":"setParentCoWiId","parameter":{"value":{"name":"value","index":0,"type":"String"}}},"setParentEnableState":{"method":"setParentEnableState"},"setParentVisibleState":{"method":"setParentVisibleState"},"setReadonly":{"method":"setReadonly","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setShowUnit":{"method":"setShowUnit","parameter":{"showUnit":{"name":"showUnit","index":0,"type":"Boolean"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"setSubmitOnChange":{"method":"setSubmitOnChange","parameter":{"submitOnChange":{"name":"submitOnChange","index":0,"type":"Boolean"}}},"setTabIndex":{"method":"setTabIndex","parameter":{"value":{"name":"value","index":0,"type":"Number"}}},"setUnit":{"method":"setUnit","parameter":{"unit":{"name":"unit","index":0,"type":"brease.config.MeasurementSystemUnit"}}},"setUnitAlign":{"method":"setUnitAlign","parameter":{"unitAlign":{"name":"unitAlign","index":0,"type":"brease.enum.ImageAlign"}}},"setUnitTextAlign":{"method":"setUnitTextAlign","parameter":{"unitTextAlign":{"name":"unitTextAlign","index":0,"type":"brease.enum.TextAlign"}}},"setUnitWidth":{"method":"setUnitWidth","parameter":{"value":{"name":"value","index":0,"type":"Size"}}},"setUseDigitGrouping":{"method":"setUseDigitGrouping","parameter":{"useDigitGrouping":{"name":"useDigitGrouping","index":0,"type":"Boolean"}}},"SetValue":{"method":"setValue","parameter":{"value":{"name":"value","index":0,"type":"Number"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"ShowTooltip":{"method":"showTooltip"},"SubmitChange":{"method":"submitChange"}},properties:{"value":{"nodeRefId":"node"}}}};if(s.classExtension) {classInfo.classExtension = s.classExtension;}if(e) {classInfo.classExtension = e;}return classInfo;});
