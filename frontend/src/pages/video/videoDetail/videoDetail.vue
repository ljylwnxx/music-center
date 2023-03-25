<template>
<div class="video-detail">
    <div class="vd-main">
        <div class="video-container">
            <!-- 视频标题 -->
            <div>
                <button class="no-btn font-16 font-bold mtop-10" @click="toVideo">
                    <i class="el-icon-arrow-left">{{ title }}</i>
                </button>
            </div>
            <!-- 视频 -->
            <div class="video-wrap mtop-10">
                <video autoplay controls :src="urlInfo.url">
                您的浏览器不支持 video 标签。
                </video>
            </div>
            <!-- 作者信息及关注按钮 -->
            <div class="info-wrap">
                <div class="creator-info">
                    <div class="img-wrap font-14" @click="toUserDetail()">
                        <img class="pointer" :src="avatarUrl">
                        <span class="mleft-10 pointer">{{nickName}}</span>
                    </div>
                    <div class="font-14" v-if="type === 'v'">
                        <button
                        class="sub-btn pointer"
                        :class="{ isfollow: followed }"
                        @click="followUsers"
                        >
                        <template v-if="!followed">
                        <i class="el-icon-plus"></i> 关注
                        </template>
                        <template v-else> <i class="el-icon-check"></i> 已关注 </template>
                        </button>
                    </div>
                </div>
                <div class="video-info">
                <div class="font-18 mtop-10 font-bold">{{deTail.title || deTail.name}}</div>
                <div class="font-12 mtop-10" style="color: #cfcfcf">
                    <span>发布时间:{{ deTail.publishTime ? deTail.publishTime : deTail.publishTime | dateFormat}}</span>
                    <span class="mleft-20">播放次数:{{  deTail.playTime || deTail.playCount | countFormat}}</span>
                </div>
                <div class="tag mtop-10">
                     <div v-for="tag in deTail.videoGroup" :key="tag.id">
                          <button class="tag-btn">{{ tag.name }}</button>
                     </div>
                </div>
                </div>
            </div>
            <!-- 下方按钮 -->
            <div class="video-btn mtop-20">
                <button class="btn btn-white" @click="likeVideo">
                    <i
                    class="iconfont icon-good"
                    :class="{ icon_liked: countInfo.liked }"
                    >
                    </i>
                    <span class="btn-text">{{ likedInfo }}</span>
                    ({{ countInfo.likedCount }})
                </button>
                <button class="btn btn-white mleft-10" @click="FavoriteVideo">
                    <span v-show="!subed">
                    <i class="el-icon-folder-add"></i>
                    <span class="btn-text">收藏</span>
                    </span>
                    <span v-show="subed">
                    <i class="el-icon-folder-checked"></i>
                    <span class="btn-text">已收藏</span>
                    </span>
                    ({{ deTail.subscribeCount || deTail.subCount }})
                </button>
                <button class="btn btn-white mleft-10">
                    <i class="iconfont icon-fenxiang"></i>
                    <span class="btn-text">分享</span>
                    ({{ deTail.shareCount }})
                </button>
            </div>
        </div>
        <!-- 评论 -->
        <div class="comment-container">
            <!-- 评论量 -->
            <div class="mbottom-10">
                 <span class="font-bold font-20">评论</span>
                 <span>({{ countInfo.commentCount }})</span>
            </div>
            <!-- 评论组件 -->
            <Comment
                :active="true"
                :type="resoureType"
                :id="id"
                scrollDom=".el-main"
                >
            </Comment>
        </div>
    </div>
    <!-- 相关推荐 -->
    <div class="vd-right">
        <div class="recom">
        <div class="font-bold mtop-10">相关推荐</div>
         <div class="link mtop-10">
             <div v-for="(item, index) in RelatedList" :key="index" class="link-recom mtop-10">
                 <div class="link-img">
                     <img
                        @click="toVideoDetail(item)"
                        class="img-h img pointer"
                        :src="relatedImgUrl(item)"
                    />
                 </div>
                 <div class="xg-info mleft-10">
                    <div
                        class="mtop-10 font-14 title pointer"
                        @click="toVideoDetail(item)"
                    >
                        {{ item.title || item.name }}
                    </div>
                    <div class="font-12 mtop-10 pointer" style="color: #9f9f9f">
                        by {{ relatedNickName(item) }}
                    </div>
                    </div>
             </div>
         </div>
        </div>
    </div>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
