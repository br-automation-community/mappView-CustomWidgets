define(["brease"], function({core:{designer:{ContainerWidget:{ClassInfo:s}}}}, e) {const classInfo={meta:{className:"widgets.brXtended.GroupBox",parents:["*"],children:["*"],inheritance:["widgets.brXtended.GroupBox","brease.core.ContainerWidget","brease.core.BaseWidget"],creator:"fad7bd596824c00627d856dd67393f7c",eventBindingApi:function (w) {
function a(e, f) { w.addServerEventListener(e, f); }
function c(...args) { const [{ action: a }] = args.slice(-1); return w[a](...args); }
return {
click: f => a('Click', f),
disabledClick: f => a('DisabledClick', f),
enableChanged: f => a('EnableChanged', f),
focusIn: f => a('FocusIn', f),
focusOut: f => a('FocusOut', f),
mouseDown: f => a('MouseDown', f),
mouseUp: f => a('MouseUp', f),
onDragEnter: f => a('OnDragEnter', f),
onDragLeave: f => a('OnDragLeave', f),
onDrop: f => a('OnDrop', f),
visibleChanged: f => a('VisibleChanged', f),
focus: function () { c({ origin: 'action', action: 'focus' }); },
setEnable: function (a1) { c(a1,{ origin: 'action', action: 'setEnable' }); w._ebFVC({enable: 'getEnable'}, false);},
setStyle: function (a1) { c(a1,{ origin: 'action', action: 'setStyle' }); w._ebFVC({style: 'getStyle'}, false);},
setVisible: function (a1) { c(a1,{ origin: 'action', action: 'setVisible' }); w._ebFVC({visible: 'getVisible'}, false);},
showTooltip: function () { c({ origin: 'action', action: 'showTooltip' }); }
};
},actions:{"Focus":{"method":"focus"},"setAdditionalStyle":{"method":"setAdditionalStyle","parameter":{"styleName":{"name":"styleName","index":0,"type":"StyleReference"}}},"setAlignment":{"method":"setAlignment","parameter":{"alignment":{"name":"alignment","index":0,"type":"brease.enum.Direction"}}},"setChildPositioning":{"method":"setChildPositioning","parameter":{"childPositioning":{"name":"childPositioning","index":0,"type":"brease.enum.ChildPositioning"}}},"setEditable":{"method":"setEditable","parameter":{"editable":{"name":"editable","index":0,"type":"Boolean"},"metaData":{"name":"metaData","index":1,"type":"Object"}}},"setEllipsis":{"method":"setEllipsis","parameter":{"ellipsis":{"name":"ellipsis","index":0,"type":"Boolean"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setFloat":{"method":"setFloat","parameter":{"float":{"name":"float","index":0,"type":"brease.enum.Floating"}}},"setImage":{"method":"setImage","parameter":{"image":{"name":"image","index":0,"type":"ImagePath"}}},"setImageAlign":{"method":"setImageAlign","parameter":{"imageAlign":{"name":"imageAlign","index":0,"type":"brease.enum.ImagePosition"}}},"setMaxHeight":{"method":"setMaxHeight","parameter":{"maxHeight":{"name":"maxHeight","index":0,"type":"Integer"}}},"setOmitDisabledClick":{"method":"setOmitDisabledClick"},"setParentCoWiId":{"method":"setParentCoWiId","parameter":{"value":{"name":"value","index":0,"type":"String"}}},"setParentEnableState":{"method":"setParentEnableState"},"setParentVisibleState":{"method":"setParentVisibleState"},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"setTabIndex":{"method":"setTabIndex","parameter":{"value":{"name":"value","index":0,"type":"Number"}}},"setText":{"method":"setText","parameter":{"text":{"name":"text","index":0,"type":"String"}}},"setUseSVGStyling":{"method":"setUseSVGStyling","parameter":{"useSVGStyling":{"name":"useSVGStyling","index":0,"type":"Boolean"}}},"setVerticalAnchorTopExt":{"method":"setVerticalAnchorTopExt","parameter":{"verticalAnchorTopExt":{"name":"verticalAnchorTopExt","index":0,"type":"Boolean"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"ShowTooltip":{"method":"showTooltip"}},properties:{}}};if(s.classExtension) {classInfo.classExtension = s.classExtension;}if(e) {classInfo.classExtension = e;}return classInfo;});
