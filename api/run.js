import request from '../util/request.js'
let runBase = {
	addOrder: '/errand/add',
	tags: '/errand/tags',
	allOrder: '/runServer/all',
	receiveOrder: "/order/add",
	checkMyPublish: "/errand/mine",
	checkCode: "/order/check",
	getOrderDetail: "/order/find",
	errandDetail: "/errand/detail",
	cancelOrder: "/errand/cancel",
	pay: '/wechatPay/createPayment',
	getOpenId: '/user/openid',
	addAddress: '/errand/address/add',
	searchAddress: '/errand/address/search',
	updateAddress: '/errand/address/modify',
	deleteAddress: '/errand/address/delete',
	checkMyPublishDetail:"/order/find/errand"
}

export function AddOrder(data) {
	return request({
		url: runBase.addOrder,
		data: data,
		method: 'post'
	})
}
export function OrderTags() {
	return request({
		url: runBase.tags,
		method: 'get'
	})
}
export function getAllOrder() {
	return request({
		url: runBase.allOrder,
		method: 'get'
	})
}
export function receiveOrder(id) {
	return request({
		url: runBase.receiveOrder,
		method: 'post',
		data: {
			errand_id: id
		}
	})
}
export function checkMyPublish() {
	return request({
		url: runBase.checkMyPublish,
		method: 'get',
	})
}
export function CheckCode(data) {
	return request({
		url: runBase.checkCode,
		method: 'post',
		data: data
	})
}
export function getOrderDetail(id) {
	return request({
		url: runBase.getOrderDetail + `/${id}`,
		method: 'get',
	})
}
export function checkMyPublishDetail(id) {
	return request({
		url: runBase.checkMyPublishDetail + `/${id}`,
		method: 'get',
	})
}
export function ErrandDetail(id) {
	return request({
		url: runBase.errandDetail + `?id=${id}`,
		method: 'get',
	})
}
export function cancelOrder(data) {
	return request({
		url: runBase.cancelOrder,
		method: 'post',
		data
	})
}
export function WxPay(data) {
	return request({
		url: runBase.pay,
		method: 'post',
		data: data
	})
}
export function GetOpenId() {
	return request({
		url: runBase.getOpenId,
		method: 'get',
	})
}

export function AddAddress(data) {
	return request({
		url: runBase.addAddress,
		method: 'post',
		data: data
	})
}
export function SearchAddress() {
	return request({
		url: runBase.searchAddress,
		method: 'get',
	})
}
export function UpdateAddress(data) {
	return request({
		url: runBase.updateAddress,
		method: 'post',
		data: data
	})
}
export function deleteAddress(data) {
	return request({
		url: runBase.deleteAddress,
		method: 'post',
		data: data
	})
}
