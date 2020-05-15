<template>
	<view class="upload">
		<view class="classify_view">
			<view class="classify_view_text>">分类</view>
			<view>{{currentTime}}</view>
			<block v-for="(item,index) in classified" :key="index">
				<view>
					<text class="classify_view_box" @click="setCurrentButton(index,item.category)" :class="{classify_view_box_active:index==currentButtonIndex}">
						{{item.category}}
					</text>
				</view>
			</block>
		</view>
		<view class="post_title">
			<input type="text" placeholder="给分享文章取个标题吧" class="post_title_text" v-model="titledata" />
		</view>
		<view class="post_article">
			<textarea type="text" placeholder="给分享文章取个标题吧" class="post_article_text" v-model="tipsdata" maxlength="2000" />
			</view>
		<!--upload image-->
		<view class="upload_image_whole_box">
			<view class="upload_sign">
				<image src="../../../static/tab/topimg.png" mode="widthFix" @click="uploadImage()"></image>
			</view>
			<!--九宫格-->
			<view class="upload_images_box">
				<block v-for="(item,index) in uploadimages" :key="index">
					<view class="upload_image_box">
						<image :src="item" class="upload_image" mode="aspectFill " @click="reviewPicture(index)"></image>
						<image src="../../../static/tab/deteimg.svg" mode ="widthFix" class="deleteimage" @click="deleteimage(index)"></image>
					</view>
					
				</block>
				
				
			</view>	
		</view>
		
		<!--视频上传-->
		<view class="upload_video_whole_box">
			<view class="upload_sign">
				<image src="../../../static/tab/topvideo.png" mode="widthFix" @click="uploadVideo()"></image>
				<text v-if="uploadOversize">不可以上传超过30秒的视频</text>
			</view>
			<view class="upload_video_box" v-if="compeleteUpload">
				<video :src="videoSrc" controls objectFit="cover" ></video>
				<image class="deleteVideo" src="../../../static/tab/delvideo.png" @click ="deleteVideo()"></image>
			</view>
			
		</view>
		
		
		
		<!--发布信息button-->	
		<view class="post_Button" @click="getData(currentCategory)">
			<text>发布</text>
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<!--loginBox-->
		<loginBox ref="jump_out"></loginBox>
		<!--uploading state for user-->
		<view class="warp" v-if="uploadingState">
				<view class="warp_view_upload_state">
					<text>{{uploadingStateWord}}</text>
				</view>
		</view>
		
	</view>
</template>

