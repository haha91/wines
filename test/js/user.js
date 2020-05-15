var userLogin = function(info){
	return new Promise((sucess,fail)=>{
		let db = wx.cloud.database()
		let users = db.collection('users')
		users.add({
			data:info
		})
		.then((res)=>{
			sucess(res)
		})
		.catch((err)=>{
			fail(err)
		})
	})
}


export{userLogin}