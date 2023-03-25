<template>
  <div class="top-list">
    <!-- 官方榜区域 -->
    <div class="official-list">
      <h2 class="font-bold font-20">官方榜</h2>
      <div class="offocial-item" v-for="item in officialList" :key="item.id">
        <div class="official">
          <!-- 图片 -->
          <div class="img-wrapper">
            <div class="img-item">
              <img
                class="img-h img-radius-4 pointer officialImg"
                v-lazy="item.coverImgUrl"
                @click="toPlayListDetail(item.id)"
              />
              <div class="play-btn pointer" @click="toPlayListDetail(item.id)">
                <i class="iconfont icon-bofang"></i>
              </div>
            </div>
          </div>
          <!-- 排行榜歌曲 -->
          <div class="mleft-30 official-text">
            <div
              v-for="(track, index) in item.tracks"
              :key="track.id"
              index="track.id"
              @click="playMusic(track.id, item.tracks)"
              :class="{
                'offical-text-odd pointer': index % 2 === 0,
                'offical-text-item pointer': true,
              }"
            >
              <span class="mleft-12 text-hidden">{{ index + 1 }}</span>
              <span class="mleft-12 musicName text-hidden">
                {{ track.musicName }}
              </span>
              <span class="author mleft-12 text-hidden">
                {{ track.authorName }}
              </span>
            </div>
          </div>
        </div>
        <!-- 查看全部 -->
        <div class="lookbtn">
          <button
            class="pointer no-btn mtop-10"
            @click="toPlayListDetail(item.id)"
          >
            查看全部
            <i class="el-icon-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- 全球榜区域 -->
    <div class="global-list">
      <h2 class="font-bold font-20">全球榜</h2>
      <ImgList :list="globalList" type="playlist" @clickImg="toPlayListDetail">
        <template v-slot="{ item }">
          <div class="text-hidden">
            {{ item.name }}
          </div>
        </template>
      </ImgList>
    </div>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import { getPlayListDetail, getTopList } from '@/api/api_playlist'
import ImgList from '@/components/list/ImgList.vue'
import { tranferMusicData } from '@/utils/constant'
import { PLAYLIST_SLICE, TOPLIST_SLICE } from './constant'
export default {
  name: 'TopList',
  data () {
    return {
      officialList: [],
      globalList: []
    }
  },
  components: {
    ImgList
  },
  created () {
    this.getTopList()
  },
  methods: {
    // 获取歌单详情
    async getPlayListDetail (id) {
      const res = await getPlayListDetail(id)
      if (res.data.code !== 200) { return }
      const playDeatil = res.data.playlist
      this.officialList.push({
        ...playDeatil,
        tracks: playDeatil.tracks
          .map((item) => {
            return tranferMusicData(item)
          }).slice(0, PLAYLIST_SLICE)
      })
    },
    // 获取排行榜信息
    async getTopList () {
      const res = await getTopList()
      if (res.data.code !== 200) { return }
      const officialList = res.data.list.slice(0, TOPLIST_SLICE)
      this.globalList = res.data.list.slice(TOPLIST_SLICE)
      officialList.forEach((item) => {
        this.getPlayListDetail(item.id)
      })
    },
    playMusic (id, musicList) {
      this.$store.commit('setMusicInfo', {
        id: id,
        musicList
      })
    },
    toPlayListDetail (id) {
      this.$router.push({ path: '/playlistdetail/' + id })
    }
  }
}
</script>

<style scoped>
  .offocial-item {
  margin-bottom: 20px;
  }
  .official {
  display: flex;
  height: 160px;
  }
  .img-item {
  position: relative;
  }
  .play-btn {
  position: absolute;
  top: 60px;
  left: 60px;
  width: 40px;
  height: 40px;
  opacity: 0;
  transition: all 0.5s;
  }
  .img-item:hover .play-btn {
  opacity: 1;
  }
  .play-btn i {
  font-size: 16px;
  }
  .officialImg {
  width: 160px;
  height: 160px;
  }
  .offical-text-odd {
  background: #f9f9f9;
  }
  .offical-text-item {
  padding: 5px 0;
  }
  .offical-text-item:nth-child(3) {
  background: #eee;
  }
  .offical-text-item:hover {
  background: #eee;
  }
  .official-text {
  position: relative;
  flex-grow: 1;
  }
  .lookbtn {
  margin-left: 200px;
  }
  .author {
  position: absolute;
  right: 30px;
  }
  .backtop {
  right: 20px !important;
  bottom: 79px !important;
  }
</style>
