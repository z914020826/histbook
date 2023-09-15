<template>
	<view class="myMessage">
		<view class="messageHeader">
			<view class="messageLeft">
				<view class="messageText">
					消息
				</view>
				<view class="messageClear">
					<i class="iconfont icon-qingchu"></i>
					<span>清除未读</span>
				</view>
			</view>
			<!-- 字体图标 -->
			<view class="messageInstall">
				<u-icon name="search" color="#747373" size="58rpx"></u-icon>
				<i class="iconfont icon-shezhi"></i>
			</view>
		</view>

		<messageComponent inform="通知消息"></messageComponent>
		<messageComponent inform="互动消息" interaction="还没有新的互动消息~"></messageComponent>
		<view class="" v-for="item in unreadList" @click="detailMessage(item)">
			<messageComponent :total="item.total ? item.total : 0" :inform="item.from.nickname"
				:interaction="item.latest_msg.content" :headerImg="item.from.head_image"
				:time="getTime(item.latest_msg.CreatedAt)"></messageComponent>
		</view>
	</view>
</template>

<script setup>
	import messageComponent from '../../components/messageComponent.vue'
	import {
		useStore
	} from 'vuex'
	import {
		computed,
		onMounted
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import formatTime from '/util/formatTime.js'
	const store = useStore()
	const unreadList = computed(() => {
		return store.state.messagePage.unread
	})
	onShow(() => {
		store.dispatch("getUnread")
	})

	function getTime(time) {
		let date = new Date(time)
		let now = new Date()
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate()
		let hours = String(date.getHours()).padStart(2, "0")
		let minutes = String(date.getMinutes()).padStart(2, "0");
		let seconds = String(date.getMinutes()).padStart(2, "0");
		let timeDate = `${hours}:${minutes}:${seconds}`
		if (day != now.getDate() || month != now.getMonth()) {
			timeDate = `${month}月${day}日`
		}
		return timeDate
	}

	function detailMessage(item) {
		uni.navigateTo({
			url: `/pages/message/newsDetail/newsDetail?id=${item.from_id}&name=${item.from.nickname}&header=${item.from.head_image}`
		})
	}
</script>

<style>
	.myMessage {
		padding: 0 30rpx;
	}

	.messageHeader {
		display: flex;
		justify-content: space-between;
		padding-bottom: 10rpx;
		align-items: center;
	}

	.messageLeft {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.messageText {
		font-size: 22px;
		font-weight: 600;
		padding: 20rpx;
	}

	.messageInstall {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.messageClear {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		padding: 6rpx 14rpx;
		font-size: 24rpx;
		background-color: #f9f3f3;
		color: #999;
	}

	.icon-qingchu {
		padding-right: 8rpx;
		font-size: 27rpx;
	}

	.icon-shezhi {
		font-size: 44rpx;
		color: #747373;
		padding: 0 20rpx;
	}
</style>