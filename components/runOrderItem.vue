<!-- 骑手接单组件 -->
<template>
	<view class="orderItem">
		<view class="orderItem_title">
			<view class="title_left">
				订单编号：{{props.orderId}}
			</view>
			<view class="title_right">
				{{orderStatus}}
			</view>
		</view>
		<view class="orderItem_content" @click="goToDetail">
			<view class="orderInfo">
				<view class="runMessage orderInfo_item singe-line">
					任务描述：{{props.detail}}
				</view>
				<view class="adressAndPrice">
					<view class="brokerage">
						佣金：
					</view>
					<view class="price">
						{{props.cost}}元
					</view>
				</view>
			</view>

		</view>
		<view>
			<!-- 全部订单 -->
			<view v-if="props.status==0" class="funBtn">
				<button class="btn1" @click="applyAfterSales">取消订单</button>
				<button class="btn1 btn2" @click="againBuy">联系雇主</button>
			</view>
			<!-- 待完成 -->
			<view v-if="props.status==1" class="funBtn">
				<button class="btn1" @click="applyAfterSales">取消订单</button>
				<button class="btn1 btn2" @click="againBuy">联系雇主</button>
			</view>
			<!-- 已完成 -->
			<view v-if="props.status==2" class="funBtn">
				<!-- 跳转到订单骑手端的详情页 -->
				<button class="btn1 btn2" @click="tiaozhuan">联系发布人</button>
			</view>
			<!-- 已取消 -->
			<view v-if="props.status==-1" class="funBtn">
				<!-- <button class="btn1 btn2" @click="againBuy"></button> -->
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		computed,
		onMounted
	} from "vue"
	import {
		useStore
	} from "vuex"

	const store = useStore()



	const props = defineProps(['orderId', "status", "detail", "from", "to", "cost", "head_image", "user_id","status"])
	const applyAfterSales = () => {
		// console.log("申请售后");
		store.dispatch("cancelOrder")
	}
	const tiaozhuan = () => {
		// uni.navigateTo({
		// 	url: `/pages/order/orderReceiving/orderReceiving?id=${props.orderId}`
		// })
	}
	const againBuy = () => {
		console.log("再来一单");
	}
	const goToDetail = () => {
		console.log(11111111111111111111111, props.orderId)
		uni.navigateTo({
			url: `/pages/order/orderReceiving/orderReceiving?id=${props.orderId}&status=${props.status}`
		})
	}

	const orderStatus = computed(() => {
		if (props.status == 0) {
			return "全部订单"
		} else if (props.status == 1) {
			// 已接单
			return "待完成"
		} else if (props.status == 2) {
			// 已完成
			return "已完成"
		} else {
			return "已取消"
		}
	})
</script>

<style scoped>
	.orderItem {
		padding: 30rpx 20rpx;
		background-color: #fff;
		margin-top: 20rpx;
		border-radius: 15rpx;
	}

	.orderItem_title {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;

	}

	.orderItem_content {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 20rpx;
	}

	.orderImg {
		width: 120rpx;
		height: 120rpx;
		margin-right: 30rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.orderInfo {
		font-size: 30rpx;
	}

	.orderInfo_item {
		margin-bottom: 20rpx;
	}

	.runMessage {
		width: 500rpx;
	}

	.runFrom,
	.toFrom {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}


	.round {
		width: 12rpx;
		height: 12rpx;
		border-radius: 10rpx;
		background-color: #000;
		margin-right: 15rpx;
	}

	.toFrom_round {
		background-color: #FF6530;
	}

	.adressAndPrice {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.price {
		font-size: 28rpx;
		color: #FF6530;
	}

	.funBtn {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 10rpx;
	}

	.btn1 {
		background-color: #fff;
		font-size: 28rpx;
		width: 170rpx;
		height: 2rem;
		line-height: 2rem;
		margin: 0 15rpx 0 0;
	}

	.btn1:active {
		background-color: #f3f4f6;
	}

	.btn2 {
		background-color: #FF6530;
		color: #fff;
	}

	.btn2:active {
		background-color: #ff8c65;
	}
</style>