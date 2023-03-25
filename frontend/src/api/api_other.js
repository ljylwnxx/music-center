import { httpGet } from '@/utils/axios.js'
// 搜索建议
export const getSuggest = (keywords) => httpGet('/api/search/suggest', {keywords})

//搜索列表
export const getHotSearch = () => httpGet('/api/search/hot/detail')

// 歌曲搜索
export const search = ({ keywords, limit, offset, type }) => httpGet('/api/cloudsearch', { keywords, limit, offset, type })

// 轮播图
export const getBanner = () => httpGet('/api/banner')
