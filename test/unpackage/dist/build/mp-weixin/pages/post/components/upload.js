(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/post/components/upload"],{"0729":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(o("4795")),a=o("fcfa");function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t,o,n,a,i,r){try{var c=e[i](r),u=c.value}catch(l){return void o(l)}c.done?t(u):Promise.resolve(u).then(n,a)}function c(e){return function(){var t=this,o=arguments;return new Promise((function(n,a){var i=e.apply(t,o);function c(e){r(i,n,a,c,u,"next",e)}function u(e){r(i,n,a,c,u,"throw",e)}c(void 0)}))}}function u(e){return f(e)||d(e)||s(e)||l()}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(e,t){if(e){if("string"===typeof e)return h(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(o):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?h(e,t):void 0}}function d(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function f(e){if(Array.isArray(e))return h(e)}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var g=function(){o.e("components/HM-messages/HM-messages").then(function(){return resolve(o("301a"))}.bind(null,o)).catch(o.oe)},p=function(){Promise.all([o.e("common/vendor"),o.e("function/loginBox")]).then(function(){return resolve(o("0b2f"))}.bind(null,o)).catch(o.oe)},m=o("9a71"),v={components:{HMmessages:g,loginBox:p},name:"upload",onLoad:function(){this.pageInit()},data:function(){return{currentButtonIndex:0,classified:[],uploadimages:[],uploadingState:!1,uploadingStateWord:"上传中",videoSrcShot:"",compeleteUpload:!1,uploadOversize:!1,avatarUrl:"",nickName:"",openid:"",videoSrc:"",currentCategory:""}},created:function(){var e=this;console.log("you in upload");var t=wx.cloud.database(),o=t.collection("post_category");o.get().then((function(t){console.log(t.data),e.classified=t.data,e.currentCategory=t.data[0].category})).catch((function(e){console.log(e)}))},methods:{pageInit:function(){e.clearStorage()},setCurrentButton:function(e,t){this.currentButtonIndex=e,this.currentCategory=t},uploadImage:function(){var e=this;console.log("you are in the upload"),wx.chooseImage({count:8,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(t){var o;(o=e.uploadimages).push.apply(o,u(t.tempFilePaths))}})},deleteimage:function(e){this.uploadimages.splice(e,1)},deleteVideo:function(){this.videoSrc="",this.videoSrcShot="",this.compeleteUpload=!1},reviewPicture:function(e){console.log("you are in"+e),(0,a.previewPicture)(e,this.uploadimages).then((function(e){console.log("预览成功")})).catch((function(e){console.log(e)}))},uploadVideo:function(){var t=this;e.showLoading({title:"上传中"}),e.chooseVideo({count:1,sourceType:["camera","album"],maxDuration:30}).then((function(o){o[1].duration<31?(t.videoSrc=o[1].tempFilePath,t.videoSrcShot=o[1].thumbTempFilePath,console.log(o[1].duration),t.compeleteUpload=!0,t.uploadOversize=!1,e.hideLoading()):(t.uploadOversize=!0,e.hideLoading())})).catch((function(t){console.log(t),e.hideLoading()}))},getData:function(e){console.log(e),this.titledata?this.tipsdata?this.uploadimages.length<1?this.remindNoice("至少需要分享一张照片"):(console.log("upload"),this.userinfo()):this.remindNoice("分享自己的感受哦"):this.remindNoice("需要填写标题哦"),console.log(this.videoSrc),console.log(this.videoSrcShot)},remindNoice:function(e){this.HMmessages.show(e,{icon:"remind",iconColor:"#fff",background:"rgba(102,0,51,0.8)"})},userinfo:function(){var e=this,t=wx.cloud.database(),o=t.collection("users");o.get().then((function(t){if(console.log(t),0==t.data.length){console.log("未注册");var o="登陆后再操作";e.$nextTick((function(){e.$refs.jump_out.start(o)}))}else{e.uploadingState=!0,console.log("已注册");var n=t.data[0];e.avatarUrl=n.avatarUrl,e.nickName=n.nickName,e.openid=n._openid,e.userdata()}})).catch((function(e){console.log(e)}))},userdata:function(){var e=this;return c(n.default.mark((function t(){var o,a;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.userImage();case 2:return o=t.sent,t.next=5,e.userVideo();case 5:return a=t.sent,console.log(a),t.next=9,e.uploadAllData(o,a);case 9:case"end":return t.stop()}}),t)})))()},userImage:function(){var e=this,t=[];return new Promise((function(o,n){e.uploadimages.forEach((function(n){var a=n.slice(n.lastIndexOf(".")),i=Date.now()+"-"+Math.floor(1e13*Math.random(0,1)),r=i+a;console.log(r),wx.cloud.uploadFile({cloudPath:"user_Image/"+r,filePath:n}).then((function(n){t.push(n.fileID),t.length==e.uploadimages.length&&o(t)})).catch((function(e){console.log(e)}))}))}))},userVideo:function(){var e=this;return new Promise((function(t,o){if(""==e.videoSrc)console.log("用户不上传"),t("");else{var n=e.videoSrc.slice(e.videoSrc.lastIndexOf(".")),a=Date.now()+"-"+Math.floor(1e13*Math.random(0,1)),i=a+n;wx.cloud.uploadFile({cloudPath:"user_Video/"+i,filePath:e.videoSrc}).then((function(e){console.log("视频上传完毕"),t(e.fileID)})).catch((function(e){console.log(e)}))}}))},uploadAllData:function(t,o){var n=this,a={category:this.currentCategory,titledata:this.titledata,tipsdata:this.tipsdata,image:t,videoSrc:o,avatarUrl:this.avatarUrl,nickName:this.nickName,openid:this.openid,uploadTime:m.formatTime(new Date)},i=wx.cloud.database();i.collection("users");i.collection("post_info").add({data:{detail:a}}).then((function(t){console.log(t),n.uploadingStateWord="上传完成跳转中",setTimeout((function(){n.uploadingState=!1,n.uploadingStateWord="uploading",e.switchTab({url:"../../index/index"})}),1700)})).catch((function(e){console.log(e)}))}}};t.default=v}).call(this,o("543d")["default"])},"319e":function(e,t,o){},"3c90":function(e,t,o){"use strict";var n=o("319e"),a=o.n(n);a.a},"564c":function(e,t,o){"use strict";o.r(t);var n=o("0729"),a=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},cb58:function(e,t,o){"use strict";(function(e){o("3f76"),o("921b");n(o("66fd"));var t=n(o("df85"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])},df85:function(e,t,o){"use strict";o.r(t);var n=o("e497"),a=o("564c");for(var i in a)"default"!==i&&function(e){o.d(t,e,(function(){return a[e]}))}(i);o("3c90");var r,c=o("f0c5"),u=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=u.exports},e497:function(e,t,o){"use strict";var n,a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.HMmessages=e.$refs.HMmessages})},i=[];o.d(t,"b",(function(){return a})),o.d(t,"c",(function(){return i})),o.d(t,"a",(function(){return n}))}},[["cb58","common/runtime","common/vendor"]]]);