</div>
</template>

<script>
import {
  VIDEODETAIL_COUNTINFO_LIKEDCOUNT,
  VIDEODETAIL_COUNTINFO_SHARECOUNT,
  VIDEODETAIL_COUNTINFO_COMMENTCOUNT,
  VIDEODETAIL_COUNTINFO_LIKED,
  VIDEODETAIL_DEFAULT_FOLLOWED,
  VIDEODETAIL_DEFAULT_SUBED
} from '../constant'
import {
  getVideoDetail,
  getVideoUrl,
  getRelatedVideo,
  getVideoLike,
  likeVideo,
  FavoriteVideo
} from '@/api/api_video'
import { followUsers } from '@/api/api_user'
import Comment from '@/components/comment/Comment'
export default {
  name: 'VideoDetail',
  components: { Comment },
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      deTail: {},
      urlInfo: {},
      RelatedList: [],
      countInfo: {
        likedCount: VIDEODETAIL_COUNTINFO_LIKEDCOUNT,
        shareCount: VIDEODETAIL_COUNTINFO_SHARECOUNT,
        commentCount: VIDEODETAIL_COUNTINFO_COMMENTCOUNT,
        liked: VIDEODETAIL_COUNTINFO_LIKED
      },
      followed: VIDEODETAIL_DEFAULT_FOLLOWED,
      subed: VIDEODETAIL_DEFAULT_SUBED
    }
  },
  computed: {
    title () {
      return this.type === 'v' ? '视频详情' : 'MV详情'
    },
    creator () {
      return (this.type === 'v' ? this.deTail.creator : (this.deTail.artists || [])[0]) || {}
    },
    avatarUrl () {
      return this.creator.avatarUrl || this.creator.img1v1Url
    },
    nickName () {
      return this.creator.nickname || this.creator.name
    },
    likedInfo () {
      return this.countInfo.liked ? '已赞' : '点赞'
    },
    resoureType () {
      return this.type === 'v' ? 5 : 1
    }
  },
  watch: {
    id () {
      this.getVideoDetail()
      this.getVideoUrl()
      this.getRelatedVideo()
      this.getVideoLike()
    },
    type: {
      immediate: true,
      handler (val) {
        if (val !== 'mv' && val !== 'v') this.$router.push('/404')
      }
    }
  },
  created () {
    this.getVideoDetail()
    this.getVideoUrl()
    this.getRelatedVideo()
    this.getVideoLike()
  },
  methods: {
    // 获取视频详情
    async getVideoDetail () {
      const res = await getVideoDetail(this.type, this.id)
      if (res.data.code !== 200) { return }
      this.deTail = res.data.data
      if (this.type === 'v') {
        this.followed = res.data.data.creator.followed
      } else {
        this.subed = res.data.subed
      }
    },
    // 获取mv地址
    async getVideoUrl () {
      const res = await getVideoUrl(this.type, this.id)
      if (res.data.code !== 200) { return }
      if (this.type === 'v') {
        this.urlInfo = Object.freeze(res.data.urls[0])
      } else {
        this.urlInfo = Object.freeze(res.data.data)
      }
    },
    // 获取相关视频
    async getRelatedVideo () {
      const res = await getRelatedVideo(this.type, this.id)
      if (res.data.code !== 200) { return }
      if (this.type === 'v') {
        this.RelatedList = Object.freeze(res.data.data)
      } else {
        this.RelatedList = Object.freeze(res.data.result)
      }
    },
    // 获取视频点赞转发评论数数据
    async getVideoLike () {
      const res = await getVideoLike(this.type, this.id)
      if (res.data.code !== 200) { return }
      this.countInfo = res.data
    },
    // 点赞
    async likeVideo () {
      if (!this.$store.state.isLogin) { return this.$message.warning('请先登录') }
      let likeInfoObj = {
        type: this.resoureType,
        id: this.id,
        t: this.countInfo.liked ? 0 : 1
      }
      const res = await likeVideo(likeInfoObj)
      if (res.data.code !== 200) { return }
      this.getVideoLike()
    },
    // 关注/取消关注用户
    async followUsers () {
      if (this.$store.state.isLogin) { return this.$message.warning('请先登录') }
      let followInfoObj = {
        id: this.creator.userId,
        t: this.followed ? 0 : 1
      }
      const res = await followUsers(followInfoObj)
      if (res.data.code !== 200) { return this.$message.error('操作失败') }
      this.$message.success(this.followed ? '取关成功' : '关注成功')
      this.followed = !this.followed
    },
    // 收藏视频
    async FavoriteVideo () {
      if (!this.$store.state.isLogin) { return this.$message.warning('请先登录') }
      let favoriteInfoObj = {
        type: this.type,
        id: this.id,
        t: this.subed ? 0 : 1
      }
      const res = await FavoriteVideo(favoriteInfoObj)
      if (res.data.code !== 200) { return }
      this.$message.success(`${this.subed ? '取消' : '收藏'}成功`)
      this.subed = !this.subed
      this.getVideoDetail()
    },
    // 视频详情页
    toVideoDetail (item) {
      if (this.type === 'v') {
        if (typeof item.vid !== 'undefined') {
          this.$router.push('/videodetail/v/' + item.vid)
        }
      } else {
        if (typeof item.id !== 'undefined') { this.$router.push('/videodetail/mv/' + item.id) }
      }
    },
    // 用户或者歌手页
    toUserDetail () {
      if (this.type === 'v') {
        if (typeof this.creator.userId !== 'undefined') {
          this.$router.push('/userdetail/' + this.creator.userId)
        }
      } else {
        if (typeof this.creator.id !== 'undefined') {
          this.$router.push('/artistdetail/' + this.creator.id)
        }
      }
    },
    // 推荐用户名
    relatedNickName (item) {
      if (item.creator) {
        return item.creator[0].userName
      }
      if (item.artists) {
        return item.artists[0].name
      }
      return ''
    },
    // 推荐图片
    relatedImgUrl (item) {
      return item.coverUrl || item.picUrl
    },
    // 视频首页
    toVideo () {
      this.type === 'v' ? this.$router.push('/videodetail') : this.$router.push('/mvdetail')
    }
  }
}
</script>

