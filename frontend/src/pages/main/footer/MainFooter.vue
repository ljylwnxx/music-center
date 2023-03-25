<template>
  <div class="player">
    <div class="player-wrapper">
      <!-- 歌曲信息 -->
      <div class="player-left">
        <img
          v-lazy="musicDetail.musicPic || imgInfo.imgUrl"
          class="pointer songImg"
          @click="openDrawer"
        />
        <div class="music-info">
          <span>{{ musicDetail.musicName || imgInfo.name }}</span>
          <span>{{ musicDetail.authorName || imgInfo.author }}</span>
        </div>
      </div>
      <!-- 歌曲播放 -->
      <div class="player-content">
        <!-- 按钮 -->
        <div class="player-button">
          <button class="player-btn">
            <i class="el-icon el-icon-s-operation"></i>
          </button>
          <!-- 上一首按钮 -->
          <button class="player-btn" @click="trrigerMusic(musicDetail.lastId)">
            <i class="el-icon el-icon-caret-left"></i>
          </button>
          <!-- 播放按钮 -->
          <button class="player-btn" @click="playClick">
            <i v-if="isPlay" class="el-icon el-icon-video-pause"></i>
            <i v-else class="el-icon el-icon-video-play"></i>
          </button>
          <!-- 下一首按钮 -->
          <button class="player-btn" @click="trrigerMusic(musicDetail.nextId)">
            <i class="el-icon el-icon-caret-right"></i>
          </button>
          <!-- 喜欢按钮 -->
          <button class="player-btn" @click="likeMusic">
            <i v-show="!isLiked" class="el-iconl el-icon-star-off"></i>
            <i v-show="isLiked" style="color: #ec4141" class="el-icon el-icon-star-on"></i>
          </button>
        </div>
        <!-- 进度条 -->
        <div class="player-progress">
          <span>{{ musicDetail.currentTime | timeFormat }}</span>
          <el-slider
            v-model="progress"
            :show-tooltip="false"
            style="width: 400px"
            @change="changeProgress"
            @mousedown.native="isDragSlider = true"
            @mouseup.native="isDragSlider = false"
          >
          </el-slider>
          <span>
              {{
              ((musicDetail.totalTime || musicDetail.currentTime) / 1000)
                | timeFormat
              }}
          </span>
        </div>
      </div>
      <!-- 下载声音按钮 -->
      <div class="player-otherbutton">
        <!-- 下载按钮 -->
        <div class="otherbutton-download">
          <i
            class="el-othericon el-icon-download pointer"
            @click="downloadMusic()"
          >
          </i>
        </div>
        <!-- 声音 -->
        <div class="button-volume">
          <div class="volume-iconfont" @click="isMute = !isMute">
            <i
              v-if="volume == 0"
              class="iconfont icon-shengyinguanbi volume-icon pointer"
            >
            </i>
            <i v-else class="iconfont icon-shengyin volume-icon pointer"></i>
          </div>
          <div class="volume-slider">
            <el-slider v-model="volume" vertical height="200px"> </el-slider>
          </div>
        </div>
        <div class="otherbutton-currentlist">
          <button class="player-btn" @click="table = true">
            <i class="el-othericon el-icon-s-operation"></i>
          </button>
          <el-drawer
          title="当前播放"
          :visible.sync="table"
          direction="rtl"
          size="40%">
            <div class="flex-around">
            <div class="font-12 mleft-12">总 {{ length }} 首</div>
            <div class="font-12 mleft-12">
              <span v-show="length === 0">没有在播放哦</span>
            </div>
            </div>
            <el-divider></el-divider>
            <MusicList :list="this.$store.state.historyList">
            </MusicList>
          </el-drawer>
        </div>
      </div>
      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        size="100%"
        :before-close="handleClose"
        :show-close="false"
        :modal="false"
      >
        <template #title>
          <div>
            <i class="el-icon-arrow-down down pointer" @click="drawer = false">
            </i>
          </div>
        </template>
        <div class="play-view">
          <div class="play-music-info">
            <div class="music-title">{{ musicDetail.musicName }}</div>
            <div class="music-author">{{ musicDetail.authorName }}</div>
            <div class="lyric-view">
              <div class="img-wrap">
                <div
                  class="play-pole pointer"
                  :class="{ 'play-pole-active': isPlay }"
                  @click="playClick"
                >
                  <img src="@/assets/images/playpole.png" />
                </div>
                <div class="record" :class="{ 'record-active': isPlay }">
                  <div class="record-wrap">
                    <img :src="musicDetail.musicPic || imgInfo.imgUrl" />
                  </div>
                </div>
              </div>
              <LyricWrap
                :musicId="this.musicData.id"
                :currenTime="musicDetail.currentTime"
              >
              </LyricWrap>
            </div>
          </div>
          <div class="comment-view mtop-50">
            <Comment
              :id="this.musicData.id"
              :type="0"
              scrollDom=".player .el-drawer__body"
              :scrollOffset="80"
            >
            </Comment>
          </div>
        </div>
      </el-drawer>
      <audio
        muted
        ref="audioRef"
        :src="musicDetail.musicUrl"
        id="music-audio"
        autoplay
        @ended="trrigerMusic(musicDetail.nextId)"
        @timeupdate="updateMusicTime"
      >
      </audio>
    </div>
  </div>
