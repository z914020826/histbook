<template>
	<!-- 聊天 -->
	<view class="consult">
		<!-- 聊天记录 -->
		<chat-content></chat-content>
		<!-- 键盘 -->
		<view :class="['keyboard',useful_flag?'keyboard-active':'']">
			<view :class="['keyboard-tup',active_Up?'active-tup':'']">
				<input v-model="value" :focus="cursor" :cursor="resStart" @keyboardheightchange.stop="openinput"
					@blur="cursorss" @confirm="startSearch" />
				<image @click="openUseful(1)" class="plus-circle" src="/static/image/face.png"
					mode=""></image>
<!-- 				<image class="useful" src="/static/image/face.png" mode="" @click="openUseful(2)">
				</image> -->
			</view>
			<!--常用语  -->
			<view class="useful-content" v-if="useful_expression === 2">
				<view class="useful-content-xiaoxi" v-for="item in 9">你好，可以帮我推荐几个兼职任务吗？</view>
			</view>
			<!-- 表情 -->
			<view class="expression" v-if="useful_expression === 1">
				<scroll-view class="emojis_scroll" :scroll-x="false" :scroll-y="true">
					<view v-for="item in emojis" :key="item.emojis" class="emoji"
						@click="ChooseToLook(`${item.emoji}`)">
						{{item.emoji}}
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 蒙板 -->
		<view class="shade" v-show="show" @click="close"></view>
	</view>
</template>
<script>
	import chatContent from './chatcontent/chatcontent.vue'
	export default {
		components: {
			chatContent
		},
		data() {
			return {
				show: false,
				cursor: false, //是否聚焦
				value: '',
				active_Up: false,
				resStart: 0, //input光标位置
				useful_flag: false, //控制动画效果
				useful_expression: 2, //2默认表情,1常用语
				emojis: [{
						emoji: '😃'
					},
					{
						emoji: '🤣'
					}, //真机才能看见效果
					{
						emoji: '😁'
					},
					{
						emoji: '😆'
					},
					{
						emoji: '😅'
					}
				]
			}
		},
		watch: {
			useful_flag: {
				handler(newval, oldval) {
					this.show = newval
				}
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		methods: {
			// 软键盘弹起，获取到焦点
			openinput(event) {
				// 解决软键盘遮挡input输入框
				this.active_Up = true //初始化
				if (event.detail.height != 0) {
					this.active_Up = true
				} else {
					this.active_Up = false
				}
				return false
			},
			// 失去焦点时获取当前光标的位置
			cursorss(event) {
				this.active_Up = false
				this.cursor = false; //取消聚焦
				this.resStart = event.target.cursor //保存光标位置
			},
			ChooseToLook(val) {
				// 返回获取从0到光标位置的字符串
				let str = this.value.substring(0, this.resStart)
				// 将表情插入指定位置
				this.value = this.value.replace(str, str + val)
				// 光标向后移动两位
				this.resStart += 2; //光标加2(表情是占两个位置)
				this.cursor = true //设置聚焦
			},
			close() {
				this.show = false;
				this.useful_flag = false
			},
			// 打开常用语
			openUseful(e) {
				if (this.useful_flag) {
					if (this.useful_expression === e) {
						// 如果已经打开过常用语
						this.useful_expression = e
						this.useful_flag = false //关闭
					} else {
						this.useful_expression = e
					}
				} else {
					this.useful_expression = e
					this.useful_flag = true //开启动画
				}
			},
			// 软键盘按下确定的事件监听
			startSearch() {
				console.log(1111)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.consult {
		background-color: #EFEFEF;
		height: 100vh;
		padding-top: 30rpx;
		padding-bottom: 60rpx;

		.shade {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .4);
			position: absolute;
			top: 0;
			left: 0;
		}

		.keyboard-active {
			bottom: 0 !important;
		}

		.keyboard {
			position: fixed;
			bottom: -488rpx;
			transition: bottom .3s;
			z-index: 999;
			width: 100%;

			.expression {
				height: 488rpx;
				background-color: #FAFAFA;

				.emojis_scroll {
					display: block;
					float: left;
					width: 100%;
					height: 400rpx;
					padding-left: 25rpx;
				}

				.emoji {
					display: block;
					float: left;
					width: 100rpx;
					height: 100rpx;
					font-size: 70rpx;
					text-align: center;
				}
			}

			.useful-content {
				height: 488rpx;
				background-color: #FAFAFA;
				overflow-y: auto;

				.useful-content-xiaoxi {
					height: 104rpx;
					text-align: center;
					line-height: 104rpx;
					border-bottom: 1rpx solid #F3F3F3;
				}
			}

			.keyboard-tup {
				display: flex;
				align-items: center;
				padding: 0 50rpx;

				.uni-input-input {
					background: #FFFFFF;
					padding: 0 20rpx;
				}

				.plus-circle {
					width: 56rpx;
					height: 56rpx;
					margin: 0 20rpx;
				}

				.useful {
					width: 64rpx;
					height: 64rpx;
					color: #333333;
				}

				input {
					width: 490rpx;
					height: 80rpx;
					box-sizing: border-box;
					border-radius: 8px;
				}

				height: 115rpx;
				background-color: #F5F5F5;
			}

			.active-tup {
				height: 130rpx;
				padding: 50rpx 50rpx 70rpx !important;
			}
		}
	}
</style>