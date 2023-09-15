import {
	wxLogin,
	getPhoneNum,
	checkToken,
	changeUserInfo,
	uploadOss
} from "../../api/index.js"
import ossLoad from "../../util/ossLoad.js"
export default {
	state: () => ({
		swiperList: [
			'https://cdn.uviewui.com/uview/swiper/swiper3.png',
			'https://cdn.uviewui.com/uview/swiper/swiper2.png',
			'https://cdn.uviewui.com/uview/swiper/swiper1.png',
		],
		openId: "",
		userInfo: {},
		ossData: {}
	}),
	mutations: {
		getOpenId(state, info) {
			state.openId = info.openid
		},
		getUserInfo(state, data) {
			state.userInfo = data
		},
		changeUserInfo(state, data) {
			for (let i in data) {
				console.log("666", i, data[i], state.userInfo[i] ? 1 : 2);
				state.userInfo[i] = data[i]
			}
		},
		getOssInfo(state, data) {
			state.ossData = data
		}
	},
	actions: {
		// 登录获取openId
		async getOpenId(state, data) {
			let result = await wxLogin(data.code)
			if (result.code == 200) {
				state.commit("getOpenId", result.data)
			}
		},
		// 微信手机号授权
		async getPhoneNum(state, code) {
			let result = await getPhoneNum(code, state.state.openId)
			console.log("用户信息", result);
			if (result.code == 200) {
				uni.setStorageSync("token", result.data.token)
				let phone = result.data.phone_number
				phone = phone.substring(0, 3) + "****" + phone.substr(phone.length - 4);
				let userInfo = result.data
				userInfo.phone_number = phone
				state.commit("getUserInfo", userInfo)
				uni.showToast({
					icon: "none",
					title: "登录成功"
				});

			}
		},
		// 检查登录状态
		async checkToken(state, code) {
			let result = await checkToken()
			console.log("用户信息", result);
			if (result.code == 200) {
				uni.setStorageSync("token", result.data.token)
				let phone = result.data.phone_number
				phone = phone.substring(0, 3) + "****" + phone.substr(phone.length - 4);
				let userInfo = result.data
				userInfo.phone_number = phone
				state.commit("getUserInfo", userInfo)
			}
		},
		// 修改用户信息
		async changeUserInfo(state, data) {
			let {
				ID
			} = state.state.userInfo
			let fileName = ID + ".jpg"
			let dir = "headImage/"
			let host = await ossLoad([data.head_image], dir, fileName)
			data.head_image = host + '/' + dir + fileName
			// 将用户信息存储到数据库
			let result = await changeUserInfo(data)
			if (result.code == 200) {
				state.commit("changeUserInfo", data)
				uni.showToast({
					icon: "success",
					title: "用户信息保存成功"
				});
			}
		},
	},
}