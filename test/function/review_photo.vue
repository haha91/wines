<template>
	<view class="review_images_box">
		<block v-for="(img,index) in images" :key = "index">
			<view class="review_image_box">
				<image :src="img" class="review_image" mode="aspectFill" @click = "reviewImage(index)"></image>
				<image src="../static/tab/deteimg.svg" mode = "widthFix" class="deleteImage" @click="deleteImage(index)"></image>
			</view>
		</block>
	</view>
</template>

<script>
	import {previewPicture} from "../js/post_function.js"
	export default{
		name:'review_photo',
		props:{
			images:Array,
		},
		methods:{
			deleteImage(i){
				this.$emit("childData",i)
			},
			reviewImage(i){
				previewPicture(i,this.images)
				.then((res)=>{
					console.log(res)
				})
				.catch((err)=>{
					console.log(err)
				})
			}
			
		}
	}
</script>

<style>
	@import url("../style/review_box.css");
</style>
