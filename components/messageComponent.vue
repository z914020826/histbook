<template>
	<view class="messageComponentPage">
		<!-- 左边 -->
		<view class="messageComponent_left">
			<!-- 图片 -->
            <view class="messageComponent-main">
                <view class="messageComponent_headImage">
                    <img :src="props.headerImg" alt="" class="messageComponentHeadPhoto">
                </view>
                <!-- 消息和通知 -->
                <view class="messageComponent">
                    <!-- 通知消息 -->
                    <view class="messageComponentInform">
                        {{props.inform}}
                    </view>
                    <!-- 还没有新通知~ -->
                    <view class="messageComponentInformText">
                        {{props.interaction}}
                    </view>
                </view>
            </view>
            <view>
            <view class="messageTime" v-if="props.total==0">
                <span>{{ props.time}}</span>
            </view>
            <view class="messageTime" v-else>
                <u-badge :value="props.total" ></u-badge>
            </view>
            </view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
    import formatTime from '../util/formatTime.js'
	const props = defineProps({
		inform: {
			default: "通知消息"
		},
		interaction: {
			default: "还没有新通知~"
		},
        headerImg:{
            default:"/static/image/inform.jpg"
        },
        time:{
            default:""
        },
        total:{
            default:0
        }
	})
</script>

<style>
	.messageComponentPage {
		height: 130rpx;
		align-items: center;
	}
    .messageTime{
        color: #999;
        font-size: 12px;
    }

	.messageComponent_left {
		display: flex;
		/* flex: 3; */
        flex-direction: row;
		align-items: center;
        justify-content: space-between;
	}
.messageComponent-main{
    display: flex;
}
	.messageComponent {
		justify-content: center;
		padding-left: 20rpx;
	}

	.messageComponent_headImage {
		width: 100rpx;
		height: 100rpx;
	}

	/* 头像 */
	.messageComponentHeadPhoto {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	/* 通知消息题头 */
	.messageComponentInform {
		font-size: 30rpx;
		margin-bottom: 15rpx;
		color: #333;
		font-weight: 500;
	}


	.messageComponentInformText {
		/* 设置超出宽度 */
		white-space: nowrap;
		overflow: hidden;
		width: 380rpx;
		text-overflow: ellipsis;
		color: #999;
		font-size: 25rpx;
	}
</style>