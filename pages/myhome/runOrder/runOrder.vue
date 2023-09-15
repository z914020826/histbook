<!-- 骑手接单页面 -->
<template>
	<view class="runOrderMain">
		<uni-segmented-control :current="current" :values="list" @clickItem="onClickItem" styleType="text"
			activeColor="#FF6530"></uni-segmented-control>
		<view class="content">
			<view class="runOrderItem">
				<runOrderItem v-for="item in tempOrderList" :orderId="item.ID" :status="item.status"
					:detail="item.Errand.detail" :cost="item.Errand.cost">
				</runOrderItem>
			</view>
		</view>
		<u-loadmore status="nomore" />
	</view>
</template>

<script setup>
	import runOrderItem from "../../../components/runOrderItem.vue"

	import {
		computed,
		reactive,
		ref,
	} from "vue";
	import {
		onLoad
	} from '@dcloudio/uni-app'
	// 引入vuex
	import {
		useStore
	} from "vuex";
	// 把vuex实例化
	const store = useStore();

	// 四个部分
	let list = reactive(['全部订单', '待完成', '已完成', '已取消'])
	// 四大部分的id
	let current = ref(0)
	// 全部数据
	const orderList = computed(() => {
		return store.state.myhomePage.acceptData
	})
	// 筛选出来的数据
	let tempOrderList = reactive(orderList)
	// 加载之后
	onLoad((e) => {
		// 在这个页面调用了checkAccept方法(调接口),调接口之后才能使用接口给orderList赋值
		store.dispatch("checkAccept").then(() => {
			// 过滤
			changeOrderShow(e.index)
		})

	})
	// 四大部分的点击事件
	const onClickItem = (e) => {
		console.log(e);
		// current:四大部分的id		currentIndex:接单事件的id
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex;
			changeOrderShow(e.currentIndex)
		}
	}

	// 过滤
	const changeOrderShow = (currentIndex) => {
		if (currentIndex == 0) {
			tempOrderList = orderList
		} else {
			// orderList:全部数据	tempOrderList:筛选出来的数据
			tempOrderList = orderList.value.filter((orderItem) => {
				return orderItem.status == currentIndex
			})
		}
	}
</script>

<style>
	.runOrderMain {
		height: 100%;
		background: #f9f9f9;
		padding: 0 30rpx;
	}
</style>