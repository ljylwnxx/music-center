<template>
  <div class="mtop-20 all-mv">
     <div class="all-title font-20 font-bold">全部MV</div>
     <!-- mv分类 -->
     <div class="tag-wrapper" ref="tagRef">
         <div class="radio-list">
             <span class="w-60">地区：</span>
                <el-radio-group v-model="queryInfo.area">
                    <el-radio
                    :label="ar"
                    v-for="(ar, index) in catList.area"
                    :key="index">
                        {{ar}}
                    </el-radio>
                </el-radio-group>
          </div>
          <div class="radio-list">
               <span class="w-60">类型：</span>
               <el-radio-group v-model="queryInfo.type">
                   <el-radio :label="tp" v-for="(tp,index) in catList.type" :key="index">
                       {{tp}}
                   </el-radio>
               </el-radio-group>
          </div>
          <div class="radio-list">
                <span class="w-60">排序：</span>
                <el-radio-group v-model="queryInfo.order">
                <el-radio
                    :label="od"
                    v-for="(od, index) in catList.order"
                    :key="index"
                    >
                    {{od}}
                </el-radio>
                </el-radio-group>
          </div>
     </div>
     <!-- mv组件 -->
    <MvList :list="mvList" :disabled="disabled" @loadMore="load"></MvList>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import MvList from '@/components/list/MvList'
import { getAllMv } from '@/api/api_video'
import {
  ALLMV_QUERYINFO_AREA,
  ALLMV_QUERYINFO_TYPE,
  ALLMV_QUERYINFO_ORDER,
  ALLMV_QUERYINFO_LIMIT,
  ALLMV_DEFAULT_OFFSET,
  ALLMV_DEFAULT_HASMORE,
  ALLMV_DEFAULT_ISLOADING,
  ALLMV_DEFAULT_MODE
} from '../../constant'
export default {
  name: 'AllMv',
  components: { MvList },
  data () {
    return {
      mvList: [],
      catList: {
        area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
        type: ['全部', '官方版', '原生', '现场版', '网易出品'],
        order: ['上升最快', '最热', '最新']
      },
      queryInfo: {
        area: ALLMV_QUERYINFO_AREA,
        type: ALLMV_QUERYINFO_TYPE,
        order: ALLMV_QUERYINFO_ORDER,
        limit: ALLMV_QUERYINFO_LIMIT
      },
      offset: ALLMV_DEFAULT_OFFSET,
      hasMore: ALLMV_DEFAULT_HASMORE,
      isLoading: ALLMV_DEFAULT_ISLOADING,
      mode: ALLMV_DEFAULT_MODE
    }
  },
  computed: {
    disabled () {
      return this.loading || !this.hasMore
    }
  },
  watch: {
    queryInfo: {
      deep: true,
      handler () {
        this.mode = ALLMV_DEFAULT_MODE
        this.getMvList()
      }
    }
  },
  created () {
    this.getQuery()
    this.getMvList()
  },
  methods: {
    // 获取全部mv
    async getMvList () {
      const res = await getAllMv({
        ...this.queryInfo,
        offset: this.offset})
      if (res.data.code !== 200) {
        return
      }
      this.mode === ALLMV_DEFAULT_MODE ? (this.mvList = res.data.data) : (this.mvList.push(...res.data.data))
      this.hasMore = res.data.hasMore
    },
    // 获取路由参数中的地区
    getQuery () {
      let query = this.$route.query
      if (
        query.area && this.catList.area.findIndex((item) => item === query.area) !== -1
      ) {
        this.queryInfo.area = query.area
      }
      if (
        query.type && this.catList.type.findIndex((item) => item === query.type) !== -1
      ) {
        this.queryInfo.type = query.type
      }
    },
    load (length) {
      this.offset = length + 16
      this.mode = 'more'
      this.getMvList()
    }
  }
}
</script>

<style scoped>
  .all-mv {
      margin-left: 30px;
  }
  .radio-list {
  display: flex;
  flex-wrap: wrap;
  line-height: 20px;
  margin-top: 10px;
  }
  span {
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
.backtop {
  right: 20px !important;
  bottom: 79px !important;
}
</style>
