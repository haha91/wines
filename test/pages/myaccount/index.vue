<template>
	
	<view>我的账户
	
		<view class="userInfo">
			<view class="userIcon">
				<image  :src="avatarUrl"></image>
			</view>
			<view class="loginButton" v-if="not_login">
					<button class="login" open-type="getUserInfo" @getuserinfo="getUserInfo">登陆</button>
			</view>
			<view v-if="!not_login" class="user_nickName">{{nickName}}</view>
			 
		</view>
	
		<navigator v-if="!autorization_level" url="../shop/index" hover-class="navigator-hover">
			<button>shop</button>
		</navigator>

		<navigator v-if="!autorization_level" url="components/myPost" hover-class="navigator-hover">
			<button>我的分享</button>
		</navigator>

		<navigator v-if="!autorization_level" url="../post/components/upload" hover-class="navigator-hover">
			<button>发布分享</button>
		</navigator>
		
		<navigator v-if="autorization_level=='administrator'||autorization_level=='stuff'">
			<button>管理分享</button>
		</navigator>
		
		<navigator url="../back_manage_system/upload_wines" hover-class="navigator-hover" v-if="autorization_level=='administrator'||autorization_level=='stuff'">
			<button >上传酒款</button>
		</navigator>
		
		<navigator v-if="autorization_level=='administrator'||autorization_level=='stuff'">
			<button>上传酒庄</button>
		</navigator>
		
		<navigator v-if="autorization_level=='administrator'">
			<button>管理人员</button>
		</navigator>
		<!--loginBox-->
		<loginBox ref="jump_out"></loginBox>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		
	</view>


</template>

<script>
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	import loginBox from '../../function/loginBox.vue'
	import {userLogin} from '../../js/user.js'
	import {mapState} from'vuex'
	const db = wx.cloud.database()
	export default {
		data() {
			return {
				not_login:false,
				loginState: false,
				avatarUrl: "",
				nickName: "",
				openid: "",
				clicked:false,
				autorization_level:"",
			}
		},
		components: {
			HMmessages,
			loginBox
		},

		methods: {
			test(a){
				console.log(a)
			},
			getUserInfo(info){
				if(!this.clicked){
					this.clicked=true
					console.log(info)
					let user_info = info.detail.userInfo
					userLogin(user_info) 
					.then((res)=>{
						console.log(res)//successful login
						
						this.not_login=false
						let userInfo_temp=info.detail.userInfo
						this.nickName = userInfo_temp.nickName
						this.avatarUrl = userInfo_temp.avatarUrl
						this.$store.dispatch('set_user_login',user_info)//userinfo 必须有统一标准
						
						
					})
					.catch((fail)=>{
						console.log(fail)
					})
					
				}
			},
			userInfo() {
				const users = db.collection('users')
				users.get()
					.then((res) => {
						console.log(res)
						if (res.data.length == 0) {
							console.log("未登陆")
							this.not_login=true


						} else {

							console.log('已登陆') //得到用户资料
							let user_info = res.data[0]
							this.avatarUrl = user_info.avatarUrl
							this.nickName = user_info.nickName
							this.openid = user_info._openid
							this.autorization_level = user_info.autorization_level
						
							//可以上传提交数据到数据库
							this.$store.dispatch('set_user_login',user_info)//userinfo 必须有统一标准
							//传入到暂时性本地数据库

						}
					})
					.catch((err) => {
						console.log(err)
					})

			}

		},
		



		created() {
			if(!this.loginState){
				this.userInfo()
			}
			
		},
		
		computed:{
			...mapState(['user_info','login_state']),
			count(){
				this.not_login=false
				this.loginState=this.login_state
				if(this.login_state){
					
					let user_details=this.user_info.user
					this.openid = user_details._openid
					this.avatarUrl = user_details.avatarUrl
					this.nickName = user_details.nickName
					
					console.log(user_details)
						
						
				}else{
					
					console.log(this.login)
				}
			}
		}
	}
</script>

<style>
	@import url("../../style/myaccount_style.css");
</style>
