<template>
  <div class="new-album">
    <!-- 新碟页面 -->
    <div class="new-song-view">
      <el-skeleton v-show="isLoading" :rows="6" animated />
      <div v-show="!isLoading" class="new-album-list">
      <div class="new-album-list">
        <!-- 小标题 -->
        <div class="time-info">
          <div class="time-info-content">本周新碟</div>
        </div>
        <!-- 内容 -->
        <div class="data-list">
          <ImgList @clickImg="toAlbumDetail" :list="weekData" type="album">
            <template v-slot="{ item }">
              <div class="text-hidden">
                {{ item.name }}
              </div>
              <div style="color: #9f9f9f" class="text-hidden">
                {{ item.artist.name }}
              </div>
            </template>
          </ImgList>
        </div>
      </div>
      </div>
    </div>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import { getNewTopAlbum } from '@/api/api_album'
import {
  NEWALBUM_QUERYINFO_YEAR,
  NEWALBUM_QUERYINFO_MONTH,
  NEWALBUM_QUERYINFO_TYPE,
  NEWALBUM_QUERYINFO_AREA,
  NEWALBUM_QUERYINFO_OFFSET,
  NEWALBUM_QUERYINFO_LIMIT
} from '../constant'
import ImgList from '../../../../components/list/ImgList.vue'
export default {
  components: { ImgList },
  name: 'NewAlbum',
  data () {
    return {
      weekData: [],
      isLoading: true,
      queryInfo: {
        limit: NEWALBUM_QUERYINFO_LIMIT,
        offset: NEWALBUM_QUERYINFO_OFFSET,
        area: NEWALBUM_QUERYINFO_AREA,
        type: NEWALBUM_QUERYINFO_TYPE,
        month: NEWALBUM_QUERYINFO_MONTH,
        year: NEWALBUM_QUERYINFO_YEAR
      }
    }
  },
  created () {
    this.getNewTopAlbum()
  },
  methods: {
    // 获取新碟上架
    async getNewTopAlbum () {
      this.isLoading = true
      const res = await getNewTopAlbum(this.queryInfo)
      if (res.data.code !== 200) { return }
      if (res.data.hasOwnProperty('weekData')) {
        this.weekData = Object.freeze(res.data.weekData)
      } else {
        this.weekData = []
      }
      this.isLoading = false
    },
    toAlbumDetail (id) {
      if (typeof id === 'number') this.$router.push('/albumdetail/' + id)
    }
  }
}
</script>

<style scoped>
.new-album-list {
  display: flex;
  width: 100%;
}
.time-info {
  width: 50px;
  text-align: center;
}
.time-info-content {
  font-size: 20px;
  width: 30px;
}
.picimages {
  display: flex;
  flex-wrap: wrap;
}
.backtop {
  right: 20px !important;
  bottom: 79px !important;
}
</style>
