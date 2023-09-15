import {
	UploadTips,
	UploadOss,
	GetCategory,
	getAllPost,
	// getPostList,
	getpostDetail,
	getComment,
	addComment,
	addLike,
	addCollect,
	AllType
} from "../../api/post.js"
import ossLoad from '../../util/ossLoad.js'
export default {
	// 初始值需要根据接口返回来的数据来写 
	state: () => ({
		categorytype: [],
		postList: [],
		// info: {},
		postDetail: {},
		allComment: [],
		allUserPost: {}
	}),
	// 修改数据的地方
	mutations: {
		getCategoryType(state, data) {
			state.categorytype = data
		},
		allPostList(state, data) {
			state.postList = data
		},
		// getPostList(state, data) {
		// 	state.info = data
		// },
		getpostDetail(state, data) {
			state.postDetail = data
		},
		getComment(state, data) {
			state.allComment = state.allComment.concat(data)
		},
		firstGetComment(state, data) {
			state.allComment = data
		},
		addLike(state, data) {
			console.log("d", state.postList.posts, data);
			state.postList.posts.forEach((item) => {
				if (item.ID == data.id) {
					item.like_num += data.num
					item.is_like = data.num == 1 ? 1 : 0
				}
			})
			state.postDetail.like_num += data.num
			state.postDetail.is_like = data.num == 1 ? 1 : 0
		},
		addCollect(state, num) {
			state.postDetail.collect_num += num
			state.postDetail.is_collect = num == 1 ? 1 : 0
		},
		getAllType(state, data) {
			state.type = data
		}
	},

	actions: {
		async getAllPost(state, data) {
			let result = await getAllPost(data)
			console.log(result);
			if (result.code == 200) {
				state.commit("allPostList", result.data)
			}
		},
		async uploadTips(state, data) {
			console.log("uploadTips——data", data);
			let dir = "postImgs/"
			let host = await ossLoad(data.images, dir)
			// 构建一个新的数组 重新存储新的图片地址 
			data.images = data.images.map((item) => {
				let filename = item.match(/\/([^/]+)$/)[1];
				const url = host + "/" + dir + filename
				return url
			})
			data.images = JSON.stringify(data.images)
			let result = await UploadTips(data)
			console.log("发布帖子的结果", result);
			if (result.code == 200) {
				console.log('发布成功');
			}
		},
		async uploadOss(state, data) {
			let result = await UploadOss();
			console.log("上传图片到云端", result);
			if (result.code == 200) {
				console.log('ossLoad');
			}
		},
		// 发布帖子页面标签相关的逻辑判断
		async getCategory(state, data) {
			// 给服务器发请求的方法
			let result = await GetCategory();
			if (result.code == 200) {
				state.commit('getCategoryType', result.data)
			}
		},
		async getpostDetail(state, id) {
			let result = await getpostDetail(id);
			console.log(result);
			if (result.code == 200) {
				state.commit('getpostDetail', result.data)
			}
		},
		async getComment(state, data) {
			let result = await getComment(data);
			console.log("所有评论", result);
			if (result.code == 200) {
				if (data.num == 1) {
					state.commit('firstGetComment', result.data)
				} else {
					state.commit('getComment', result.data)
				}
			}
		},
		async addComment(state, data) {
			let result = await addComment(data);
			console.log("发表评论", result);
			if (result.code == 200) {
				uni.showToast({
					icon: "none",
					title: "评论成功"
				})
				state.dispatch("getComment", {
					post_id: data.post_id,
					num: 1,
					size: 100
				})
			} else {
				uni.showToast({
					icon: "none",
					title: "评论失败"
				})
			}
		},
		async addLike(state, data) {
			let result = await addLike(data);
			console.log("点赞操作", result);
			if (result.code == 200) {
				uni.showToast({
					icon: "none",
					title: result.msg
				})
				if (result.msg == "点赞成功") {
					state.commit("addLike", {
						id: data.post_id,
						num: 1
					})
				} else {
					state.commit("addLike", {
						id: data.post_id,
						num: -1
					})
				}
			} else if (result.code == 400) {
				uni.showToast({
					icon: "none",
					title: "当前贴子不存在了"
				})
			}
		},
		async addCollect(state, data) {
			let result = await addCollect(data);
			console.log("收藏操作", result);
			if (result.code == 200) {
				uni.showToast({
					icon: "none",
					title: result.msg
				})
				if (result.msg == "收藏成功") {
					state.commit("addCollect", 1)
				} else {
					state.commit("addCollect", -1)
				}
			} else if (result.code == 400) {
				uni.showToast({
					icon: "none",
					title: "当前贴子不存在了"
				})
			}
		},
		async allType(state) {
			let result = await AllType();
			console.log("所有评论", result);
			if (result.code == 200) {
				state.commit('getAllType', result.data)
			}
		}

	}
}