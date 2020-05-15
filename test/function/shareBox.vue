<template>
	<view class="active">
		<view class="content">
			<block v-for="(item,index) in clientPostData" :key="index">
				<view class="content_Box" @click="goToDetail(item.id,urlLocation)">
					<view class="content_img">
						<block v-for="(img,index) in item.detail.image" :key="index" v-if="index==0">
							<image :src="img" mode="aspectFill"></image>
						</block>
					</view>
					<!--article-->
					<view class="article_box">
						<view class="article_title">
						<p>{{item.detail.titledata}}</p>
						</view>
						<view class="article">
							{{item.detail.tipsdata}}
						</view>
						
						<view class="user_detail">
							<image :src= "item.detail.avatarUrl"></image>
							<text>{{item.detail.nickName}}</text>
						</view>
					</view>
				</view>	
			</block>
			
		</view>
	</view>
</template>

<script>
	export default{
		name:"shareBox",
		props:{
			clientPostData:Array,
			urlLocation:String,
		},
		
		

		data(){
			return{
				postData:[],
			}
		},
		
		methods:{
			
			goToDetail(id,urlLocation){
				console.log(urlLocation)
				uni.navigateTo({
					url:urlLocation+id,
					
					fail:(f)=>{
						console.log(f)
					},
				})
			}
			
		},
	
		created() {
			console.log("you are in the share box")
		}
	}
</script>

<style>
	@import url("../style/shareBox.css");
</style>
