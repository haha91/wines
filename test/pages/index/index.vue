<template>
	<view class="display-inline">
		<Search></Search>
		<view class="display-inline">
			<swiper
				:indicator-dots="true"
				:autoplay="true"
				:intervl="2000"
				:duration="300"
				:circular="true"
				indicator-color="rgba(255,255,255)"
				indicator-active-color="#00ff00"
			>
			<block v-for="(item,index) in result" :key="index">
				<swiper-item>
					<view class="swiper-item"  @click="localCont()"><image :src="item.src" mode = "aspectFill" class="scroll-image"></image> </view>
					<view>banner</view>
				</swiper-item>
				
			</block>
				
				
			</swiper>
			
		</view>
		
	</view>
	
</template>

<script>
	import Search from'./components/search'
	export default {
		components:{
			Search
		},
		data() {

			return{
				result:[]//javascript dose not matter about the order and this varable will be conntect to any defined verable sad
			}
			
	},
	//contect db
		created(){
						const db = wx.cloud.database()
						const banner = db.collection("banner")
						
						banner.get()
						.then((res)=>{
							console.log(res)
							this.result=res.data//you can define the name by uslef 
						})
						.catch((err)=>{
							console.log(err)
						})
						
						
				},
				
	}
</script>

<style>
	@import url("../../style/scroll-image.css");
</style>
