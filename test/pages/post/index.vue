<template>
	<view>
		<view class="search_box">
			<text>jiu</text>
			<input type="text" class="searching" />
		</view>
		<view class="post">
			<shareBox :clientPostData="post_info_data" :urlLocation = "urlLocation" >asda</shareBox>
		</view>
		<loadState iconType="circle" :status="loadingstatus"></loadState>
	</view>
</template>

<script>
	var db = wx.cloud.database()
	
	
	//映入 vuex 
	import{mapState} from'vuex'
	import shareBox from '../../function/shareBox.vue'
	import loadState from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{shareBox,loadState},
		data(){
			return{
					post_info_data:[],
					urlLocation:"../post_detail/detail?id=",
					current_position:0,
					loadingstatus:"loading"
					
				}
		},
		//computed会监听数据变化只要发生数据变化就会重新执行
		
		onReachBottom(){
			this.current_position = this.current_position + 6
			this.getPostInfo()
		},
		onLoad(){
			this.getPostInfo()
		},
		methods:{
			getPostInfo(){
				var post_list = db.collection("post_info")
				.limit(6)
				.skip(this.current_position)
				post_list.get()
				.then((res)=>{
					
					if(!res.data[5]){
						this.loadingstatus = "noMore"
						
					}
					this.set_post_info(res.data)
					
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			set_post_info(info){
				let clientPostList=info.map((item)=>{
					let id = item._id
					let detail = item.detail
					return{
						id,
						detail
					}
				})
				this.post_info_data=[...this.post_info_data,...clientPostList]
				
			},
			
		}
		
	}
</script>

<style>
	@import url("../../style/post.css");
	
</style>
