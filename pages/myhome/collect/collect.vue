<template>
	<view class="collectPage">
		<!-- 分段器   active-color:被选中的文字	inactive-color：未被选择的文字-->
		<u-subsection :list="list" :current="currentIndex" activeColor="#000" inactiveColor="#999" fontSize="30rpx"
			mode="button" bgColor="rgb(242, 243, 245)" @change="onClickItem"></u-subsection>

		<!-- 轮播部分 -->
		<swiper style="height: 100%;" @change="changeFun" :current="currentIndex">
			<swiper-item>
				<view class="" v-for="item in likeList">
					<collections :category='item.Post.category' :nickname='item.User.nickname'
						:content='item.Post.content'></collections>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="" v-for="item in collectList">
					<collections :category='item.Post.category' :nickname='item.User.nickname'
						:content='item.Post.content'></collections>
				</view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script setup>
	import collections from '../../../components/collections.vue'

	import {
		computed,
		onMounted,
		ref
	} from "vue";
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useStore
	} from "vuex";

	const store = useStore();
	// 获取点赞的数据
	const likeList = computed(() => {
		return store.state.myhomePage.likeList
	})
	const collectList = computed(() => {
		return store.state.myhomePage.collectList
	})
	onMounted(() => {
		store.dispatch("likeList", "collectList")
	})

	const list = ref(['点赞', '收藏']);
	const currentIndex = ref()
	// 从myhome页面点击后，进行跳转，通过获取myhome传递的参数0或1确定currentIndex的值
	onLoad((option) => {
		currentIndex.value = parseInt(option.index)
	})


	// 点击事件进行跳转，通过参数0或1确定currentIndex的值
	function onClickItem(index) {
		currentIndex.value = index;

	}
	// 轮播部分
	function changeFun(e) {
		currentIndex.value = e.detail.current
	}
</script>

<style>
	.collectPage {
		/* background-color: #f9f9f9; */
		height: 100vh;
		padding: 20rpx 30rpx;
	}
</style>