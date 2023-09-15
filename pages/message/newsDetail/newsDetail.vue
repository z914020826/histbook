<template>
    <view class="sessionContent">
        <view class="session-main">
            <scroll-view class="scroll-session" scroll-y="true" @scrolltoupper="scrolltoupper" @scroll="scroll">
                <view class="list">
                    <view class="" v-for="item in chatList">
                        <view class="my-session session" v-if="item.role == 0">
                            <view class="my-word word">{{ item.content }}</view>
                            <img class="session-avatar my-avatar" :src="fromuser.head_image" alt="" />
                        </view>
                        <view class="friend-session session" v-else>
                            <img class="session-avatar friend-avatar" :src="hearderimg" alt="" />
                            <view class="friend-word word">{{ item.content }}</view>
                        </view>
                    </view>

                    <view class="" style="height: 150rpx;">

                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="session-bottom">
            <view class="fake-input" @click="openComment">想对TA说点什么...</view>
            <view class=""><u-icon name="plus-circle" size="32"></u-icon></view>
        </view>
    </view>
    <u-popup :show="show" mode="bottom" round="15" closeOnClickOverlay @close="closeComment">
        <InputBox :show="show" @closeState="closeComment" :value="pageValue" @change="getValue" @send="sendbtn"></InputBox>
    </u-popup>
</template>

<script setup>
import { reactive, ref, onMounted, computed, onBeforeUnmount, nextTick } from 'vue';
import InputBox from '../../../components/InputBox.vue';
import { onLoad, onUnload, onPageScroll } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
import { Success } from '@icon-park/vue-next';
const store = useStore();
let scrollT = ref();
let newHeight = ref();
const scroll = e => {
    console.log(e.detail);
    newHeight.value = e.detail.scrollHeight;
};
async function scrolltoupper(e) {
    console.log('触顶了');
    // pageData.content++;
    // history(pageData);
    // await nextTick();
    // let sessionView = uni.createSelectorQuery();
    // sessionView.select('.list').boundingClientRect();
    // sessionView.exec(data => {
    //     console.log(6666666, newHeight.value, data[0].height, newHeight.value);
    //     scrollT.value = newHeight.value + (data[0].height - newHeight.value);
    //     console.log('scrollT.value', scrollT.value);
    // });
    // uni.pageScrollTo({
    //     scrollTop: scrollT.value
    // });
}
onLoad(options => {
    console.log(9999, options);
    toUserId.value = options.id;
    hearderimg.value = options.header;
    uni.setNavigationBarTitle({
        title: options.name
    });
});
const hearderimg = ref();
let show = ref(false);
const toUserId = ref('');
let chatList = reactive([]);
const pageValue = ref('');
const fromuser = computed(() => {
    return store.state.indexPage.userInfo;
});
// 查找聊天记录的分页
const pageData = {
    content: 1,
    type: 2
};
onUnload(() => {
    uni.closeSocket({
        success: res => {
            console.log('关闭成功');
        },
        fail: res => {
            console.log('关闭失败');
        }
    });
    uni.onSocketClose(function (res) {
        console.log('WebSocket 已关闭！');
    });
});
onMounted(() => {
    console.log(9999999, store.state.indexPage.userInfo.ID, toUserId.value);
    Websoket();
    // scrollHeight()
});
const send = data => {
    sendMessage(data);
};
// 历史记录
const history = data => {
    console.log(6666, data);
    let a = { content: String(data.content), type: data.type };
    sendMessage(a);
};
// 点击发送按钮
const sendbtn = () => {
    chatList.push({
        role: 0,
        content: pageValue.value
    });
    let data = { content: pageValue.value, type: 1 };
    pageValue.value = '';
    sendMessage(data);
};
function sendMessage(data) {
    console.log(555, data);
    uni.sendSocketMessage({
        data: JSON.stringify(data),
        success: () => {
            console.log('data发送成功');
        }
    });
}
function Websoket() {
    uni.connectSocket({
        url: `wss://chat.frankzhang.space/ws/chat?uid=${String(store.state.indexPage.userInfo.ID)}&toUid=${toUserId.value}`,
        success: () => {
            console.log('romuserId}&toUid=$链接成功');
        },
        fail: () => {
            console.log('链接失败');
        },
        complete: fail => {
            console.log('链接结束', fail);
        }
    });
    uni.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！');
        send({ content: '', type: 3 });
        // for(let i=0;i<2;i++){
        // pageData.content++
        history(pageData);
    });
    uni.onSocketMessage(function (res) {
        // console.log('收到服务器内容：' ,JSON.parse(res.data),JSON.parse(res.data).from,`${toUserId.value}` );
        if (JSON.parse(res.data).from != 'system') {
            let msgData = {
                role: 1,
                content: JSON.parse(res.data).content
            };
            if (JSON.parse(res.data).from == `${toUserId.value}`) {
                if (JSON.parse(res.data).code == 200) {
                    chatList.push(msgData);
                } else {
                    chatList.unshift(msgData);
                }
            } else {
                msgData.role = 0;
                if (JSON.parse(res.data).code == 200) {
                    chatList.push(msgData);
                } else {
                    chatList.unshift(msgData);
                }
            }

            nextTick(() => {
                let sessionView = uni.createSelectorQuery();
                sessionView.select('.list').boundingClientRect();
                sessionView.exec(data => {
                    uni.pageScrollTo({
                        scrollTop: data[0].height,
                        duration: 0
                    })
                });
            })
        }
    });
    uni.onSocketError(function (res) {
        console.log('WebSocket连接打开失败，请检查！');
    });
}

const getValue = value => {
    pageValue.value = value;
};
const closeComment = () => {
    // 关闭弹出框
    show.value = false;
};
const openComment = () => {
    show.value = true;
};
</script>

<style lang="scss">
.sessionContent {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    .session-header {
        width: 100%;
        position: fixed;
        top: 0;
        height: 100rpx;
        display: flex;
        justify-content: space-between;
        padding: 20rpx 30rpx;
        align-items: center;
        background-color: #fff;
        border-bottom: 1px solid #ececec;

        .session-header-people {
            display: flex;
            align-items: center;

            .session-header-people-name {
                font-weight: 600;
                margin-left: 20rpx;
            }
        }
    }

    .session-main {
        padding: 20rpx 30rpx;
        display: flex;
        flex-direction: column;

        .session {
            display: flex;
            align-items: center;
            flex-direction: row;
            margin: 15rpx 0;
        }

        .my-session {
            justify-content: flex-end;

            .my-word {
                background-color: #ff6530;
                color: #fff;
            }

            .my-avatar {
                margin-left: 20rpx;
            }
        }

        .friend-session {
            justify-content: flex-start;

            .friend-word {
                background-color: #ececec;
                color: #333;
            }

            .friend-avatar {
                margin-right: 20rpx;
            }
        }

        .word {
            padding: 20rpx 20rpx;
            border-radius: 15rpx;
            display: flex;
            align-items: center;
            font-size: 14px;
        }

        .session-avatar {
            width: 85rpx;
            height: 85rpx;
            border-radius: 50%;
        }
    }

    .session-bottom {
        height: 150rpx;
        background-color: #fff;
        width: 100%;
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20rpx 30rpx;

        .fake-input {
            display: flex;
            align-items: center;
            color: #999;
            padding: 10rpx 25rpx;
            border-radius: 50px;
            background-color: #ececec;
            width: 600rpx;
            height: 40px;
        }
    }
}
</style>
