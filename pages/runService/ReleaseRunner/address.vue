<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" v-model="people" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
                <view class="format" v-if="!isPhone">
                    手机号格式不正确
                </view>
				<input type="text" @blur="verifyphone" v-model="phone" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item">
				<view class="left">地址</view>
				<input type="text" v-model="address" placeholder-class="line" placeholder="如河南科技学院" />
			</view>
			<view class="item address" style="border-bottom: none;">
				<view class="left">详细地址</view>
				<textarea v-model="detailAddress" type="text" placeholder-class="line" placeholder="9b106" />
			</view>
            <view class="use-btn-view">
                <button class="use-btn" @click="addAddress">保存并使用</button>
            </view>
		</view>
	</view>
</template>

<script setup>
    import {ref} from 'vue'
    import {useStore} from 'vuex'
    import {
    	onLoad
    } from '@dcloudio/uni-app'
    const store=useStore()
    const people=ref('')
    const phone=ref('')
    const address=ref('')
    const detailAddress=ref('')
    const id=ref()
    let upt=ref(false)
    let i=ref()
    onLoad((options)=>{
        if(options.i==0){
            i.value=options.i
        }
        console.log(options.name);
        if(options.name!=undefined){
            upt.value=true
            people.value=options.name
            phone.value=options.phone
            address.value=options.address
            detailAddress.value=options.detailAddress
            id.value=options.id
            
        }
        console.log(upt.value);
    })

function setDefault(e) {
    console.log(555,e.detail.value);
}
function addAddress(){
    let data={
        user_name:people.value,
        user_phone_number:phone.value,
        address:address.value,
        detail_address:detailAddress.value
    }
    if(upt.value){
        console.log(111);
        data.id=id.value
        store.dispatch("updateAddress",data)
    }else{
        console.log(222);
            store.dispatch("addAddress",data)
    }
    uni.redirectTo({
        url:`/pages/runService/ReleaseRunner/allAddress?i=${i.value}`
    })
}

// 验证
let isPhone=ref(true)
const verifyphone=()=>{
    console.log(2122,uni.$u.test.mobile(phone.value));
    if(!uni.$u.test.mobile(phone.value)){
        isPhone.value=false
    }else{
        isPhone.value=true
    }
}

</script>

<style lang="scss" scoped>
    .format{
            position: absolute;
            right: 10px;
            color: red;
            font-size: 14px;
    }
	:v-deep(.line) {
		color: $u-light-color;
		font-size: 28rpx;
	}

	.wrap {
		background-color: #f2f2f2;

		.top {
			background-color: #ffffff;
			border-top: solid 2rpx $u-border-color;
			padding: 22rpx;

			.item {
				display: flex;
				font-size: 32rpx;
				line-height: 100rpx;
				align-items: center;
				border-bottom: solid 2rpx $u-border-color;

				.left {
					width: 180rpx;
				}

				input {
					text-align: left;
				}
			}

			.address {
				padding: 20rpx 0;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}
			}

			.site-clipboard {
				padding-right: 40rpx;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}

				.clipboard {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					color: $u-tips-color;
					height: 80rpx;

					.icon {
						margin-top: 6rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

		.bottom {
			margin-top: 20rpx;
			padding: 30rpx;
			background-color: #ffffff;
			font-size: 28rpx;

			.tag {
				display: flex;

				.left {
					width: 160rpx;
				}

				.right {
					display: flex;
					flex-wrap: wrap;

					.tags {
						width: 140rpx;
						padding: 16rpx 8rpx;
						border: solid 2rpx $u-border-color;
						text-align: center;
						border-radius: 50rpx;
						margin: 0 10rpx 20rpx;
						display: flex;
						font-size: 28rpx;
						align-items: center;
						justify-content: center;
						color: $u-content-color;
						line-height: 1;
					}

					.plus {
						//padding: 10rpx 0;
					}
				}
			}

			.default {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: solid 2rpx $u-border-color;
				line-height: 64rpx;

				.tips {
					font-size: 24rpx;
				}

				.right {}
			}
		}
	}

	.use-btn {
		border-radius: 50px;
		background-color: #FF6530;
		color: #ffffff;
		font-size: 30rpx;
	}
</style>