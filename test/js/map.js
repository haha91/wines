import QQMapWX from '../js/qqmap-wx-jssdk.js'//gps定位


var getaddress = function(){
	return new Promise((sucess,fail)=>{
		const qqMapSdk = new QQMapWX({
			key: 'VY6BZ-HV2A6-WTUSU-EF4SB-N3AGT-LTBB3'
		});
		
		qqMapSdk.reverseGeocoder({
			success: (res) => {
					sucess(res)
			},
			fail: (err) => {
				fail(err)
			}
		})
	})
}
var currentCity = function(){
	return new Promise((sucess,fail)=>{
		const qqMapSdk = new QQMapWX({
			key: 'VY6BZ-HV2A6-WTUSU-EF4SB-N3AGT-LTBB3'
		});
		
		qqMapSdk.reverseGeocoder({
			success: (res) => {
					if (!res.result.ad_info.city) {
				
						
						sucess(res.result.address_component.locality)
					} else {
						 
				
						sucess(res.result.ad_info.city)
					}
			},
			fail: (err) => {
				fail('深圳市')
			}
		})
	})
}




export{getaddress,currentCity}

	
