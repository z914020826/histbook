<template>
    <view class="word">
        <scroll-view :scroll-y="true" :show-scrollbar="true">
            <view class="" v-for="item in megList" :key="item.id">
                <!-- 收到的消息 -->
                <view class="other-people" v-if="!item.myMeg">
                    <!--    <image src="/static/image/face.png" mode=""></image> -->
                    <image src="../face.png" mode=""></image>
                    <view class="meg">
                        {{ item.message }}
                    </view>
                </view>
                <!-- 自己发出去的消息 -->
                <view class="my-message" v-else>
                    <view class="matter">
                        {{ item.message }}
                    </view>
                    <!-- <image src="/static/image/face.png" mode=""></image> -->
                    <image src="../face.png" mode=""></image>

                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            megList: [
                {
                    myMeg: true, //是否是自己发的消息
                    message: '这是一条消息呀呀呀呀呀呀~',
                },
                {
                    myMeg: false, //是否是自己发的消息
                    message: '最近喜来登在招兼职生是吗？我想了解下~',
                }, {
                    myMeg: true, //是否是自己发的消息
                    message: '这是一条消息呀呀呀呀呀呀~',
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.word {
    padding: 0 20rpx 160rpx;
    background: #efefef;

    .my-message {
        display: flex;
        justify-content: flex-end;
        margin-top: 30rpx;

        image {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
        }

        .matter {
            background: #05BABF;
            padding: 25rpx;
            font-size: 32rpx;
            margin-right: 25rpx;
            color: #FFFFFF;
            border-top-left-radius: 20rpx;
            border-bottom-left-radius: 20rpx;
            border-bottom-right-radius: 20rpx;
        }
    }

    .other-people {
        display: flex;
        margin-top: 30rpx;

        image {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
        }

        .meg {
            width: 70%;
            font-size: 32rpx;
            color: #393939;
            margin-left: 25rpx;
            background: #FFFFFF;
            padding: 25rpx;
            border-top-right-radius: 20rpx;
            border-bottom-left-radius: 20rpx;
            border-bottom-right-radius: 20rpx;
        }
    }
}
</style>