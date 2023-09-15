import {
	createStore
} from "vuex";

import myhomePage from './myhome/myhome.js'
import indexPage from "./index/index.js"
import runPage from "./run/run.js"
import postPage from "./post/post.js"
import collectPage from "./collect/collect.js"
import messagePage from "./message/message.js"
export default createStore({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		indexPage,
		runPage,
		myhomePage,
		postPage,
		collectPage,
		messagePage
	}
})