<template>
	<view class="myhome">
		<view class="pullup"></view>
		<view class="main">
			<view class="clear"></view>
			<!-- 头部 -->
			<view class="homeHeader">
				<view class="homeHeader_left">
					<!-- 头像 -->
					<view class="myPhoto">
						<image :src="info.head_image" class="myHeadPhoto">
						</image>
					</view>
					<!-- 用户名和个人简介 -->
					<view class="user">
						<!-- 用户名 -->
						<view class="username">
							<span>{{ info.nickname }}</span>
						</view>
						<!-- 关注，关注者，文章数量 -->
						<view class="introduction">
							<!-- 关注 -->
							<view class="introductionFun">
								<span>{{ info.collect_num }}</span>
								<span>关注</span>
							</view>
							<!-- 关注者 -->
							<view class="introductionFun">
								<span>{{ info.fans_num }}</span>
								<span>粉丝</span>
							</view>
							<!-- 文章数量 -->
							<view class="introductionFun">
								<span>{{ info.post_num }}</span>
								<span>文章数量</span>
							</view>
						</view>
					</view>
				</view>
				<view class="homeHeader_right">
					<!-- 按钮 -->
					<!-- info.ID:是后端传过来的数据id，即点击id -->
					<view class="v-list-botton" v-if="isMyhome">
						<!-- compile 编辑 -->
						<button class="edit" @click="compile">编辑</button>
					</view>
					<view class="v-list-botton" v-else>

						<button class="edit">关注</button>
						<button class="edit" @click="privateLetter">
							私信
						</button>
					</view>

				</view>
			</view>
		</view>
		<view class="content">
			<!-- 动态 -->
			<view class="dynamicState">
				<!-- 分段器 -->
				<u-subsection :list="list" :current="currentIndex" activeColor="#000" inactiveColor="#999" fontSize="30rpx"
					mode="button" bgColor="rgb(255 255 255)" @change="onclick"></u-subsection>
				<!-- 轮播图 -->
				<swiper-item>
					<view class="" v-for="item in collectList" :current="currentIndex" @change="changeFun">
						<collections :category='item.Post.category' :nickname='item.User.nickname'
							:content='item.Post.content'></collections>
					</view>
				</swiper-item>
			</view>
		</view>

	</view>
</template>

<script setup>
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
// 引入组件
import collections from '/components/collections.vue'
const store = useStore()
// 获取了后端传来的个人数据
const info = computed(() => {
	return store.state.myhomePage.personalPage
})
const isMyhome=ref(true)
// onLoad 获取对应的参数
onLoad((options) => {
	let id = parseInt(options.id)
	store.dispatch("collectList")
	console.log('unreadList', store.state.messagePage.unread);
	if (!options.id || options.id == store.state.indexPage.userInfo.ID) {
		isMyhome.value = true
	} else {
		isMyhome.value = false
	}
	store.dispatch("jumpPersonalPage", {
		id
	})
})

const list = ['动态', '帖子', '跑腿', '点赞', '收藏']
const currentIndex = ref()
// 分段器
function onclick(index) {
	currentIndex.value = index
}
// 轮播图
function changeFun(e) {
	currentIndex.value = e.detail.current;
}
const collectList = computed(() => {
	return store.state.myhomePage.collectList
})
// 点击图标之后跳转到私信页面
const unreadList = computed(() => {
	console.log(store.state.messagePage.unread);
	return store.state.messagePage.unread
})
const privateLetter = (() => {
	uni.navigateTo({
		url: `/pages/message/newsDetail/newsDetail?toUserId=${info.id}&hearderimg=${info.header}&header=${info.name}`
	})
})
// 点击编辑进行信息的修改
const compile = (() => {
	uni.navigateTo({
		url: `/pages/myhome/userData/userData?header=${info.name}&hearderimg=${info.header}`
	})
})
</script>

<style>
.mySwiper {
	height: 320rpx;
}

.v-list-botton {
	display: flex;
}

.introductionFun {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.introduction {
	padding-top: 10rpx;
	display: flex;
	width: 380rpx;
	justify-content: space-between;
}

.dynamicState {
	background-color: #fff;
	border-bottom: 1rpx solid #9999992b;
}

/* 整个页面 */
.myhome {
	height: 100%;
	background-color: rgb(238, 242, 245);
}

.main {
	padding: 0 30rpx;
	background-color: #fff;
}

/* 为了避免脱离文档流 */
.clear {
	height: 310rpx;
}

	.homeHeader_left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: absolute;
		top: 175rpx;
	}

	.homeHeader_right {
		position: absolute;
		right: 54rpx;
		top: 308rpx;
	}

.czy-iconfont {
	font-size: 35rpx;
	color: #999;
}

.user {
	margin-left: 30rpx;
}

/* 网名 */
.username {
	font-size: 35rpx;
	margin: 20rpx 0 15rpx 0;
	font-weight: 600;
}


/* 编辑 */
.edit {
	border: none;
	background-color: rgb(255, 101, 48);
	color: #fff;
	width: 140rpx;
	height: 54rpx;
	line-height: 54rpx;
	border-radius: 40rpx;
	font-size: 30rpx;
	margin-left: 20rpx;
}

/* 下拉背景颜色 */
.pullup {
	width: 100%;
	height: 260rpx;
	background-color: rgb(255, 101, 48);
}

.myPhoto {
	padding-left: 34rpx;
}

/* 头像图片 */
.myHeadPhoto {
	width: 80px;
	height: 80px;
	border-radius: 50%;

}
</style>