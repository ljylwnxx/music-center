<template>
  <div class="collection-album">
    <!-- 收藏专辑相关信息 -->
    <div class="collection-album-head">
      <div>
        <span class="font-bold">收藏的专辑</span>
        <span class="font-12" style="color: #cfcfcf">({{ count }})</span>
      </div>
      <!-- 搜索框 -->
      <div class="detail-search">
        <el-input
          placeholder="搜索收藏专辑"
          clearable
          suffix-icon="el-icon-search"
          v-model="key"
        >
        </el-input>
      </div>
    </div>
    <!-- 专辑列表组件 -->
    <div class="collection-album-content mtop-20">
     <info-list
     :list="subAlbumList"
     @clickitem="toAlbumDetail">
      <template #img="{ item }">
          <img class="sub-img mleft-10" :src="item.picUrl" />
        </template>
        <template #title="{ item }">
          {{ item.name }}
        </template>
        <template #item1="{ item }">
          <span
          v-for="(ar, index) in item.artist" :key="index">{{ar.name}}</span>
        </template>
        <template #item2="{ item }">{{ item.size }}首 </template>
     </info-list>
    </div>
    <!-- 返回 -->
     <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import { getSubAlbum } from '@/api/api_album'
import InfoList from '../../../components/list/InfoList'
import {DEFAULT_OFFSET, DEFAULT_COUNT, DEFAULT_KEY} from '../../../utils/constant'
export default {
  name: 'CollectAlbum',
  components: {InfoList},
  data () {
    return {
      list: [],
      offset: DEFAULT_OFFSET,
      count: DEFAULT_COUNT,
      key: DEFAULT_KEY
    }
  },
  computed: {
    subAlbumList () {
      return this.list.filter((item) => item.name.match(this.key))
    }
  },
  created () {
    this.getSubAlbum()
  },
  methods: {
    async getSubAlbum () {
      const res = await getSubAlbum()
      if (res.data.code !== 200) { return }
      this.list = Object.freeze(res.data.data)
      this.count = res.data.count
    },
    toAlbumDetail (row) {
      this.$router.push('/albumdetail/' + row.id)
    }
  }
}
</script>

<style scoped>
.collection-album-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.backtop {
  right: 20px!important;
    bottom: 79px!important;
  }
</style>
