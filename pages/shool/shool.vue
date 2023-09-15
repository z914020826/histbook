<template>
	<view class="shoolPage">
		<view class="schoolSearch">
			<u-search shape="round"></u-search>
		</view>
		<u-tabs :list="tabList" lineColor="{color: '#FF6530'}" lineWidth="25" :current="currentIndex"
			@change="tabsIndex"></u-tabs>
		<swiper :current="currentIndex" @change="swiperChange" class="schoolContent">
			<swiper-item>
				<scroll-view @scrolltolower="scrolltolower" scroll-y style="height: 100%;width: 100%;"
					refresher-enabled="true" :refresher-triggered="triggered" scrolltolower="150"
					@refresherpulling="onPulling">
					<view class="postList" v-for="post in postList" :key="post.ID">
						<postings v-if="post.category=='美食'" :id="post.ID" :like_num="post.like_num" :content="post.content"
							:nickname="post.User.nickname" :head_image="post.User.head_image"
							:images="post.images ? JSON.parse(post.images) : ''" :userId="post.User.ID"
							:remarks_num="post.remarks_num" :is_like="post.is_like"></postings>
					</view>
					<u-loadmore :status="status" />
				</scroll-view>
			</swiper-item>
            <swiper-item>
            	<scroll-view @scrolltolower="scrolltolower" scroll-y style="height: 100%;width: 100%;"
            		refresher-enabled="true" :refresher-triggered="triggered" scrolltolower="150"
            		@refresherpulling="onPulling">
            		<view class="postList" v-for="post in postList" :key="post.ID">
            			<postings  v-if="post.category=='健身'"  :id="post.ID" :like_num="post.like_num" :content="post.content"
            				:nickname="post.User.nickname" :head_image="post.User.head_image"
            				:images="post.images ? JSON.parse(post.images) : ''" :userId="post.User.ID" :remarks_num="post.remarks_num"></postings>
            		</view>
            		<u-loadmore :status="nomore" />
            	</scroll-view>
            </swiper-item>
            <swiper-item>
            	<scroll-view @scrolltolower="scrolltolower" scroll-y style="height: 100%;width: 100%;"
            		refresher-enabled="true" :refresher-triggered="triggered" scrolltolower="150"
            		@refresherpulling="onPulling">
            		<view class="postList" v-for="post in postList" :key="post.ID">
            			<postings  v-if="post.category=='旅游'"  :id="post.ID" :like_num="post.like_num" :content="post.content"
            				:nickname="post.User.nickname" :head_image="post.User.head_image"
            				:images="post.images ? JSON.parse(post.images) : ''" :userId="post.User.ID" :remarks_num="post.remarks_num"></postings>
            		</view>
            		<u-loadmore :status="nomore" />
            	</scroll-view>
            </swiper-item>
            <swiper-item>
            	<scroll-view @scrolltolower="scrolltolower" scroll-y style="height: 100%;width: 100%;"
            		refresher-enabled="true" :refresher-triggered="triggered" scrolltolower="150"
            		@refresherpulling="onPulling">
            		<view class="postList" v-for="post in postList" :key="post.ID">
            			<postings  v-if="post.category=='学习'"  :id="post.ID" :like_num="post.like_num" :content="post.content"
            				:nickname="post.User.nickname" :head_image="post.User.head_image"
            				:images="post.images ? JSON.parse(post.images) : ''" :userId="post.User.ID" :remarks_num="post.remarks_num"></postings>
            		</view>
            		<u-loadmore :status="status" />
            	</scroll-view>
            </swiper-item>
            <swiper-item>
            	<scroll-view @scrolltolower="scrolltolower" scroll-y style="height: 100%;width: 100%;"
            		refresher-enabled="true" :refresher-triggered="triggered" scrolltolower="150"
            		@refresherpulling="onPulling">
            		<view class="postList" v-for="post in postList" :key="post.ID">
            			<postings  v-if="post.category=='生活'"  :id="post.ID" :like_num="post.like_num" :content="post.content"
            				:nickname="post.User.nickname" :head_image="post.User.head_image"
            				:images="post.images ? JSON.parse(post.images) : ''" :userId="post.User.ID" :remarks_num="post.remarks_num"></postings>
            		</view>
            		<u-loadmore :status="status" />
            	</scroll-view>
            </swiper-item>
		</swiper>

	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		reactive,
		ref,
		defineProps
	} from "vue";
	const props = defineProps([])
	import {
		useStore
	} from "vuex";
	import {
		onReachBottom,
		onPageScroll
	} from '@dcloudio/uni-app';
	const store = useStore()
	import postings from "../../components/postings.vue";
	// const tabList = reactive([{
	// 	name: '关注',
	// }, {
	// 	name: '推荐',
	// }, {
	// 	name: '电影'
	// }, {
	// 	name: '科技'
	// }, {
	// 	name: '音乐'
	// }, {
	// 	name: '美食'
	// }, {
	// 	name: '文化'
	// }, {
	// 	name: '财经'
	// }, {
	// 	name: '手工'
	// }])
	const src = ref(
		"https://pic1.zhimg.com/v2-342f4e0f425853cc75f50d35156bad70_r.jpg"
	);
	const triggered = ref(false)
	const currentIndex = ref(0)
	const status = ref("loadmore")

	const pageData = reactive({
		page: 1,
		size: 6
	})
	
	onMounted(() => {
		 store.dispatch("getAllPost", pageData)
         store.dispatch("allType")
	})
    let postList =computed(()=>{
        return store.state.postPage.postList.posts
    })
    let tabList =computed(()=>{
        let a=[]
        store.state.postPage.type.forEach(item=>{
            a.push({name:item.category_type})
        })
        return a
    })
	const scrolltolower = (e) => {
		console.log(777, postList.value.length);
		if (postList.value.length <= store.state.postPage.postList.nums) {
			status.value = "loading"
			uni.$u.throttle(addList(), 50000)
		} else {
			status.value = "nomore"
		}
	}
	const addList = () => {
		console.log(555555);
		pageData.page++
		store.dispatch("getAllPost", pageData)
	}
	const swiperChange = (e) => {
		currentIndex.value = e.detail.current
	}
	const tabsIndex = (current) => {
		currentIndex.value = current.index
	}
	// 头像
	const onPulling = () => {
		if (!triggered.value) {
			triggered.value = true
			setTimeout(() => {
				triggered.value = false;
			}, 1000)
		}
	}
</script>

<style>
	.shoolPage {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.schoolContent {
		flex: 1;
	}

	.shool_header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.school_header_writing {
		margin: 0 auto;
	}

	.school_change {
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: 13px;
		color: #0b0b0b;
	}

	.school_change_find {
		height: 40px;
	}

	.school_change_find:hover {
		border-radius: 15px;
		background-color: #ff6530;
		color: #fff;
		padding: 6px;
	}

	.schoolSearch {
		flex-direction: row;
		align-items: center;
		margin: 20rpx 10rpx;
	}
</style>