<template>
	<view v-if="comment">
		<view class="comment">
			<!-- 一级评论头像 -->
			<view class="left">
				<image :src="comment.user.head_image" mode="aspectFill" class="commentImg">
				</image>
			</view>
			<!-- 一级评论信息 -->
			<view class="right">
				<view class="top">
					<view class="name">{{comment.user.nickname}}</view>
					<view class="like highlight">
						<u-icon name="thumb-up" :size="22"></u-icon>
						<view class="num">{{comment.like_num}}</view>
					</view>
				</view>
				<view class="content">{{comment.content}}</view>
				<view class="bottom">
					{{formatTime(comment.CreatedAt)}}
					<view class="reply" @click="reply(comment.user.nickname,{target_user_id:comment.user.ID,parents_remark_id:comment.ID})">回复</view>
				</view>
				<!-- 二级评论 -->
				<view class="reply-box">
					<view class="item"
						v-for="item in (props.checkAll?comment.child_remarks.slice(0,3):comment.child_remarks)">
						<!-- 二级头像 -->
						<view class="reply-userImg">
							<image :src="item.user.head_image" mode="aspectFill" class="commentImg">
							</image>
						</view>
						<!-- 二级评论信息-->
						<view class="reply-userDetail">
							<view class="username">
								<span>{{item.user.nickname}}</span>
								<view class="like highlight">
									<u-icon name="thumb-up" :size="22"></u-icon>
									<view class="num">{{item.like_num}}</view>
								</view>
							</view>
							<view class="text">回复了<span
									style="font-size: 24rpx; color: #666;">{{item.target_user.nickname}}</span>:
								{{item.content}}</view>
							<view class="bottom">
								{{formatTime(item.CreatedAt)}}
								<view class="reply"
									@click="reply(item.user.nickname,{target_user_id:item.user.ID,parents_remark_id:comment.ID})">
									回复</view>
							</view>
						</view>
					</view>
					<view class="all-reply" @click="open" v-if="comment.child_remarks.length>3&&props.checkAll">
						查看全部{{comment.child_remarks.length}}条回复
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		computed,
		watch
	} from "vue";
	import formatTime from "../util/formatTime.js"
	const props = defineProps({
		checkAll: {
			type: Boolean,
			default: true
		},
		commentData: {
			type: Object,
		}
	})
	const emit = defineEmits(["openAllComent", "showComment"])
	// 贴子id，回复人的id，楼主id，
	const open = () => {
		emit("openAllComent", props.commentData.ID)
	}
	const comment = ref(props.commentData)

	const reply = (msg, data) => {
		msg = "回复" + msg + "："
		emit("showComment", msg, data)
	}
	watch(() => props.commentData, (newValue, oldValue) => {
		comment.value = newValue
	})
</script>

<style lang="scss" scoped>

	.comment {
		display: flex;
		background-color: #fff;
		margin-top: 20rpx;

		.left {
			.commentImg {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				margin-top: 10rpx;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;
			border-bottom: 0.5rpx solid rgba(238, 238, 238, 0.5);

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: -10rpx;

				.name {
					color: #666;
				}
			}

			.content {
				margin-bottom: 10rpx;
				font-size: 28rpx;
				line-height: 1.5;
				padding: 0 70rpx 0 0;
			}

			.reply-box {
				.item {
					display: flex;
					padding: 10rpx 0;

					.reply-userImg {
						.commentImg {
							width: 50rpx;
							height: 50rpx;
							border-radius: 50%;
							margin-top: 15rpx;
						}
					}

					.reply-userDetail {
						display: flex;
						flex-direction: column;
						padding-left: 20rpx;
						flex: 1;
					}

					.text {
						font-size: 26rpx;
						padding-right: 70rpx;
						margin-bottom: 10rpx;
					}

					.username {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 24rpx;
						color: #999999;
						margin-bottom: -10rpx;
					}
				}


				.all-reply {
					padding: 15rpx 0;
					display: flex;
					color: #014075;
					align-items: center;
					font-weight: 700;
					margin-left: 70rpx;
				}
			}

			.bottom {
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #666;
					margin-left: 10rpx;
				}
			}
		}

		.like {
			display: flex;
			align-items: center;
			flex-direction: column;
			color: #9a9a9a;
			font-size: 26rpx;

			.num {
				color: #999;
				font-size: 24rpx;
			}
		}

	}
	.lastItem{
		border: 0;
	}
</style>