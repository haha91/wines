<template>
	<view>
		<view class="post">
			<shareBox :clientPostData="clientPostData" :urlLocation = "urlLocation" ></shareBox>
		</view>
		<loginBox ref="jump_out"></loginBox>
	</view>
</template>

<script>
		var db = wx.cloud.database()
		
		var users = db.collection("users");
		import HMmessages from "@/components/HM-messages/HM-messages.vue"//引入及时反馈组件
		import loginBox from'../../../function/loginBox.vue'
		import shareBox from'../../../function/shareBox.vue'
	
		export default {
		components: {HMmessages,loginBox,shareBox},
			data() {
				
				return {
					avatarUrl:"",
					nickName:"",
					openid:"",
					clientPostData:[],//列表数据
					urlLocation:"../../post_detail/detail?id="
				}	
			},
			async created() {
				 var a = await this.getUserInfo()
				 if(a=="已登陆"){
					 console.log(a)
						this.getPostInfo()
				 }else{
					 console.log(a)
					 let message ="登陆后再操作"
					 this.$nextTick(()=>{
					 	this.$refs.jump_out.start(message)
					 
					 })
					
				 }
				
				
			},
			methods:{
				//get user information
				getUserInfo(){
				
				return new Promise((s,f)=>{
					users.get()
					.then((res)=>{
						console.log(res.data.length)
						if(res.data.length==0){
							
							
							s("未登陆")
							
						}else{
							this.loginState=true
							let user_info = res.data[0]
							this.avatarUrl = user_info.avatarUrl
							this.nickName = user_info.nickName
							this.openid=user_info._openid
							//可以上传提交数据到数据库
							this.$store.dispatch('set_user_login',user_info)
							s('已登陆')
						
						
						}
					})
					.catch((err)=>{
						console.log(err)
					})
					
				})
					
					
				},
				
				getPostInfo(){
					const postList = db.collection("post_info").where({
						_openid:this.openid
					})
					postList.get()
						.then((res)=>{
							
							this.setPostInfoMap(res.data)
							
							
						})
						.catch((err)=>{
							console.log(err)
						})
				},
				setPostInfoMap(info){
				
					var clientPostList=info.map((item)=>{
						
						let id = item._id
						let detail = item.detail
						return{
							id,
							detail
						}
					})
					this.clientPostData = clientPostList
				}
			}
			
		}
	</script>
</script>

<style>
</style>
