<template>
  <div class="personal-fm">
    <!-- 歌词显示 -->
    <div class="playview-wrap mtop-20">
      <!-- 图片展示 -->
      <div class="playview-left">
        <div class="img-wrap">
          <img class="img img-h" :src="musicInfo.musicPic || musicInfo.defaultMusicPic" />
        </div>
      </div>
      <div class="playview-right">
        <!-- 歌曲名 -->
        <div class="title">
          <span class="font-24">{{musicInfo.musicName}}</span>
        </div>
        <!-- 歌曲信息 -->
        <div class="info">
          <div class="font-12">
            专辑：<span
              @click="toAlbumDetail( musicInfo.albumId)"
              class="btn-a pointer"
              >{{ musicInfo.albumName}}</span
            >
          </div>
          <div class="font-12">
            歌手：<span
              @click="toArtistDetail(musicInfo.authorId)"
              class="btn-a pointer"
              >{{ musicInfo.authorName }}</span
            >
          </div>
        </div>
        <!-- 歌词组件 -->
        <LyricWrap
          :musicId="musicDetail.id"
          :currenTime="musicDetail.currentTime"
          :width="400"
        >
        </LyricWrap>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment-view mtop-60">
      <!-- 评论组件 -->
      <Comment
        :active="true"
        :type="0"
        :id="musicInfo.id"
        scrollDom=".el-main"
        :scrollOffset="10"
      >
      </Comment>
    </div>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import { getFmDetail } from '@/api/api_music'
import LyricWrap from '../../components/player/LyricWrap'
import Comment from '@/components/comment/Comment'
import {tranferNewSongMusicData} from '../../utils/constant'
export default {
  components: { LyricWrap, Comment },
  name: 'PersonalFmMain',
  data () {
    return {
      musicInfo: {
        defaultMusicPic: require('../../assets/images/defaultPic.png'),
        musicName: '未知歌名',
        author: {
          authorId: 0,
          authorName: '未知歌手名'
        },
        album: {
          albumId: 0,
          azname: '未知专辑名'
        }
      }
    }
  },
  watch: {
    '$store.state.musicData': {
      handler: function (newVal) {
        if (newVal.id) {
          this.getImgInfo(newVal)
        }
      },
      immediate: true
    }
  },
  computed: {
    musicDetail () {
      return this.$store.state.currentMusicInfo
    }
  },
  created () {
    if (!this.$store.state.musicData.id) {
      this.getFmDetail()
    }
  },
  methods: {
    getImgInfo (val) {
      let newMusic = val.musicList.find(item => (item.id === val.id))
      this.musicInfo = newMusic
    },
    async getFmDetail () {
      const res = await getFmDetail()
      if (res.data.code !== 200) {
        return
      }
      let fmList = []
      res.data.data.forEach(item => {
        fmList.push(tranferNewSongMusicData(item))
        let id = fmList[0].id
        this.$store.commit('setMusicInfo', {
          musicList: fmList,
          id
        })
      })
    }
  }
}
</script>

<style scoped>
.personal-fm {
  width: 710px;
  margin: 0 auto;
}
.playview-wrap {
  display: flex;
}
.playview-left {
  margin-top: 120px;
  width: 260px;
}
.img-wrap {
    position: relative;
    box-sizing: border-box;
    border: 1px solid #eeeeee;
    height: 260px;
    width: 260px;
    border-radius: 10px;
}
.backtop {
  right: 20px!important;
    bottom: 79px!important;
  }
</style>
