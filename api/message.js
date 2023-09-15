import request from '../util/request.js'
// 获取未读消息的列表
let messageBase = {
	// 示例
	unread: '/chat/unread',
}

export function UnreadMessage() {
	return request({
		url: messageBase.unread,
		method: 'get'
	})
}