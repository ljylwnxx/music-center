<template>
  <div class="mv-list">
    <!-- 歌手mv-tab -->
   <div class="list-wrap">
    <!-- 列表信息 -->
    <div class="img" v-for="(item,index) in mvList" :key="index">
      <!-- 图片展示 -->
      <div class="mtop-10 img-wrap" @click="toMvDetail(item.id)">
        <img v-lazy="item.cover + '?param=300y170'">
        <!-- 播放量 -->
        <div class="video-playcount font-12">
         <i class="iconfont icon-24gl-play"></i>
         {{item.playCount | countFormat}}
        </div>
        <!-- 播放按钮 -->
        <div class="play-btn pointer">
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <!-- mv名 -->
      <div class="title-line text-hidden font-14 pointer" @click="toMvDetail(item.id)">
        {{item.name}}
      </div>
      <!-- 副标题 -->
      <div class="author-line font-12">
        <span
        class="mright-5"
        v-for="(subItem, index) in item.artists"
        :key="index">
        {{subItem.name}}
        </span>
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import { getArtistMv } from '@/api/api_artist'
export default {
  name: 'ArtistMvList',
  data () {
    return {
      mvList: []
    }
  },
  created () {
    this.getArtistMv()
  },
  methods: {
    // 获取歌手 mv
    async getArtistMv () {
      const res = await getArtistMv(this.$route.params.id)
      if (res.data.code !== 200) { return }
      this.mvList = res.data.mvs
      this.mvList.forEach(item => {
        item.cover = item.imgurl
      })
    },
    toMvDetail (id) {
      this.$router.push('/videodetail/mv/' + id)
    }
  }
}
</script>

<style scoped>
.list-wrap {
  display: flex;
  flex-wrap: wrap;
}
.title-line {
  margin: 4px 0;
}
.author-line {
 margin: 2px 0;
 color: #676767;
}
.img {
  width: 22%;
  margin-right: 3%;
   /* width: 265px;
    margin-right: 20px */
}
.img-wrap {
  position: relative;
}
.video-img {
    width: 100%;
    border-radius: 4px;
  }
.video-playcount {
    color: #ffffff;
    position: absolute;
    right: 10px;
    top: 10px;
}
.video-playcount .iconfont {
      font-size: 12px;
}
.play-btn {
    position: absolute;
    right: 118px;
    bottom: 88px;
    background-color: #fbf7f6;
    color: #94ae73;
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
</style>
