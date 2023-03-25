<template>
  <div>
      <el-skeleton v-if="isSubloading" :rows="6" animated />
        <!-- 不存在收藏者 -->
        <div v-else-if="this.pageInfo.total === 0" class="flex-center">
          当前歌单没有收藏者
        </div>
        <!-- 存在收藏者 -->
        <template v-else>
          <!-- 收藏者组件 -->
          <FollowList
            :type="1"
            :list="suberList"
            @clickImg="toUserDetail"
          >
          </FollowList>
          <!-- 分页 -->
          <div class="flex-center" style="width: 100%">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageInfo.currentPage"
              :page-size="30"
              layout="prev, pager, next"
              :total="pageInfo.total"
              background
            >
            </el-pagination>
          </div>
        </template>
  </div>
</template>

<script>
import FollowList from './FollowList'
import { getSuberList } from '@/api/api_playlist'
export default {
  name: 'Collectors',
  components: {FollowList},
  data () {
    return {
      suberList: [],
      pageInfo: {
        currentPage: 1,
        total: 0
      },
      isSubloading: true
    }
  },
  created () {
    this.getSuberList()
  },
  methods: {
    // 获取歌单收藏者
    async getSuberList () {
      const res = await getSuberList({
        id: this.$route.params.id,
        limit: 30,
        offset: (this.pageInfo.currentPage - 1) * 30
      })
      if (res.data.code !== 200) { return }
      this.suberList = res.data.subscribers
      this.pageInfo.total = res.data.total
      this.isSubloading = false
    },
    // 分页
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      document.querySelector('.el-main').scrollTop = 0
      this.getSuberList()
    },
    // 到用户详情
    toUserDetail (item) {
      if (typeof item === 'object') { this.$router.push('/userdetail/' + item.userId) }
    }
  }
}
</script>

<style scoped>
</style>
