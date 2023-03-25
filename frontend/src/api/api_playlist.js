import { httpGet } from '@/utils/axios.js'
// 获取热门推荐-未登录时
export const getRecSongsList = (limit) => httpGet('/api/personalized', { limit })

// 获取推荐歌单-登录时
export const getRecommend = () => httpGet('/api/recommend/resource')

// 获取精品歌单
export const getPlayListHighQuality = (limit, cat, before) => httpGet('/api/top/playlist/highquality', {limit, cat, before})

// 获取歌单
export const getPlayList = ({limit, order, cat, offset}) => httpGet('/api/top/playlist', {limit, order, cat, offset})
// 歌单分类
export const getAllCat = () => httpGet('/api/playlist/catlist')

// 热门歌单分类
export const getHotCat = () => httpGet('/api/playlist/hot')

// 获取歌单详情
export const getPlayListDetail = (id) => httpGet('/api/playlist/detail', {id})

// 获取排行榜信息
export const getTopList = () => httpGet('/api/toplist')

// 收藏/取消收藏歌单 t:类型,1:收藏,2:取消收藏
export const subPlaylist = (id, t) => httpGet('/api/playlist/subscribe', {id, t})

// 获取歌曲详情
export const getMusicListByIds = (ids) => httpGet('/api/song/detail', {ids})

// 获取歌单收藏者
export const getSuberList = ({id, offset, limit = 30}) => httpGet('/api/playlist/subscribers', {id, offset, limit})
