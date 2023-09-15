<template>
		<view class="postSearch">
			<u-search shape="round"></u-search>
		</view>
	<view class="type_category">
		<div class="menu_content" v-for="(category,index) in allcategoryType">
			<image :src="getSrc(url)" class="left_imgs"></image>
			<div class="middle_content">
				<div style="font-weight: 400rpx; font-size: 35rpx;">{{category.category_type}}</div>
				<div style="color:#927a71; margin-top: 23rpx;">660好友·999热度</div>
			</div>
			<div>
				<button class="selCategory" @click="sendSel(category.category_type)">选择</button>
			</div>
		</div>
	</view>
	<!-- 需要一个标签的右边【还没有写】 -->
</template>

<script setup>
	import {
		useStore
	} from "vuex";
	import {
		ref,
		reactive,
		onMounted,
		computed,
		defineEmits
	} from 'vue';
	const store = useStore();
	onMounted(() => {
		store.dispatch("getCategory")
		console.log('派发帖子标签成功');
	})
	const getSrc = (url) => {
		return '../../../static/image/01.jpg'
	}
	const allContent = reactive({

	})
	const allcategoryType = computed(() => {
		let data = store.state.postPage.categorytype
		console.log('data', data);
		return JSON.parse(JSON.stringify(data))

	})
	const sendSel = (index) => {
		// 这里返回的是子组件的数据 将子组件的数据传递给父组件
		console.log('index', index);
		var pages = getCurrentPages();
		var prevPage = pages[pages.length - 2];
		prevPage.index = index
		uni.navigateBack()
	}
</script>

<style lang="scss">
	.type_category {
		margin-top: 50rpx;
		font-size: 25rpx;
		padding: 20rpx;
		width: 100%;
		height: 100%;
	}
.postSearch {
		flex-direction: row;
		align-items: center;
		margin: 20rpx 10rpx;
	}
	.menu_content {
		display: flex;
		align-items: center;
	}

	.left_imgs {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		margin-right: 30rpx;
	}

	.middle_content {
		flex: 1;
		width: 300rpx;
		font-family: Microsoft YaHei;
	}

	.selCategory {
		height: 50rpx;
		color: #333;
		line-height: 50rpx;
		font-family: Microsoft YaHei;
		font-size: 25rpx;
	}
</style>