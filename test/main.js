import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
//引入vuex
import dataStore from"./pages/dataStore/dataStore.js"
App.mpType = 'app'
Vue.prototype.$store = dataStore//define the position

const app = new Vue({
    ...App,
	dataStore//define the vuex in the app
})
app.$mount()
