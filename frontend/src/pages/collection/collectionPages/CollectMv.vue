<template>
  <div class="collection-mv">
    <!-- 收藏视频相关信息 -->
    <div class="collection-mv-head">
      <div>
        <span class="font-bold">收藏的视频</span>
        <span class="font-12" style="color: #cfcfcf">({{ count }})</span>
      </div>
      <div class="detail-search">
        <el-input
          placeholder="搜索我收藏的视频"
          clearable
          suffix-icon="el-icon-search"
          v-model="key"
        >
        </el-input>
      </div>
    </div>
    <!-- 收藏视频 -->
    <div class="video-list mtop-10">
      <div class="video-img">
          <div
          v-for="(v, index) in subMvList"
          :key="index"
          class="img-list">
          <!-- 图片相关信息 -->
            <div class="mtop-10 img-wrap">
              <img
                class="video-img pointer"
                :src="v.coverUrl + '?param=300y170'"
                @click="toMvDetail(v.vid)"
              />
              <!-- 播放数量 -->
              <div class="video-playcount font-12">
                <i class="iconfont icon-24gl-play"></i>
                {{ v.playTime | countFormat }}
              </div>
              <!-- mv时长 -->
              <div class="video-time font-12">
                {{ (v.durationms / 1000) | timeFormat }}
              </div>
              <!-- 播放按钮 -->
              <div class="play-btn pointer" @click="toMvDetail(v.vid)">
                <i class="iconfont icon-bofang"></i>
              </div>
            </div>
            <div class="title-line text-hidden font-14">{{ v.title }}</div>
            <div class="author-line font-12">
              <span v-for="(ct, index) in v.creator" :key="index">
                {{ ct.name }}
              </span>
            </div>
          </div>
      </div>
    </div>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import { getSubMv } from '@/api/api_video'
import {DEFAULT_COUNT, DEFAULT_KEY} from '../../../utils/constant'
export default {
  name: 'CollectArtists',
  data () {
    return {
      list: [],
      count: DEFAULT_COUNT,
      key: DEFAULT_KEY
    }
  },
  computed: {
    subMvList () {
      return this.list.filter((item) => item.title.match(this.key))
    }
  },
  created () {
    this.getSubMv()
  },
  methods: {
    async getSubMv () {
      const res = await getSubMv()
      if (res.data.code !== 200) { return }
      this.list = Object.freeze(res.data.data)
      this.count = res.data.count
    },
    toMvDetail (id) {
      if (typeof id !== 'undefined') this.$router.push('videodetail/mv/' + id)
    }
  }
}
</script>

<style scoped>
  .collection-mv-head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  }
  .video-img {
  display: flex;
  flex-wrap: wrap;
  }
  .img-list {
    width: 22%;
    margin-right: 3%;
  }
  .img-wrap {
  position: relative;
  }
  .img-wrap  .video-img {
  width: 100%;
  border-radius: 4px;
  }
  .video-playcount {
  color: #ffffff;
  position: absolute;
  right: 10px;
  top: 10px;
  }
  .iconfont {
  font-size: 12px;
  }
  .video-time {
  color: #ffffff;
  position: absolute;
  right: 10px;
  bottom: 10px;
  }
  .play-btn {
  position: absolute;
  right: 15px;
  bottom: 15px;
  background-color: #fbf7f6;
  color: #a1ba80;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.8s;
  }
  .play-btn i {
  font-size: 16px;
  }
  .img-wrap:hover .play-btn {
  opacity: 1;
  }
  .backtop {
  right: 20px!important;
  bottom: 79px!important;
  }
</style>
