<template>
	<view class="myhome">
		<!-- 版心 -->
		<view class="mainArea">
			<!-- 头部 -->
			<view class="homeHeader">
				<view class="homeHeader_left" @click="jumpTo">
					<!-- 头像 -->
					<u-avatar :src="userInfo.head_image" shape="circle" class="header-image" size='150rpx'></u-avatar>
					<view class="user">
						<!-- 用户名 -->
						<view class="username">
							<span>{{userInfo.nickname?userInfo.nickname:"用户名"}}</span>

						</view>
						<!-- 个人简介 -->
						<view class="person">
							<label class="personText">这家伙很懒，什么都没有写</label>
							<u-icon name="edit-pen" color="#666" size="18"></u-icon>
						</view>
					</view>
				</view>
				<view class="homeHeader_right" @click="skipMyPage">
					<view class="mypage" style="display: flex;align-items: center;">
						<view class="minepage">个人主页</view>
						<view style="padding-left: 8rpx;">
							<u-icon name="arrow-right" size="13"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<!-- 主体内容 -->
			<view class="content">
				<!-- 信息数据 -->
				<view class="information">
					<!-- 点赞 -->
					<view class="collect" @click="collect(0)">
						<span class="collect_num">{{userInfo.collect_num}}</span>
						<span class="text">点赞</span>
					</view>
					<!-- 收藏 -->
					<view class="looking" @click="collect(1)">
						<span class="collect_num">{{userInfo.like_num}}</span>
						<span class="text">收藏</span>
					</view>
					<!-- 粉丝 -->
					<view class="fans" @click="fans(0)">
						<span class="collect_num">{{userInfo.fans_num}}</span>
						<span class="text">粉丝</span>
					</view>
					<!-- 关注 -->
					<view class="attention" @click="fans(1)">
						<span class="collect_num">{{userInfo.concern_num}}</span>
						<span class="text">关注</span>
					</view>
				</view>



				<!-- 跑腿服务：图标加文字 -->
				<view class="errand">
					<h3 class="headline">跑腿服务</h3>
					<!-- 服务内容 -->
					<view class="serviceContent">
						<!-- 我发布的 -->
						<navigator url="/pages/myhome/orders/orders?index=0" hover-class="other-navigator-hover">
							<view class="myPublish">
								<!-- <i class="iconfont icon-fabu1 czy-iconfont"></i> -->
								<span class="text">我发布的</span>
							</view>
						</navigator>
						<!-- 分割线 -->
						<span style="color: #999;">|</span>
						<!-- 我的接单 -->
						<navigator url="/pages/myhome/runOrder/runOrder?index=0" hover-class="other-navigator-hover">
							<view class="myReceive">
								<!-- <i class="iconfont icon-fabu1 czy-iconfont"></i> -->
								<span class="text">我接单的</span>
							</view>
						</navigator>
					</view>
				</view>

				<!-- 我的服务 -->
				<view class="service">
					<!-- 我的钱包 -->
					<view class="personCenter userTool">
						<!-- 左侧 -->
						<view class="personCenterLeft">
							<i class="iconfont icon-gerenzhongxin czy-iconfont"></i>
							<span class="serviceText">我的钱包</span>
						</view>
						<!-- 图标 -->
						<u-icon name="arrow-right"></u-icon>
					</view>
					<u-line></u-line>
					<view class="myFrame ">
						<!-- 我的余额 -->
						<view class="myMoney">
							<view class="my_money">
								我的余额
							</view>
							<view class="mymoney">
								<view class="smallMyMoney">{{money}}</view>
								<view class="smallmyMoney">元</view>
							</view>
						</view>
						<!-- 我的劵 -->
						<view class="myMoney">
							<view class="my_money">
								我的劵
							</view>
							<view class="mymoney">
								<view class="smallMyMoney">{{card}}</view>
								<view class="smallmyMoney">张</view>
							</view>

						</view>

					</view>
					<!-- </view> -->
					<u-line></u-line>

					<view class="personCenter userTool">
						<!-- 左侧 -->
						<view class="personCenterLeft">
							<i class="iconfont icon-gerenzhongxin czy-iconfont"></i>
							<span class="serviceText">个人中心</span>
						</view>
						<!-- 图标 -->
						<u-icon name="arrow-right"></u-icon>
					</view>
					<u-line></u-line>

					<view class="customerService userTool">
						<!-- 左侧 -->
						<view class="personCenterLeft">
							<i class="iconfont icon-wodekefu czy-iconfont"></i>
							<span class="serviceText">我的客服</span>
						</view>
						<!-- 图标 -->
						<u-icon name="arrow-right"></u-icon>


					</view>
					<u-line></u-line>


					<!-- 收货地址 -->
					<view class="backCenter userTool" @click="receiving">
						<!-- 左侧 -->
						<view class="personCenterLeft">
							<i class="iconfont icon-shouhuodizhi czy-iconfont"></i>
							<span class="serviceText">收货地址</span>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
					<u-line></u-line>

					<view class="userAgreement userTool">
						<!-- 左侧 -->
						<view class="personCenterLeft">
							<i class="iconfont icon-yonghuxieyi czy-iconfont"></i>
							<span class="serviceText">用户协议</span>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
					<u-line></u-line>

					<view class="backCenter userTool">
						<!-- 左侧 -->
						<view class="personCenterLeft">
							<i class="iconfont icon-fankuizhongxin czy-iconfont"></i>
							<span class="serviceText">反馈中心</span>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
					<u-line></u-line>

					<!-- 退出登录 -->
					<view class="backCenter userTool" @click="exit">
						<!-- 左侧 -->
						<view class="exit">
							<i class="iconfont icon-logout czy-iconfont"></i>
							<span class="serviceText">退出登录</span>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
					<u-line></u-line>
				</view>

			</view>
		</view>
	</view>
	<u-modal :show="show" :content='content' showCancelButton width="300px" confirmColor="#FF6530" @confirm="confirm"
		@cancel="cancel" @close="cancel" :closeOnClickOverlay="true"></u-modal>
