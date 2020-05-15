<template>
	<view>
		<view class="wine_detail_img">
			<image :src="wine_image"></image>
		</view>
		<view class="wine_description_box">
			
			<view class="level_box" id="acidity">
				<block v-for="(i,index) in acidity" :key = "index">
					<view class="level">
						<image src="../../static/tab/infinity.svg"></image>
					</view>
				</block>
			</view>
			<view class="level_box" id="Tannic">
				<block v-for="(i,index) in acidity" :key = "index">
					<view class="level">
						<image src="../../static/tab/infinity.svg"></image>
					</view>
				</block>
			</view>
			<view class="level_box" id="Alcohol">
				<block v-for="(i,index) in acidity" :key = "index">
					<view class="level">
						<image src="../../static/tab/infinity.svg"></image>
					</view>
				</block>
			</view>
		</view>
		
		<block v-if="temporary_comment" v-for="(item,index) in temporary_comment" :key="index">
			<view class="user_comment_box" @click="test(current_comment)">
				<view class="user_info"></view>
				
				<view v-if="temporary_comment.length%2!=0" :class="{'red':index%2==0,'white':index%2!=0}" class="user_comment_detail">{{item.userNickName}}: {{item.comment_detail}}</view>
				<view v-if="temporary_comment.length%2==0" :class="{'white':index%2==0,'red':index%2!=0}" class="user_comment_detail">{{item.userNickName}}: {{item.comment_detail}}</view>
				
			</view>
			
		</block>
		<block v-for="(i,index) in current_comment" :key ="index">
			<client_comment  v-if="wine_id" :wine_id="wine_id" :current_comment="i" :current_position="index"></client_comment>	
			<view class="bottom_spec" v-if="index==current_comment.length-1"></view>
		</block>
		
		<post_comment @passData="getData" v-if="wine_id" class="fix_position" :wine_id="wine_id"></post_comment>
		<loadState iconType="circle" :status="loadingstatus"></loadState>
	</view>
</template>

<script>
	const db = wx.cloud.database()
	var users = db.collection("users");
	
	import client_comment from"@/function/comment.vue"
	import post_comment from"@/function/upgreat_commit.vue"
	import loadState from "@/components/uni-load-more/uni-load-more.vue"
	import {mapState} from'vuex'
	export default{
		components:{client_comment,post_comment,loadState},
		data(){
			return{
				
				acidity:[],
				sweetness:[],
				descript_detail:[],
				wine_name:[],
				wine_level:[],
				wine_id:"",
				wine_image:"",
				wine_detail:[],
				wine_grape:"",
				wine_quality:"",
				comments:[],
				current_comment:[],
				test_number:0,
				current_position:0,
				loadingstatus:"loading",
				temporary_comment:[],
				
			}
		},
		async onLoad(e){ 
			for(var i=0;i<4;i++){
				this.acidity.push(1);
			}
			
		
			this.wine_id = e.id
			this.getComment(e.id)
			this.getWineInfo(e.id)
			
			
				
			
		},
		onReachBottom(){
			this.current_position = this.current_position + 10
			this.getComment(this.wine_id)
		},
		methods:{
			getData:function(data){
				console.log(data)
				this.temporary_comment.unshift(data)
				console.log(this.temporary_comment)
				
			},
			getWineInfo(id){
				let wine = db.collection("wines").where({
						_id:id
				})
				
				wine.get()
					.then((res)=>{
						let wine_info = res.data[0]
						this.wine_image = wine_info.src
						this.wine_detail=wine_info.detail
						this.wine_grape = wine_info.grape
						this.wine_level = wine_info.level
						
					})
					.catch((err)=>{
						console.log(err)
					})
			},
			getComment(id){
			
				let comments = db.collection("user_comment").where({
					wine_id:id
				}).orderBy('uploadTime','desc')
				.limit(10)
				.skip(this.current_position)
				
				comments.get()
					.then((res)=>{
						if(!res.data[9]){
							this.loadingstatus="noMore"
						}
						
						this.current_comment = [...this.current_comment,...res.data]
						
					})
					.catch((err)=>{
						console.log(err)
					})
				
				
			},
		
		},
		computed:{
			...mapState(['temp_commit_info']),
			count(){
				this.temp_comment = this.temp_commit_info
				console.log(this.temp_commit_info)
			},
		},
		onShow(){
			
			//wx.getStorage({
			//	key:"tempCommit",
			//	success(res){
			//		console.log(res)
			//	}
			//})
				
				
		
		}
		
	}
</script>

<style>
	@import url("../../style/wine_detail.css");
</style>
