<template>
	<view class="upload-page">
		<view class="upload-img">
			<img src="../../static/image/LOGO.jpg" alt="" class="u-img">
		</view>
		<view class="upload-bottom">
			<view class="bottom-post" @click="toAddRun">
				<view class="post-left">
					<!-- <img class="l-img" src="../../static/image/LOGO.jpg" alt=""> -->
					<i class="iconfont icon-paotuiAPP"></i>
					<view class="post-text">
						<p class="post-text-title">发布跑腿</p>
						<p class="post-text-span">跑腿发布，无需等待</p>
					</view>
				</view>
				<view class="post-right">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="bottom-post color" @click="toPostMessage">
				<view class="post-left">
					<i class="iconfont icon-shenghuo"></i>
					<view class="post-text">
						<p class="post-text-title">发布帖子</p>
						<p class="post-text-span">分享你的生活趣事</p>
					</view>
				</view>
				<view class="post-right">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
	</view>
	<!-- <histTabbar currentId=2></histTabbar> -->
</template>

<script setup>
	// import histTabbar from "../../components/histTabbar.vue"
	function toAddRun() {
		uni.navigateTo({
			url: `/pages/runService/ReleaseRunner/ReleaseRunner`
		});
	}

	function toPostMessage() {
		console.log('发帖');
		uni.navigateTo({
			url: `/pages/runService/PostMessage/PostMessage`
		});
	}
</script>

<style>
	.upload-page .upload-bottom .bottom-post .bottom-run {
		display: flex;
	}

	.color {
		background-color: rgb(255, 241, 240) !important;
	}

	.upload-page {
		display: flex;
		flex-direction: column;
		background-color: #fefefe;
		width: 100%;
		height: 100vh;
		justify-content: space-between;
	}

	.u-img {
		width: 100%;
		height: 240px !important;
		border-radius: 0 0 40% 40%;
		align-self: start;
	}

	.icon-paotuiAPP {
		font-size: 75rpx;
		color: rgb(255, 213, 30);
		margin-right: 20rpx;
	}

	.icon-shenghuo {
		font-size: 75rpx;
		margin-right: 20rpx;
		color: rgb(255, 95, 102);
	}

	.upload-bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		justify-self: flex-end;
		margin-bottom: 100rpx;
	}

	.bottom-post {
		width: 650rpx;
		height: 160rpx;
		background-color: rgb(253, 241, 227);
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		border-radius: 15px;
	}

	.post-left {
		display: flex;
	}

	.l-img {
		width: 96rpx;
		height: 96rpx;
		margin-right: 15rpx;
	}

	.post-text {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.post-text-title {
		font-size: 14px;
		font-weight: 600;
	}

	.post-text-span {
		font-size: 12px;
		color: #333;
	}
</style>