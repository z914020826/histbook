import {
	Log
} from "@icon-park/vue-next"
import {
	AddOrder,
	OrderTags,
	getAllOrder,
	receiveOrder,
	checkMyPublish,
	CheckCode,
	getOrderDetail,
	ErrandDetail,
	cancelOrder,
	WxPay,
	GetOpenId,
	AddAddress,
	SearchAddress,
	UpdateAddress,
	deleteAddress,
	checkMyPublishDetail
} from "../../api/run.js"
import formatTime from "../../util/formatTime.js"
export default {
	state: () => ({
		tags: [],
		allOrder: [],
		myOrder: [],
		orderInfo: [],
		ErrandInfo: {},
		orderId: '',
		payData: {},
		openId: '',
		address: [],
		take: {},
		pick: {},
		publishItemDetail: {}
	}),
	mutations: {
		getTags(state, data) {
			state.tags = data
		},
		getOrder(state, data) {
			state.allOrder = data
		},
		checkMyPublish(state, data) {
			state.myOrder = data
		},
		checkRecive(state, data) {
			if (data == 200) {
				state.recive = true
			} else {
				state.recive = false
			}
		},
		getOrderDetail(state, data) {
			state.orderInfo = data
		},
		getErrandDetail(state, data) {
			state.ErrandInfo = data
		},
		getOrderId(state, data) {
			state.orderId = data
		},
		getPayData(state, data) {
			state.payData = data
		},
		getAllAddress(state, data) {
			state.address = data
		},
		takeAddress(state, data) {
			state.take = data
		},
		pickAddress(state, data) {
			state.pick = data
		},
		checkMyPublishDetail(state, data) {
			state.publishItemDetail = data
		}
	},
	actions: {
		async AddOrder(state, data) {
			console.log(777, data)
			let result = await AddOrder(data)
			console.log("run", result);
			if (result.code == 200) {
				state.commit("getErrandDetail", result.data)
			}
		},
		async OrderTags(state, data) {
			let result = await OrderTags()
			console.log("run", result);
			if (result.code == 200) {
				state.commit("getTags", result.data)
			}
		},
		// 查询全部订单
		async getAllOrder(state) {
			let result = await getAllOrder()
			console.log("全部订单", result);
			if (result.code == 200) {
				state.commit("getOrder", result.data)
			}
		},
		async receiveOrder(state, id) {
			console.log("接单")
			let result = await receiveOrder(id)
			console.log("接单", result)
			if (result.code == 200) {
				state.commit("getOrderId", result.data)
				// state.commit("checkRecive", result.code)
				uni.showToast({
					icon: "none",
					title: "接单成功"
				});
			} else {
				console.log("接单失败", result)
				// state.commit("checkRecive", result.code)
				uni.showToast({
					icon: "none",
					title: result.msg
				});
			}
		},
		async checkMyPublish(state) {
			let result = await checkMyPublish();
			if (result.code == 200) {
				console.log("我发布的", result);
				state.commit("checkMyPublish", result.data)
			}
		},
		async checkCode(state, data) {
			console.log(111, data)
			let result = await CheckCode(data);
			console.log(result)
			if (result.code == 200) {
				console.log("验证码", result);
				uni.showToast({
					title: "订单已完成"
				})
				return true
			} else {
				uni.showToast({
					title: result.msg
				})
				return false
			}
		},
		async getOrderDetail(state, id) {
			let result = await getOrderDetail(id)

			if (result.code == 200) {
				state.commit("getOrderDetail", result.data)
			}
		},
		async checkMyPublishDetail(state, id) {
			let result = await checkMyPublishDetail(id);
			if (result.code == 200) {
				console.log("订单详情", result);
				state.commit("checkMyPublishDetail", result.data)
			}
		},
		async errandDetail(state, id) {
			console.log("详情444");
			let result = await ErrandDetail(id)
			console.log("详情444", result);
			if (result.code == 200) {
				state.commit("getErrandDetail", result.data)
			}
		},
		async cancelOrder(state, data) {
			let result = await cancelOrder(data)
			console.log("取消订单", result);
			if (result.code == 200) {
				uni.showToast({
					icon: "none",
					title: result.msg
				});
			}
		},
		async wxPay(state, data) {
			console.log("预支付");
			let result = await WxPay(data)
			console.log("预支付", result);
			if (result.code == 200) {
				state.commit("getPayData", result.data)
			}
		},
		async addAddress(state, data) {
			console.log("addAddress");
			let result = await AddAddress(data)
			console.log("addAddress", result);
			if (result.code == 200) {
				// uni.navigateBack()
			}
		},
		async searchAddress(state, data) {
			console.log("SearchAddress");
			let result = await SearchAddress()
			console.log("SearchAddress", result);
			if (result.code == 200) {
				state.commit("getAllAddress", result.data)
			}
		},
		saveTake(state, data) {
			state.commit("takeAddress", data)
		},
		savePick(state, data) {
			state.commit("pickAddress", data)
		},
		async updateAddress(state, data) {
			console.log("UpdateAddress");
			let result = await UpdateAddress()
			console.log("UpdateAddress", result);
			if (result.code == 200) {
				// uni.navigateBack()
			}
		},
		async deleteAddress(state, data) {
			console.log("删除地址");
			let result = await deleteAddress(data)
			if (result.code == 200) {
				console.log("删除成功");
			}
		}
	},
}