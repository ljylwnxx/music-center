import { httpGet } from '@/utils/axios.js'

// 关注/取消关注用户
export const followUsers = ({id, t}) => httpGet('/api/follow', {id, t})

// 获取用户详情
export const getUserDetail = (uid) => httpGet('/api/user/detail', {uid})

// 获取用户歌单
export const getUserPlayList = (uid, offset, limit = 30) => httpGet('/api/user/playlist', {uid, offset, limit})

// 关注/取消关注用户
export const follow = ({id, t}) => httpGet('/api/follow', {id, t})

// 更新用户信息
export const updatedUserInfo = ({ nickname, signature, gender, birthday, province, city }) => httpGet('/api/user/update', { nickname, signature, gender, birthday, province, city })

// 获取账号信息
export const getAcount = () => httpGet('/api/user/account')
