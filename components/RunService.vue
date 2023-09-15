<template>
	<view class="runCard">
		<view class="runCard_top">
			<view class="cardTop_left">
				<view class="cardLabel">
					{{props.tag}}
				</view>
				<view class="cardMoney">
					佣金 <span class="moeneyNum">￥{{(props.cost)/100}}</span>
				</view>
			</view>
			<view class="cardTop_right">
				{{publishTimes}}发布
			</view>
		</view>
		<view class="runCard_content">
			<view class="runCard_Info">
				<u-icon name="bag-fill" color="#999" size="20"></u-icon>
				<span class="taskInfoText singe-line">{{props.detail}}</span>
			</view>
			<view class="runCard_Info">
				<u-icon name="map-fill" color="#999" size="20"></u-icon>
				<span class="taskInfoText singe-line"> {{props.to.address}}</span>
			</view>
			<view class="runCard_Info">
				<u-icon name="clock-fill" color="#999" size="20"></u-icon>
				<span class="taskInfoText singe-line">{{deadline}}</span>
			</view>
		</view>

		<view class="card_notes double-line">
			<view class="double-line note">
				{{props.note}}
			</view>
		</view>
		<u-button type="primary" class="tastBtn" @click="getTask">领取任务</u-button>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		computed
	} from 'vue'
	import {
		useStore
	} from "vuex";
	const store = useStore();
	const props = defineProps(['detail', "tag", "to", "deadLine", "CreatedTime", "cost", "id", "note"])
	const getTask = function() {
		uni.navigateTo({
			url: `/pages/order/orderReceiving/orderReceiving?id=${props.id}`
		})
	}
	const deadline = computed(() => {
		let time = new Date(props.deadLine)
		let day =time.getDate()
		let currentDay = new Date()
		currentDay=currentDay.getDate()
		let hours = time.getHours()
		let minutes = time.getMinutes()
		hours=hours<10?'0'+hours:hours
		minutes=minutes<10?'0'+minutes:minutes
		if(day==currentDay){
			return `今天${hours}:${minutes}之前`
		}else if(day-currentDay==1){
			return `明天${hours}:${minutes}之前`
		}else{
			return "订单已经过期"
		}
	})
	const publishTimes = computed(() => {
		let creatTime = Date.parse(props.CreatedTime)
		let currentTime = Date.parse(new Date())
		let diff = (currentTime - creatTime) / 1000
		if (diff < 30) {
			return '刚刚';
		} else if (diff < 3600) {
			return `${Math.ceil(diff / 60)}分钟前`;
		} else if (diff < 3600 * 24) {
			return `${Math.ceil(diff / 3600)}小时前`;
		} else if (diff < 3600 * 24 * 30) {
			return `${Math.ceil(diff /( 3600 *24))}天前`;
		} else {
			return '1个月前';
		}
	})
</script>

<style lang="scss" scoped>
	.runCard {
		background: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
	}

	.runCard_top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 85rpx;
		border-bottom: 1px solid rgba(102, 102, 102, 0.2);
	}

	.cardTop_left {
		display: flex;
		align-items: center;
	}

	.cardTop_right {
		color: #666;
		font-size: 22rpx
	}

	.cardMoney {
		display: flex;
		align-items: center;
		font-size: 35rpx;
		font-weight: 700;
	}

	.cardMoney .moeneyNum {
		font-size: 40rpx;
		color: #FF6530;
	}

	.runCard_Info {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
	}

	.runCard_Info .taskInfoText {
		margin-left: 20rpx;
		font-size: 24rpx;
	}

	.card_notes {
		background-color: #f7f7f7;
		border-radius: 10rpx;
		padding: 20rpx 30rpx;
		margin-bottom: 20rpx;
	}

	.note {
		color: #999;
		font-size: 24rpx;
	}

	.tastBtn {
		background-color: #FF6530;
		color: #fff;
		border: 0;
	}
</style>