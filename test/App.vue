<script>
	export default {
		onLaunch: function() {
			
			
			    if(!wx.cloud){
			      console.error("使用基础库2.2.3之上")
			    }else{
					console.log("sad"),
			      wx.cloud.init({
					
			        env:"testdeveloper-afyr6",
			        traceUser:true,
			      
			      })
			    }
			
			
			  
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
