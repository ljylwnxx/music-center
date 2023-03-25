import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/pages/MainLayout'
import HomeMain from '@/pages/home/HomeMain'
import videoMain from '@/pages/video/videoMain'
import Video from '@/pages/video/videoPage/video/Video'
import mv from '@/pages/video/videoPage/mv/mv'
import PersonalFmMain from '@/pages/personalfmpage/PersonalFmMain'
import RecommendSong from '@/pages/recommendsong/RecommendSong'
import HistoryPlay from '@/pages/historyplay/HistoryPlay'
import CollectionMain from '@/pages/collection/CollectionMain'
import ArtistDetail from '@/pages/artist/ArtistDetail'
import PlayListDetail from '@/pages/playlist/PlayListDetail'
import AlbumDetail from '@/pages/album/AlbumDetail'
import UserDetail from '@/pages/user/UserDetail'
import AllMv from '@/pages/video/videoPage/mv/AllMv'
import TopMv from '@/pages/video/videoPage/mv/TopMv'
import VideoDetail from '@/pages/video/videoDetail/VideoDetail'
import Search from '@/pages/search/Search'
import UserEdit from '@/pages/user/UserEdit'
import Login from '@/pages/login/Login'
import HotComment from '@/pages/hotcomment/HotComment'
import PersonalRecommend from '@/pages/home/HomePages/PersonalRecommend'
import PlayList from '@/pages/home/HomePages/PlayList'
import TopList from '@/pages/home/HomePages/TopList'
import ArtistList from '@/pages/home/HomePages/ArtistList'
import NewMusic from '@/pages/home/HomePages/NewMusic'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      redirect: 'homemain',
      children: [
        {
          path: 'homemain',
          name: 'homemain',
          component: HomeMain,
          redirect: '/personalrecommend',
          children:
          [
            { path: '/personalrecommend', component: PersonalRecommend },
            { path: '/playlist', component: PlayList },
            { path: '/toplist', component: TopList },
            { path: '/artistlist', component: ArtistList },
            { path: '/newmusic', component: NewMusic }
          ]
        },
        /* 视频列表页 */
        {
          path: 'videoMain',
          redirect: '/video',
          component: videoMain,
          children: [
            { path: '/videodetail', component: Video },
            { path: '/mvdetail', component: mv }
          ]
        },
        /* 私人FM页 */
        {
          path: '/personalfmpage',
          name: 'personalfmpage',
          component: PersonalFmMain
        },
        /* 每日推荐页 */
        {
          path: '/recommendsong',
          name: 'recommendsong',
          component: RecommendSong
        },
        /* 最近播放页 */
        {
          path: '/historyplay',
          name: 'historyplay',
          component: HistoryPlay
        },
        /* 我的收藏页 */
        {
          path: '/collection',
          name: 'collection',
          component: CollectionMain
        },
        // 用户详情页
        {
          path: 'userdetail/:id',
          name: 'user',
          component: UserDetail,
          props: true
        },
        // 歌手详情页
        {
          path: '/artistdetail/:id',
          name: 'artist',
          component: ArtistDetail,
          props: true
        },
        // 歌单详情页
        {
          path: 'playlistdetail/:id',
          name: 'playlist',
          component: PlayListDetail,
          props: true
        },
        // 专辑详情页
        {
          path: 'albumdetail/:id',
          name: 'album',
          component: AlbumDetail,
          props: true
        },
        // 视频和MV详情页
        {
          path: 'videodetail/:type/:id',
          component: VideoDetail,
          props: true
        },
        {
          path: 'allmv',
          component: AllMv
        },
        {
          path: 'topmv',
          component: TopMv
        },
        {
          path: 'search/:key',
          component: Search,
          props: true
        },
        {
          path: '/useredit',
          component: UserEdit
        },
        {
          path: 'userdetail/:id',
          component: UserDetail,
          props: true
        },
        {
          path: '/hotcomment',
          component: HotComment
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
