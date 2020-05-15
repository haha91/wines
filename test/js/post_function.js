var previewPicture= function(index,images){
	
	return new Promise((sucess,fail)=>{
		uni.previewImage({
			current:index,
			urls:images,
			longPressActions:{//长按可以做什么后期还可以加滤镜
				itemList:['分享','保存图片','收藏'],
			}
			
		})
		.then((res)=>{
			sucess(res)
		})
		.catch((err)=>{
			fail(err)
		})
	})
}
export{previewPicture}