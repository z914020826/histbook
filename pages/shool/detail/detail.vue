<template>
	<view class="postDetailPage">
		<u-sticky>
			<view class="postUserHeader">
				<view class="Header_left" v-if="postDetail.User">
					<view class="userHeadImg">
						<img :src="postDetail.User.head_image" alt="">
					</view>
					<view class="Nickname">
						<span>{{ postDetail.User.nickname }}</span>
					</view>
				</view>
				<view class="Header_right">
					<view @click="follow">
						<view class="follow" style="background-color: rgb(255, 239, 117);" v-if="!isFollow">
							<u-icon name="plus" size="12" bold color="#000"></u-icon>
							<span class="tap">关注</span>
						</view>
						<!-- checkmark -->
						<view class="follow" style="background-color: #fff;" v-else>
							<u-icon name="checkmark" size="12" bold color="#000"></u-icon>
							<span class="tap">已关注</span>
						</view>
					</view>
					<view class="shareMore">
						<u-icon name="more-dot-fill" size="22" color="#000" bold></u-icon>
					</view>
				</view>
			</view>
		</u-sticky>
		<u-swiper :list="imgList" @click="clickImg" height="300" radius="0" indicator indicatorMode="dot"
			@change="changeImgIndex" :autoplay="false" v-if="imgList.length>0">
			<template #indicator>
				<view class="indicator-num">
					<text class="indicator-num__text">{{ currentNum + 1 }}/{{ imgList.length }}</text>
				</view>
			</template>
		</u-swiper>
		<view class="postText">
			<text user-select>{{ postDetail.content }}</text>
			<view class="postPublishTime">
				{{ publishTimes }}发布
			</view>
		</view>
		<view class="postComment" v-if="commentList">
			<view class="commentTitle">
				全部评论
			</view>
			<u-empty text="还没有人评论" icon="https://img01.yzcdn.cn/vant/empty-image-default.png"
				v-if="commentList.length==0">
			</u-empty>
			<view v-else>
				<view v-for="comment in commentList" :key="comment.ID">
					<Comment @openAllComent="openAllComent" @showComment="showComment" :commentData="comment"></Comment>
				</view>
				<view class="checkMore" @tap="checkMore" v-if="commentList.length==10">
					查看更多评论
				</view>
			</view>
		</view>
		<view class="publishComment">
			<view class="inputComment" @click="showComment('')">
				<u-icon name="edit-pen-fill" size="22"></u-icon>
				<span class="placeholder">喜欢就多说两句</span>
			</view>
			<!-- 点赞和收藏操作 -->
			<view class="collectLikeBox">
				<view class="collectLikeItem" @tap="collectHandle">
					<u-icon name="star" size="26" bold color="#000" v-if="postDetail.is_collect==0"></u-icon>
					<u-icon name="star-fill" size="26" bold color="#FEB510" v-else></u-icon>
					<span class="num" v-if="postDetail.collect_num">{{ postDetail.collect_num }}</span>
					<span class="num" style="font-size: 26rpx;" v-else>收藏</span>
				</view>
				<view class="collectLikeItem" @tap="thumbHandle">
					<u-icon name="thumb-up" size="26" bold color="#000" v-if="postDetail.is_like==0"></u-icon>
					<u-icon name="thumb-up-fill" size="26" bold color="#FF6530" v-else></u-icon>
					<span class="num" v-if="postDetail.like_num">{{ postDetail.like_num }}</span>
					<span class="num" style="font-size: 26rpx;" v-else>点赞</span>
				</view>
			</view>
		</view>
	</view>
	<view @touchmove.stop.prevent="stopPenetrate">
		<u-popup :show="allCommentShow" @close="closeAllComent" mode="bottom" :round="10"
			:overlayStyle="{ 'touch-action': 'none' }">
			<scroll-view scroll-y="true" class="commentPopup" @scrolltolower="scrolltolower" lower-threshold="10">
				<Reply :allCommentDetail="allCommentDetail" @openAllComent="openAllComent" @showComment="showComment">
				</Reply>
			</scroll-view>
		</u-popup>
	</view>
	<view @touchmove.stop.prevent="stopPenetrate">
		<u-popup :show="show" mode="bottom" round="15" closeOnClickOverlay @close="closeComment"
			:overlayStyle="{ 'touch-action': 'none' }">
			<InputBox :show="show" @closeState="closeComment" :value="CommentValue" @change="getInputValue"
				:placeholder="placeholder" @send="sendBtn">
			</InputBox>
		</u-popup>
	</view>
