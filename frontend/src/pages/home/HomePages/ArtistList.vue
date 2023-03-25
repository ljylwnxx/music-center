<template>
  <div class="artist-list">
    <!-- 歌手分类列表 -->
    <div class="tag-wrapper" ref="tagRef">
      <!-- 语种 -->
      <div class="radio-list">
        <span class="w-60">语种：</span>
        <el-radio-group v-model="queryInfo.area">
          <el-radio :label="ar.id" v-for="ar in artistData.area" :key="`ar_${ar.id}`">
            {{ ar.value }}
          </el-radio>
        </el-radio-group>
      </div>
      <!-- 分类 -->
      <div class="radio-list">
        <span class="w-60">分类：</span>
        <el-radio-group v-model="queryInfo.type">
          <el-radio :label="tp.id" v-for="tp in artistData.type" :key="`tp-${tp.id}`">
            {{ tp.value }}
          </el-radio>
        </el-radio-group>
      </div>
      <!-- 筛选 -->
      <div class="radio-list">
        <span class="w-60">筛选：</span>
        <el-radio-group v-model="queryInfo.initial">
          <el-radio
            :label="it.id"
            v-for="it in artistData.initial"
            :key="`it-${it.id}`"
          >
            {{ it.value }}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 图片展示 -->
    <ImgList
      @loadMore="load"
      @clickImg="toArtistDetail"
      :list="artistList"
      :hasMore="hasMore"
      :infinite="true"
      :isLoading="isLoading"
      type="artist"
    >
      <template v-slot="{ item }">
        <div class="text-hidden">
          {{ item.name }}
        </div>
      </template>
    </ImgList>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import ImgList from '../../../components/list/ImgList'
import { getArtistList } from '@/api/api_artist'
import artistData from '@/listData/artistData'
import {QUERYINFO_INITIAL,
  QUERYINFO_TYPE,
  QUERYINFO_AREA,
  ARTIST_QUERYINFO_LIMIT
} from './constant'
import { MODE_FIRST, DEFAULT_OFFSET } from '@/utils/constant'
export default {
  name: 'ArtistList',
  components: {
    ImgList
  },
  data () {
    return {
      queryInfo: {
        limit: ARTIST_QUERYINFO_LIMIT,
        area: QUERYINFO_AREA,
        offset: DEFAULT_OFFSET,
        type: QUERYINFO_TYPE,
        initial: QUERYINFO_INITIAL
      },
      artistData,
      artistList: [],
      mode: MODE_FIRST,
      isLoading: false,
      hasMore: true
    }
  },
  created () {
    this.getArtistList()
  },
  watch: {
    queryInfo: {
      deep: true,
      handler () {
        this.getArtistList()
      }
    }
  },
  methods: {
    // 获取歌手分类列表
    async getArtistList () {
      this.isLoading = true
      if (this.mode === MODE_FIRST) this.queryInfo.offset = 0
      const res = await getArtistList(this.queryInfo)
      if (res.data.code !== 200) { return this.$message.error('获取失败') }
      this.mode === MODE_FIRST ? this.artistList = res.data.artists : this.artistList.push(...res.data.artists)
      this.hasMore = res.data.more
      if (this.mode === MODE_FIRST) {
        this.isLoading = false
      } else {
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
      }
      this.mode = MODE_FIRST
    },
    load (num) {
      if (this.isLoading) return
      if (!this.hasMore) {
        return this.$message.error('已经到底了')
      }
      this.mode = 'more'
      this.queryInfo.offset = num + 30
    },
    toArtistDetail (id) {
      if (typeof id === 'number') this.$router.push('/artistdetail/' + id)
    }
  }
}
</script>

<style>
.radio-list {
  display: flex;
  flex-wrap: wrap;
  line-height: 20px;
  margin-top: 10px;
}
.radio-list span {
  height: 30px;
  line-height: 30px;
}
.el-radio-group {
  width: 80%;
}
.el-radio {
  width: 60px;
  height: 30px;
  line-height: 30px;
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
