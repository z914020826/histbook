	<template>
		<view class="commentting">
			<view class="commentInput">
				<view class="content-wrap" :class="{fullLength:!sendBtnShow}">
					<textarea class="content" v-model="inputValue" maxlength="-1" :focus="focus" auto-height auto-focus
						:placeholder="placeholder" @focus="getFocus" :show-confirm-bar="false" @input="getInputValue"
						@keyboardheightchange="keyboardheightchange" />
					<view class="emoji" @tap="clickEmoji(true)" v-if="!emojiShow">
						<u-icon name="plus-circle" size="24"></u-icon>
					</view>
					<view class="emoji" @tap="clickEmoji(false)" v-else>
						<u-icon name="plus-circle-fill" size="24"></u-icon>
					</view>
				</view>
				<view class="sendComment" v-if="sendBtnShow">
					<button class="sendBtn" @click="sendMessage">发送</button>
				</view>
			</view>
			<!-- 这里是表情库 -->
			<view class="emojiList" :class="{show:!emojiShow}">
				<scroll-view style="height:282px;font-size: 52rpx;" scroll-y="true">
					<view class="emojiGrop" v-for="(emoji,index) in emojiList" :key="index">
						<view class="emojiTitle">
							{{index}}
						</view>
						<view class="emoji-item">
							<span v-for="emojiItem in emoji" class="emojiText"
								@click="selectEmoji(emojiItem)">{{emojiItem}}</span>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</template>
	<script setup>
		import {
			computed,
			onMounted,
			reactive,
			ref,
			toRef,
			watch,
		} from "vue";
		import emojiList from "../util/constant.js"
		const props = defineProps(["show", "value","placeholder"])
		const emit = defineEmits(["closeState", "change", "send"]);
		const inputValue = ref(props.value)
		// 表情块是否展示
		const emojiShow = ref(false)
		// 是否聚焦
		const focus = ref(false)
		const sendBtnShow = computed(() => {
			return inputValue.value == "" ? false : true
		})
		const getFocus = () => {
			emojiShow.value = false
		}
		// 点击选择emoji列表
		const clickEmoji = (value) => {
			console.log("YiHang", value);
			emojiShow.value = value
			focus.value = !value
		}
		const keyboardheightchange = (e) => {
			let height = e.detail.height
			console.log(height);
			if (height == 0 && emojiShow.value == false) {
				emit("closeState")
			}
		}
		const selectEmoji = (emoji) => {
			inputValue.value += emoji
			emit("change", inputValue.value)
		}
		const sendMessage = () => {
			emit("send")
			inputValue.value = ""
			emit("closeState")
		}
		const getInputValue = (e) => {
			emit("change", e.detail.value)
		}
		watch(() => props.show, (newValue, oldValue) => {
			focus.value = newValue
		})
	</script>

	<style scoped>
		.commentting {
			/* height: 600rpx; */
			padding: 20rpx 30rpx;
		}

		.commentInput {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20 rpx 30 rpx;
		}

		.content-wrap {
			background-color: rgba(43, 43, 43, 0.1);
			width: 80%;
			display: flex;
			align-items: center;
			padding: 20rpx 40rpx;
			font-size: 26rpx;
			border-radius: 1.5rem;
			transition: all 0.2s;
		}

		.fullLength {
			width: 100%;
		}

		.content {
			color: #333;
			max-height: 3rem;
			transition: all 0.2s;
		}

		.emoji {
			margin-left: 30rpx;
		}

		.sendBtn {
			height: 65rpx;
			font-size: 26rpx;
			background-color: #FF6530;
			color: #FFFFFF;
		}

		.placeholder {
			margin-left: 15rpx;
		}

		.show {
			visibility: hidden;
		}

		.emojiList {
			margin-top: 20rpx;
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

		.emojiTitle {
			font-size: 24rpx;
			margin: 20rpx;
			color: #999;
		}
	</style>