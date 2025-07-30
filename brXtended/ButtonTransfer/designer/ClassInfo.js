define(["widgets","brease"], function({brease:{Button:{ClassInfo:s}}},{core:{Utils:U}}, e) {const classInfo={meta:{className:"widgets.brXtended.ButtonTransfer",parents:["*"],children:[],inheritance:["widgets.brXtended.ButtonTransfer","widgets.brease.Button","brease.core.BaseWidget"],creator:"90b07d68c1e0578f013a455ddb20b52c",eventBindingApi:function (w) {
function a(e, f) { w.addServerEventListener(e, f); }
function c(...args) { const [{ action: a }] = args.slice(-1); return w[a](...args); }
return {
click: f => a('Click', f),
disabledClick: f => a('DisabledClick', f),
doubleClick: f => a('DoubleClick', f),
enableChanged: f => a('EnableChanged', f),
fileDownloaded: f => a('FileDownloaded', f),
fileSaved: f => a('FileSaved', f),
focusIn: f => a('FocusIn', f),
focusOut: f => a('FocusOut', f),
mouseDown: f => a('MouseDown', f),
mouseUp: f => a('MouseUp', f),
onDragEnd: f => a('OnDragEnd', f),
onDragEnter: f => a('OnDragEnter', f),
onDragLeave: f => a('OnDragLeave', f),
onDragStart: f => a('OnDragStart', f),
onDrop: f => a('OnDrop', f),
onError: f => a('OnError', f),
visibleChanged: f => a('VisibleChanged', f),
download: function (a1) { c(a1,{ origin: 'action', action: 'Download' }); },
upload: function (a1) { c(a1,{ origin: 'action', action: 'Upload' }); },
focus: function () { c({ origin: 'action', action: 'focus' }); },
getMaxFileSize: function () { return c({ origin: 'action', action: 'getMaxFileSize' }); },
removeImage: function () { c({ origin: 'action', action: 'removeImage' }); },
removeMouseDownText: function () { c({ origin: 'action', action: 'removeMouseDownText' }); },
removeText: function () { c({ origin: 'action', action: 'removeText' }); },
setEnable: function (a1) { c(a1,{ origin: 'action', action: 'setEnable' }); w._ebFVC({enable: 'getEnable'}, false);},
setImage: function (a1) { c(a1,{ origin: 'action', action: 'setImage' }); w._ebFVC({image: 'getImage'}, false);},
setMaxFileSize: function (a1) { c(a1,{ origin: 'action', action: 'setMaxFileSize' }); w._ebFVC({maxFileSize: 'getMaxFileSize'}, false);},
setMouseDownImage: function (a1) { c(a1,{ origin: 'action', action: 'setMouseDownImage' }); w._ebFVC({mouseDownImage: 'getMouseDownImage'}, false);},
setMouseDownText: function (a1,a2) { c(a1,a2,{ origin: 'action', action: 'setMouseDownText' }); w._ebFVC({mouseDownText: 'getMouseDownText'}, false);},
setStyle: function (a1) { c(a1,{ origin: 'action', action: 'setStyle' }); w._ebFVC({style: 'getStyle'}, false);},
setText: function (a1,a2) { c(a1,a2,{ origin: 'action', action: 'setText' }); w._ebFVC({text: 'getText'}, false);},
setVisible: function (a1) { c(a1,{ origin: 'action', action: 'setVisible' }); w._ebFVC({visible: 'getVisible'}, false);},
showTooltip: function () { c({ origin: 'action', action: 'showTooltip' }); }
};
},actions:{"Download":{"method":"Download","parameter":{"filePath":{"name":"filePath","index":0,"type":"FilePath"}}},"Upload":{"method":"Upload","parameter":{"filePath":{"name":"filePath","index":0,"type":"FilePath"}}},"Focus":{"method":"focus"},"GetMaxFileSize":{"method":"getMaxFileSize"},"RemoveImage":{"method":"removeImage"},"RemoveMouseDownText":{"method":"removeMouseDownText"},"RemoveText":{"method":"removeText"},"setAdditionalStyle":{"method":"setAdditionalStyle","parameter":{"styleName":{"name":"styleName","index":0,"type":"StyleReference"}}},"setBreakWord":{"method":"setBreakWord","parameter":{"breakWord":{"name":"breakWord","index":0,"type":"Boolean"}}},"setEditable":{"method":"setEditable","parameter":{"editable":{"name":"editable","index":0,"type":"Boolean"},"metaData":{"name":"metaData","index":1,"type":"Object"}}},"setEllipsis":{"method":"setEllipsis","parameter":{"ellipsis":{"name":"ellipsis","index":0,"type":"Boolean"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"SetImage":{"method":"setImage","parameter":{"image":{"name":"image","index":0,"type":"ImagePath"}}},"setImageAlign":{"method":"setImageAlign","parameter":{"imageAlign":{"name":"imageAlign","index":0,"type":"brease.enum.ImageAlign"}}},"SetMaxFileSize":{"method":"setMaxFileSize","parameter":{"maxFileSize":{"name":"maxFileSize","index":0,"type":"Integer"}}},"SetMouseDownImage":{"method":"setMouseDownImage","parameter":{"mouseDownImage":{"name":"mouseDownImage","index":0,"type":"ImagePath"}}},"SetMouseDownText":{"method":"setMouseDownText","parameter":{"text":{"name":"text","index":0,"type":"String"},"keepKey":{"name":"keepKey","index":1,"type":"Boolean"}}},"setMouseDownTextKey":{"method":"setMouseDownTextKey","parameter":{"key":{"name":"key","index":0,"type":"String"}}},"setMultiLine":{"method":"setMultiLine","parameter":{"multiLine":{"name":"multiLine","index":0,"type":"Boolean"}}},"setOmitDisabledClick":{"method":"setOmitDisabledClick"},"setParentCoWiId":{"method":"setParentCoWiId","parameter":{"value":{"name":"value","index":0,"type":"String"}}},"setParentEnableState":{"method":"setParentEnableState"},"setParentVisibleState":{"method":"setParentVisibleState"},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"setTabIndex":{"method":"setTabIndex","parameter":{"value":{"name":"value","index":0,"type":"Number"}}},"SetText":{"method":"setText","parameter":{"text":{"name":"text","index":0,"type":"String"},"keepKey":{"name":"keepKey","index":1,"type":"Boolean"}}},"setTextKey":{"method":"setTextKey","parameter":{"key":{"name":"key","index":0,"type":"String"}}},"setUseSVGStyling":{"method":"setUseSVGStyling","parameter":{"useSVGStyling":{"name":"useSVGStyling","index":0,"type":"Boolean"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setWordWrap":{"method":"setWordWrap","parameter":{"wordWrap":{"name":"wordWrap","index":0,"type":"Boolean"}}},"ShowTooltip":{"method":"showTooltip"}},properties:{}}};if(s.classExtension) {classInfo.classExtension = s.classExtension;}if(e) {classInfo.classExtension = e;}return classInfo;});
