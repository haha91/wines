<template>
	<view>
		<view class="input_box">
			<text>{{title}}:</text><input v-model="context" />
		</view>
	</view>
</template>

<script>
	//v-model 其实就是把v-bind:value="something" v-on:input="something = $event.target.value">
	//合并 所以在这里可以利用v-on 作为触发 context与其把他看做值不如直接将其变成一个computed property的值然后用get去设定值 set去监控变动
	export default{
		name:"input_box",
		props:{
			title:String,
			default_value:String,
			
		},
		computed:{
			context:{
				get(){
					return this.default_value
				},
				set(val){
					this.$emit('childData',val)
				}
			}
		}
	}
</script>

<style>
	@import url("../style/component-style/input_box_style.css");
</style>
