<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// uni.hideTabBar();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-plus/index.scss";
	@import url("static/iconfont.css");

	.uni-tabbar {
		// tab 样式
		// 背景色
		background-color: rgba(57, 181, 74, 0.1) !important;

		// tabBar 样式
		// 上边框
		.uni-tabbar-border {
			background-color: #e54d42 !important; // tabBar 上边框的颜色
		}

		.uni-tabbar__item {

			// tabBar 单项样式
			height: 100rpx !important;

			&:not(:last-child) {
				border-right: 4rpx solid #eee;
			}

			.uni-tabbar__icon {
				// tabBar 图标样式
				width: 40rpx !important;
				height: 40rpx !important;
			}

			.uni-tabbar__label {
				// tabBar 文字样式
				// color:yellow !important
			}
		}
	}

	view,
	page {
		margin: 0;
		padding: 0;
	}

	page {
		width: 100%;
		height: 100%;
	}

	view,
	text {
		box-sizing: border-box;

	}

	image {
		width: 100%;
		height: 100%;
	}

	li {
		list-style: none;
	}

	.icon {
		width: 96rpx;
	}

	.singe-line {
		// 单行省略
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
	}

	.double-line {
		word-break: break-all;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.u-navbar__content__title {
		color: #fff !important;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.title_before {
		width: 8rpx;
		height: 30rpx;
		background-color: #FF6530;
		margin-right: 10rpx;
	}

	.u-button--info {
		width: 180rpx !important;
		height: 2.5rem !important;
	}

	.u-modal__content__text {
		text-align: center !important;
	}

	.grid-text {
		font-size: 26rpx
	}
	.cardLabel {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FF6530;
		width: 3rem;
		height: 1.5rem;
		color: #fff;
		border-radius: 5rpx;
		margin-right: 30rpx;
		font-size: 24rpx
	}
	.btn1 {
		background-color: #fff;
		font-size: 28rpx;
		width: 170rpx;
		height: 2rem;
		line-height: 2rem;
		margin: 0 15rpx 0 0;
	}
	.btn1:active {
		background-color: #f3f4f6;
	}
	
	.btn2 {
		background-color: #FF6530;
		color: #fff;
	}
	
	.btn2:active {
		background-color: #ff8c65;
	}
</style>