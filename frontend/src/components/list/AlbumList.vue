<template>
  <!-- 歌手专辑页列表 -->
  <div class="album-list mtop-60">
    <div class="list-container">
      <!-- 图片展示 -->
      <div style="width: 200px">
        <img class="img images-radius-8 img-border" @click="toAlbumDetail" :src="albumInfo.picUrl" />
      </div>
      <div class="mleft-40 list-content">
        <!-- 专辑名，播放按钮 -->
        <div class="text">
          <span class="font-bold" @click="toAlbumDetail">{{ albumInfo.name}}</span>
          <button
            class="no-btn mleft-20 font-20"
            @click="playClickAll"
          >
            <i class="el-icon-video-play"></i>
          </button>
        </div>
        <!-- 专辑列表 -->
        <el-table :data="doAlbumList" style="width: 100%" size="mini" stripe class="pointer" @row-click="playMusic">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="musicName" label="音乐标题">
          </el-table-column>
          <el-table-column prop="totalTime" label="时长">
            <template slot-scope="scope">
              <span>{{ (scope.row.totalTime / 1000) | timeFormat }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 查看全部 -->
        <div class="view-more" v-show="total > 10">
          <button class="pointer no-btn mtop-10" @click="toAlbumDetail">
            查看全部{{total}}首
            <i class="el-icon-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumList',
  props: ['musicInAlbumList', 'albumInfo'],
  computed: {
    doAlbumList () {
      return this.musicInAlbumList.slice(0, 10)
    },
    total () {
      return this.musicInAlbumList.length
    }
  },
  methods: {
    playMusic (row) {
      this.$store.commit('setMusicInfo', {
        musicList: this.musicInAlbumList,
        id: row.id
      })
    },
    playClickAll () {
      let id = this.musicInAlbumList[0].id
      this.$store.commit('setMusicInfo', {
        musicList: this.musicInAlbumList,
        id
      })
    },
    toAlbumDetail () {
      this.$router.push({ path: `/albumdetail/${this.albumInfo.id}` })
    }
  }
}
</script>

<style scoped>
.list-container {
  display: flex;
}
.list-container .list-content {
    flex: 1;
}
.img-wrap {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
}
</style>
