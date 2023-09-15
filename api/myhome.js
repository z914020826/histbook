import request from '../util/request.js'
let myHomeBase = {
	allRun: '/errand/all',
	checkAcceptOrder: "/order/mine/accept",
	cancelOrder: '/order/cancel',
	// 跳转个人主页接口
	// 获取用户点赞列表
	likeList: '/like/list',
	jumpPersonalPage: "/user/mine", // 根据用户id获取帖子列表
	// 获取用户收藏列表
	collectList: '/collect/list/mine',
	// 获取用户关注列表
	followList: '/follow/list/mine',
	// 获取我的粉丝列表
	fanList: '/follow/list/post'
}
export function AllRun() {
	return request({
		url: myHomeBase.allRun,
		method: 'get'
	})
}
export function checkAcceptOrder() {
	return request({
		url: myHomeBase.checkAcceptOrder,
		method: 'get'
	})
}
export function cancelOrder() {
	return request({
		url: myHomeBase.cancelOrder,
		method: 'post'
	})
}
// 跳转个人主页
// export function jumpPersonalPage(data) {
// 	return request({
// 		url: myHomeBase.jumpPersonalPage,
// 		method: 'get',
// 		data
// 	})
// }
// 跳转个人主页
export function jumpPersonalPage(id) {
	return request({
		url: myHomeBase.jumpPersonalPage + `?id=${id}`,
		method: 'get'
	})
}

// 获取用户点赞列表
export function likeList() {
	return request({
		url: myHomeBase.likeList,
		method: 'get'
	})
}

// 获取用户收藏列表
export function collectList() {
	return request({
		url: myHomeBase.collectList,
		method: 'get'
	})
}

// 获取用户关注列表
export function followList() {
	return request({
		url: myHomeBase.followList,
		method: 'get'
	})
}
// 获取用户粉丝列表
export function fanList() {
	return request({
		url: myHomeBase.fanList,
		method: 'get'
	})
}