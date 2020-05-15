<template>
	<view>
		<!--banner-->
		<view class="banner_box" >
			<view>
				<video :src="videoSrc" objectFit="contain" v-if="img_list.length<=2 && videoSrc!='' "></video>
				<swiper v-if="img_list.length>1" :indicator-dots="true" :interval="1000" :duration="500" :circular="true"
				indicator-color="rgba(255,255,255)" indicator-active-color="#00ff00">
					<block v-for="(item,index) in img_list" :key="index">
						<swiper-item>
							<view class="swiper-item">
								<image :src="item" mode="aspectFill" class="banner_image"></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			
			<!--轮播数字提醒-->
			<view class="banner_position">
				<text>1</text>
				<text>/1</text>
			</view>
		</view>
		<!--title-->
		<view class="title_box">
			<view class="title_text">{{post_title}}</view>
			
			<view class="comment" @click="test(img_list.length)">
				<text>sss</text>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default{
		data(){
				return{
					
				}
		},
		props:{
			img_list:Array,
			post_title:String,
			videoSrc:String,
		},
		created(){
			
		},
		methods:{
			test(s){
				console.log(s)
			}
		}
	}
</script>

<style>
	@import url("../../../style/detail_banner.css");
	
</style>
