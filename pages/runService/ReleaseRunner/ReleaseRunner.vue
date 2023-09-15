<template>
	<view class="add-run">
		<view class="run-header">
			<view class="run-header-cancel" @click="cancel">
				取消
			</view>
			<view class="run-header-issue" @click="commit">
				发布
			</view>
		</view>
		<view class="run-message">
			<u--textarea v-model="detail" height="100" placeholder="请输入您的商品信息,送件要求.示例:帮我去瑞幸取一杯咖啡,取餐码为875"
				border="bottom"></u--textarea>
		</view>
		<view class="run-detail">
			<!-- 收货地址 -->
			<view class="take-item" @click="toAdress(0)">
				<view style="display: flex;align-items: center;">
					<i class="iconfont icon-daohangdizhi left-icon" style="color:cornflowerblue;"></i>
					<view class="write" v-if="hasTake">
						填写收货地址
					</view>
					<view v-else class="item" :key="take.id">
						<view class="top">
							<view class="name">{{ take.name }}</view>
							<view class="phone">{{ take.phone }}</view>
						</view>
						<view class="bottom">
							{{ take.detail }} {{ take.site }}
						</view>
					</view>
				</view>
				<u-icon name="arrow-right" color="#c5c5c5" size="18"></u-icon>
			</view>
			<!-- 取货地址 -->

			<view class="take-item" @click="toAdress(1)">
				<view style="display: flex;align-items: center;">
					<i class="iconfont icon-paotuiAPP left-icon" style="color:cornflowerblue;"></i>
					<view class="write" v-if="hasPick">
						填写收货地址
					</view>
					<view class="item" v-else>
						<view class="top">
							<view class="name">{{ pick.name }}</view>
							<view class="phone">{{ pick.phone }}</view>
						</view>
						<view class="bottom">
							{{ pick.detail }} {{ pick.site }}
						</view>
					</view>
				</view>
				<u-icon name="arrow-right" color="#c5c5c5" size="18"></u-icon>
			</view>
			<!-- 佣金 -->
			<view class="detail-item">
				<view class="item-left">
					<i class="iconfont icon-emijiage left-icon" style="color: brown;"></i>
					<span style="font-size: 14px;">佣金</span>
				</view>
				<view class="item-right">
					<input @blur="hideInput" placeholder="佣金越高接单越快" v-if="updateMoney" type="text" v-model="money"
						style="background: none;font-size: 12px;width:230rpx;">
					<span v-else class="right-content" @click="showInput" :class="{ 'moneyCss': money != '' }">{{ money ==
						'' ? ""
						: '￥' + money }}</span>
				</view>
			</view>
			<!-- 备注 -->
			<view class="detail-item" @click="toRemark">
				<view class="item-left">
					<i class="iconfont icon-beizhu left-icon" style="font-size: 18px;color: #666aff;"></i>
					<span style="font-size: 14px;">备注</span>
				</view>
				<view class="item-right">
					<span class="right-content">{{ remark == '' ? "备注" : remark }}</span>
					<u-icon name="arrow-right" color="#c5c5c5" size="12"></u-icon>
				</view>
			</view>
			<!-- 收货时间 -->
			<view class="detail-item" @click="takeGoods">
				<view class="item-left">
					<i class="iconfont icon-shijian left-icon" style="color: coral;"></i>
					<span style="font-size: 14px;">收货时间</span>
				</view>
				<view class="item-right">
					<span class="right-content">{{ time == '' ? "请选择取货时间" : time }}</span>
					<u-icon name="arrow-right" color="#c5c5c5" size="12"></u-icon>
				</view>
			</view>
			<!-- 分类 -->
			<view class="detail-item" @click="toClassify">
				<view class="item-left">
					<i class="iconfont icon-fenlei left-icon" style="color: darkkhaki;"></i>
					<span style="font-size: 14px;">分类</span>
				</view>
				<view class="item-right">
					<span class="right-content">{{ classify == '' ? "请选择分类标签" : classify }}</span>
					<u-icon name="arrow-right" color="#c5c5c5" size="12"></u-icon>
				</view>
			</view>
		</view>
	</view>

	<u-popup :show="goodShow" mode="bottom" @close="goodclose" closeable="true" style="background-color: #fff;" :round="10">
		<view class="goods">
			<view class="goods-title">
				请输入您的备注
			</view>
			<u--textarea height="100" v-model="text" placeholder="请输入内容" border="bottom"></u--textarea>
			<view class="goods-btn">
				<u-button shape="circle" type="primary" text="确定" @click="goodconfrim"></u-button>
			</view>
		</view>
	</u-popup>
	<u-picker :show="module === 'time'" :columns="columns" @cancel="close" @confirm="confirm"
		@change="changeHandler"></u-picker>
	<u-picker :show="module === 'classify'" :columns="fenlei" @cancel="close" @confirm="confirm"></u-picker>
	<u-popup round="10" :show="alart" mode="center" @close="alartClose" @cancel="close">
		<view style="display: flex;flex-direction: column;padding: 30rpx;">
			<view class="aTitle" style="font-size: 20px;display: flex;color: #FF6530;">
				<u-icon size="20" color="#FF6530" name="info-circle"></u-icon>
				<span style="padding-left: 20rpx;">提示</span>
			</view>
			<view class="aText" style="font-size: 14px;color: #666;margin-top: 45rpx;margin-bottom: 45rpx;">
				骑手接单后不可修改或取消订单,请您仔细核对信息是否正确
			</view>
			<view class="aBtn" style="display: flex;justify-content: space-around;">
				<button shape="circle" @click="aCancel" style="flex:1;border-radius: 15rpx;
    font-size: 30rpx;">取消</button>
				<span style="display: inline-block;width: 40rpx;"></span>
				<button class="aCommit" @click="aCommit">确定提交</button>
			</view>
		</view>
	</u-popup>