</template>

<script setup>
	import {
		computed,
		onMounted,
		reactive,
		ref
	} from 'vue'
	// 头像
	import {
		useStore
	} from "vuex";
	const store = useStore();

	// 接收后端（获取根据用户id获取帖子列表的接口）传过来的数据
	const userInfo = computed(() => {
		return store.state.indexPage.userInfo
		console.log('个人页面的用户信息',userInfo);
	})
	const confirm = () => {
		uni.removeStorageSync("token")
		uni.showToast({
			icon: "none",
			title: "退出成功"
		})
		cancel()
		uni.reLaunch({
			url: "/pages/index/index",
		})
	}
	const cancel = () => {
		show.value = false
	}
	const show = ref(false)
	const content = ref('您确定要退出当前账号吗？')
	const exit = () => {
		show.value = true
	}
	const money = ref(0);
	const card = ref(0);

	function jumpTo() {
		if (userInfo.value.ID) {
			uni.navigateTo({
				url: '/pages/myhome/userData/userData'
			})
		} else {
			uni.showToast({
				icon: "none",
				title: "请先登录账号哦~"
			})
		}
	}

	// 跳转至主页
	function skipMyPage() {
		uni.navigateTo({
			url: '/pages/myhome/myhomePage/myhomePage'
		})
	}
	// 粉丝
	function fans(index) {
		uni.navigateTo({
			// 跳转传参
			url: `/pages/myhome/fans/fans?index=${index}`
		})
	}

	// 收藏
	function collect(index) {
		uni.navigateTo({
			url: `/pages/myhome/collect/collect?index=${index}`
		})
	}

	// 收货地址
	function receiving() {
		uni.navigateTo({
			url: '/pages/runService/ReleaseRunner/allAddress'
		})
	}
</script>