</template>
<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import Comment from "../../../components/comment.vue"
	import InputBox from "../../../components/InputBox.vue"
	import Reply from "/components/Reply.vue"
	import {
		computed,
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		useStore
	} from "vuex";
	const store = useStore();
	const getOnLoad = ref("")
	const getUserId = ref("")
	const CommentValue = ref("")
	const allCommentShow = ref(false)
	const currentNum = ref(0)
	const isStar = ref(false)
	const isFollow = ref(false)
	const placeholder = ref("喜欢就多说两句")
	const show = ref(false)
	const isCheckMore = ref(false)
	const id = ref(0)
	let replyData = {}
	onLoad((e) => {
		id.value = parseInt(e.id)
		getOnLoad.value = e.id
		getUserId.value = e.userId
		store.dispatch("getpostDetail", e.id)
		let data = {
			post_id: e.id,
			num: 1,
			size: 10
		}
		store.dispatch("getComment", data)
		if (e.remark == 1) {
			showComment('')
		}
	})
	const postDetail = computed(() => {
		return store.state.postPage.postDetail
	})
	const imgList = computed(() => {
		if (postDetail.value.images != undefined) {
			console.log("图片", postDetail.value.images);
			return postDetail.value.images == [] ? [] : JSON.parse(postDetail.value.images)
		} else {
			return []
		}
	})
	const commentList = computed(() => {
		console.log("评论", store.state.postPage.allComment);
		return (store.state.postPage.allComment).slice(0, 10)
	})
	const publishTimes = computed(() => {
		let creatTime = Date.parse(postDetail.value.CreatedAt)
		let currentTime = Date.parse(new Date())
		let diff = (currentTime - creatTime) / 1000
		if (diff < 30) {
			return '刚刚';
		} else if (diff < 3600) {
			return `${Math.ceil(diff / 60)}分钟前`;
		} else if (diff < 3600 * 24) {
			return `${Math.ceil(diff / 3600)}小时前`;
		} else if (diff < 3600 * 24 * 30) {
			return `${Math.ceil(diff / (3600 * 24))}天前`;
		} else {
			return '1个月前';
		}
	})
	const clickImg = (index) => {
		uni.previewImage({
			urls: imgList,
			current: index
		})
	}
	const changeImgIndex = (e) => {
		currentNum.value = e.current
	}
	const closeComment = () => {
		// 关闭弹出框
		show.value = false
		CommentValue.value = ''
		placeholder.value = "喜欢就多说两句"
		replyData = {}
	}
	const showComment = (msg, data) => {
		console.log(data);
		// 打开弹出框
		if (msg) {
			placeholder.value = msg
		}
		replyData = {
			post_id: postDetail.value.ID
		}
		if (data) {
			replyData = Object.assign(replyData, data)
		}
		show.value = true
	}
	const closeAllComent = () => {
		// 关闭所有评论
		allCommentShow.value = false
	}
	let commentId = ref(0);
	const openAllComent = (id) => {
		if (id) {
			commentId.value = id
			isCheckMore.value = false
		}
		allCommentShow.value = true
	}
	const allCommentDetail = computed(() => {
		if (commentId.value != 0) {
			let res = commentList.value.filter((item) => {
				return item.ID == commentId.value
			})
			return res
		} else {
			return store.state.postPage.allComment
		}
	})
	const stopPenetrate = () => {
		return;
	}
	// 获取输入的值
	const getInputValue = (value) => {
		CommentValue.value = value
	}
	const sendBtn = () => {
		replyData.content = CommentValue.value
		store.dispatch("addComment", replyData)

	}
	// 收藏功能
	const star = () => {
		// 收藏和取消收藏的操作
		let data = parseInt(getOnLoad.value)
		store.dispatch("uploadStar", data)
		isStar.value = !isStar.value
		if (isStar.value) {
			uni.showToast({
				icon: "none",
				title: "收藏成功"
			})
		} else {
			uni.showToast({
				icon: "none",
				title: "取消收藏"
			})
		}
	}
	// 关注功能
	const follow = () => {
		// 这里的data就是用户id
		// let data=getUserId.value
		store.dispatch("addFollow", parseInt(getUserId.value))
		isFollow.value = !isFollow.value
		if (isFollow.value) {
			uni.showToast({
				icon: "none",
				title: "关注成功"
			})
		} else {
			uni.showToast({
				icon: "none",
				title: "取消关注"
			})
		}
	}
	const thumbHandle = () => {
		store.dispatch("addLike", {
			post_id: id.value
		})
	}
	const collectHandle = () => {
		console.log("collectHandle");
		store.dispatch("addCollect", {
			post_id: id.value
		})
	}
	let page = 1;
	const scrolltolower = () => {
		console.log("到底部了哦");
		if (isCheckMore.value) {
			page++
			uni.$u.throttle(scrollComment(), 50000)
		}
	}
	const scrollComment = () => {
		let data = {
			post_id: postDetail.value.ID,
			num: page,
			size: 10
		}
		store.dispatch("getComment", data)
	}
	const checkMore = () => {
		commentId.value = 0
		isCheckMore.value = true
		allCommentShow.value = true
	}