</template>

<script setup>
import { useStore } from "vuex";
import {
	ref,
	reactive,
	onMounted,
	computed, nextTick
} from 'vue';
import {
	onLoad, onShow
} from '@dcloudio/uni-app'
const hasTake = ref(true)
const hasPick = ref(true)
let take = reactive({})
let pick = reactive({})

onShow(() => {
	console.log(555);
	console.log(777, store.state.runPage.take.name);
	if (store.state.runPage.take.name != undefined) {
		hasTake.value = false
		take = store.state.runPage.take
	}
	if (store.state.runPage.pick.name != undefined) {
		hasPick.value = false
		pick = store.state.runPage.pick
	}
})
onMounted(() => {
	store.dispatch("OrderTags")

})
const store = useStore();
const updateMoney = ref(true)
function showInput() {
	updateMoney.value = true
}
function hideInput() {
	updateMoney.value = false
}
// 选择器数据
// const classifyColumns=ref([])
const fenlei = computed(() => {
	return [store.state.runPage.tags]
})
const columns = ref([
	['今天', '明天'],
	['深圳', '厦门', '上海', '拉萨'],
	['深圳', '厦门', '上海', '拉萨']
])
const columnData = ref([
	['深圳', '厦门', '上海', '拉萨'],
	['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
		'17', '18', '19', '20', '21', '22', '23'
	]
])
const columnDataT = ref([
	[],
	['00', '10', '20', '30', '40', '50']
])
let day, month, year, hour;

function takeGoods() {
	module.value = 'time'
	let date = new Date();
	year = date.getFullYear();
	day = date.getDate();
	month = date.getMonth() + 1;
	hour = date.getHours();
	let minute = date.getMinutes();
	let h = 24,
		m = 60;
	let arrH = [];
	let arrM = [];
	if (minute > 50) {
		hour++
	}
	while (h - hour > 0) {
		let h = hour++
		arrH.push(h.toString())
	}
	// minute++
	console.log(999, minute)
	if (minute > 50) {
		arrM.push("00")
		minute = 0
	}
	while (m - minute > 0) {
		console.log(333)
		if (minute < 10) {
			arrM.push("10")
		} else if (minute > 10 && minute <= 20) {
			arrM.push("20")
		} else if (minute > 20 && minute <= 30) {
			arrM.push("30")
		} else if (minute > 30 && minute <= 40) {
			arrM.push("40")
		} else if (minute > 40 && minute <= 50) {
			arrM.push("50")
		}
		minute += 10
	}
	columns.value[1] = arrH
	columnData.value[0] = arrH
	columns.value[2] = arrM
	columnDataT.value[0] = arrM
}

function changeHandler(e) {
	const {
		columnIndex,
		index,
	} = e
	if (columnIndex === 0) {
		columns.value[1] = columnData.value[index]
	}
	if (columnIndex === 1) {
		let i = index
		if (index > 1) i = 1
		columns.value[2] = columnDataT.value[i]
	}
}
// 点击展示不同pop框
const goodShow = ref(false)
const module = ref('')
function toAdress(i) {
	uni.navigateTo({
		url: `/pages/runService/ReleaseRunner/allAddress?i=${i}`
	})
}

function close() {
	module.value = '';
	goodShow.value = false
	console.log(module.value)
}

function goodclose() {
	goodShow.value = false
}


function toRemark() {
	goodShow.value = true
	module.value = 'remark'
	console.log(remark.value)
}

function toClassify() {
	goodShow.value = true
	module.value = 'classify'
	console.log(module.value)
}

// 数据提交展示到页面
const detail = ref('')
const text = ref('')
const consignee = ref('')
const money = ref('')
const time = ref('')
const classify = ref('')
const remark = ref('')
let min = 0;

