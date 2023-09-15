<!-- 我发布的：页面详情 -->
<template>
	<view class="orderDetail" >
		<view class="order_status">
			<span v-if="orderInfo.errand_status==0">订单已发布 <span class="hui">></span></span>
			<span v-if="orderInfo.errand_status==1">骑手已接单 <span class="hui">></span></span>
			<span v-if="orderInfo.errand_status==2">订单已完成 <span class="hui">></span></span>
			<span v-if="orderInfo.errand_status==3">订单还未支付 <span class="hui">></span></span>
			<span v-if="orderInfo.errand_status==4">订单已取消 <span class="hui">></span></span>
			<span v-if="orderInfo.errand_status==5">订单已超时 <span class="hui">></span></span>
		</view>
		<view class="header" v-if="orderInfo.errand_status!=4">
			<view class="head_text">
				<uni-title type="h2" title="您的订单已经发布,请耐心等待接单~" v-if="orderInfo.errand_status==0"></uni-title>
				<uni-title type="h2" title="骑手已经接到了您的订单，很快就会给您送达~" v-if="orderInfo.errand_status==1"></uni-title>
				<uni-title type="h2" title="物品已送达,请注意查收~" v-if="orderInfo.errand_status==2"></uni-title>
				<uni-title type="h2" title="订单还未支付,超时将自动取消订单~" v-if="orderInfo.errand_status==3"></uni-title>
				<uni-title type="h2" title="订单超时,退款请注意查收" v-if="orderInfo.errand_status==5"></uni-title>
				<span class="text_mini" v-if="orderInfo.errand_status==2">感谢对我们的信任</span>
			</view>
			<u-line></u-line>
			<view class="tools">
				<view class="tool_item" v-if="orderInfo.errand_status==0">
					<u-icon name="edit-pen" size="42rpx"></u-icon>
					<span class="tool_item_text">修改订单</span>
				</view>
				<view class="tool_item" v-if="orderInfo.errand_status==1||orderInfo.errand_status==2">
					<u-icon name="red-packet" size="42rpx"></u-icon>
					<span class="tool_item_text">打赏骑手</span>
				</view>
				<view class="tool_item" v-if="orderInfo.errand_status==3" @click="immediaPay">
					<u-icon name="rmb-circle" size="42rpx"></u-icon>
					<span class="tool_item_text">立即支付</span>
				</view>
				<view class="tool_item" v-if="orderInfo.errand_status==1||orderInfo.errand_status==2" @click="callPhone">
					<u-icon name="phone" size="42rpx"></u-icon>
					<span class="tool_item_text">联系骑手</span>
				</view>
				<view class="tool_item">
					<u-icon name="server-man" size="42rpx"></u-icon>
					<span class="tool_item_text">联系客服</span>
				</view>
				<view class="tool_item">
					<u-icon name="close-circle" size="42rpx"></u-icon>
					<span class="tool_item_text">申请售后</span>
				</view>
			</view>
		</view>
		<view class="orderInfo">
			<view class="orderInfo_title">
				<view class="cardLabel">
					{{orderInfo.tag}}
				</view>
			</view>
			<u-line></u-line>
			<view class="fromAddress">
				<view class="round">
				</view>
				<view>
					<view class="address singe-line" style="width: 600rpx;">
						{{orderInfo.from.address}}
					</view>
					<view class="userContact">
						{{orderInfo.from.user_name}} {{orderInfo.from.user_phone_number}}
					</view>
				</view>
			</view>
			<view class="toAddress">
				<view class="round " style="background-color: #FF6530;">
				</view>
				<view class="fromInfo">
					<view class="address singe-line" style="width: 600rpx;">
						{{orderInfo.to.address}}
					</view>
					<view class="userContact ">
						{{orderInfo.to.user_name}} {{orderInfo.to.user_phone_number}}
					</view>
				</view>
			</view>
		</view>
		<view class="orderInfo">
			<view class="orderInfo_title">
				订单信息
			</view>
			<u-line></u-line>
			<view class="orderInfo_content">
				<view class="orderInfo_item">
					<view class="orderInfo_key">
						订单编号
					</view>
					<view class="orderInfo_value">
						{{orderInfo.errand_id}}
					</view>
				</view>
				<view class="orderInfo_item">
					<view class="orderInfo_key">
						下单时间
					</view>
					<view class="orderInfo_value">
						{{formatTime(orderInfo.errand_created_at)}}
					</view>
				</view>
				<view class="orderInfo_item" style="align-items:baseline">
					<view class="orderInfo_key">
						任务描述
					</view>
					<view class="orderInfo_value double-line" style="width: 450rpx; text-align: end; -webkit-line-clamp: 2;">
						{{orderInfo.detail}}
					</view>
				</view>
				<view class="orderInfo_item">
					<view class="orderInfo_key">
						订单备注
					</view>
					<view class="orderInfo_value">
						{{orderInfo.note}}
					</view>
				</view>
				
				<view class="orderInfo_item">
					<view class="orderInfo_key">
						跑腿费用
					</view>
					<view class="orderInfo_value">
						{{(orderInfo.cost)/100}}元
					</view>
				</view>
				<view class="orderInfo_item">
					<view class="orderInfo_key">
						支付方式
					</view>
					<view class="orderInfo_value">
						在线支付
					</view>
				</view>
			</view>
		</view>
		<view class="rider" v-if="orderInfo.code">
			<view class="pickupCode">
				<span>取货码<span class="codeNum">{{orderInfo.code}}</span>签收后将此码提供给骑手哦~</span>
			</view>
			<span class="text_mini">费用已经支付完成，请勿在线下给骑手转账支付</span>
		</view>
	</view>

