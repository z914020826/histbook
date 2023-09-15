import request from '../util/request.js'
let postBase = {
    uploadTips: "/post/add",
    uploadOss: "/user/oss",
    getCategory: "/category/getAll",
    getAllPost: "/post/getAllPost",
    getpostDetail: "/post/getPostDetail",
    getComment: "/remark/find",
    addComment: "/remark/add",
    // getPostListByUserID:"/post/getPostListByUserID"  //根据用户id获取帖子详情
    addLike: "/like/add",
    addCollect: "/collect/add",
    AllType: '/category/getAll'
}
// 发布帖子
export function UploadTips(data) {
    return request({
        url: postBase.uploadTips,
        method: 'post',
        data
    })
}
export function UploadOss() {
    return request({
        url: postBase.uploadOss,
        method: 'get'
    })
}
export function getAllPost(data) {
    return request({
        url: postBase.getAllPost,
        method: 'get',
        data: data
    })
}
// 获取标签的接口
export function GetCategory() {
    return request({
        url: postBase.getCategory,
        method: 'get'
    })
}
// 获取根据用户id获取帖子列表的接口
// export function getPostList(user) {
//     return request({
//         // es6模板字符串
//         url: postBase.getPostList,
//         method: 'post',
//         data: user
//     })
// } 
// 获取贴子详情
export function getpostDetail(id) {
    return request({
        url: postBase.getpostDetail + `?id=${id}`,
        method: 'get'
    })
}
// 获取评论列表
export function getComment(data) {
    return request({
        url: postBase.getComment,
        method: 'get',
        data
    })
}
// 发表评论
export function addComment(data) {
    return request({
        url: postBase.addComment,
        method: 'post',
        data
    })
}

export function addLike(data) {
    return request({
        url: postBase.addLike,
        method: 'post',
        data
    })
}
export function addCollect(data) {
    return request({
        url: postBase.addCollect,
        method: 'post',
        data
    })
}
export function AllType() {
    return request({
        url: postBase.AllType,
        method: 'get'
    })
}
// export function AllType() {
//     return request({
//         url: postBase.AllType,
//         method: 'get'
//     })
// }