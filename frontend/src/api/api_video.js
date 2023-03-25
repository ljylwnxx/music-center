import { httpGet } from '@/utils/axios.js'
// 获取全部视频列表
export const getAllVideo = (offset) => httpGet('/api/video/timeline/all', {offset})

// 获取视频标签/分类下的视频
export const getVideoByTags = (id, offset) => httpGet('/api/video/group', {id, offset})

// 获取视频标签列表
export const getVideoAllTag = () => httpGet('/api/video/group/list')

// 获取视频分类列表
export const getVideoHotTag = () => httpGet('/api/video/category/list')

// 获取最新 mv
export const getLatestMv = (offset, area) => httpGet('/api/mv/first', {offset, area})

// 收藏的 MV 列表
export const getSubMv = () => httpGet('/api/mv/sublist')

// 获取网易出品mv
export const getNeteaseMv = (offset, limit) => httpGet('/api/mv/exclusive/rcmd', {offset, limit})

// 获取mv排行
export const getTopMv = ({ area, limit, offset = 0 }) => httpGet('/api/top/mv', {area, limit, offset})

// 获取全部mv
export const getAllMv = ({type, order, offset, limit, area}) => httpGet('/api/mv/all', {type, order, offset, limit, area})

// 点赞
export const likeVideo = ({type, id, t = 1}) => httpGet('/api/resource/like', {type, id, t})

// 获取mv数据
export const getVideoDetail = (type, id) => {
  switch (type) {
    case 'mv': return httpGet('/api/mv/detail', {mvid: id})
    case 'v': return httpGet('/api/video/detail', {id})
    default: return { code: 404 }
  }
}

// 获取mv地址
export const getVideoUrl = (type, id) => {
  switch (type) {
    case 'mv': return httpGet('/api/mv/url', {id})
    case 'v': return httpGet('/api/video/url', {id})
    default: return { code: 404 }
  }
}

// 获取相关视频
export const getRelatedVideo = (type, id) => {
  switch (type) {
    case 'mv': return httpGet('/api/personalized/mv')
    case 'v': return httpGet('/api/related/allvideo', {id})
    default: return { code: 404 }
  }
}

// 获取视频点赞转发评论数数据
export const getVideoLike = (type, id) => {
  switch (type) {
    case 'mv': return httpGet('/api/mv/detail/info', {mvid: id})
    case 'v': return httpGet('/api/video/detail/info', {vid: id})
    default: return { code: 404 }
  }
}

// 收藏视频
export const FavoriteVideo = ({type, id, t}) => {
  switch (type) {
    case 'mv': return httpGet('/api/mv/sub', {mvid: id, t})
    case 'v': return httpGet('/api/video/sub', {id, t})
    default: return { code: 404 }
  }
}
