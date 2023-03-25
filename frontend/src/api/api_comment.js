import { httpGet } from '@/utils/axios.js'
// 获取热门评论
export const getHotComment = (id, type, limit, offset, before) => httpGet('/api/comment/hot', {id, type, limit, offset, before})

// 获取新版评论
export const getNewComment = ({id, type, limit, offset, before}) => {
  switch (type) {
    case 0: return httpGet('/api/comment/music', {id, limit, offset, before})
    case 1: return httpGet('/api/comment/mv', {id, limit, offset, before})
    case 2: return httpGet('/api/comment/playlist', {id, limit, offset, before})
    case 3: return httpGet('/api/comment/album', {id, limit, offset, before})
    case 4: return httpGet('/api/comment/dj', {id, limit, offset, before})
    case 5: return httpGet('/api/comment/video', {id, limit, offset, before})
  }
}

// 发送/删除评论
export const sendComment = ({type, id, content, commentId, t}) => httpGet('/api/comment', {type, id, content, commentId, t})

// 给评论点赞 cid:评论id, t:1为点赞 ,0为取消点赞
export const likeComment = ({id, cid, type, t}) => httpGet('/api/comment/like', {id, cid, type, t})
