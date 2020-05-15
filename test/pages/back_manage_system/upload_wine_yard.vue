<template>
	<view>
		
	</view>
	
</template>

<script>
	import tag_box from "../../function/tag_box.vue"
	import reviewBox from "../../function/review_photo.vue"
	import input_box from "../../function/input_box.vue"
	
	export default{
		data(){
			return{
				country:["Chile","France","Australian"],
				brand:String,
				wine_yard_name:String,
				wine_detail:[]
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	@import url("../../style/back-managerment-style/upload_wine_yeard_style.css");
</style>
