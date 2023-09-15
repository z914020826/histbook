<template>
	<view class="orderReceive">
		<view
			style="display: flex; margin-bottom: 10rpx; border-radius: 10px;background-color: #fff; padding: 25rpx 30rpx;font-size: 18px;font-weight: 600;">
			{{recive ?"您已接单":"订单详情" }} <u-icon name="arrow-right" bold="true"></u-icon>
		</view>
		<view class="orderReceive-content">
			<view class="orderReceive-content-header">
				<view class="order-number">
					<view class="order-number-time">
						{{remainTime=="订单已超时" ? "" : "送货还剩"}}<span style="color: #FF6530;">{{remainTime}}</span>
					</view>
					<!-- <view class="order-number-odd">
						#377
					</view> -->
				</view>
				<view class="orderReceive-content-header-address">
					<u-steps direction="column" dot="true" active-color="#FF6530">
						<u-steps-item :title="from.address" :desc="from.detail_address">
						</u-steps-item>
						<u-steps-item :title="to.address" :desc="from.detail_address">
						</u-steps-item>
					</u-steps>
				</view>
			</view>
			<view class="orderReceive-content-detail">
				<view class="content-detail-title">
					订单信息
				</view>
				<view class="content-detail-item" v-if="recive">
					<view class="content-detail-key">
						订单编号
					</view>
					<view class="content-detail-value">
						{{id}}
					</view>
				</view>
				<view class="content-detail-item">
					<view class="content-detail-key">
						期望送达
					</view>
					<view class="content-detail-value">
						{{deadLine}}
					</view>
				</view>
				<view class="content-detail-item">
					<view class="content-detail-key">
						订单详情
					</view>
					<view class="content-detail-value">
						{{detail}}
					</view>
				</view>
				<view class="content-detail-item">
					<view class="content-detail-key">
						备注
					</view>
					<view class="content-detail-value">
						{{note}}
					</view>
				</view>
				<view class="content-detail-item">
					<view class="content-detail-key">
						标签
					</view>
					<view class="content-detail-value">
						{{tag}}
					</view>
				</view>
				<view class="content-detail-item">
					<view class="content-detail-key">
						取货联系人
					</view>
					<view class="content-detail-value">
						{{from.user_name}}
					</view>
				</view>
				<view class="content-detail-item">
					<view class="content-detail-key">
						联系人电话
					</view>
					<view class="content-detail-value">
						{{from.user_phone_number}}
					</view>
				</view><view class="content-detail-item">
					<view class="content-detail-key">
						送货联系人
					</view>
					<view class="content-detail-value">
						{{to.user_name}}
					</view>
				</view>
				<view class="content-detail-item">
					<view class="content-detail-key">
						联系人电话
					</view>
					<view class="content-detail-value">
						{{to.user_phone_number}}
					</view>
				</view>
			</view>
			<view class="orderReceive-content-income">
				<view class="orderReceive-content-income-text">
					订单收入
				</view>
				<view class="orderReceive-content-income-money">
					￥ {{cost}}
				</view>
			</view>
			<view class="orderReceive-content-footer">
				<view class="content-footer-icons">
					<view class="footer-icons-items">
						<view class="footer-icons-items-key">
							<u-icon name="phone-fill" size="18" color="#333"></u-icon>
						</view>
						<view class="footer-icons-items-value">
							联系
						</view>
					</view>
					<view class="footer-icons-items">
						<view class="footer-icons-items-key">
							<u-icon name="error" size="18" color="#333"></u-icon>
						</view>
						<view class="footer-icons-items-value">
							遇到问题
						</view>
					</view>
					<view class="footer-icons-items">
						<view class="footer-icons-items-key">
							<u-icon name="reload" size="18" color="#333"></u-icon>
						</view>
						<view class="footer-icons-items-value">
							转单
						</view>
					</view>
				</view>
				<view class="content-footer-btn">
					<button @click="delivery" class="f-button"> {{ recive ? "已送达":"立即接单"}}</button>
				</view>
			</view>
		</view>
	</view>
	<u-popup :show="show" @close="close" closeable="true" :round="10" mode="bottom">
		<view class="order-pop">
			<view class="order-pop-title">
				请输入取货码
			</view>
			<view class="order-pop-content">
				取货码为4位，通过用户获取取货码输入即算订单完成
			</view>
			<u-code-input v-model="value" :maxlength="4" @finish="finishCode"></u-code-input>
			<view class="order-pop-btn">
				<u-button type="primary" @click="submitPick">提交</u-button>
			</view>
		</view>
	</u-popup>
</template>

<script setup>
	import {
		ref,
		onMounted,
		computed,
        reactive
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useStore
	} from "vuex";
