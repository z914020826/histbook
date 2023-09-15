import request from '../util/request.js'
let collectBase = {
	addCollect: "/collect/add" ,// 这里是收藏的操作 
	attention:"/follow/add" ,// 这里是关注的操作
}
export function AddCollect(data) {
	return request({
		url: collectBase.addCollect,
		method: 'post',
		data
	})
}
export function AddFollow(data) {
	return request({
		url: collectBase.attention,
		method: 'post',
		data
	})
}
