import { httpGet } from '@/utils/axios.js'
// 获取歌曲详情
export const getMusicListByIds = (ids) => httpGet('/api/song/detail', { ids })

// 获取新歌速递
export const getNewTopMusic = (type) => httpGet('/api/top/song', {type})

// 获取私人FM
export const getFmDetail = () => httpGet('/api/personal_fm')

// 获取音乐url
export const getMusicUrl = (id) => httpGet('/api/song/url', {id})

// 获取每日推荐歌曲
export const getRecomandSong = () => httpGet('/api/recommend/songs')

// 获取每日推荐歌单
export const getRecomandPlaylist = () => httpGet('/api/recommend/resource')

// 喜欢音乐
export const likeMusic = (id, like = true) => httpGet('/api/like?', {id, like})

// 获取歌词
export const getLyric = (id) => httpGet('/api/lyric', {id})

// 喜欢音乐列表
export const getLikeIdList = (uid) => httpGet('/api/likelist', {uid})