</script>

<style>
	.postDetailPage {
		background: #f9f9f9;
	}

	.postUserHeader {
		padding: 10rpx 20rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
	}

	.Header_left {
		display: flex;
		align-items: center;
	}

	.userHeadImg {
		width: 65rpx;
		height: 65rpx;
		border-radius: 100%;
		overflow: hidden;
		margin-right: 10rpx;
	}

	.Nickname {
		font-weight: 700;
		font-size: 28rpx
	}

	.Header_right {
		display: flex;
		align-items: center;
	}

	.follow {
		display: flex;
		align-items: center;
		margin-right: 30rpx;
		font-size: 26rpx;
		font-weight: 600;
		/* 		background-color: rgb(255, 239, 117); */
		border: 1rpx solid #eeeeee;
		padding: 10rpx 20rpx;
		border-radius: 1.5rem;
		color: #000;

	}

	.tap {
		margin-left: 10rpx;
	}

	.indicator-num {
		color: #fff;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 1.5rem;
		padding: 5rpx 15rpx;
		font-size: 24rpx;
		font-weight: 100;
	}

	.postText {
		font-size: 30rpx;
		line-height: 1.8;
		padding: 30rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
	}

	.postPublishTime {
		font-size: 24rpx;
		margin-top: 20rpx;
		color: #666;
	}

	.postComment {
		background-color: #fff;
		padding: 20rpx 25rpx;
	}

	.commentTitle {
		font-weight: 700;
	}

	.publishComment {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		bottom: 0;
		width: 100%;
		height: 70px;
		background-color: #fff;
		padding: 25rpx;
		/* 		border-top: 1rpx solid rgba(198, 198, 198, 0.3); */
	}

	.inputComment {
		display: flex;
		align-items: center;
		background-color: #eaeaea;
		border-radius: 1.5rem;
		font-size: 28rpx;
		color: #333;
		padding: 15rpx;
		width: 400rpx;
	}

	.collectLikeBox {
		display: flex;
	}

	.collectLikeItem {
		margin-left: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.placeholder {
		margin-left: 15rpx;
	}

	.num {
		color: #666;
		font-size: 26rpx;
		font-weight: 300;
	}

	.commentPopup {
		height: 85vh;
	}

	.checkMore {
		text-align: center;
		color: #666;
		font-size: 28rpx;
		margin: 20rpx;
	}
</style>z