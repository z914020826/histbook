<!-- 我发布的。组件 -->
<template>
	<view class="orderItem" @click="goToDetail">
		<view class="orderItem_title">
			<view class="cardLabel">
				{{props.tag}}
			</view>
			<view class="title_right">
				{{orderStatus}}
			</view>
		</view>
		<view class="fromAddress">
			<view class="round">
			</view>
			<view>
				<view class="address">
					{{props.from.address}}
				</view>
				<view class="userContact">
					{{props.from.user_name}} {{props.from.user_phone_number}}
				</view>
			</view>
		</view>
		<view class="toAddress">
			<view class="round " style="background-color: #FF6530;">
			</view>
			<view class="fromInfo">
				<view class="address singe-line">
					{{props.to.address}}
				</view>
				<view class="userContact ">
					{{props.to.user_name}} {{props.to.user_phone_number}}
				</view>
			</view>
		</view>
		<view style="display: flex; align-items: center;justify-content: space-between; margin-top: 20rpx;">
			<view class="createTime">
				{{formatTime(props.CreatedAt).substring(0,10)}}
			</view>
			<view>
				<view v-if="props.status==0" class="funBtn">
					<button class="btn1" @click.stop="cancelOrder">取消订单</button>
					<button class="btn1 btn2" @click.stop="changeOrderInfo">修改订单</button>
				</view>
				<view v-if="props.status==1" class="funBtn">
					<button class="btn1 btn2" @click.stop="callPhone">联系骑手</button>
				</view>
				<view v-if="props.status==2" class="funBtn">
					<button class="btn1 btn2" @click.stop="againBuy">再来一单</button>
				</view>
				<view v-if="props.status==3" class="funBtn">
					<button class="btn1 btn2" @click.stop="immediaPay">立即支付</button>
				</view>
				<view v-if="props.status>3" class="funBtn">
					<button class="btn1 btn2" @click.stop="againBuy">重新下单</button>
				</view>
			</view>
		</view>
	</view>
	<u-modal :show="show" content='您确定要取消该订单吗？' showCancelButton width="300px" confirmColor="#FF6530" @confirm="confirm"
		@cancel="cancel" @close="cancel" :closeOnClickOverlay="true"></u-modal>
</template>

<script setup>
	import {
		defineProps,
		computed,
		ref
	} from "vue"
	import {
		useStore
	} from "vuex";
	const store = useStore();
	import formatTime from "/util/formatTime.js"
	const props = defineProps(['errandId', "status", "detail", "from", "to", "cost", "head_image", "user_id", "tag",
		"CreatedAt"
	])
	const show = ref(false)
	const goToDetail = () => {
		uni.navigateTo({
			url: `/pages/orderDetail/orderDetail?id=${props.errandId}`
		})
	}
	const orderStatus = computed(() => {
		if (props.status == 0) {
			return "已发布"
		} else if (props.status == 1) {
			return "已接单"
		} else if (props.status == 2) {
			return "已完成"
		} else if (props.status == 3) {
			return "待支付"
		} else if (props.status == 5) {
			return "已超时"
		} else {
			return "已取消"
		}
	})
	const callPhone = (phoneNumber) => {
		uni.makePhoneCall({
			phoneNumber: '18237369750'
		});
	}
	const changeOrderInfo = () => {
		// 修改订单信息
		console.log("修改订单信息");
	}
	const confirm = ()=>{
		store.dispatch("cancelOrder", {
			id: parseInt(props.errandId),
		})
		cancel()
		uni.redirectTo({
			url:"/pages/myhome/orders/orders"
		})
	}
	const cancel = ()=>{
		show.value= false
	}
	// 取消订单
	const cancelOrder = () => {
		show.value= true
	}
	const immediaPay = () => {
		// 立即支付
		console.log("立即支付");
	}
	const againBuy = () => {
		// 再来一旦
		console.log("再来一单");
	}
</script>

<style scoped>
	.orderItem {
		padding: 30rpx;
		background-color: #fff;
		margin-top: 20rpx;
		border-radius: 15rpx;
	}

	.orderItem_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		width: 100%;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.title_right {
		color: #666;
	}

	.orderInfo_item {
		margin-bottom: 10rpx;
	}

	.runMessage {
		width: 500rpx;
	}

	.runFrom,
	.toFrom {
		display: flex;
		align-items: center;
		/* font-size: 24rpx; */
	}

	.adressText {
		width: 300rpx;
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
		justify-content: space-between;
	}

	.price {
		font-size: 36rpx;
		color: #FF6530;
	}

	.funBtn {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 10rpx;
	}

	.fromAddress,
	.toAddress {
		margin-top: 25rpx;
		display: flex;
		align-items: baseline;
	}

	.round {
		width: 15rpx;
		height: 15rpx;
		background-color: #000;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.userContact {
		font-size: 26rpx;
		margin-top: 10rpx;
		color: #999;
	}

	.createTime {
		color: #666;
		font-size: 26rpx
	}

	.address {
		word-break: break-all;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		width: 550rpx;
	}
</style>