</template>

<script>
import { httpGet } from '@/utils/axios.js'
import {getMusicUrl, likeMusic} from '@/api/api_music'
import LyricWrap from '@/components/player/LyricWrap'
import Comment from '@/components/comment/Comment'
import MusicList from '@/components/list/MusicList.vue'
import { mapState } from 'vuex'
export default {
  name: 'MainFooter',
  components: {
    LyricWrap,
    Comment,
    MusicList
  },
  data () {
    return {
      isMute: true,
      volume: 10,
      saveVolume: 10,
      imgInfo: {
        imgUrl:
          // 'https://cdn.jsdelivr.net/gh/crazybox521/blogImg/music.jpg',
          require('../../../assets/images/defaultPic.png'),
        name: '未知',
        author: '未知歌手名'
      },
      musicUrl: '',
      drawer: false,
      table: false,
      direction: 'btt',
      progress: 0,
      isDragSlider: false
    }
  },
  computed: {
    ...mapState([
      'isPlay',
      'musicData'
    ]),
    musicDetail () {
      return this.$store.state.currentMusicInfo
    },
    length () {
      return this.$store.state.historyList.length
    },
    isLiked: {
      get () {
        return this.$store.state.likeIdList.indexOf(this.musicDetail.id) !== -1
      },
      set (val) {
        if (this.isLiked) {
          this.$store.commit('setLikeIdList', {
            type: 'remove',
            data: val
          })
        } else {
          this.$store.commit('setLikeIdList', {
            type: 'unshift',
            data: val
          })
        }
      }
    }
  },
  watch: {
    isPlay: {
      handler (newVal) {
        let music = document.querySelector('#music-audio')
        if (newVal) {
          setTimeout(() => {
            music.play()
          }, 100)
        } else {
          music.pause()
        }
      },
      immediate: false
    },
    musicData (newVal) {
      this.getMusicUrl(newVal)
    },
    isMute (val) {
      if (val) {
        this.saveVolume = this.volume
        this.volume = 0
      } else {
        this.volume = this.saveVolume
      }
    },
    volume () {
      this.changeVolume()
    }
  },
  methods: {
    handleClose () {
      this.drawer = false
    },
    openDrawer () {
      this.drawer = true
      this.$nextTick(() => {
        document.querySelector('.player').scrollTop = 0
      })
    },
    // 获取音乐 url
    async getMusicUrl () {
      let music = {}
      let currentIndex = ''
      this.musicData.musicList.forEach((item, index) => {
        if (item.id === this.musicData.id) {
          music = item
          currentIndex = index
          console.log(music, 'music')
        }
      })
      const res = await getMusicUrl(music.id)
      this.$store.state.currentMusicInfo = {
        ...music,
        musicUrl: res.data.data[0].url,
        lastId: (this.musicData.musicList[currentIndex - 1] || {}).id,
        nextId: (this.musicData.musicList[currentIndex + 1] || {}).id
      }
      this.$store.commit('setPlayState', true)
      if (!res.data.data[0].url) {
        const h = this.$createElement
        this.$notify({
          title: '当前歌曲暂无音源',
          message: h(
            'i',
            { style: 'color: teal' },
            '因版权方要求，该资源暂时无法播放，我们正在争取歌曲回归'
          )
        })
        this.musicUrl = ''
        this.$store.commit('setPlayState', false)
        return
      }
      if (music.fee === 1) {
        this.$message.info('vip歌曲，可试听一会')
      }
      setTimeout(() => {
        this.updateHistoryList(this.musicDetail)
      }, 1000)
    },
    // 喜欢音乐按钮事件
    async likeMusic () {
      if (!this.$store.state.isLogin) { return this.$message.error('需要登录') }
      if (this.musicDetail.id === 0 || typeof this.musicDetail.id === 'undefined') { return }
      const res = await likeMusic(this.musicDetail.id, !this.isLiked)
      if (res.data.code !== 200) { return }
      this.$message.success(`${this.isLiked ? '取消喜欢' : '喜欢'}成功`)
      this.isLiked = this.musicDetail.id
      this.$store.dispatch('getMyPlayList')
    },
    // 切换歌曲
    trrigerMusic (id) {
      if (id) {
        this.$store.commit('setMusicInfo', {
          id
        })
      } else {
        this.$message({
          message: `已经是${
            id === this.musicDetail.lastId ? '第一' : '最后一'
          }首歌喽呦`,
          type: 'warning'
        })
        this.$store.commit('setPlayState', false)
      }
    },
    // 更新歌曲进度
    updateMusicTime () {
      const audio = document.querySelector('#music-audio')
      if (audio) {
        this.$store.state.currentMusicInfo = {
          ...this.$store.state.currentMusicInfo,
          currentTime: audio.currentTime
        }
      }
      if (!this.isDragSlider) {
        this.progress = (audio.currentTime / (this.musicDetail.totalTime / 1000)) * 100
      }
    },
    // 改变歌曲进度条
    changeProgress (val) {
      if (this.musicDetail.totalTime === 0) return
      const audio = document.querySelector('#music-audio')
      audio.currentTime = (val / 100) * (this.musicDetail.totalTime / 1000)
    },
    // 播放
    playClick () {
      this.$store.commit('setPlayState', !this.isPlay)
    },
    // 下载音乐
    downloadMusic () {
      this.download(
        this.musicDetail.musicUrl,
        `${this.musicDetail.musicName}-${this.musicDetail.authorName}`
      )
    },
    download (url, fileName) {
      httpGet(url, { responseType: 'blob' })
        .then((res) => {
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(res.data)
          link.href = link
          link.download = fileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.$message({
            message: `${fileName}下载成功`,
            type: 'success'
          })
        })
        .catch((e) => {
          this.$message({
            message: `下载失败`,
            type: 'error'
          })
        })
    },
    // 改变音量
    changeVolume () {
      this.$refs.audioRef.volume = this.volume / 100
    },
    // 更新历史列表
    updateHistoryList (musicDetail) {
      this.$store.commit('setHistoryInfo', {
        musicDetail,
        type: 'add'
      })
    }
  }
}
</script>

