<template>
	<view class="post_card">
		<view class="post_title">
			<p>{{props.category}}</p>
		</view>
		<view class="post_content">
			<view class="post_text">
				<view class="post_name">
					<span>{{props.nickname}}</span>
					<span style="color: #666; padding: 0 24rpx;">|</span>
					<span style="color: #666;">2月前</span>
				</view>
				<view class="post_details">
					<span>
						{{props.content}}
					</span>
				</view>
			</view>
			<view class="post_img">
				<img class="p_img" src="/static/image/01.jpg" alt="">
			</view>
		</view>
		<view class="post_bottom">
			<view class="bottom_left">
				<view>
					<u-icon name="thumb-up"></u-icon>
					<span class="c-count">4</span>
				</view>
				<view>
					<u-icon name="chat"></u-icon>
					<span class="c-count">1</span>
				</view>
			</view>
			<view class="bottom_right">

			</view>
		</view>
	</view>
</template>


<script setup>
	const props = defineProps(["category", "content", "nickname"])
</script>

<style>
	.post_card {
		display: flex;
		flex-direction: column;
		padding: 40rpx 30rpx 20rpx 30rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #eaeaea;
	}

	.post_title {
		font-weight: 500;
		font-size: 16px;
	}

	.post_content {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.post_text {
		display: flex;
		flex-direction: column;
	}

	.post_name {
		margin: 14rpx 0;
		font-size: 14px;
		color: #292929;
	}

	.post_details {
		margin-top: 5rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-right: 10rpx;
	}

	.post_details label {
		font-size: 14px;
		color: #333;
	}

	.p_img {
		width: 130rpx;
		height: 130rpx;
	}

	.post_bottom {
		display: flex;
		justify-content: space-between;
		margin-top: 16rpx;
	}

	.bottom_left {
		display: flex;
	}

	.bottom_left view {
		display: flex;
		margin-right: 10rpx;
		color: #5e5e5e;
	}

	.c-count {
		font-size: 14px;
	}
</style>