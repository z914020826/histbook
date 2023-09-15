import CryptoJS from 'crypto-js';
import {
	Base64
} from 'js-base64';
import {
	uploadOss
} from "../api/index.js"
const date = new Date();
// // 获取当前时间，并在当前时间上加1小时，用于设置policy过期时间。
date.setHours(date.getHours() + 1);
// 定义policyText对象，包含过期时间和上传条件。
const policyText = {
	expiration: date.toISOString(), // 设置policy过期时间。
	conditions: [
		// 限制上传大小。
		["content-length-range", 0, 1024 * 1024 * 1024],
	],
};
//计算签名的方法
// canonicalString 请求的关键信息   
 // accessKeySecret,是用户用于加密认证字符串和用来验证认证字符串的密钥
function computeSignature(accessKeySecret, canonicalString) {
	return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(canonicalString, accessKeySecret));
}
// 异步函数用于获取OSS数据
const getOssData = async () => {
	let result = await uploadOss()
	console.log("getOssData", result);
	if (result.code == 200) {
		return result.data
	} else {
		return new Promise(new Error("oss信息获取失败"))
	}
}
/** 
 *   上传文件到OSS的函数
 *	参数一:files,数组,表明要上传的多张图片
 *	[url,url,url]
	参数二: dir，字符串，表明要上传到哪个文件夹
	"userImg/"
 *	参数三:[可选]fileName,字符串,上传的文件夹及文件名,如果不传该参数,那么默认file的文件名
 *	"headImg/123.jpg"
 */
async function OssLoad(files, dir, fileName) {
	let ossData = await getOssData()
	// 进行加密
	const policy = Base64.encode(JSON.stringify(policyText))
	//computeSignature 用于验证请求的合法性，以确保请求的来源是可信的
	const signature = computeSignature(ossData.access_key_secret, policy)
	const host = ossData.host;
	const ossAccessKeyId = ossData.access_key_id;
	files.forEach((file) => {
		uni.uploadFile({
			url: host,
			filePath: file,
			name: 'file',
			formData: {
				key: dir + (!fileName? file.match(/\/([^/]+)$/)[1]:fileName),
				policy,
				OSSAccessKeyId: ossAccessKeyId,
				signature,
				success_action_status:"200"
			},
			success: (uploadFileRes) => {
				console.log("上传结果", uploadFileRes);
			},
			fail: (err) => {
				console.log("上传失败", err);
				uni.showModal({
					title: '上传失败',
					content: err.errMsg,
					showCancel: false
				});
			},
		})

	})
	return host   // 返回OSS主机地址
} 
export default OssLoad

/**
 * 使用加密和签名来保证上传的安全
 * 使用OssLOad 接收文件，参数
 * 使用uni.uploadFile函数进行上传，在上传之前，它从API获取了阿里云OSS相关的配置信息，并生成了用于上传验证的策略和签名。
 * uni.uploadFile 函数来实现文件上传功能
 * computeSignature 函数是用于计算签名的函数，它通常在文件上传等需要安全验证的场景中使用。签名是一种加密的字符串，用于验证请求的合法性，以确保请求的来源是可信的。   HMAC-SHA1 加密
 **/