export const MODE_FIRST = 'first' // 第一次类型
export const DEFAULT_OFFSET = 0 // 分页参数默认值
export const DEFAULT_INFOPAGE_TOTAL = 0 // 分页总数参数默认值
export const DEFAULT_INFOPAGE_CURRENTPAGE = 1 // 当前页数参数默认值
export const DEFAULT_COUNT = 0
export const DEFAULT_KEY = ''
export const DEFAULT_HASMORE = true
export const DEFAULT_ISLOADING = false
export const DEFAULT_VISIBLE = false
export const tranferMusicData = (music) => {
  return {
    index: music.index,
    id: music.id,
    musicName: music.name,
    authorName: music.ar[0].name,
    authorId: music.ar[0].id,
    albumName: music.al.name,
    albumId: music.al.id,
    totalTime: music.dt,
    musicPic: music.al.picUrl,
    alia: music.alia,
    fee: music.fee,
    mv: music.mv
  }
}
export const tranferNewSongMusicData = (music) => {
  return {
    index: music.index,
    id: music.id,
    authorName: music.artists[0].name,
    authorId: music.artists[0].id,
    musicName: music.name,
    musicPic: music.album.picUrl,
    albumId: music.album.id,
    albumName: music.album.name,
    totalTime: music.duration,
    alia: music.alias,
    al: music.album,
    ar: music.artists,
    mv: music.mvid,
    fee: music.fee
  }
}
