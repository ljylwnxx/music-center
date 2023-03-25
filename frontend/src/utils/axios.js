import axios from 'axios'
export const httpGet = (url, params = {}, callback) => {
  const paramsData = (params && typeof params === 'object') ? {
    timestamp: Date.now(),
    ...params
  } : params || {}

  return axios({
    method: 'get',
    url,
    xhrFields: { withCredentials: true },
    crossDomain: true,
    params: paramsData,
    data: {'action': 'refreshToken'},
    headers: {
      'Cache-control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': 0
    }
  }).then(res => {
    if (callback) { callback(res) }
    return res
  })
}
/* 更新用户头像 */
export const uploadAvatar = ({ imgSize, data, imgX = 0, imgY = 0 }) => axios({
  method: 'post',
  url: `/api/avatar/upload?&imgSize=${imgSize}&imgX=${imgX}&imgY=${imgY}&timestamp=${Date.now()}`,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data
}).then((res) => res.data).catch(err => err)
