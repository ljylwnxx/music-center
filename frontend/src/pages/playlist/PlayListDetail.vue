<template>
  <div class="play-list-detail mtop-20">
    <!-- 内容 -->
    <el-skeleton :loading="isLoading" animated>
      <!-- 骨架屏 -->
      <template slot="template">
        <el-skeleton-item variant="image" style="width: 180px; height: 180px" />
        <div style="padding-top: 14px">
          <el-skeleton-item variant="text" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <!-- 歌单信息 -->
      <template>
        <div>
          <!-- 图片 -->
          <div class="detail-desc">
            <div class="detail-img-wrapper">
              <img
                class="img image-radius-8 image-border"
                :src="ImgUrl"
              >
            </div>
            <!-- 歌单头部相关信息 -->
            <div class="detail-desc-info">
              <div class="info-title">
                <Tag text="歌单"></Tag>
                <span class="mleft-12 font-20 font-bold">{{ info.name }}</span>
                <span
                  v-if="showEditIcon"
                  @click="toPlayListEdit"
                  class="mleft-10 font-18 pointer"
                  style="color: #a3a3a3"
                >
                  <i class="el-icon-edit"></i>
                </span>
              </div>
              <!-- 作者 -->
              <div class="author">
                <!-- 图片 -->
                <div class="author-img pointer" @click="toUserDetail(creator)">
                  <img class="img-h circle" :src="creator.avatarUrl">
                </div>
                <!-- 作者信息 -->
                <div class="author-info">
                  <!-- 创建者昵称 -->
                  <span class="mleft-12 font-12 pointer" style="color: #0b58b0" @click="toUserDetail(creator)">
                    {{ creator.nickname }}
                  </span>
                  <!-- 创建时间 -->
                  <span class="mleft-12 font-12">
                    {{ info.createTime | dateFormat }}
                  </span>
                </div>
              </div>
              <!-- 按钮 -->
              <div class="info-btn">
                <!-- 播放全部按钮 -->
                <button class="btn btn-red" @click="playClickAll">
                  <i class="iconfont icon-bofang"></i>
                  <span class="btn-text">播放全部</span>
                </button>
                <!-- 收藏按钮 -->
                <button
                  v-if="!subscribed"
                  class="btn btn-white mleft-10"
                  :disabled="subDisabled"
                  @click="subPlaylist(1)"
                 >
                  <i class="el-icon-folder-add"></i>
                  <span class="btn-text">
                    收藏({{ info.subscribedCount | countFormat }})
                  </span>
                </button>
                <!-- 已收藏按钮 -->
                <button v-else class="btn btn-white mleft-10" @click="subPlaylist(2)">
                   <i class="el-icon-folder-checked"></i>
                   <span class="btn-text">
                    已收藏({{ info.subscribedCount | countFormat }})
                   </span>
                </button>
                <!-- 分享按钮 -->
                <button class="btn btn-white mleft-10">
                   <i class="iconfont icon-fenxiang"></i>
                   <span class="btn-text">
                    分享({{ info.shareCount | countFormat }})
                   </span>
                </button>
                <!-- 加载完整歌单按钮 -->
                <button
                class="btn btn-red mleft-10"
                @click="loadCompletePlayList"
                v-show="isShowMoreBtn"
                >
                  <i class="el-icon-hot-water"></i>
                  <span class="btn-text">加载完整歌单</span>
                </button>
              </div>
              <!-- 标签 -->
              <div class="detail-tag font-14" v-if="tags.length !== 0">
                <span>标签:</span>
                <span
                  class="mright-10"
                  v-for="(val, index) in tags"
                  :key="index"
                >
                  {{ val }}
                </span>
              </div>
              <!-- 歌曲和播放量 -->
              <div class="num-info font-14">
                <span>歌曲:{{ info.trackCount }}</span>
                <span class="mleft-12">
                  播放 ：{{ info.playCount | countFormat }}
                </span>
              </div>
              <!-- 简介 -->
              <div class="font-14">
                <el-collapse accordion>
                  <el-collapse-item class="brief">
                    <template slot="title">
                      简介:
                      <i class="header-icon el-icon-info"></i>
                    </template>
                    <div style="max-width: 1000px">
                      {{ info.description || "暂无简介" }}
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <!-- tabs -->
          <div class="detail-topwrapper">
            <AlbumTabsMenu
                :menuList="['歌曲列表', `评论(${info.commentCount})`, '收藏者']"
                @menuClick="handMenuClick"
              >
              </AlbumTabsMenu>
              <div class="detail-search" v-show="showtab === 1">
              <el-input
                placeholder="搜索音乐"
                clearable
                suffix-icon="el-icon-search"
                v-model="key"
              ></el-input>
            </div>
          </div>
          <!-- 歌单列表 -->
          <div v-show="showtab === 1">
            <MusicList ref="listRef" :list="list">
            </MusicList>
            <div v-if="isShowMoreBtn" class="flex-center more-btn">
              点击 <i class="el-icon-hot-water"></i>
              <span class="btn-text">加载完整歌单</span> 查看更多单曲
            </div>
          </div>
          <!-- 评论 -->
          <div v-show="showtab === 2">
             <coll-comment :active="showtab == 2">
             </coll-comment>
          </div>
          <!-- 收藏者 -->
          <div v-show="showtab === 3">
              <collectors>
              </collectors>
          </div>
        </div>
      </template>
    </el-skeleton>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import AlbumTabsMenu from '@/components/menu/AlbumTabsMenu'
