import {
	Log
} from "@icon-park/vue-next"
import {
	AddCollect,
	AddFollow
} from "../../api/collect.js"
export default {
	state: () => ({
		AddCollectId: '' // post_id  就是后端需要的post_id
	}),
	mutations: {
		postAddCollectId(state, data) {
			state.AddCollectId = data
		}
	},
	actions: {
		// 这里是收藏的相关操作
		async uploadStar(state, data) {
			let da = {
				post_id: data
			}
			console.log('收藏11111111', da);
			let result = await AddCollect(da)
			console.log('收藏result', result);
			if (result.code == 200) {
				state.commit("postAddCollectId", data)
			}
		},

		// 这里是关注的相关操作
		async addFollow(state, data) {
			console.log('关注传递的数据', data);
			let userId = {
				concern_id: data
			}
			console.log('userID',userId);
			let result = await AddFollow(userId)
			console.log('调用接口传递关注需要的参数', result);
		},
	},
}