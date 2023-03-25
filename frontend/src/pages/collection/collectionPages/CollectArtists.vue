<template>
  <div class="collection-artists">
    <!-- 收藏歌手相关信息 -->
    <div class="collection-artists-head">
      <div>
        <span class="font-bold">收藏的歌手</span>
        <span class="font-12" style="color: #cfcfcf">({{ count }})</span>
      </div>
      <div class="detail-search">
        <el-input
          placeholder="搜索我收藏的歌手"
          clearable
          suffix-icon="el-icon-search"
          v-model="key"
        >
        </el-input>
      </div>
    </div>
    <!-- 收藏歌手组件 -->
    <div class="collection-artists-content mtop-20">
     <InfoList
     :list="subList"
     @clickitem="toArtistDetail">
      <template #img="{ item }">
          <img class="sub-img mleft-10" :src="item.picUrl" />
        </template>
        <template #title="{ item }">
          {{ item.name }}
        </template>
        <template #item1="{ item }"> 专辑： {{ item.albumSize }} </template>
        <template #item2="{ item }"> MV:{{ item.mvSize }} </template>
     </InfoList>
    </div>
    <!-- 返回 -->
     <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import { getSubArtist } from '@/api/api_artist'
import InfoList from '../../../components/list/InfoList'
import {DEFAULT_OFFSET, DEFAULT_COUNT, DEFAULT_KEY} from '../../../utils/constant'
export default {
  components: { InfoList },
  name: 'CollectArtists',
  data () {
    return {
      list: [],
      offset: DEFAULT_OFFSET,
      count: DEFAULT_COUNT,
      key: DEFAULT_KEY
    }
  },
  computed: {
    subList () {
      return this.list.filter((item) => item.name.match(this.key))
    }
  },
  created () {
    this.getSubArtist()
  },
  methods: {
    async  getSubArtist () {
      const res = await getSubArtist()
      if (res.data.code !== 200) { return }
      this.list = Object.freeze(res.data.data)
      this.count = res.data.count
    },
    toArtistDetail (row) {
      this.$router.push('/artistdetail/' + row.id)
    }
  }
}
</script>

<style scoped>
.collection-artists-head{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.backtop {
  right: 20px!important;
    bottom: 79px!important;
  }
</style>
