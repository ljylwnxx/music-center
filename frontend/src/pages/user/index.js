import axios from 'axios'
export const uploadAvatar = (data) => axios({
  method: 'post',
  url: `/api/avatar/upload`,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data
}).then((res) => res.data).catch(err => err)
