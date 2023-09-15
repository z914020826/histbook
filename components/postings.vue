<template>
	<view class="u-page">
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<view class="album">
					<view class="album__avatar" @click="head_image">
						<image :src="props.head_image"></image>
					</view>
					<view class="album__content">
						<u--text :text="props.nickname" bold size="17"></u--text>
						<view class="postText" @tap="readMore">
							<rich-text :nodes="props.content" class="postMessage"></rich-text>
							<view class="readMore" v-if="showReadMore">
								全文
							</view>
						</view>
						<!-- 图片 -->
						<view class="albumBox">
							<u-album :urls="props.images" multipleSize="90" singleSize="230"></u-album>
						</view>
						<view class="shoolFooter">
							<view>
								<u-icon name="more-dot-fill" size="24" color="#000"></u-icon>
							</view>
							<view class="thumbAndchat">
								<view class="chat" @click="remark">
									<u-icon name="chat" size="24" color="#000"></u-icon>
									<span class="num">{{ props.remarks_num }}</span>
								</view>
								<view class="thumb" @click="thumbHandle">
									<u-icon name="thumb-up" size="24" color="#000" v-if="props.is_like == 0"></u-icon>
									<u-icon name="thumb-up-fill" size="24" color="#FF6530" v-else></u-icon>
									<span class="num">{{ props.like_num }}</span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
import {
	ref,
	reactive,
	getCurrentInstance,
	onMounted,
	computed
} from 'vue'
import {
	useStore
} from "vuex";
import {
	getPostList
} from '../store/post/post.js'
import {
	onLoad
} from '@dcloudio/uni-app'
const store = useStore();

const props = defineProps(["id", "content", "nickname", "head_image", "like_num", "images", "remarks_num", "userId"])
const showReadMore = ref(false)
const isthumb = ref(false)
const instance = getCurrentInstance();
const result = computed(() => {
	return store.state.postPage.getPostList
})
onMounted(() => {
	const query = uni.createSelectorQuery().in(instance);
	query.select('.postText').boundingClientRect(data => {
		if (data.height < 90) {
			showReadMore.value = false
		} else {
			showReadMore.value = true
		}
	}).exec();
})

function readMore() {
	uni.navigateTo({
		url: "/pages/shool/detail/detail?id=" + props.id + "&&userId=" + props.userId
	})
}
function thumbHandle() {
	// 点赞和取消点赞
	isthumb.value = !isthumb.value
	if (isthumb.value) {
		uni.showToast({
			icon: "none",
			title: "点赞成功"
		})
	}
}
// 点击头像跳转到个人主页
function head_image() {
	console.log('对应用户的ID', props.id);
	uni.reLaunch({
		url: `/pages/myhome/myhomePage/myhomePage?id=${props.id}`
	})
}
</script>

<style lang="scss" scoped>
.u-page {
	margin: 30rpx 20rpx;
}

.album {
	display: flex;
	align-items: flex-start;

	&__avatar {
		background-color: $u-bg-color;
		border-radius: 100%;
		overflow: hidden;
		width: 85rpx;
		height: 85rpx;
	}

	&__content {
		margin-left: 10px;
		flex: 1;
	}
}

.u-text__value--primary {
	color: #000;
}

.postMessage {
	line-height: 1.5;
	margin-bottom: 20rpx;
}

.shoolFooter {
	display: flex;
	justify-content: space-between;
	margin-top: 25rpx;
}

.thumbAndchat,
.thumb,
.chat {
	display: flex;
	align-items: center;
}

.chat {
	margin-right: 35rpx;
}

.num {
	margin-left: 8rpx;
}

.postText {
	max-height: 6rem;
	overflow: hidden;
	position: relative;
}

.readMore {
	height: 1.5rem;
	line-height: 1.5rem;
	position: absolute;
	top: 4.5rem;
	right: 0;
	font-size: 32rpx;
	font-weight: 700;
	background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 28%);
	width: 4rem;
	text-align: end;
}

.albumBox {
	margin-top: 20rpx;
}
</style>