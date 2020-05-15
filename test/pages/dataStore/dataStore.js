import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const wineList={
	wines:[]
}
var user_info={
	user:[]
}

const login_state=false

var state={
	wineList,
	user_info,
	login_state,
	temp_commit_info:[],
}

export default new Vuex.Store({
	actions:{
		createWineList(cwl,wineList){
			cwl.commit('getWineList',wineList)
		},
		set_user_login(c,user_info){
			c.commit('setting_login_state',user_info)
			state.login_state=true
		},
		create_temp_data(c,comment_info){
			c.commit('setting_temp_comment_data',comment_info)
			
		}
		
		
	},
	mutations:{
		getWineList(state,wineList){
			state.wineList = {
				wines:wineList
				
			}
		},
		setting_login_state(state,user_info){
			state.user_info={
				user:user_info,
				
			}
			state.login_state=true
		},
		setting_temp_comment_data(state,commit_info){
		
			state.temp_commit_info=commit_info
			console.log(state.temp_commit_info)
		},
	},
	
})