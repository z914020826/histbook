<template>
	<button @click="test">测试</button>
	<view class="indexPage">
		<up-avatar shape="square" size="60"></up-avatar>
		<view class="swiper_Header">
			<view class="school">
				<u-icon name="map" color="#333" size="20" class="indexTabIcon"></u-icon>
				<span class="schoolName">科院智慧生活服务平台</span>
			</view>
			<u-swiper :list="list" indicator indicatorMode="dot" circular indicatorStyle="left: 80rpx; bottom:25rpx"
				length="10rpx" height="300rpx" radius="10rpx" @click="swiperClick"></u-swiper>
		</view>
		<view class="coreFunction">
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(listItem,listIndex) in centerList" :key="listIndex" class="core_list">
					<view class="core_item">
						<img :src="listItem.img" alt="" class="ceterIcon">
						<text class="grid-text">{{listItem.title}}</text>
					</view>
				</u-grid-item>
			</u-grid>
		</view>

		<view class="runService_index">
			<view class="title_container">
				<view class="title">
					<view class="title_before">
					</view>
					<uni-title type="h2" title="跑腿接单赚钱"></uni-title>
				</view>
				<view class="more">
					<navigator url="/pages/runService/runService" hover-class="other-navigator-hover">
						<a>查看全部 ></a>
					</navigator>
				</view>
			</view>

			<view class="runList" v-for="orderItem in allOrder" :key="orderItem.id">
				<RunService :detail="orderItem.detail" :tag="orderItem.tag" :to="orderItem.to"
					:deadLine="orderItem.deadline" :CreatedTime="orderItem.CreatedAt" :cost="orderItem.cost"
					:id="orderItem.ID" :note="orderItem.note"></RunService>
			</view>
			<u-loadmore status="nomore" />
		</view>
		<Login :show="show" @changeShow="changeShow"> </Login>

	</view>
</template>

<script setup>
	// 组件
	import RunService from "../../components/RunService.vue"
	import Login from "../../components/Login.vue"
	// vue内置函数
	import {
		onMounted,
		reactive,
		ref,
		computed
	} from "vue";
	import {
		useStore
	} from "vuex";
	const store = useStore();
	const list = ref(store.state.indexPage.swiperList)
	const loginStatus = ref(true)
	// 每次进入页面都会调起查看登录状态,如果token已经过期,那么返回登录过期，调起wx.login,弹起手机号登录框重新登录
	const show = ref(false)
	onMounted(() => {
		store.dispatch("getAllOrder")
		login()
	})
	const centerList = reactive([{
			name: 'photo',
			title: '二手闲置',
			img: '../../static/image/index01.png'
		},
		{
			name: 'lock',
			title: '新生指引',
			img: '../../static/image/index02.png'
		},
		{
			name: 'star',
			title: '校园介绍',
			img: '../../static/image/index03.png'
		},
		{
			name: 'hourglass',
			title: '社团索引',
			img: '../../static/image/index04.png'
		},
		{
			name: 'home',
			title: '新闻公告',
			img: '../../static/image/index05.png'
		},
		{
			name: 'star',
			title: '驾校宝典',
			img: '../../static/image/index06.png'
		},
		{
			name: 'star',
			title: '校内兼职',
			img: '../../static/image/index07.png'
		}, {
			name: 'star',
			title: '失物招领',
			img: '../../static/image/index08.png'
		},
	])
	const allOrder = computed(() => {
		const indexRunList = []
		let n = store.state.runPage.allOrder.length >= 3 ? 3 : store.state.runPage.allOrder.length
		for (let i = 0; i < n; i++) {
			indexRunList.push(store.state.runPage.allOrder[i])
		}
		return indexRunList
	})
	const login = () => {
		let token = uni.getStorageSync("token")
		if (token) {
			// 检查token是否过期
			store.dispatch("checkToken")
		} else {
			// 登录
			uni.login({
				provider: 'weixin', //使用微信登录
				success: async function(res) {
					store.dispatch("getOpenId", res)
					show.value = true
				}
			});
		}
	}
	const changeShow = (value) => {
		show.value = value
	}
	// 轮播图点击事件
	const swiperClick = (index) => {
		const pages = reactive([{
			id: 123
		}, {
			id: 456
		}, {
			id: 789
		}])
		uni.navigateTo({
			url: `/pages/index/bannerDetail/bannerDetail?id=${pages[index].id}`
		});
	}
	const test = () => {
		uni.requestSubscribeMessage({
			tmplIds: ['HQwFy-IBsoZwdbYVkf8HrkhchuWRnXUDgZAqUy8KEs4',"165165d"],
			success(res) {
				console.log(res);
			}
		})
	}
</script>

<style scoped>
	.indexPage {
		height: 100%;
		background: #f9f9f9;
		padding: 0 30rpx;
	}

	.swiper_Header {
		width: 100%;
	}

	.school {
		display: flex;
		align-items: flex-end;
		font-size: 30rpx;
		padding: 20rpx 0;

	}

	.schoolName {
		margin-left: 10rpx;
	}

	.coreFunction {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;

	}

	.coreFunction .core_list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		height: 270rpx;
	}

	.core_item {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-right: 31rpx;
	}

	.core_item:nth-child(4),
	.core_item:last-child {
		margin-right: 0rpx;
	}

	.core_item .ceterIcon {
		width: 96rpx;
		height: 96rpx;
	}

	.core_item .coreText {
		font-size: 24rpx;
	}

	.runService_index {
		margin-top: 40rpx;
	}

	.title_container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.more {
		font-size: 24rpx
	}
</style>