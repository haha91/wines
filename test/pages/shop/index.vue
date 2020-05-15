<template>
	<view>
		<Search></Search>
		<view class="current-city">
			<view class="current-city-left">当前城市</view>
			<view class="current-city-right">
				<image src="../../static/tab/gonglveb.png" mode="widthFix"></image>
				<text class="city-name">{{address}}</text>
			</view>

		</view>
		<view class="near-shop">附近商店</view>
		<view class="near-stop-list">
			<block v-for="(item,index) in shops" :key="index">
				<view>{{item.address}}</view>
			</block>
		</view>


	</view>
</template>

<script>
	import Search from '../index/components/search.vue'
	import {
		getaddress
	} from '../../js/map.js'
	import{currentCity} from'../../js/map.js'
	var current_city;


	export default {
		data() {
			return {
				address: "",
				shops: [],
			}	
		},
		created() {
			this.getAddress()
			

			
		
		},
		

		methods: {//还没有解决getaddress和getshop之间的延迟问题所以暂时只能这样做利用每次在加载city地点之后再加载当地店铺
			async getAddress() {
				
				getaddress()
					.then((res) => {
						if (!res.result.ad_info.city) {
							this.address = res.result.address_component.locality
							current_city = this.address
							this.getshop(current_city)//得到当地店铺
						} else {
							this.address = res.result.ad_info.city
							current_city = this.address
							this.getshop(current_city)
						}
					})
					.catch((err) => {
						console.log("user reject get localtion")
						this.address = '深圳市'
						current_city = this.address
						this.getshop(current_city)
					})
					

			},
			
			async getshop(e){
				const db = wx.cloud.database()
				const shops = db.collection("wine_shops").where({
					city: e
				})
						
				shops.get()
					.then((res) => {
						console.log(res)
						
						this.shops = res.data
						
					})
					.catch((err) => {
						
						console.log(err)
					})
				
			}
		},
		
		


		
	}
</script>

<style scoped>
	@import url("../../style/shop.css");
</style>
