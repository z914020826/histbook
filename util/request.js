import baseURL from './base.js'; //导入接口的前缀地址
import store from '../store/store.js'
// 全局请求封装
export default (options) => {
	const token = uni.getStorageSync("token") || "";
	const TOKEN = store.state.indexPage.userInfo.token
	if (TOKEN && token && token != TOKEN) {
		uni.removeStorageSync("token")
		uni.reLaunch({
			url: "/pages/index/index",
			success() {
				uni.showToast({
					icon: "none",
					duration: 4000,
					title: "登陆已过期，请重新登录"
				});
			}
		})
	}
	const Authorization = token ? `Bearer ${token}` : "";
	return new Promise((resolve, reject) => {
		// 发送请求调用的方法
		uni.request({
			header: {
				Authorization
			},
			url: baseURL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success(response) {
				if (response.data.code === 1006) {
					// 登录过期
					uni.removeStorageSync("token")
					uni.reLaunch({
						url: "/pages/index/index",
						success() {
							uni.showToast({
								icon: "none",
								duration: 4000,
								title: "登陆已过期，请重新登录"
							});
						}
					})
				}
				if (response.statusCode !== 200) {
					uni.showToast({
						icon: "none",
						duration: 4000,
						title: "服务器繁忙，请稍后尝试"
					});
					reject(new Error(`服务器繁忙，请稍后尝试`))
				}

				resolve(response.data);
			},
			fail(err) {
				uni.showToast({
					icon: "none",
					title: '服务响应失败'
				});
				console.error(err);
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
};