<style scoped>
.flex-around {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.player-wrapper {
  box-sizing: border-box;
  border-top: 1px solid #eeeeee;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
}
.player-left {
  display: flex;
  align-items: center;
  width: 300px;
}
.songImg {
  margin: 5px 10px;
  height: 50px;
  width: 50px;
  border-radius: 8px;
}
.music-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-self: center;
}
.player-button {
  width: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 6px;
  justify-content: space-around;
}
.player-btn {
  outline: none;
  border: none;
  background-color: #fff;
  cursor: pointer;
}
.el-icon {
  font-size: 22px;
}
.el-iconl {
  font-size: 19px;
}
.player-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
}
.el-progress {
  width: 460px;
  margin: 0 10px;
}
.player-otherbutton {
  display: flex;
  width: 300px;
  justify-content: flex-end;
}
.el-othericon {
  font-size: 30px;
}
.volume-icon {
  font-size: 30px;
}
.button-volume {
  position: relative;
  margin: 0 20px;
}
.volume-slider {
  position: absolute;
  top: -220px;
  left: -3px;
  display: none;
  background-color: #ffffff;
  padding: 10px 0;
  border-radius: 5px;
  box-shadow: 0 0 10px #bbbbbb;
}
.button-volume:hover .volume-slider {
  display: block;
}
.play-view {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: space-around;
  padding: 0 300px;
}
.play-music-info {
  margin: 0 auto;
}
.down {
  margin-top: 10px;
}
.music-title {
  text-align: center;
  font-size: 30px;
}
.music-author {
  text-align: center;
}
.comment-view {
  margin-bottom: 80px;
}
.lyric-view {
  display: flex;
}
.img-wrap {
  position: relative;
}
.play-pole {
  position: absolute;
  top: -20px;
  left: 130px;
  width: 120px;
  transform-origin: 3px 3px;
  transition: all 0.5s;
  z-index: 20;
}
.play-pole img {
  width: 120px;
}
.play-pole-active {
  transform: rotate(30deg);
}
.record {
  margin-top: 40px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background-color: #c4c3c6;
  display: flex;
  justify-content: center;
  align-items: center;
}
.record-wrap {
  width: 240px;
  height: 240px;
  background-color: #1a1c1e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.record img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
}
.record-active {
  animation: circle 30s infinite linear;
}
@keyframes circle {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
