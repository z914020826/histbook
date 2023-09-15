import {
	AllRun,
	checkAcceptOrder,
	cancelOrder,
	likeList,
	collectList,
	followList,
	fanList,
	jumpPersonalPage
} from "../../api/myhome.js"
export default {
	state: () => ({
		runList: {},
		acceptData: [],
		personalPage: {},
		// 获取用户点赞列表
		likeList: [],
		// 收藏
		collectList: [],
		// 关注
		followList: [],
		// 粉丝
		fanList: []
	}),
	mutations: {
		getAllRun(state, data) {
			state.runList = data
		},
		getCheckAccept(state, data) {
			state.acceptData = data
		},
		// 获取用户点赞列表
		getlikeList(state, data) {
			state.likeList = data
		},
		// 收藏
		getcollectList(state, data) {
			state.collectList = data
		},
		// 关注
		getfollowList(state, data) {
			state.followList = data
		},
		// 粉丝
		getfanList(state, data) {
			state.fanList = data
		},
		// 个人主页
		getjumpPersonalPage(state, data) {
			state.personalPage = data
		}

	},
	actions: {
		async allRun(state, data) {
			let result = await AllRun()
			if (result.code == 200) {
				console.log(12455153, result)
				state.commit("getAllRun", data)
			}

		},
		// 接收订单
		async checkAccept(state) {
			// 调接口=发请求
			let result = await checkAcceptOrder()
			console.log("checkAcceptOrder", result);
			if (result.code == 200) {
				state.commit("getCheckAccept", result.data)
			}
		},

		// 点击头像获取对应的个人页
		async jumpPersonalPage(state, data) {
			let result = await jumpPersonalPage(data)
			console.log('jumpPersonalPage', result.data);
			state.commit("getjumpPersonalPage", result.data)

		},

		// 获取用户点赞列表
		async likeList(state) {
			// 调接口=发请求,api没有参数，所以async likeList(state)和await likeList()不用data
			let result = await likeList()
			if (result.code == 200) {
				state.commit("getlikeList", result.data)
			}
		},
		// 获取用户收藏列表
		async collectList(state) {
			// 调接口=发请求,api没有参数，所以async likeList(state)和await likeList()不用data
			let result = await collectList()
			if (result.code == 200) {
				state.commit("getcollectList", result.data)
			}
		},
		// 获取用户关注列表
		async followList(state) {
			// 调接口=发请求,api没有参数，所以async likeList(state)和await likeList()不用data
			let result = await followList()
			if (result.code == 200) {
				state.commit("getfollowList", result.data)
			}
		},
		// 获取用户粉丝列表
		async fanList(state) {
			// 调接口=发请求,api没有参数，所以async likeList(state)和await likeList()不用data
			let result = await fanList()
			if (result.code == 200) {
				state.commit("getfanList", result.data)
			}
		}

	},
}