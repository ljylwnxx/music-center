<template>
  <div class="history-play mtop-20">
    <!-- 最近播放相关信息 -->
    <div class="info">
      <div>
        <span class="font-24 font-bold">最近播放</span>
        <span class="font-14 mleft-10">共{{length}}首</span>
      </div>
      <div class="btn-wrap">
        <button class="no-btn" @click="clear">清除列表</button>
      </div>
    </div>
    <!-- 全部播放按钮 -->
    <div class="btn-wrap mtop-10">
      <button class="btn btn-red" @click="playAll">
        <i class="iconfont icon-bofang"></i> 播放全部
      </button>
    </div>
    <!-- 分割线 -->
    <div class="div-line mtop-20"></div>
    <!-- 歌曲列表组件 -->
    <MusicList
    v-if="this.$store.state.isLogin"
    ref="listRef"
    :list="this.$store.state.historyList" >
       <template v-slot:one>
          <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
          <el-button
          @click.native.prevent="deleteRow(scope.row)"
          type="text"
          size="small">
          删除
          </el-button>
          </template>
          </el-table-column>
       </template>
    </MusicList>
    <div v-else>
      <template>
        <el-alert
          title="提示"
          type="info"
          description="请先登录，登录后会有看到精彩的内容！"
          show-icon>
        </el-alert>
      </template>
    </div>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import MusicList from '@/components/list/MusicList.vue'
export default {
  name: 'HistoryPlay',
  components: { MusicList },
  computed: {
    length () {
      return (!this.$store.state.isLogin) ? 0 : this.$store.state.historyList.length
    }
  },
  methods: {
    playAll () {
      this.$refs.listRef.playClickAll()
    },
    clear () {
      this.$store.commit('setHistoryInfo', {
        type: 'clear'
      })
      this.$message({
        type: 'success',
        message: '清除列表成功'
      })
    },
    deleteRow (row) {
      this.$store.commit('setHistoryInfo', {
        musicDetail: row,
        type: 'delete'
      })
    }
  }
}
</script>

<style>
.history-play {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.backtop {
  right: 20px!important;
    bottom: 79px!important;
  }
</style>
