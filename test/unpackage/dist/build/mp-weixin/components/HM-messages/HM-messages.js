(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/HM-messages/HM-messages"],{"301a":function(t,n,o){"use strict";o.r(n);var e=o("46f0"),i=o("c56a");for(var s in i)"default"!==s&&function(t){o.d(n,t,(function(){return i[t]}))}(s);o("95e09");var c,r=o("f0c5"),a=Object(r["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);n["default"]=a.exports},"46f0":function(t,n,o){"use strict";var e,i=function(){var t=this,n=t.$createElement;t._self._c},s=[];o.d(n,"b",(function(){return i})),o.d(n,"c",(function(){return s})),o.d(n,"a",(function(){return e}))},"95e09":function(t,n,o){"use strict";var e=o("e397"),i=o.n(e);i.a},c56a:function(t,n,o){"use strict";o.r(n);var e=o("eb35"),i=o.n(e);for(var s in e)"default"!==s&&function(t){o.d(n,t,(function(){return e[t]}))}(s);n["default"]=i.a},e397:function(t,n,o){},eb35:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"HM-messages",data:function(){return{isTransparent:!1,isTransparentH5:!1,isStatus:!1,isShow:!1,content:"",icon:"none",background:"",closeButton:!1,closeButtonColor:"",fontColor:"",iconColor:"",textAlign:"",data:null}},mounted:function(){this.$emit("complete")},methods:{clickMessage:function(){this.$emit("clickMessage",this.data)},Timer:function(){},show:function(t,n){var o=this;t&&"string"==typeof t?this.checkTitleNView((function(){o.Timer&&clearTimeout(o.Timer);var e={remind:"#5a89ff",error:"#ef6160",danger:"#ff0000",success:"#0ec469",disable:"#8c56a0",help:"#5fb5f5"},i={icon:"remind",content:t,duration:2e3,background:"rgba(238,238,238,0.8)",closeButton:!1,closeButtonColor:"#555555",iconColor:e["remind"],fontColor:"#555555",textAlign:"flex-start",data:null};n&&!n.hasOwnProperty("iconColor")&&n.hasOwnProperty("icon")&&(n.iconColor=e[n.icon]),n=n?o.extend(i,n):i,o.isShow?(o.close(),setTimeout((function(){o.setSetting(n)}),150)):o.setSetting(n)})):console.log("HM-messages: 组件方法调用错误,请检查方法参数")},checkTitleNView:function(t){t()},setSetting:function(t){var n=this;this.content=t.content,this.icon=t.icon,this.background=t.background,this.closeButton=t.closeButton,this.closeButtonColor=t.closeButtonColor,this.fontColor=t.fontColor,this.iconColor=t.iconColor,this.textAlign=t.textAlign,this.data=t.data,this.isShow=!0,t.duration>0&&(this.Timer=setTimeout((function(){n.close()}),t.duration))},close:function(){this.isShow=!1,this.Timer&&clearTimeout(this.Timer)},extend:function(t,n){for(var o in n)t[o]=n[o];return t}}};n.default=e}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/HM-messages/HM-messages-create-component',
    {
        'components/HM-messages/HM-messages-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("301a"))
        })
    },
    [['components/HM-messages/HM-messages-create-component']]
]);