function goodconfrim() {
	remark.value = text.value
	goodShow.value = false
	text.value = ''
}
function confirm(array) {
	console.log(4444, array.value[0] == "今天" ? day : day++)
	if (module.value == 'time') {
		min = array.value[1] + ":" + array.value[2]
		time.value = `${month}月${array.value[0] == "今天" ? day : day++}日` + " " + min
		console.log(5555, time.value)
	} else {
		classify.value = array.value[0]
	}
	module.value = ''
	goodShow.value = false
}
// 提交
const alart = ref(false)

function commit() {
	alart.value = true
}

function alartClose() {
	alart.value = false
}

function aCancel() {
	alart.value = false
}

function aCommit() {
	if (remark.value == '' || classify.value == '' || hasTake.value || hasPick.value || detail.value == '' || money.value == '' ||
		time.value == '') {
		uni.showModal({
			title: '有信息未完善'
		})
		alart.value = false
		return
	}
	// 成功发布
	alart.value = false
	let data = {
		tag: classify.value,
		from_address_info_id: take.id,
		to_address_info_id: pick.id,
		detail: detail.value,
		note: remark.value,
		cost: parseInt(parseFloat(money.value) * 100),
		deadline: `${year}-${month < 10 ? '0' + month : month}-${day}` + " " + `${min}:00`
	}
	console.log(data)
	store.dispatch("AddOrder", data).then(() => {
		console.log(999, store.state.runPage.ErrandInfo);
		let data = {
			out_trade_no: `${store.state.runPage.ErrandInfo}`,
			description: detail.value,
			amount: parseInt(parseFloat(money.value) * 100)
		}
		console.log(999, data);
		store.dispatch("wxPay", data).then(() => {
			let data = store.state.runPage.payData
			wx.requestPayment(
				{
					"timeStamp": data.timeStamp,
					"nonceStr": data.nonceStr,
					"package": data.package,
					"signType": data.signType,
					"paySign": data.paySign,
					"success": function (res) {
						uni.reLaunch({
							url:"/pages/index/index",
						})
						uni.showToast({
							icon:"success",
							title:"发布成功"
						})
					},
					"fail": function (res) {
						console.log("fail", res);
					},
					"complete": function (res) {
						console.log("complete", res);
					}
				})
		})
	})
}

function cancel() {
	uni.navigateBack()
}
</script>

<style lang="scss">
.write {
	font-weight: 600;
	color: #333;
}

.take-item {
	display: flex;
	padding: 40rpx 30rpx;
	align-items: center;
	justify-content: space-between;
}

.item {
	// padding: 20rpx 0;
	margin-left: 20rpx;

	.top {
		display: flex;
		font-weight: bold;
		font-size: 30rpx;

		.phone {
			margin-left: 60rpx;
		}

		.tag {
			display: flex;
			font-weight: normal;
			align-items: center;

			text {
				display: block;
				width: 60rpx;
				height: 34rpx;
				line-height: 34rpx;
				color: #ffffff;
				font-size: 20rpx;
				border-radius: 6rpx;
				text-align: center;
				margin-left: 30rpx;
				background-color: rgb(49, 145, 253);
			}

			.red {
				background-color: red
			}
		}
	}

	.bottom {
		display: flex;
		margin-top: 20rpx;
		font-size: 26rpx;
		justify-content: space-between;
		color: #999999;
	}
}

.aCommit {
	flex: 1;
	color: #fff;
	border-radius: 15rpx;
	font-size: 30rpx;
	background-color: #FF6530;
	border-color: #FF6530;
	border-width: 1px;
	border-style: solid;
}

.goods {
	display: flex;
	flex-direction: column;
	padding: 15rpx;
}

.goods-btn {
	margin-top: 60rpx;
}

.goods-title {
	font-size: 18px;
	font-weight: 600;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 40rpx;
}

.run-header-cancel {
	padding: 15rpx 30rpx;
	background-color: #e6e6e6;
	border-radius: 30rpx;
	font-size: 12px;
	color: #333;
}

.run-header-issue {
	padding: 15rpx 30rpx;
	background-color: rgb(255, 239, 117);
	border-radius: 30rpx;
	font-size: 12px;
	color: #333;
}

.run-header {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 30rpx;
}

.right-content {
	font-size: 12px;
	margin-right: 15rpx;
	color: #999;
}

.moneyCss {
	color: rgb(225, 44, 49);
}

.add-run {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.run-detail {
	display: flex;
	flex-direction: column;
}

.detail-item {
	display: flex;
	justify-content: space-between;
	padding: 40rpx 30rpx;
	/* border-bottom: 1px solid #e3e3e3; */
}

.item-left {
	display: flex;
	align-items: center;
}

.item-right {
	display: flex;
	align-items: center;
}

.left-icon {
	margin-right: 15rpx;
}

.arrow-right {
	color: #999;
}
</style>