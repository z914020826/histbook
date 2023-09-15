import {
    UnreadMessage
} from "../../api/message.js"
export default {
	state: () => ({
		unread:[]
	}),
	mutations: {
		getUnread(state, data) {
			state.unread = data
		},
	},
	actions: {
		// 登录获取openId
		async getUnread(state, data) {
			let result = await UnreadMessage()
            console.log(55555,result);
			if (result.code == 200) {
                console.log(55555666,result.data);
				state.commit("getUnread", result.data)
			}
		}
	},
}