<script>
	import HMmessages from "@/components/HM-messages/HM-messages.vue"//引入及时反馈组件
	import {previewPicture} from '../../../js/post_function.js'
	import loginBox from'../../../function/loginBox.vue'
	
	var timeInfo = require('../../../js/getTime.js')
	//define database
	export default{
		components: {HMmessages,loginBox},
		name:'upload',
		onLoad(){
				this.pageInit()
		},
		data(){
			return{
		
				currentButtonIndex:0,
				classified:[],
				uploadimages:[],//上传图片数组
				uploadingState:false,//上传状态框
				uploadingStateWord:"上传中",
				videoSrcShot:"",//上传视频的截图
				compeleteUpload:false,//是否上传视频加载完成
				uploadOversize:false,//判断视频是否超过30秒
				//头像，昵称，时间，openid
				avatarUrl: "",
				nickName : "",
				openid:"",
				videoSrc:"",//上传视频
				currentCategory:"",//分组
			}
		},
		created(){
			console.log("you in upload")
			const db = wx.cloud.database()
			const categroy_p = db.collection("post_category")

			categroy_p.get()
				.then((res) => {
					console.log(res.data)
					
					this.classified = res.data //you can define the name by uslef 
					this.currentCategory = res.data[0].category
				})
				.catch((err) => {
					console.log(err)
					
				})
		
				
			
		},
		methods:{
			pageInit(){
				uni.clearStorage();
			},
			//设置分类按键参数
			setCurrentButton(i,c){
			
				this.currentButtonIndex=i
				this.currentCategory = c
			},
			//上传图片
			uploadImage(){
				console.log("you are in the upload")
				wx.chooseImage({
					count:8,
					sizeType:['original','compressed'],//原件或者压缩
					sourceType:['album', 'camera'],
					success: (res)=>{
						//做一个限制性调整
						this.uploadimages.push(...res.tempFilePaths)//...能当foreach
					}
				})
				
			},
			deleteimage(i){
				this.uploadimages.splice(i,1);//splice will affect the original array but slice will not and the frist elemnt is position and second is the number of elemnt you want remove from the array
			},
			deleteVideo(){
				this.videoSrc=''
				this.videoSrcShot=''
				this.compeleteUpload=false
			},
			//预览图片
			reviewPicture(index){//长按可以做什么后期还可以加滤镜
				console.log("you are in" +index)
				previewPicture(index,this.uploadimages)
				.then((res)=>{
					console.log('预览成功')
				})
				.catch((err)=>{
					console.log(err)
				})
				
			},
			//upload video
			uploadVideo(){//上传限制30秒以后解决方式要不短视频要不超级压缩/或者延迟摄影形式（快进）
				uni.showLoading({
					title:'上传中'
				}),
				uni.chooseVideo({
					count:1,
					sourceType:['camera','album'],
					maxDuration:30,
					
				
					
				})
				.then((res)=>{
					if(res[1].duration<31){
						this.videoSrc= res[1].tempFilePath
						this.videoSrcShot=res[1].thumbTempFilePath
						console.log(res[1].duration)
						this.compeleteUpload=true
						this.uploadOversize=false
						uni.hideLoading()
					}else{
						this.uploadOversize=true
						uni.hideLoading()
					}
					
				})
				.catch((err)=>{
					console.log(err)
					uni.hideLoading()
				})
			},
				//上传所有data	
			getData(type){
				console.log(type)
				if(!this.titledata){
					this.remindNoice('需要填写标题哦')
				}else if(!this.tipsdata){
					this.remindNoice('分享自己的感受哦')
				}else if(this.uploadimages.length<1){
					this.remindNoice('至少需要分享一张照片')
				}else{
					console.log('upload')
					//判断用户是否登陆
					this.userinfo()
					
					
				}
				console.log(this.videoSrc)
				console.log(this.videoSrcShot)
				
			},
			
			remindNoice(m){
				this.HMmessages.show(m,{icon:'remind',iconColor:'#fff',background:"rgba(102,0,51,0.8)"})
			},
			
			
			//判断用户是否登陆
			userinfo(){
				//判断用户是否存在
				
				
				const db=wx.cloud.database()
				const users = db.collection('users')
				users.get()
				.then((res)=>{
					console.log(res)
					if(res.data.length==0){
						console.log("未注册")
						let message ="登陆后再操作"
						this.$nextTick(()=>{
							this.$refs.jump_out.start(message)
						})
						
						
					}else{
						this.uploadingState=true
						console.log('已注册')//得到用户资料
						let user_info = res.data[0]
						this.avatarUrl = user_info.avatarUrl
						this.nickName = user_info.nickName
						this.openid=user_info._openid
						//可以上传提交数据到数据库
						this.userdata()
					}
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			
			async userdata(){//order 1,upload the image to cloud 2 upload the video to cloud 3. when we get all the link(image,video) back than upload
				let userimage = await this.userImage()
				let uservideo = await this.userVideo()
				console.log(uservideo)
				
				await this.uploadAllData(userimage,uservideo)
				
				
			},
			userImage(){
				
				var uploadImageList=[];
				
				return new Promise((sucess,fail)=>{
					//上传成功返回的图片放到array 里面,
					this.uploadimages.forEach((img)=>{
						// random name for img
					
						let type=img.slice(img.lastIndexOf("."))
						let imageName = Date.now()+'-'+Math.floor(Math.random(0,1)*10000000000000)
						let uploadImageName = imageName+type
						console.log(uploadImageName)
						wx.cloud.uploadFile({
							cloudPath:'user_Image/'+uploadImageName,
							filePath:img
						})
						.then(res=>{
							//还需要清理缓存有可能数组上传中断但之前的数据还是已经在上面了所以需要做一个清理存储的东西，定期看下那些照片id没有被post然后删掉
							uploadImageList.push(res.fileID)
							if(uploadImageList.length==this.uploadimages.length){
								sucess(uploadImageList)
							}
							
						
						})
						.catch(err=>{
							console.log(err)
						})
					})
				})
			},
			
			
			
			//get the document type by store the let before the last "."you can check the testfile
			
			
			userVideo(){
				return new Promise((s,f)=>{
					if(this.videoSrc==""){
						console.log("用户不上传")
						s('')
					}else{
						
						let type=this.videoSrc.slice(this.videoSrc.lastIndexOf("."))
						let videoName = Date.now()+'-'+Math.floor(Math.random(0,1)*10000000000000)
						let uploadVideoName = videoName+type
						
						wx.cloud.uploadFile({
							cloudPath:'user_Video/'+uploadVideoName,
							filePath:this.videoSrc
						})
						.then(res=>{
							//还需要清理缓存有可能数组上传中断但之前的数据还是已经在上面了所以需要做一个清理存储的东西，定期看下那些照片id没有被post然后删掉
							console.log('视频上传完毕')
							s(res.fileID)
						
						})
						.catch(err=>{
							console.log(err)
						})
						
					}
					
				})
			},
			
			uploadAllData(image,video){
				let data = {
					category:this.currentCategory,
					titledata:this.titledata,
					tipsdata:this.tipsdata,
					image:image,
					videoSrc:video,
					avatarUrl:this.avatarUrl,
					nickName:this.nickName,
					openid:this.openid,
					uploadTime:timeInfo.formatTime(new Date()),
					
				}
				const db = wx.cloud.database()
				const users = db.collection("users")
				
				db.collection('post_info').add({
					data:{
						detail:data
					}
				})
				.then((res)=>{
					console.log(res)
					//notice user post success 
					this.uploadingStateWord = "上传完成跳转中"
					setTimeout(()=>{
						this.uploadingState=false
						this.uploadingStateWord = "uploading"
						uni.switchTab({
							url:'../../index/index'
						})
					},1700)
					
					
				})
				.catch((err)=>{
					console.log(err)
				})
				
				
				
			}
			
			
		}
	}
</script>

<style>
	@import url("../../../style/upload.css");
</style>
