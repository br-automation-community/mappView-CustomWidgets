define(["widgets","brease"], function({brease:{DropDownBox:{ClassInfo:s}}},{core:{Utils:U}}, e) {const classInfo={meta:{className:"widgets.brXtended.DropDownBox",parents:["*"],children:[],inheritance:["widgets.brXtended.DropDownBox","widgets.brease.DropDownBox","brease.core.BaseWidget"],creator:"ee57e95da168e7ae58ed51117fb4ea77",eventBindingApi:function (w) {
function a(e, f) { w.addServerEventListener(e, f); }
function c(...args) { const [{ action: a }] = args.slice(-1); return w[a](...args); }
return {
click: f => a('Click', f),
disabledClick: f => a('DisabledClick', f),
enableChanged: f => a('EnableChanged', f),
focusIn: f => a('FocusIn', f),
focusOut: f => a('FocusOut', f),
onDragEnter: f => a('OnDragEnter', f),
onDragLeave: f => a('OnDragLeave', f),
onDrop: f => a('OnDrop', f),
selectedIndexChanged: f => a('SelectedIndexChanged', f),
toggleStateChanged: f => a('ToggleStateChanged', f),
visibleChanged: f => a('VisibleChanged', f),
close: function () { c({ origin: 'action', action: 'close' }); },
focus: function () { c({ origin: 'action', action: 'focus' }); },
getSelectedIndex: function () { return c({ origin: 'action', action: 'getSelectedIndex' }); },
getSelectedValue: function () { return c({ origin: 'action', action: 'getSelectedValue' }); },
open: function () { c({ origin: 'action', action: 'open' }); },
setDataProvider: function (a1) { c(U.toJs(a1),{ origin: 'action', action: 'setDataProvider' }); w._ebFVC({dataProvider: 'getDataProvider'}, false);},
setEnable: function (a1) { c(a1,{ origin: 'action', action: 'setEnable' }); w._ebFVC({enable: 'getEnable'}, false);},
setSelectedIndex: function (a1) { c(a1,{ origin: 'action', action: 'setSelectedIndex' }); w._ebFVC({selectedIndex: 'getSelectedIndex'}, false);},
setSelectedValue: function (a1) { c(a1,{ origin: 'action', action: 'setSelectedValue' }); w._ebFVC({selectedValue: 'getSelectedValue'}, false);},
setStyle: function (a1) { c(a1,{ origin: 'action', action: 'setStyle' }); w._ebFVC({style: 'getStyle'}, false);},
setVisible: function (a1) { c(a1,{ origin: 'action', action: 'setVisible' }); w._ebFVC({visible: 'getVisible'}, false);},
showTooltip: function () { c({ origin: 'action', action: 'showTooltip' }); },
toggle: function () { c({ origin: 'action', action: 'toggle' }); }
};
},actions:{"Close":{"method":"close"},"Focus":{"method":"focus"},"GetSelectedIndex":{"method":"getSelectedIndex"},"GetSelectedValue":{"method":"getSelectedValue"},"Open":{"method":"open"},"setAdditionalStyle":{"method":"setAdditionalStyle","parameter":{"styleName":{"name":"styleName","index":0,"type":"StyleReference"}}},"setCropToParent":{"method":"setCropToParent","parameter":{"cropToParent":{"name":"cropToParent","index":0,"type":"brease.enum.CropToParent"}}},"SetDataProvider":{"method":"setDataProvider","parameter":{"value":{"name":"value","index":0,"type":"ItemCollection"}}},"setDisplaySettings":{"method":"setDisplaySettings","parameter":{"displaySettings":{"name":"displaySettings","index":0,"type":"brease.enum.DropDownDisplaySettings"}}},"setEditable":{"method":"setEditable","parameter":{"editable":{"name":"editable","index":0,"type":"Boolean"},"metaData":{"name":"metaData","index":1,"type":"Object"}}},"setEllipsis":{"method":"setEllipsis","parameter":{"ellipsis":{"name":"ellipsis","index":0,"type":"Boolean"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setFitHeight2Items":{"method":"setFitHeight2Items","parameter":{"fitHeight2Items":{"name":"fitHeight2Items","index":0,"type":"Boolean"}}},"setImageAlign":{"method":"setImageAlign","parameter":{"imageAlign":{"name":"imageAlign","index":0,"type":"brease.enum.ImageAlign"}}},"setImagePath":{"method":"setImagePath","parameter":{"imagePath":{"name":"imagePath","index":0,"type":"DirectoryPath"}}},"setItemHeight":{"method":"setItemHeight","parameter":{"itemHeight":{"name":"itemHeight","index":0,"type":"Integer"}}},"setListPosition":{"method":"setListPosition","parameter":{"listPosition":{"name":"listPosition","index":0,"type":"brease.enum.Position"}}},"setListWidth":{"method":"setListWidth","parameter":{"listWidth":{"name":"listWidth","index":0,"type":"Integer"}}},"setMaxVisibleEntries":{"method":"setMaxVisibleEntries","parameter":{"maxVisibleEntries":{"name":"maxVisibleEntries","index":0,"type":"Integer"}}},"setMultiLine":{"method":"setMultiLine","parameter":{"multiLine":{"name":"multiLine","index":0,"type":"Boolean"}}},"setOmitDisabledClick":{"method":"setOmitDisabledClick"},"setParentCoWiId":{"method":"setParentCoWiId","parameter":{"value":{"name":"value","index":0,"type":"String"}}},"setParentEnableState":{"method":"setParentEnableState"},"setParentVisibleState":{"method":"setParentVisibleState"},"SetSelectedIndex":{"method":"setSelectedIndex","parameter":{"index":{"name":"index","index":0,"type":"Integer"}}},"SetSelectedValue":{"method":"setSelectedValue","parameter":{"value":{"name":"value","index":0,"type":"String"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"setTabIndex":{"method":"setTabIndex","parameter":{"value":{"name":"value","index":0,"type":"Number"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setWordWrap":{"method":"setWordWrap","parameter":{"wordWrap":{"name":"wordWrap","index":0,"type":"Boolean"}}},"ShowTooltip":{"method":"showTooltip"},"Toggle":{"method":"toggle"}},properties:{}}};if(s.classExtension) {classInfo.classExtension = s.classExtension;}if(e) {classInfo.classExtension = e;}return classInfo;});
