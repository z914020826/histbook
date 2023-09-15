<template>
	<view class="userInfoCard">

		<view class="headContent">
			<view class="empty"></view>
			<button class="userImgBtn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<view class="headImg">
					<img :src="model1.userInfo.head_image" alt="">
				</view>
			</button>
		</view>
		<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
			<u-form-item label="用户名" prop="userInfo.name" borderBottom ref="item1">
				<u--input v-model="model1.userInfo.name" border="none" class="inputHeight" type="nickname"></u--input>
			</u-form-item>
			<u-form-item label="性别" prop="userInfo.sex" borderBottom @click="showSelectSex" ref="item1">
				<u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
					border="none"></u--input>
				<template #right>
					<u-icon name="arrow-right"></u-icon>
				</template>
			</u-form-item>
			<u-form-item label="手机号" prop="userInfo.sex" borderBottom ref="item1">
				<u--input v-model="model1.userInfo.phone" disabled disabledColor="#ffffff" border="none"></u--input>
			</u-form-item>
		</u--form>

		<u-button type="primary" class="saveInfoBtn" @click="savaUserInfo">保存信息</u-button>

		<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false" @select="sexSelect">
		</u-action-sheet>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		computed,
		onMounted,
		getCurrentInstance
	} from 'vue'

	import {
		useStore
	} from "vuex";

	const store = useStore();
	let showSex = ref(false)
	const userInfo = computed(() => {
		return store.state.indexPage.userInfo
	})
	let model1 = reactive({
		userInfo: {
			name: userInfo.value.nickname,
			sex: userInfo.value.gender,
			phone: userInfo.value.phone_number,
			head_image: userInfo.value.head_image
		},
	})
	const rules = reactive({
		'userInfo.name': {
			type: 'string',
			required: true,
			message: '请填写姓名',
			trigger: ['blur', 'change']
		},
		'userInfo.sex': {
			type: 'string',
			max: 1,
			required: true,
			message: '请选择男或女',
			trigger: ['blur', 'change']
		},
	})
	const actions = reactive([{
			name: '男',
		},
		{
			name: '女',
		}
	])

	function showSelectSex() {
		showSex.value = true;
		hideKeyboard()
	}

	function sexSelect(e) {
		model1.userInfo.sex = e.name
	}

	function onChooseAvatar(e) {
		console.log(e);
		const {
			avatarUrl
		} = e.detail
		model1.userInfo.head_image = avatarUrl
	}

	function savaUserInfo() {
		let data = {
			nickname: model1.userInfo.name,
			head_image: model1.userInfo.head_image,
			gender: model1.userInfo.sex
		}
		store.dispatch("changeUserInfo", data)
		setTimeout(() => {
			// uni.navigateBack({
			// 	delta: 1, //返回层数，2则上上页
			// })
			uni.reLaunch({
				url:"/pages/myhome/myhome"
			})
		}, 1000)
	}
</script>

<style scoped>
	.userInfoCard {
		padding: 0 20rpx;

	}

	.empty {
		width: 100%;
	}

	.userImgBtn {
		visibility: hidden;
	}

	.headContent {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 50rpx 0;
	}

	/deep/ .u-form-item__body__left {
		width: 130rpx !important;
	}

	/deep/ .u-form-item__body__left__content__label {
		font-size: 32rpx !important;

	}

	/deep/ .u-form-item__body {
		padding: 30rpx 0 !important;
		align-items: center !important;
		justify-content: space-between !important;
	}

	/deep/ .u-form-item__body__right {
		margin-left: 60rpx;
	}

	/deep/ .u-input__content__field-wrapper__field {
		font-size: 32rpx !important
	}

	.headImg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 200rpx;
		overflow: hidden;
		visibility: visible
	}

	/deep/ .u-button {
		margin-top: 100rpx;
	}
</style>