<style scoped>
.video-detail {
margin: 0 auto;
display: flex;
justify-content: space-around;
}
.vd-main {
width: 700px;
}
.vd-right {
width: 400px;
}
.video-container .video-wrap video {
width: 600px;
height: 340px;
}
.no-btn {
color: #000;
}
.info-wrap .creator-info {
display: flex;
margin: 10px auto;
align-items: center;
}
.img-wrap {
display: flex;
align-items: center;
margin-right: 30px;
}
.img-wrap img {
height: 40px;
width: 40px;
border-radius: 50%;
}
.sub-btn {
outline: none;
border: none;
background-color: #fcf4f4;
color: #ff3a3a;
height: 30px;
width: 80px;
border-radius: 15px;
}
.isfollow {
background-color: #f8f8f8;
color: #9b9b9b;
}
.video-info .tag {
display: flex;
flex-wrap: wrap;
}
li {
margin-right: 5px;
}
.tag-btn {
outline: none;
border: none;
height: 20px;
background-color: #f7f7f7;
color: #363636;
font-size: 12px;
border-radius: 10px;
}
.comment-container {
  margin-top: 20px;
}
.icon_liked {
  color: red;
}
.recom .link .link-recom{
display: flex;
}
.recom .link .link-recom .link-img {
width: 140px;
}
.recom .link-img img {
    border-radius: 4px;
}
.title {
width: 140px;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
}
.backtop {
  right: 20px!important;
    bottom: 79px!important;
  }
</style>
