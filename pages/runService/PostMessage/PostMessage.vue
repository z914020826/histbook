<template>
	<view class="post-message">
		<view style="height: 800rpx;">
			<view @click="leftTable">
				<div v-if="isTag" class="btn">#添加标签</div>
				<!-- 最后标签存放的位置 @sendGetCategory 自定义事件-->
				<div v-else :getSendCategory="getSendCategory" class="btn">{{ getSendCategory}}</div>
			</view>
			<view style="height: 330rpx;">
				<textarea v-model="inputValue" placeholder="来吧,尽情发挥吧..." auto-height style="padding: 0 15rpx;">
				</textarea>
			</view>

			<view v-show="imageShow">
				<u-upload :fileList="allSend.images" @afterRead="afterRead" @delete="deletePic" multiple :maxCount="52">
				</u-upload>
			</view>
		</view>
		<view class="core">
			<!-- 这里是表情库 -->
			<!-- 如果emojiShow等于true,会添加类名为show的类 -->
			<view class="emojiList" :class="{ show: !emojiShow }">
				<scroll-view style="height:470rpx;font-size: 52rpx;" scroll-y="true" position="flexed">
					<view v-for="(emoji, index) in emojiList" :key="index">
						<view class="emojiTitle">
							{{ index }}
						</view>
						<!-- @click="clickFace"  当我点击表情的时候 -->
						<view class="emoji-item">
							<span v-for="emojiItem in emoji" class="emojiText" @click="selectEmoji(emojiItem)">{{ emojiItem
							}}</span>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 这里是表情库 -->
		<view class="post-header">
			<!-- 这里增加一个添加表情的按钮 -->
			<uni-icons type="color" size="32" @tap="clickEmoji(true)" v-if="!emojiShow"></uni-icons>
			<!-- 取消表情 -->
			<uni-icons type="color-filled" size="32" @tap="clickEmoji(false)" v-else></uni-icons>

			<!-- 上传图片图标  @tap="clickEmoji(false)" -->
			<!-- <image src="../../../static/image/pictures.png" @tap="clickImages"
				style="width: 10%;  margin-left:15rpx; margin-bottom: 15rpx;"></image> -->
			<uni-icons type="images" size="32" @tap="clickImages" style="margin-left: 35rpx;"></uni-icons>
			<view class="post-header-issue" @click="commit">
				发布
			</view>
		</view>
	</view>
</template>
<script setup>
	// 通过调用useStoer函数，来在setup钩子函数中访问store,
	import {
		useStore
	} from "vuex";
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive,
		onMounted,
		computed
	} from 'vue';
	// ./LeftTable.vue
	import LeftTabele from '/pages/runService/PostMessage/LeftTable.vue'
	// 展示在页面上的标签
	const getSendCategory = ref('')
	const store = useStore();
	onLoad((options) => {
		console.log(123456);
	})
	onShow(() => {
		const pages = getCurrentPages();
		const prevPage = pages[pages.length - 1];
		const sendIndex = prevPage.index;
		getSendCategory.value = sendIndex;
		if (getSendCategory.value) isTag.value = false
	})
	const isTag = ref(true)
	const allSend = reactive({
		category: '',
		content: '',
		images: [],
		num1: []
	})
	// 这里是表情库相关的一些操作 
	// 这里是引入的表情库列表
	import emojiList from "../../../util/constant.js"
	// 表情块是否展示
	const emojiShow = ref(false)
	// 是否聚焦
	const focus = ref(false)
	const selectEmoji = (emoji) => {
		inputValue.value += emoji
		// 这里调用自定义事件之后 将inputValue.value 传给change
		emit("change", inputValue.value)
	}
	// props.value
	const inputValue = ref("")
	// const props = defineProps(["show", "value"])
	// emit 用于监听组件触发的自定义事件  验证函数会接收对应的参数
	const emit = defineEmits(["change"]);
	// 点击选择emoji列表
	const clickEmoji = (value) => {
		console.log("YiHang", value);
		emojiShow.value = value
		focus.value = !value
	}
	// 点击上传图片列表
	const imageShow = ref(false)
	const clickImages = () => {
		imageShow.value = !imageShow.value
	}
	// 这里是表情库相关的一些操作

	// const category = ref('');
	const commit = async () => {
		console.log('发布帖子');
		let data = {
			category: getSendCategory.value,
			content: inputValue.value,
			images: allSend.num1
		}
		if (!data.category || !data.content) {
			uni.showModal({
				title: '有信息未完善'
			})
			return
		} else {
			store.dispatch("uploadTips", data)
			uni.switchTab({
				url: '/pages/shool/shool'
			})
			uni.showToast({
				title: '发布成功',
				icon: "none",
				duration: 2000
			});
		}
	}
	// 删除图片  event 是images
	const deletePic = (event) => {
		allSend.images.splice(event.index, 1);
	}
	// 新增图片
	const afterRead = async (event) => {
		console.log("接收的文件", event.file);
		let lists = event.file
		console.log(lists);
		lists.map((item) => {
			allSend.images.push(item);
			allSend.num1.push(item.url)
		})
	}
	const leftTable = () => {
		uni.navigateTo({
			url: '/pages/runService/PostMessage/LeftTable'
		})
	}
</script>

<style>
	.post-message {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.post-header {
		display: flex;
		height: 80rpx;
		/* background-color:rgb(255 245 217); */
		background-color: rgb(255, 245, 217);
	}

	.core {
		flex: 1;
	}

	.post-header-issue {
		padding: 22rpx 30rpx;
		background-color: rgb(255, 239, 117);
		/* background-color: rgb(255, 245, 217); */
		border-radius: 30rpx;
		font-size: 12px;
		color: #333;
		width: 30%;
		text-align: center;
		position: fixed;
		margin-left: 500rpx;

	}

	.upload-icon .upload-imgs {
		display: flex;
		justify-content: space-around;
	}

	.upload-icon .upload-imgs image {
		width: 32rpx;
		height: 32rpx;
	}

	.textTitle {
		font-size: 25px;
		font-weight: 400;
	}

	.addCategory {
		font-size: 12px;
		margin-right: 15rpx;
		color: #999;
	}

	.btn {
		font-size: 30rpx;
		/* background-color: rgb(255, 239, 117, 0.4); */
		background-color: rgb(255, 245, 217);
		border-radius: 10px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		color: #333;
	}

	/* 这里是表情库的样式 */
	.show {
		visibility: hidden;
	}

	/* .uploadImages {
		visibility: hidden;
	} */

	.emojiList {
		margin-top: 20rpx;
		position: fixed;
	}

	.emojiTitle {
		font-size: 24rpx;
		margin: 20rpx;
		color: #999;
	}

	.emoji-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

	}

	.emoji-item::after {
		content: '';
		flex: auto;
	}

	.emoji-item .emojiText {
		margin: 0 13rpx;
	}

	.emoji {
		height: 65rpx;
		line-height: 65rpx;
		text-align: center;
		width: rpx;
		font-size: 26rpx;
		background-color: rgb(255, 239, 117);
		color: #333;
		font-size: 12px;
		border-radius: 30rpx;
		width: 120rpx;
		/* margin-left: 600rpx; */
		margin-top: 10rpx;

	}
</style>