<template>
	<view class="fansPage">
		<!-- 左边 -->
		<view class="fans_left">
			<!-- 头像 -->
			<view class="fans_headImage">
				<img :src="props.head_image" class="headPhoto" @click="jumpTo">
			</view>
			<!-- 名字和个签 -->
			<view class="fansPerson">
				<!-- 名字 -->
				<view class="fansName">
					<span class="fans_Name">{{ props.nickname }}</span>
				</view>
				<!-- 个签 -->
				<view class="fans_personText">
					{{ props.personContent }}
				</view>
			</view>
		</view>
		<!-- 右边 -->
		<view class="fans_right">
			<view class="fans_button" @click="fansbutton" v-if="fansButton">
				已关注
			</view>
			<view class="fans_button" @click="fansbutton" v-else>
				未关注
			</view>
		</view>
	</view>
</template>


<script setup>
import {
	ref,
	onMounted
} from 'vue'
import {
	useStore
} from "vuex";
const store = useStore();
const props = defineProps(["nickname", "head_image", "id"])
const fansButton = ref(false)

	function fansbutton() {
		console.log('取反', fansButton.value);
		fansButton.value = !fansButton.value
	}

	function jumpTo() {
		console.log('点击图片跳转至个人中心', props.id);
		uni.navigateTo({
			url: `/pages/myhome/myhomePage/myhomePage?id=${props.id}`

	})
}
</script>

<style>
.fansPage {
	display: flex;
	height: 160rpx;
	padding: 0 40rpx;
	align-items: center;
	justify-content: space-between;
}


.fans_left {
	display: flex;
	/* flex: 3; */
	align-items: center;
}

.fansPerson {
	justify-content: center;
	padding-left: 20rpx;
}

.fans_headImage {
	width: 100rpx;
	height: 100rpx;
}

.headPhoto {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}

/* 网名 */
.fansName {
	font-size: 30rpx;
	margin-bottom: 15rpx;
}

.fans_Name {
	color: #333;
	font-weight: 600;
}

.fans_personText {
	/* 设置超出宽度 */
	white-space: nowrap;
	overflow: hidden;
	width: 380rpx;
	text-overflow: ellipsis;
	color: #999;
	font-size: 25rpx;
}


.fans_button {
	color: #999;
	border: 1rpx solid #e6e1e1;
	padding: 8rpx 20rpx;
	border-radius: 50px;
	font-size: 25rpx;
}
</style>