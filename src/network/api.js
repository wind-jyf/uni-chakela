import axios from './axios'

// 用户登录
export function login(query) {
    return axios({
        method: 'post',
        url: '/wx/login',
        params:query
    })
}

export function getCourseList(data){ //查询课程列表
    return axios({
        method:'get',
        //url:`/api/course/list/${data.PageSize}/${data.PageNum}`,
        url:'/api/course/list',
        params:data
    })
}

export function getCourseDetail(data){ //查询课程详情
    return axios({
        method:'get',
        url:`/api/course/detail/${data.id}`
    })
}

export function getAllComment(data){ //查询当前课程的评论
    return axios({
        method:'get',
        url:`/api/comment/course/${data.courseId}`
    })
}

export function getCloude(data){ //查询当前课程的评论的词云图
    return axios({
        method:'get',
        url:`/api/comment/cloud/${data.courseId}`,
        responseType: 'arraybuffer'
    })
}
export function getUserAllComment(){ //查询当前用户的所有评价
    return axios({
        method:'get',
        url:'/api/comment/user'
    })
}

export function addComment(data){//添加评价
    return axios({
        method:'post',
        url:'/api/comment/addCourseComment',
        data
    })
}

export function deleteComment(data){ //删除评价
    return axios({
        method:'delete',
        url:`/api/comment/${data.id}`
    })
}

export function addLike(data){ //点赞评论
    return axios({
        method:'post',
        url:`/api/comment/like/${data.commentId}`
    })
}

export function addDisLike(){ //点踩
    return axios({
        method:'post',
        url:`/api/comment/dislike/${data.commentId}`
    })
}
export function deleteLike(data){ //取消点赞
    return axios({
        method:'delete',
        url:`/api/comment/like/${data.commentId}`
    })
}

export function deleteDisLike(data){ //取消点踩
    return axios({
        method:'delete',
        url:`/api/comment/dislike/${data.commentId}`
    })
}

export function getTotalLike(data){ //统计某篇评论总点赞数
    return axios({
        method:'get',
        url:`/api/comment/like/total/comment/${data.commentId}`
    })
}

export function getTotalDisLike(data){ //统计某篇评论总点踩数
    return axios({
        method:'get',
        url:`/api/comment/dislike/total/comment/${data.commentId}`
    })
}

export function getUserTotalLike(){//统计用户总的评论点赞数
    return axios({
        method:'get',
        url:'/api/comment/like/total/user'
    })
}

export function getUserTotalDisLike(){//统计用户总的评论点踩数
    return axios({
        method:'get',
        url:'/api/comment/dislike/total/user'
    })
}

export function getUserLikeComment(){ //获取某ID点赞的评论
    return axios({
        method:'get',
        url:'/api/comment/like/user/like'
    })
}

export function getUserDisLikeComment(){ //获取某ID点赞的评论
    return axios({
        method:'get',
        url:'/api/comment/dislike/user/like'
    })
}