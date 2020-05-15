<template>
	<view>
		
	
			<view class="user_comment_box" @click="test(current_comment)">
				<view class="user_info"></view>
				<view :class="{'white':current_position%2==0,'red':current_position%2!=0}" class="user_comment_detail">{{current_comment.userNickName}}: {{current_comment.comment_detail}}</view>
				
			</view>
			
	
		
	</view>
</template>

<script>
import {mapState} from'vuex'
const db = wx.cloud.database()

export default{
	name:'comment',
	props:{
		wine_id:String,
		current_comment:Object,
		current_position:Number,
	},
	data(){
		return{
			temp_comment:[],
		}
	},
	created(){
		
	},
	methods:{
		test(id){
			console.log(id)
		}
		
		
	},
	
	

}
	
</script>

<style>
@import url('../style/user_comment_style.css');
</style>
