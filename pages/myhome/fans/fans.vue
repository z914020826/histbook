<template>
	<view style="height: 100%;">
		<!-- 分段器 -->
		<u-subsection :list="list" :current="currentIndex" activeColor="#000" inactiveColor="#999" fontSize="30rpx"
			mode="button" bgColor="rgb(242, 243, 245)" @change="onClickItem"></u-subsection>
		<swiper @change="changeFun" :current="currentIndex" :list="list" indicator-dots="false" style="height: 100%;">
			<!-- 粉丝 -->
			<swiper-item>
				<view class="" v-for="item in fanList">
					<fans :nickname="item.User.nickname" :head_image="item.User.head_image" :id="item.User.ID"></fans>
				</view>
			</swiper-item>
			<!-- 关注 -->
			<swiper-item>
				<view class="" v-for="item in followList">
					<fans :nickname="item.Concern.nickname" :head_image="item.Concern.head_image" :id="item.Concern.ID">
					</fans>
				</view>

			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	// 引入组件
	import fans from '../../../components/fans.vue'
	import {
		computed,
		onMounted,
		ref
	} from "vue";
	import {
		onLoad
	} from '@dcloudio/uni-app'
	// 引入store
	import {
		useStore
	} from "vuex";
	// 实例化一个store
	const store = useStore();
	// 获取关注的数据
	const followList = computed(() => {
		return store.state.myhomePage.followList
	})
	// 获取粉丝的数据
	const fanList = computed(() => {
		return store.state.myhomePage.fanList
	})
	// 实现粉丝关注列表渲染
	onMounted(() => {
		store.dispatch("followList")
		store.dispatch("fanList")
		console.log('followList', followList);
		console.log('fanList', fanList);
	})

	const list = ref(['粉丝', '关注'])
	const currentIndex = ref()
	// 点击跳转
	onLoad((options) => {
		currentIndex.value = parseInt(options.index)
	})
	// 分段器获取		onClickItem(index):index是组件自带的
	function onClickItem(index) {
		currentIndex.value = index
	}

	// 轮播获取
	function changeFun(e) {
		currentIndex.value = e.detail.current
	}
</script>

<style>

</style>