import Tag from '../../components/Tag/Tag'
import MusicList from '@/components/list/MusicList'
import CollComment from './PlayList/CollComment'
import Collectors from './PlayList/Collectors'
import { tranferMusicData, DEFAULT_KEY } from '../../utils/constant'
import {
  getPlayListDetail,
  subPlaylist
} from '@/api/api_playlist'
import { getMusicListByIds } from '@/api/api_music'
export default {
  name: 'PlayListDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Tag,
    AlbumTabsMenu,
    MusicList,
    CollComment,
    Collectors
  },
  computed: {
    showEditIcon () {
      return (
        this.$store.state.isLogin &&
        this.$store.state.profile.userId === this.creator.userId &&
        this.info.specialType === 0
      )
    },
    subDisabled () {
      if (this.$store.state.isLogin) { return this.info.userId === this.$store.state.profile.userId } else { return false }
    },
    isShowMoreBtn () {
      return (
        this.playList.length < this.info.trackCount &&
        this.playList.length < 800
      )
    },
    ImgUrl () {
      return this.info.coverImgUrl ? `${this.info.coverImgUrl}` : ''
    },
    list () {
      return this.playList.filter((item) => item.musicName.match(this.key))
    }
  },
  watch: {
    id () {
      this.getPlayListDetail()
    }
  },
  data () {
    return {
      key: DEFAULT_KEY,
      info: {},
      showtab: 1,
      creator: {},
      tags: [],
      playList: [],
      type: false,
      subscribed: false,
      isLoading: true
    }
  },
  created () {
    this.getPlayListDetail()
  },
  methods: {
    // 获取歌单详情
    async getPlayListDetail () {
      this.isLoading = true
      const res = await getPlayListDetail(this.id)
      if (res.data.code !== 200) { return }
      this.info = Object.freeze(res.data.playlist)
      this.creator = Object.freeze(res.data.playlist.creator)
      this.subscribed = res.data.playlist.subscribed
      this.tags = Object.freeze(res.data.playlist.tags)
      this.playList = res.data.playlist.tracks.map(item => {
        return tranferMusicData(item)
      })
      this.isLoading = false
    },
    // 收藏/取消收藏歌单
    async subPlaylist (type) {
      if (!this.$store.state.isLogin) return this.$message.warning('需要登录')
      let cancel = false
      if (this.subscribed) {
        await this.$confirm('确认取消收藏吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '放弃'
        })
          .then(() => {
            cancel = false
          })
          .catch((action) => {
            cancel = true
            this.$message({
              type: 'info',
              message: action === 'cancel' ? '取消' : '出错'
            })
          })
      }
      if (cancel) return
      const res = await subPlaylist(this.id, type)
      if (res.data.code !== 200) { return }
      this.subscribed = !this.subscribed
      type === 1 ? this.$message.success('收藏成功') : this.$message.success('取消收藏成功')
      this.$store.dispatch('getMyPlayList')
    },
    // 加载完整歌单
    async loadCompletePlayList () {
      let idArr = []
      this.info.trackIds.forEach((item) => {
        idArr.push(item.id)
      })
      if (idArr.length === 0) return
      if (idArr.length > 800) {
        const res = await getMusicListByIds(idArr.join(','))
        if (res.data.code !== 200) { return }
        this.playList = res.data.songs.map((item) => {
          return tranferMusicData(item)
        })
        this.playList.slice(0, 800)
        this.$message.error('太多歌曲了，只加载一部分')
      } else {
        const res = await getMusicListByIds(idArr.join(','))
        if (res.data.code !== 200) { return }
        this.playList = res.data.songs.map((item) => {
          return tranferMusicData(item)
        })
      }
    },
    playClickAll () {
      let id = this.playList[0].id
      this.$store.commit('setMusicInfo', {
        musicList: this.playList,
        id
      })
    },
    handMenuClick (type) {
      type = type + 1
      if (this.showtab === type) { return }
      this.showtab = type
    },
    toPlayListEdit () {
      this.$router.push('/playlistedit/' + this.id)
    },
    toUserDetail (item) {
      if (typeof item === 'object') {
        this.$router.push('/userdetail/' + item.userId)
      }
    }
  }
}
</script>

<style scoped>
.play-list-detail {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
}
.detail-desc {
  display: flex;
}
.detail-img-wrapper {
  width: 180px;
  height: 180px;
}
.detail-desc-info {
  line-height: 24px;
  margin-left: 20px;
}
.author {
  margin: 5px 0;
  height: 24px;
  display: flex;
}
.author-img {
  height: 24px;
}
.info-btn {
  margin: 5px 0;
}
.more-btn {
  margin-top: 10px;
  font-size: 14px;
  color: #bbb;
}
.detail-topwrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment {
  background-color: #fff;
}
.backtop {
  right: 20px !important;
  bottom: 79px !important;
  }
</style>
