define(["widgets","brease"], function({brease:{DateTimeInput:{ClassInfo:s}}},{core:{Utils:U}}, e) {const classInfo={meta:{className:"widgets.brXtended.TimeInput",parents:["*"],children:[],inheritance:["widgets.brXtended.TimeInput","widgets.brease.DateTimeInput","brease.core.BaseWidget"],creator:"b370351a2b3e6bff0b57fdd4792d8187",eventBindingApi:function (w) {
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
valueChanged: f => a('ValueChanged', f),
visibleChanged: f => a('VisibleChanged', f),
focus: function () { c({ origin: 'action', action: 'focus' }); },
getValue: function () { return c({ origin: 'action', action: 'getValue' }); },
setEnable: function (a1) { c(a1,{ origin: 'action', action: 'setEnable' }); w._ebFVC({enable: 'getEnable'}, false);},
setStyle: function (a1) { c(a1,{ origin: 'action', action: 'setStyle' }); w._ebFVC({style: 'getStyle'}, false);},
setValue: function (a1) { c(a1,{ origin: 'action', action: 'setValue' }); w._ebFVC({value: 'getValue'}, false);},
setVisible: function (a1) { c(a1,{ origin: 'action', action: 'setVisible' }); w._ebFVC({visible: 'getVisible'}, false);},
showTooltip: function () { c({ origin: 'action', action: 'showTooltip' }); }
};
},actions:{"Focus":{"method":"focus"},"GetValue":{"method":"getValue"},"setAdditionalStyle":{"method":"setAdditionalStyle","parameter":{"styleName":{"name":"styleName","index":0,"type":"StyleReference"}}},"setEditable":{"method":"setEditable","parameter":{"editable":{"name":"editable","index":0,"type":"Boolean"},"metaData":{"name":"metaData","index":1,"type":"Object"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setFormat":{"method":"setFormat","parameter":{"format":{"name":"format","index":0,"type":"String"}}},"setMillisecondStep":{"method":"setMillisecondStep","parameter":{"millisecondStep":{"name":"millisecondStep","index":0,"type":"Integer"}}},"setOmitDisabledClick":{"method":"setOmitDisabledClick"},"setParentCoWiId":{"method":"setParentCoWiId","parameter":{"value":{"name":"value","index":0,"type":"String"}}},"setParentEnableState":{"method":"setParentEnableState"},"setParentVisibleState":{"method":"setParentVisibleState"},"setPickerPosition":{"method":"setPickerPosition","parameter":{"pickerPosition":{"name":"pickerPosition","index":0,"type":"brease.enum.Position"}}},"setShowMilliseconds":{"method":"setShowMilliseconds","parameter":{"showMilliseconds":{"name":"showMilliseconds","index":0,"type":"Boolean"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"setSubmitOnChange":{"method":"setSubmitOnChange","parameter":{"submitOnChange":{"name":"submitOnChange","index":0,"type":"Boolean"}}},"setTabIndex":{"method":"setTabIndex","parameter":{"value":{"name":"value","index":0,"type":"Number"}}},"SetValue":{"method":"setValue","parameter":{"value":{"name":"value","index":0,"type":"Time"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"ShowTooltip":{"method":"showTooltip"}},properties:{}}};if(s.classExtension) {classInfo.classExtension = s.classExtension;}if(e) {classInfo.classExtension = e;}return classInfo;});
