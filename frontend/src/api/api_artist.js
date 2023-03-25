import { httpGet } from '@/utils/axios.js'
// 获取歌手分类列表
export const getArtistList = ({limit, offset, type, area, initial}) => httpGet('/api/artist/list', {limit, offset, type, area, initial})

// 收藏的歌手列表
export const getSubArtist = () => httpGet('/api/artist/sublist')

// 获取歌手详情
export const getArtistDetail = (id) => httpGet('/api/artist/detail', {id})

// 收藏的歌手列表
export const getSubArtists = () => httpGet('/api/artist/sublist')

// 收藏/取消收藏歌手
export const subArtists = (id, t) => httpGet('/api/artist/sub', {id, t})

// 歌手粉丝数量
export const getArtistFollowCount = (id) => httpGet('/api/artist/follow/count', {id})

// 歌手热门 50 首歌曲
export const getArtistTop = (id) => httpGet('/api/artist/top/song', {id})

// 获取歌手专辑
export const getArtistAlbum = (id, limit = 50, offset = 0) => httpGet('/api/artist/album', {id, limit, offset})

// 获取歌手 mv
export const getArtistMv = (id) => httpGet('/api/artist/mv', {id})

// 获取歌手描述
export const getArtistIntro = (id) => httpGet('/api/artist/desc', {id})

// 获取相似歌手
export const getArtistSame = (id) => httpGet('/api/simi/artist', {id})
