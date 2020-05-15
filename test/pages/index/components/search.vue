<template>
	<view>
		<view class="search-top">
			
			<view class="search-code">
				<image src="../../../static/tab/saoma.svg"  mode="widthFix" @click="scanBarcode()"></image>
				
			</view>
				
			<view class="search-input">
				<image src="../../../static/tab/sousuo.svg" mode = "widthFix" class="search-img"></image>
				<input type="text" placeholder="plz type something" disabled />
			</view>
			<view class="search-code">
				<image src="../../../static/tab/xiaoxi.svg" mode="widthFix"></image>

			</view>
			
		</view>
		
	</view>
</template>

<script>
	
	export default{
		name:'search',
		data(){
			return{
			
			}
		},
		methods:{
			scanBarcode(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						uni.navigateTo({
							url:"../outside_of_this_app/oustside_view?o_web="+encodeURIComponent(JSON.stringify(res.result)),
							
							fail:(f)=>{
								console.log(f)
							},
						})
						
				    }
				});
			}
		}
	}
</script>

<style>
	@import url("../../../style/search.css");
</style>
