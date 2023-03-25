<template>
  <div class="artist-detail mtop-20">
    <el-skeleton :loading="isLoading" animated></el-skeleton>
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
       <template>
        <!-- 歌手相关信息 -->
      <div class="artist-info">
        <!-- 图片展示 -->
        <div class="img-wrap">
          <img
            v-lazy="artistInfo.cover || imgUrl"
            class="img-h image-radius-8 image-border"
          />
        </div>
        <!--歌手信息-->
        <div class="info">
          <!-- 歌手姓名,粉丝数,身份,单曲数,专辑数,mv数 -->
          <div class="info-detail">
            <div class="font-24 font-bold">
              {{ artistInfo.name }}
            </div>
            <span class="font-14 identify">身份:{{ identify }}</span>
            <div class="artist-count">
              <span class="font-14">单曲数:{{ artistInfo.musicSize }}</span>
              <span class="mleft-20 font-14">专辑数:{{ artistInfo.albumSize }}</span>
              <span class="mleft-20 font-14">MV数:{{ artistInfo.mvSize }}</span>
            </div>

          </div>
          <!--收藏，个人主页按钮  -->
          <div class="info-btn">
            <button class="btn btn-white mleft-10" @click="subArtists">
              <span v-if="!isSub" ><i class="el-icon-folder-add"></i>收藏</span>
              <span v-else><i class="el-icon-folder-checked"></i> 已收藏</span>
            </button>
            <button class="btn btn-white mleft-10" v-if="showPriMsg" @click="toUserDetail">
              <i class="el-icon-user"></i>
              个人主页
            </button>
          </div>
        </div>
      </div>
      <!-- tabs -->
      <art-tabs-menu :key="id"></art-tabs-menu>
       </template>     
    </el-skeleton>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import {
  getArtistDetail,
  getSubArtists,
  subArtists,
  getArtistFollowCount
} from '@/api/api_artist'
import ArtTabsMenu from '../../components/menu/ArtTabsMenu'
export default {
  name: 'ArtistDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    ArtTabsMenu
  },
  data () {
    return {
      artistInfo: {
        name: '',
        cover: '',
        briefDesc: '',
        albumSize: 0,
        musicSize: 0,
        mvSize: 0
      },
      imgUrl:
        'http://p4.music.126.net/LL43QzRrox3PzXblIwfSUQ==/109951165995568722.jpg',
      showPriMsg: false,
      subList: [],
      userId: 0,
      fansCount: 0,
      identify: '',
      isLoading: true
    }
  },
  computed: {
    isSub () {
      return this.subList.findIndex((item) => Number(item.id) === Number(this.id)) !== -1
    }
  },
  watch: {
    id (newVal) {
      this.getArtistDetail(newVal)
    }
  },
  created () {
    this.getArtistDetail()
    this.getSubArtists()
  },
  methods: {
    // 获取歌手详情
    async getArtistDetail () {
      this.isLoading = true
      const res = await getArtistDetail(this.id)
      if (res.data.code !== 200) { return }
      this.artistInfo = Object.freeze(res.data.data.artist)
      this.showPriMsg = Object.freeze(res.data.data.showPriMsg)
      this.identify = res.data.data.identify.imageDesc
      if (this.showPriMsg) { this.userId = res.data.data.user.userId }
      this.getSubArtists()
      this.getArtistFollowCount()
      this.isLoading = false
    },
    // 歌手粉丝数量
    async getArtistFollowCount () {
      const res = await getArtistFollowCount(this.id)
      this.fansCount = res.data.data.fansCnt
    },
    // 收藏的歌手列表
    async getSubArtists () {
      if (!this.$store.state.isLogin) { return }
      const res = await getSubArtists()
      if (res.data.code !== 200) { return }
      this.subList = Object.freeze(res.data.data)
    },
    // 收藏/取消收藏歌手
    async subArtists () {
      if (!this.$store.state.isLogin) { return this.$message.warning('请先登录') }
      let cancel = false
      if (this.isSub) {
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
      let t = this.isSub ? 0 : 1
      const res = await subArtists(this.id, t)
      if (res.data.code !== 200) { return this.$message.error('操作失败') }
      this.$message.success(`${t === 1 ? '收藏' : '取消'}成功`)
      this.getSubArtists()
    },
    // 用户详情页
    toUserDetail () {
      if (this.userId !== 0 && this.showPriMsg) { this.$router.push('/userdetail/' + this.userId) }
    }
  }

}
</script>

<style scoped>
.artist-detail {
   width: 90%;
   margin: 0 auto;
   margin-top: 20px;
}
.artist-info {
  height: 200px;
  display: flex;
}
.artist-info .img-wrap {
  width: 200px;
  height: 200px;
}
.artist-info .info {
  margin-left: 30px;
  line-height: 38px;
}
.backtop {
  right: 20px!important;
    bottom: 79px!important;
  }
</style>
