<template>
	<view class="height">
		<view class="scroll_flex" v-show="toShow" :style="{opacity:nav_opacity}">
			<detailNavigation></detailNavigation>
		</view>
		
		<detailBanner :img_list = "post_photo" :post_title="post_title" :videoSrc ="post_video"></detailBanner>
		<detailText></detailText>
		<comment></comment>
		<button @click="update()">sadasdada</button>

		

	</view>
</template>

<script>
	import detailNavigation from'./components/detailNavigation.vue'
	import detailBanner from'./components/detailBanner.vue'
	import detailText from'./components/detailText.vue'
	import comment from '../../function/comment.vue'
	
	const db = wx.cloud.database()
	
	export default{
		name :'detail',
		data(){
			return{
				toShow:false,
				nav_opacity:1,
				user_id:"",
				post_id:"",
				post_detail:"",
				post_photo:[],
				post_video:"",
				post_title:"",
				user_icon:"",
				user_nickName:"",
			}
		},
		components:{
			detailNavigation,
			detailBanner,
			detailText,
			comment,
		},
		onLoad(e){
			
			console.log(e)
			let postDetail = db.collection("post_info").where({
					_id:e.id
			})
			 postDetail.get()
				.then((res)=>{
					console.log(res)
					let p_data = res.data
					this.post_detail = p_data[0].detail
					this.post_id=p_data[0]._id
					this.user_id=p_data[0]._openid
					this.post_title = this.post_detail.tipsdata//title
					this.post_photo=this.post_detail.image
					this.post_video = this.post_detail.videoSrc
					this.user_icon = this.post_detail.avatarUrl
					this.user_nickName= this.post_detail.user_nickName
					console.log(this.post_video)
					console.log(this.post_photo[0])
				
					
				
				})
				.catch((err)=>{
					console.log(err)
				})
				
			
		},
		onPageScroll(e){
			let topDistence=e.scrollTop
			this.show_top_nav(topDistence)
		},
		methods:{
			// 监听页面滚动
			show_top_nav(e){
				console.log(e)
				console.log(46/e)
				
				if(46/e<0.2){
									
					let opacity = 1-46/e
					opacity = opacity>1 ? 1:opacity
					console.log(opacity)
					this.nav_opacity = opacity
					this.toShow = true			
									
				}else{
					this.toShow=false;
				}	
			}
			
		}
	}
</script>

<style>
	@import url("../../style/post_detail");
</style>