import { ErrandDetail,getOrderDetail } from '../../../api/run';
	const store = useStore();
	const show = ref(false)
	const recive = ref(false)
	const id = ref('')
	const code = ref(0)
    
    let errandDetail=reactive();
    const deadLine=ref("")
    const remainTime=ref("")
    const from=ref("")
    const to=ref("")
    const detail=ref("")
    const cost=ref(0)
    const note=ref("")
    const tag=ref("")
    const pickupContact=ref("")
    let orderDetail=reactive()
    let orderId=ref("")
    let nowTime=Date.now()
	onLoad(options => {
            id.value = options.id
	})
    onMounted(()=>{
        // store.dispatch("getOpenId")
        if(id.value==undefined){
            recive.value=true
            orderId.value=store.state.runPage.orderId
            store.dispatch("getOrderDetail",orderId.value).then(()=>{
                console.log(777,recive.value)
                orderDetail=store.state.runPage.orderInfo
                deadLine.value=orderDetail.Errand.deadline
                from.value=orderDetail.Errand.from
                to.value=orderDetail.Errand.to
                detail.value=orderDetail.Errand.detail
                note.value=orderDetail.Errand.note
                tag.value=orderDetail.Errand.tag
                pickupContact.value=orderDetail.Errand.to.user_name
                cost.value=orderDetail.Errand.cost
                id.value=orderDetail.ID
                // 倒计时
                let deadTime=Date.parse(deadLine.value.replace(/-/g, '/'))
                console.log(555,nowTime,deadTime)
                countDown(deadTime-nowTime)
                console.log(777,deadLine.value,from.value,to.value,detail.value,cost.value,id.value)
            })
        }else{
            store.dispatch("errandDetail",id.value).then(()=>{
                errandDetail=store.state.runPage.ErrandInfo
                if(errandDetail.status==0){
                    recive.value=false
                }else{
                    recive.value=true
                }
                deadLine.value=errandDetail.deadline
                from.value=errandDetail.from
                to.value=errandDetail.to
                detail.value=errandDetail.detail
                note.value=errandDetail.note
                tag.value=errandDetail.tag
                pickupContact.value=errandDetail.to.user_name
                cost.value=errandDetail.cost
                console.log(555,errandDetail.deadline);
            // 倒计时
            let deadTime=Date.parse(deadLine.value.replace(/-/g, '/'))
            console.log(555,to.value)
            countDown(deadTime-nowTime)
            })
        }

    })
    function countDown(time){
        console.log("time");
        if(time<=1){
            remainTime.value="订单已超时"
            return
        }
        let d = time/1000/60/60/24
        let h=time/1000/60/60-d
        let m=time/1000/60-h
        if(h<1){
            remainTime.value=`${Math.floor(m)}分钟`
        }else if(h>1 && d<1){
            remainTime.value=`${Math.floor(h)}时${Math.floor(m)}分钟`
        }else if(h>1 && d>1){
            remainTime.value=`${Math.floor(d)}天${Math.floor(h)}时${Math.floor(m)}分钟`
        }
        setTimeout(()=>{countDown(time-60000)},60000)
        
    }
	function finishCode(e) {
		code.value = e
	}
	function delivery() {
		if (recive.value) {
			show.value = true
		} else {
			console.log("去接单", id.value)
			store.dispatch("receiveOrder", parseInt(id.value)).then(()=>{
                
                uni.redirectTo({
                    url:'/pages/order/orderReceiving/orderReceiving'
                })
            })
		}
	}

	function close() {
		show.value = false
	}

	function submitPick() {
		if (code.value == 0) {
			uni.showToast({
				message: "请填写完整验证码"
			})
			return
		}
		let data = {
			id: parseInt(id.value),
			code: parseInt(code.value)
		}
		console.log(data)
		store.dispatch("checkCode", data)
        if(store.dispatch("checkCode", data)){
            show.value=false
        }
	}
</script>

<style>
	.order-pop {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx 0;
	}

	.order-pop-content {
		font-size: 12px;
		color: #999;
		margin-top: 25rpx;
		margin-bottom: 25rpx;
	}

	.order-pop-title {
		font-size: 18px;
		font-weight: 600;
	}

	.order-pop-btn {
		margin-top: 35rpx;
	}

	.orderReceive {
		background-color: #f1f1f1;
		padding: 0 15rpx;
		height: 100vh;
	}

	.orderReceive-content {
		position: relative;
		height: 100vh;
		background-color: #fff;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		padding: 25rpx 25rpx;
	}

	.orderReceive-content-header {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid #dcdcdc;
		padding-bottom: 25rpx;
	}

	.order-number {
		display: flex;
		justify-content: space-between;
		margin-bottom: 25rpx;
	}

	.order-number-time {
		font-size: 16px;
		font-weight: 550;
	}

	.order-number-odd {
		font-size: 18px;
		font-weight: 550;
	}

	.orderReceive-content-income {
		display: flex;
		justify-content: space-between;
		font-size: 15px;
		font-weight: 550;
		padding-bottom: 25rpx;
		border-bottom: 1px solid #dcdcdc;
		margin-top: 25rpx;
	}

	.orderReceive-content-income-money {
		color: #FF6530;
	}

	.orderReceive-content-detail {
		display: flex;
		flex-direction: column;
		padding-bottom: 25rpx;
		border-bottom: 1px solid #dcdcdc;
		margin-top: 25rpx;
	}

	.content-detail-title {
		font-size: 16px;
		font-weight: 600;
	}

	.content-detail-item {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		align-items: center;
	}

	.content-detail-key {
		font-size: 14px;
	}

	.content-detail-value {
		font-size: 12px;
		color: #666;
	}

	.orderReceive-content-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 25rpx;
		right: 40rpx;
		left: 40rpx;
		border-top: 1px solid #dcdcdc;
		padding-top: 25rpx;
        background-color: #fff;
	}

	.content-footer-icons {
		display: flex;
	}

	.content-footer-btn {
		display: flex;
		flex-flow: 1;
		font-size: 14px;
	}

	.footer-icons-items {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.footer-icons-items-value {
		font-size: 10px;
		padding: 0 20rpx;
		color: #333;
	}

	.f-button {

		font-size: 14px;
		background-color: #FF6530;
		color: #fff;
		width: 350rpx;
	}
</style>