<style scoped>
	/* 整个页面 */
	.myhome {
		height: 100%;
		background: #f9f9f9;
		padding: 0 30rpx;
	}

	/* 头部 */
	.homeHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 36rpx;
	}

	.czy-iconfont {
		font-size: 35rpx;
		color: #666;
	}

	.user {
		margin-left: 30rpx;
	}

	/* 网名 */
	.username {
		font-size: 35rpx;
		margin-bottom: 15rpx;
	}

	/* 个性签名 */
	.person {
		display: flex;
		font-size: 25rpx;
		justify-content: center;
	}

	/* 个签文字 */
	.person label {
		/* 设置超出宽度 */
		white-space: nowrap;
		overflow: hidden;
		width: 185rpx;
		text-overflow: ellipsis;
		color: #666;
	}

	.collect {
		display: flex;
		justify-items: center;
		align-items: center;
	}

	.collect_num {
		font-size: 35rpx;
		color: #333;
	}

	/* 个人信息 */
	.homeHeader_left {
		display: flex;
		align-items: center;
	}

	.minepage {
		font-size: 23rpx;
	}

	/* 个人主页 */
	.homeHeader_right .mypage {
		font-size: 30rpx;
		color: #666;
	}

	/* 信息数据 */
	.information {
		display: flex;
		background-color: #fff;
		border-radius: 25rpx;
		align-items: center;
		padding: 20rpx;
		justify-content: space-around;
		margin-top: 23rpx
	}

	/* 模块内居中 */
	.text {
		display: block;
		font-size: 30rpx;
		color: #666;
	}

	.myWallet {
		display: flex;
		flex-direction: column;
		background-color: rgba(140, 201, 193);
		border-radius: 20rpx;
	}

	.myAccount {
		display: flex;
		justify-content: space-between;
		color: #fff;
		padding: 15rpx 35rpx;
	}

	.myFrame {
		display: flex;
		/* justify-content: space-around; */
		background-color: #fff;
		margin: 10rpx 20rpx;
		border-radius: 20rpx;
	}

	.smallMyMoney {
		color: red;
		font-size: 37rpx;
	}

	.mymoney {
		display: flex;
		padding-bottom: 12rpx;
		align-items: center;
	}

	.myMoney {
		display: flex;
		flex: 1;
		flex-direction: column;
		/* border-right: 1rpx solid #99999957; */
		padding: 0 30rpx;
		align-items: center;
	}

	.my_money {
		color: #747474;
		padding: 15rpx 0rpx;
		font-size: 26rpx;
	}

	.smallmyMoney {
		font-size: 31rpx;
		padding-left: 20rpx;
		font-weight: 600;
	}

	/* 信息数据四个模块 */
	.collect,
	.looking,
	.fans,
	.attention {
		display: flex;
		align-items: center;
		flex-direction: column;
		/* height: 120rpx; */
	}

	/* 信息数据四个模块的图片设置 */
	.png {
		width: 60rpx;
		height: 60rpx;
		padding: 0 auto;
	}

	/* 跑腿服务的 */
	.serviceText {
		display: block;
		margin: 15rpx 30rpx;
		font-size: 30rpx;
		color: #333;
	}

	/* 跑腿服务 */
	.errand {
		margin: 30rpx 0;
	}

	/* 跑腿服务题头 */
	.headline {
		font-size: 30rpx;
		margin-bottom: 10rpx;
	}

	/* 跑腿服务内容 */
	.serviceContent {
		/* background-color: #fdf9f6ff; */
		background-color: #fff;
		border-radius: 25rpx;
		display: flex;
		padding: 20rpx;
		justify-content: space-around;
		align-items: center;

	}

	/* 跑腿服务四个模块 */
	.myPublish,
	.myReceive {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.service {
		background-color: #ffffff;
		margin: 10rpx 0;
		border-radius: 25rpx;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* 我的服务四大板块 */
	.personCenter,
	.customerService,
	.userAgreement,
	.backCenter {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15rpx 30rpx;
		background: #fff;
	}

	.userTool:active {
		background: #e7e7e7;
	}

	.personCenterLeft,
	.exit {
		display: flex;
		align-items: center;
	}
</style>