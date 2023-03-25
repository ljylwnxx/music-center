<template>
  <div class="mtop-20 top-mv">
    <div class="font-20 font-bold">MV排行榜</div>
    <!-- 分类按钮 -->
    <div class="top-mv-head">
      <div class="font-12" style="color: #9f9f9f">最近更新：{{updateTime | dateFormat}}</div>
      <div class="btn-wrap">
        <button
          class="btn-tag"
          v-for="item in areaList"
          :key="item"
          :class="{ 'btn-tag_active': area_active(item) }"
          @click="changeArea(item)"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <!-- mv组件 -->
     <MvTopList :list="topDataList"></MvTopList>
  </div>
</template>

<script>
import { getTopMv } from '@/api/api_video'
import MvTopList from '@/components/list/MvTopList'
import {
  TOPMV_DEFAULT_LIMIT,
  TOPMV_DEFAULT_OFFSET,
  TOPMV_QUERYINFO_AREA
} from '../../constant'
export default {
  name: 'TopMv',
  components: { MvTopList },
  data () {
    return {
      areaList: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      area: '全部',
      queryInfo: {
        limit: TOPMV_DEFAULT_LIMIT,
        offset: TOPMV_DEFAULT_OFFSET,
        area: TOPMV_QUERYINFO_AREA
      },
      topDataList: [],
      updateTime: '今天'
    }
  },
  created () {
    if (
      this.$route.query.area && this.areaList.findIndex((item) => item === this.$route.query.area) !== -1
    ) {
      this.area = this.$route.query.area
      this.queryInfo.area = this.area
    }
    this.getTopMvData()
  },
  methods: {
    // 获取排行榜mv
    async getTopMvData () {
      const res = await getTopMv(this.queryInfo)
      if (res.data.code !== 200) {
        return
      }
      this.topDataList = Object.freeze(res.data.data)
      this.updateTime = res.data.updateTime
    },
    area_active (item) {
      return this.area === item
    },
    changeArea (area) {
      this.area = area
      this.queryInfo.area = area !== '全部' ? area : ''
      this.getTopMvData()
    }
  }
}
</script>

<style scoped>
.top-mv {
    margin-left: 30px;
}
.top-mv-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
.area_active {
  font-weight: bold;
}
.btn-tag {
  height: 26px;
  line-height: 26px;
  border-radius: 13px;
  outline: 0;
  border: 0;
  background-color: #fff;
  padding: 0 10px;
  cursor: pointer;
  color: #676767;
}
.btn-tag_active {
  color: #ec4141;
  background-color: #fdf5f5;
}
</style>
