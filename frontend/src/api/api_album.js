import { httpGet } from '@/utils/axios.js'

// 获取新碟上架
export const getNewTopAlbum = ({ limit, offset, area, type, year, month }) => httpGet('/api/top/album', {limit, offset, area, type, year, month})

// 获取已收藏专辑列表
export const getSubAlbum = (limit = 25, offset = 0) => httpGet('/api/album/sublist', { limit, offset })

// 获取专辑内容
export const getAlbumDetail = (id) => httpGet('/api/album', {id})

// 专辑动态信息
export const getAlbumDynamic = (id) => httpGet('/api/album/detail/dynamic', {id})

// 收藏/取消收藏专辑
export const getCollectAlbum = (id, t) => httpGet('/api/album/sub', {id, t})

