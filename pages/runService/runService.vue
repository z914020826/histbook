<template>
	<div class="runService_main">
		<u-navbar title="跑腿服务" @rightClick="rightClick" :autoBack="true" bgColor="#FF6530" class="navbar"
			leftIconColor="#fff"></u-navbar>
		<view class="headBg">
			<u-search :showAction="false" class="search" margin="100rpx 0 0 0" placeholder="搜索感兴趣的订单/外卖/快递"
				v-model="keyword"></u-search>
		</view>
		<view class="runService_content">
			<view class="runImg">
				<view class="img_content">
					<img src="../../static/image/rowImg.jpeg" alt="">
				</view>
			</view>
			<view class="runService_card">
				<view class="title">
					<view class="title_before">
					</view>
					<uni-title type="h2" title="跑腿接单赚钱"></uni-title>
				</view>
				<view class="runList" v-for="orderItem in runServiceList" :key="orderItem.id">
					<RunService :detail="orderItem.detail" :tag="orderItem.tag" :to="orderItem.to"
						:deadLine="orderItem.deadline" :CreatedTime="orderItem.CreatedAt" :cost="orderItem.cost"
						:id="orderItem.ID" :note="orderItem.note"></RunService>
				</view>
				<u-loadmore status="nomore" />
			</view>

		</view>

	</div>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref
	} from "vue";
	import {
		useStore
	} from "vuex";
	import RunService from "../../components/RunService.vue"

	const store = useStore();

	onMounted(() => {
		store.dispatch("getAllOrder")
	})
	const keyword = ref("")

	const allOrder = computed(() => {
		return store.state.runPage.allOrder
	})
	const runServiceList = computed(() => {
		let temp = [...allOrder.value]
		return temp.filter((runItem) => {
			return runItem.detail.indexOf(keyword.value)!=-1 || runItem.to.address.indexOf(keyword.value)!=-1 ||runItem.tag.indexOf(keyword.value)!=-1
		})
	})

	console.log(allOrder);
</script>

<style scoped>
	.navbar {
		color: #f9f9f9;
	}

	.runService_main {
		height: 100%;
		background: #f9f9f9;
	}

	.headBg {
		width: 100%;
		height: 100rpx;
		height: 400rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FF6530;
		padding: 0 30rpx;
	}

	.img_content {
		background-color: #666;
		border-radius: 10rpx;
		width: 100%;
		height: 250rpx;
		overflow: hidden;
		border: 1px solid 666;
	}

	.img_content image {
		width: 100%;
		height: 100%;
	}

	.runService_content {
		padding: 0 30rpx;
		position: relative;
		top: -90rpx;
	}

	.option_item {
		margin: 0 30rpx;
		width: 70rpx;
	}

	.runService_card {
		margin-top: 30rpx;
	}
</style>