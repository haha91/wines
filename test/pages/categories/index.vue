<template>
	<view class="caregory">
		<scroll-view class="nav_left" scroll-y="">
			<block v-for ="(item,index) in result" :key="index">
				<view class="nav_left_items" @click="setCurrentState(index,item.grape)"  :class ="{nav_left_item_active:index == currentIndex}">
				{{item.grape}}</view>
				
			</block>
			
		</scroll-view>
		<scroll-view class="nav_right" scrool-y="">
			<block v-for ="(item,index) in wine" :key="index">
				<view class="nav_right_items" @click="goToDetailPage(item._id)"   :class ="{nav_right_item_active:item.grape == currentGrape}">
					<image :src="item.src"></image>
				</view>
				
			</block>
		</scroll-view>
		<text>dgd</text>
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {
				currentIndex:0,
				currentGrape:"长相思",
				result: [],
				wine:[],
			}
		},
		created() {
			console.log("you in")
			const db = wx.cloud.database()
			const grape = db.collection("grape_category")
			const wines = db.collection("wines")
			grape.get()
				.then((res) => {
					console.log(res.data)
					this.result = res.data //you can define the name by uslef 
				})
				.catch((err) => {
					console.log(err)
				})
				
			wines.get()
				.then((res) => {
					console.log(res)
					this.wine = res.data //you can define the name by uslef 
					//vuex 传值
					let wineList =this.wine
					
					this.$store.dispatch('createWineList',wineList)
				})
				.catch((err) => {
					console.log(err)
				})
				
				
		},
		methods:{
			setCurrentState(i,g){
				
				this.currentIndex=i
				this.currentGrape=g
			},
			goToDetailPage(id){
				uni.navigateTo({
					url:"../wine_detail/wine_detail?id="+id,
					
					fail:(f)=>{
						console.log(f)
					},
				})
				
			}
		}
	}
</script>

<style>
	@import url("../../style/categoriesStyle.css");
	@font-face {
		font-family:'set_font';
		src:url('~@/static/font/优设标题黑.ttf') format('truetype');
	}
	text{
		font-family: 'set_font',常规体;
	}
</style>
