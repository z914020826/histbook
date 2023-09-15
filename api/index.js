import request from '../util/request.js'
let userBase = {
	// 示例
	login: '/wxLogin',
	// login: '/wxLoginBySDK',
	getPhoneNum: "/getUserPhoneNumber",
	// getPhoneNum: "/getUserPhoneNumberBySDK",
	checkToken: "/checkToken",
	payFee: "",
	changeUserInfo: "/user/info",
	uploadOss: "/user/oss",
}

export function wxLogin(code) { //登录
	return request({
		url: userBase.login,
		data: {
			code
		},
		method: 'get'
	})
}
export function getPhoneNum(code, openId) { //登录
	return request({
		url: userBase.getPhoneNum + `?code=${code}&openid=${openId}`,
		method: 'get'
	})
}
export function checkToken() { //登录
	return request({
		url: userBase.checkToken,
		method: 'get'
	})
}
export function payFee(data) { //支付
	return request({
		url: userBase.payFee,
		method: 'get',
		data
	})
}
export function changeUserInfo(data) {
	return request({
		url: userBase.changeUserInfo,
		method: 'post',
		data
	})
}

export function uploadOss() {
	return request({
		url: userBase.uploadOss,
		method: 'get',
	})
}

