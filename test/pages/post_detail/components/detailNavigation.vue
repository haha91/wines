<template>
	<view>
		<view class="nav_box">
			<block v-for="(item,index) in navigation_type" :key ="index">
				<text :class="{actived:index == currentIndex}">{{item.category}}</text>
			</block>
			
		</view>
	</view>
</template>

<script>
	const db = wx.cloud.database()
	let post_type = db.collection("post_category")
	export default{
		name:'detailNavigation',
		data(){
			return{
				navigation_type:[
				{
					"category":"详情",
				},
				{
					"category":"评论",
				}
				],

			}
		},
		created(){
			
		
			
		}
		
	
	}
</script>

<style>
	@import url("../../../style/detailNavigation.css");
</style>
