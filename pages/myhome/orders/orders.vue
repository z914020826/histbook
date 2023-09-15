<!-- 我发布的页面 -->
<template>
	<view class="orderMain">
		<uni-segmented-control :current="current" :values="list" @clickItem="onClickItem" styleType="text"
			activeColor="#FF6530"></uni-segmented-control>
		<view class="content">
			<view class="orderItem" v-for="orderItem in tempOrderList">
				<orderItem :errandId="orderItem.ID" :status="orderItem.status" :detail="orderItem.detail"
					:from="orderItem.from" :to="orderItem.to" :cost="orderItem.cost" :user_id="orderItem.user_id"
					:head_image="orderItem.head_image" :tag="orderItem.tag" :CreatedAt="orderItem.CreatedAt"></orderItem>
			</view>
		</view>
		<u-loadmore status="nomore" />
	</view>
</template>

<script setup>
	import orderItem from "../../../components/orderItem.vue"
	import {
		computed,
		reactive,
		ref,
	} from "vue";
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useStore
	} from "vuex";
	const store = useStore();

	let list = reactive(['全部', '已接单', '已完成', '待支付', '已取消'])
	let current = ref(0)
	let OrderList = reactive([])
	const orderList = computed(() => {
		return store.state.runPage.myOrder
	})
	let tempOrderList = reactive(orderList)
	onLoad((e) => {
		store.dispatch("checkMyPublish").then(() => {
			changeOrderShow(e.index)
		})
	})
	const onClickItem = (e) => {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex;
			changeOrderShow(e.currentIndex)
		}
	}
	const changeOrderShow = (currentIndex) => {
		if (currentIndex == 0) {
			tempOrderList = orderList
		} else if(current==4){
			tempOrderList = orderList.value.filter(()=>{
				return orderItem.status>=4
			})
		}else {
			// 0:发布成功,1:已接单,2:完成状态,3:未支付,4:取消状态，5:已超时
			tempOrderList = orderList.value.filter((OrderItem) => {
				return OrderItem.status == currentIndex
			})
		}
	}
</script>

<style>
	.orderMain {
		height: 100%;
		background: #f9f9f9;
		padding: 0 30rpx;
	}
</style>