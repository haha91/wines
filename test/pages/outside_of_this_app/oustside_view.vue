<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="o_url"></web-view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				o_url:"",
			}
		},
		onLoad(e){
			console.log(e)
			this.o_url =JSON.parse(decodeURIComponent(e.o_web))
			console.log(this.o_url)
		}
	}
</script>

<style>
</style>
