<template>
	<view>
		<view class="warp" v-show="boxShow"> <!--login background -->
			<view class="warp_view">
				<view class="warp_text">{{message}}</view>
				<view class="warp_flex">

					<button plain="true" @click="end()">取消</button>

					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo" @getphonenumber="getPhoneNumber">登陆</button>
					
					
				</view>
			</view>
			
			 
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		
	</view>
</template>

<script>
	import {userLogin} from "../js/user.js"
	import HMmessages from "@/components/HM-messages/HM-messages.vue"//引入及时反馈组件
	import {mapState} from'vuex'
	export default{
		
		components: {HMmessages},
		
		
		name:'login',
		data(){
			return{
				boxShow:false,
				message:"",
				clicked:false,
			}
		},
		
		methods:{
			getUserInfo(info){
				if(!this.clicked){
					this.clicked=true
					console.log(info)
					let user_info = info.detail.userInfo
					userLogin(user_info)
					.then((res)=>{
						
						console.log(res)//successful login
						let loginSuccess = true
						this.$store.dispatch('set_user_login',user_info)//userinfo 必须有统一标准
						
						this.HMmessages.show("登陆成功",{icon:'success',iconColor:'#fff',background:"rgba(102,0,51,0.8)"})
						
					})
					.catch((fail)=>{
						console.log(fail)
					})
					this.end()
					this.en
					
				}
				
			},
			end(){
				
				this.boxShow=false
			},
			start(m){
				this.boxShow=true
				this.message = m
			}
		}
	}
</script>

<style>
	@import url("../style/loginBox.css");
</style>
