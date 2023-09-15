<template>
	<view class="allAddress">
		<view class="Address">
			<scroll-view class="scrollAddress" scroll-y="true">
				<view class="">
					<view class="item" v-for="item in address" v-if="address.length!=0"
						@click="select(item.user_name,item.user_phone_number,item.address,item.detail_address,item.ID)">
						<view class="">
							<view class="top">
								<!-- 姓名 -->
								<view class="name">{{ item.user_name }}</view>
								<!-- 电话 -->
								<view class="phone">{{item.user_phone_number}}</view>
							</view>
							<!-- 地址 -->
							<view class="bottom">
								{{item.detail_address}}
							</view>
						</view>

						<view class="icon-Icon">
							<!-- 编辑 -->
							<!-- .stop:防止冒泡到view处 -->
							<view
								@click.stop="updateAddress(item.user_name,item.user_phone_number,item.detail_address,item.ID)">
								<u-icon name="edit-pen" size="24"></u-icon>
							</view>

							<!-- 删除 -->
							<view @click.stop="delAddress(item.ID)">
								<u-icon name="trash" size="24"></u-icon>
							</view>
						</view>
					</view>
					<view class="noneaddress" v-else>
						暂无地址
					</view>

				</view>
			</scroll-view>
		</view>
		<view class="addBtn">
			<button class="xinzengdizhi" @click="toAddAddress">新增地址</button>
		</view>
		<u-modal :show="show" content='删除这个地址？' showCancelButton width="300px" confirmColor="#FF6530" @confirm="confirm"
			@cancel="cancel" @close="cancel" :closeOnClickOverlay="true"></u-modal>
	</view>
</template>

<script setup>
	import {
		reactive,
		onMounted,
		computed,
		ref
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const store = useStore()
	const address = computed(() => {
		return store.state.runPage.address
	})

	const show = ref(false)

	const cancel = () => {
		show.value = false
	}

	let i = ref()
	// options跳转页面携带的参数
	onLoad((options) => {
		if (options.i == 0) {
			console.log("shouhuo");
			i.value = options.i
		}
	})
	onMounted(() => {
		store.dispatch("searchAddress")
	})

	function select(name, phone, address, detailAddress, id) {
		let data = {
			name: name,
			phone: phone,
			site: address,
			detail: detailAddress,
			id: id
		}
		if (i.value == 0) {
			store.dispatch("saveTake", data)
		} else {
			store.dispatch("savePick", data)
		}
		uni.navigateBack()
	}

	// 删除接口
	let currentId

	function delAddress(id) {
		show.value = true
		currentId = id
	}
	const confirm = () => {
		store.dispatch("deleteAddress", {
			id: currentId
		})
		cancel()
		store.dispatch("searchAddress")
	}

	function updateAddress(name, phone, address, detailAddress, id) {
		uni.navigateTo({
			url: `/pages/runService/ReleaseRunner/address?i=${i.value}&name=${name}&phone=${phone}&address=${address}&detailAddress=${detailAddress}&id=${id}`
		})
	}

	function toAddAddress() {
		uni.redirectTo({
			url: `/pages/runService/ReleaseRunner/address?i=${i.value}`
		})
	}
</script>

<style lang="scss">
	.noneaddress {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 50rpx;
		font-size: 18px;
		color: #999;
	}

	.Address {
		height: 100%;
		flex-grow: 1;
		position: relative;
	}

	.scrollAddress {
		position: absolute;
		top:0;
		bottom: 0;
	}

	.allAddress {
		padding: 10rpx 30rpx;
		display: flex;
		flex-direction:
			column;
		height: 100vh;
	}

	.item {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;

		.top {
			display: flex;
			font-weight: bold;
			font-size: 30rpx;

			.name {
				color: #FF6530;
			}

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

	.addBtn {
		// position: fixed;
		// bottom: 0;
		margin: 0 30rpx;
		//       left: 0;
		// right: 0;
		background-color: #fff;
		height: 140rpx;
	}

	.xinzengdizhi {
		color: #fff;
		background-color: #FF6530;
		border: 1rpx #FF6530 solid;
		border-radius: 20rpx;
	}

	.u-icon--right.data-v-ac70166d {
		flex-direction: row;
		align-items: center;
		padding: 15rpx;
	}

	.icon-Icon {
		display: flex;
	}
</style>