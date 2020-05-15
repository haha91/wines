<template>
	<view>
		<view class="post_comment_box">
			
			<textarea :cursor-spacing="40" :show-confirm-bar="false" :fixed="true" type="text" placeholder="给分享文章取个标题吧" class="comment_detail" v-model="tipsdata" maxlength="2000" />
			
			<button class="submit_comment_button" @click="upload_comment(wine_id)">评论</button>
		</view>
		<loginBox ref="jump_out"></loginBox>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import loginBox from'./loginBox.vue'
	var timeInfo = require('../js/getTime.js')
	const db = wx.cloud.database()
	
	export default{
		components:{loginBox},
		name:'upgreat_comment',
		props:{
			wine_id:String,
		},
		data(){
			return{
				userId:"",
				userIcon:"",
				userNickName:"",
				temp_data:[],
				loginState:false
			}
		},
		methods:{
			upload_comment(id){//上传前检查(id问题还没有解决)
				console.log(this.loginState)
				if(this.loginState){
					
					this.uploading()
				}else{
						let user = db.collection('users');
						user.get()
						.then((res)=>{
							if(res.data[0]){
								console.log(res)
								this.userIcon=res.data[0].avatarUrl
								this.userNickName = res.data[0].nickName
								this.$store.dispatch('set_user_login',res.data[0])//userinfo 必须有统一标准
								this.uploading()
							}else{
								console.log("无注册")
								let message = "登陆后再操作"
								this.$nextTick(()=>{
									this.$refs.jump_out.start(message)
								})
							}
							
						})
						.catch((err)=>{
							console.log(err)
						})
					}
					console.log(id)
					console.log(this.loginState)
				},
				
			uploading(){
					let data ={
						comment_detail:this.tipsdata,
						userIcon:this.userIcon,
						userNickName:this.userNickName,
						wine_id:this.wine_id,
						count_bad:0,
						count_good:0,
						uploadTime:timeInfo.formatTime(new Date()),
					}
					
					db.collection('user_comment').add({
						data:data
					})
					.then((res)=>{
						this.temp_data.push(data)
						//wx.setStorage({
							//key:'tempCommit',
							//data:this.temp_data,
						//})
						this.$emit("passData",data)
						this.$store.dispatch('create_temp_data',this.temp_data)//create temperate data
						console.log('upload')
					})
					.catch((err)=>{
						console.log(err)
					})
				}
			
			
			},
			
		
		computed:{
			//get the data from dataStore(the vuex datastorage)
			...mapState(['user_info','login_state']),
			count(){
				this.loginState=this.login_state
				if(this.login_state){
					
					let user_details=this.user_info.user
					this.userId = user_details._openid
					this.userIcon = user_details.avatarUrl
					this.userNickName = user_details.nickName
					
					console.log(user_details)
		
		
				}else{
					
					console.log(this.login)
				}
			}
		}
	}
</script>

<style>
	@import url("../style/user_post_comment_style.css");
</style>
