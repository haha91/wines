<template>
	<view class="tag_box">
		<view class="title">
			<text>{{current_title}}</text>
		</view>
		<view class="tags"> 
		<block v-for="(item,index) in datas" :key="index" >
			<view class="tag" @click = "setCurrent(index,item)" :class="{actived:currentPos==index}">{{item}}</view>
		</block>
			
		
		</view>
	</view>
</template>

<script>
	
	export default{
		name:'tag_box',
		props:{
			datas:Array,
			default_value:Number,
			current_title:String,
		},
		data(){
			return{
				currentPos:Number,
				
			}
		},
		created(){
				console.log(this.default_value)
				this.currentPos=this.default_value
		},
		methods:{
			setCurrent(i,info){
				this.currentPos=i
				this.$emit("childData",info)
			}
		}
	}
</script>

<style>
	@import url("../style/component-style/tag_box_style.css");
</style>
