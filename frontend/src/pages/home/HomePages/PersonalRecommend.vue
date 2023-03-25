<template>
  <div class="personal-recommend">
    <!-- 轮播图 -->
    <div class="swiper">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in imgList" :key="item.imageUrl">
          <img
            class="img img-h swiper-img"
            :src="item.imageUrl"
            @click="openUrl(item.url)"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 未登录时热门推荐 -->
    <div class="recommend-song-list" v-if="!this.$store.state.isLogin">
      <h2 class="font-20 font-bold pointer" @click="goToView">
        热门推荐
        <i class="iconfont icon-arrow-right"></i>
      </h2>
      <ImgList @clickImg="toPlayListDetail" :list="recSongsList" type="playlist">
        <template v-slot="{ item }">
          <div class="text-hidden">
            {{ item.name }}
          </div>
        </template>
      </ImgList>
    </div>
    <!-- 登录时推荐歌单 -->
    <div class="recommend-song-list" v-else>
      <h2 class="font-20 font-bold pointer" @click="goToView">
        推荐歌单
        <i class="iconfont icon-arrow-right"></i>
      </h2>
      <ImgList @clickImg="toPlayListDetail" :list="recoList" type="playlist">
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
import { getBanner } from '@/api/api_other'
import { getRecSongsList, getRecommend } from '@/api/api_playlist'
import ImgList from '@/components/list/ImgList.vue'
export default {
  name: 'PersonalRecommend',
  components: {
    ImgList
  },
  data () {
    return {
      imgList: [],
      recoList: [],
      recSongsList: []
    }
  },
  watch: {
    '$store.state.isLogin': {
      immediate: true,
      handler () {
        this.$store.state.isLogin ? this.getRecommend() : this.getRecSongsList()
      }
    }
  },
  created () {
    this.getRecBanner()
    this.getRecSongsList(10)
  },
  methods: {
    openUrl (url) {
      if (url !== null) {
        window.open(url)
      } else {
        this.$message.error('没有链接')
      }
    },
    goToView () {
      this.$router.push({ path: '/playlist/' })
    },
    toPlayListDetail (id) {
      if (typeof id === 'number') {
        this.$router.push({ path: '/playlistdetail/' + id })
      }
    },
    // 轮播图
    async getRecBanner () {
      //   http://47.102.159.133/api/banner
      const res = await getBanner()
      if (res.data.code !== 200) { return }
      this.imgList = Object.freeze(res.data.banners)
    },
    // 获取热门推荐-未登录时
    async getRecSongsList (limit) {
      if (this.$store.state.isLogin) { return }
      const res = await getRecSongsList(limit)
      if (res.data.code !== 200) { return }
      this.recSongsList = Object.freeze(res.data.result)
    },
    // 获取推荐歌单-登录时
    async getRecommend () {
      if (!this.$store.state.isLogin) { return }
      const res = await getRecommend()
      if (res.data.code !== 200) { return }
      this.recoList = res.data.recommend
      this.recoList.map((item) => {
        return {
          item
        }
      })
    }
  }
}
</script>

<style>
  .img-item-li {
  margin-bottom: 30px;
  width: 18%;
  margin-right: 2%;
  }
  .picimages {
  display: flex;
  flex-wrap: wrap;
  }
  .personal-recommend {
  height: 600px;
  }
  .backtop {
  right: 20px !important;
  bottom: 79px !important;
  }
</style>