</template>

<script setup>
	import {
		computed,
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import formatTime from "../../util/formatTime.js"
	import {
		useStore
	} from "vuex";
	const store = useStore();
	onLoad((e) => {
		store.dispatch("checkMyPublishDetail", e.id)
	})
	const orderInfo = computed(() => {
		return store.state.runPage.publishItemDetail
	})
	const cancelOrder = () => {
		store.dispatch("cancelOrder", {
			id: parseInt(orderInfo.value.ID)
		})
	}

	const immediaPay = () => {
		console.log("立即支付");
	}
	const callPhone = () => {
		uni.makePhoneCall({
			phoneNumber:orderInfo.value.accept_user.phone_number
		});
	}
</script>

<style scoped>
	.orderDetail {
		height: 100%;
		background: #f9f9f9;
		padding: 0 30rpx;
	}

	.order_status {
		font-size: 48rpx;

	}

	.hui {
		color: #999;
	}

	.rider,
	.orderInfo,
	.header {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-top: 10rpx;
	}

	.head_text {
		padding: 10rpx 0;
		margin-bottom: 10rpx;
	}

	.text_mini {
		font-size: 24rpx;
		color: #999;
	}

	.tools {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 20rpx;
	}

	.tool_item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tool_item_text {
		margin-top: 15rpx;
		font-size: 26rpx;
		color: #666;
	}

	.orderInfo {
		margin-top: 10rpx;
	}

	.orderInfo_title {
		margin: 10rpx 0;
		font-weight: 600;
	}

	.orderInfo_item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 25rpx 0;
		font-size: 28rpx
	}

	.pickupCode {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 3em;
		padding: 20rpx;
		background-color: rgba(102, 249, 207, 0.3);
		color: #228666;
		border-radius: 20rpx;
		font-size: 28rpx;
		font-family: "微软雅黑";
		margin-bottom: 10rpx;
		font-weight: 600;
	}

	.codeNum {

		font-size: 42rpx;
		margin: 0 20rpx;
	}

	.toolBtn {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 10rpx 0;
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
</style>