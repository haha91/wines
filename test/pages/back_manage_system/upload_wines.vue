<template>
	<view v-if="authorize_level=='administrator'||authorize_level=='stuff'">
		<view class="upload_info_box">
			<view class="upload_image_whole_box">
				<view class="upload_image_sign">
					<image src="../../static/tab/topimg.png" mode="widthFix" @click ="uploadImage()" ></image>
				</view>
				
				<review-box :images="images" @childData="deleteUploadImage"></review-box>
				
			</view>
			
		</view>
	
	//编写一个标签插件输入标题，所需标签，返回现在所选的标签
	//之后设置defalutvalue必须更具内容确定位置
	<view>
		<tag_box v-if="grapeTypes" :datas="grapeTypes" @childData="getCurrentGrapes" current_title="葡萄品种"></tag_box>
	</view>
	<view>
		<tag_box v-if="wine_levels" :datas="wine_levels" @childData="getCurrentWineLevel" current_title="酒等级"></tag_box>
	</view>
	<view>
		<tag_box  :datas="levels" @childData="getAcidity" current_title="酸度"></tag_box>
	</view>
	<view>
		<tag_box  :datas="levels" @childData="getSweetness" current_title="甜度"></tag_box>
	</view>
	<view>
		<tag_box  :datas="levels" @childData="getTannin" current_title="丹宁"></tag_box>
	</view>
	//需要写一个编辑数字框
		<input_box title="酸度" default_value=" " @childData="input_test"></input_box>
		
	</view> 
</template>

<script>
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	import tag_box from "../../function/tag_box.vue"
	import reviewBox from"../../function/review_photo.vue"
	import {previewPicture} from '../../js/post_function.js'
	import input_box from '../../function/input_box.vue'
	let db = wx.cloud.database()
	export default{
		
		components:{HMmessages,tag_box,reviewBox,input_box},
		data(){
			return{
				
				
				authorized:false,
				authorize_level:"",
				grapeTypes:[],
				wine_levels:[],
				acidity:Number,
				sweetness:Number,
				tannin:Number,
				net_vel:["350ML","750ML","1500ML"],
				region:"",
				country:["Chile","France"],
				imageOfWines:[],
				brand:["ampans","Beuno"],
				CurrentGrapes:String,
				currentWineLevel:String,
				images:[],
				levels:[0,1,2,3,4,5],
			}
		},
		onLoad(){
			console.log(this.checkAuthoriz())
			if(this.checkAuthoriz()){
				console.log(this.authorize_level)
			}	
			this.getGrapeType()
			this.getWineLevel()
			
		},
		methods:{
			checkAuthoriz(){
				return new Promise((sucess,fail)=>{
					let user = db.collection("users")
					user.get()
						.then((res)=>{
							let user_info = res.data[0]
							if(user_info.autorization_level=="administrator"){
								this.authorize_level=user_info.autorization_level
								console.log(user_info)
								sucess(true)
							}else if(user_info.autorization_level=="stuff"){
								this.authorize_level=user_info.autorization_level
								sucess(true)
							}
							
						})
					
				})
			
			},
			//set grape type
			getGrapeType(){
				let grapeT = db.collection("grape_category").field({
					grape:true,
				})
				grapeT.get()
				.then((res)=>{
					res.data.forEach(item=>{
						this.grapeTypes.push(item.grape)
					})
				
				})
				.catch((err)=>{
					console.log(err)
				})
				
			},
			getCurrentGrapes: function(data){
				 this.CurrentGrapes = data
				 
			},
			getWineLevel(){
				let wine_level = db.collection("wine_level").field({
					level:true,
				})
				wine_level.get()
				.then((res)=>{
			
					res.data.forEach(item=>{
						this.wine_levels.push(item.level)
					})
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			getCurrentWineLevel: function(data){
				
				this.currentWineLevel = data
				console.log(this.currentWineLevel)
			},
			uploadImage(){
				wx.chooseImage({
					count:3,
					sizeType:['original'],
					sourceType:['album'],
					success:(res)=>{
						console.log(res)
						res.tempFilePaths.forEach(item=>{
							this.images.push(item)
						})
						console.log(this.images)
						
					}
				})
			},
			deleteUploadImage: function(i){
				console.log(i)
				this.images.splice(i,1)
			},
			getAcidity:function(i){
				this.acidity=i
			},
			getSweetness:function(i){
				this.sweetness=i
			},
			getTannin:function(i){
				this.tannin=i
			},
			input_test:function(i){
				console.log(i)
			}
			
			 	
		}
	}
</script>

	
<style>
	@import url("../../style/back-managerment-style/upload_wines_style.css")
</style>
