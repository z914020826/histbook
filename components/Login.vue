<template>
	<!-- 	<button >获取手机号</button> -->
	<u-popup :show="show" mode="bottom" style="background-color: #fff;position: relative;">
		<view style="height: 400rpx;">
			<img src="../../static/image/LOGO.jpg" alt=""
				style="width: 74px;height: 74px;border-radius: 50%; position: absolute;left: 50%;right: 50%; transform: translate(-50%, -50%);">
			<view style="margin-top: 70px;" class="loginBtnContainer">
				<view class="phoneLogin"
					style="display: flex;justify-content: center;align-items: center;width: 80%;margin: 0 auto;">
					<u-button type="primary" shape="circle" @click="tempGetPhone" v-if="!checked">手机号一键登录</u-button>
					<u-button type="primary" shape="circle" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
						v-else>手机号一键登录</u-button>
				</view>
				<u-checkbox-group class="inhg">
					<u-checkbox shape="circle" size="small" @change="ridioChange"></u-checkbox>
					<span
						style="font-size: 12px;color: #888;display: inline-flex;align-items: center;">我已阅读并同意《用户须知》《隐私政策》
					</span>
				</u-checkbox-group>
			</view>
		</view>
	</u-popup>
</template>

<script setup>
	import {
		onMounted,
		ref,
		defineProps
	} from "vue";
	import {
		getPhoneNum
	} from "../api/index.js"
	import {
		useStore
	} from "vuex";
	const store = useStore();
	const props = defineProps(['show'])
	const checked = ref(false)
	const emits = defineEmits(['changeShow'])
	const getPhoneNumber = async (e) => {
		console.log("e123", e);
		if (e.detail.code && e.detail.errMsg == "getPhoneNumber:ok") {
			store.dispatch("getPhoneNum", e.detail.code)
			emits("changeShow", false)
		} else {
			uni.showToast({
				icon: "none",
				duration: 4000,
				title: "获取手机号失败，请重试~"
			});
		}
	}

	function tempGetPhone() {
		uni.showToast({
			icon: "none",
			duration: 4000,
			title: "请同意用户协议"
		});
	}

	function ridioChange() {
		checked.value = !checked.value
	};
</script>

<style>
	.loginBtnContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.phoneLogin {
		margin-bottom: 50rpx !important;
	}
</style>