<template>
  <div>
    <div class="top-fifty-list">
      <div class="list-container">
        <!-- 图片展示 -->
        <div style="width: 200px">
          <img class="img image-radius-8" src="@/assets/images/top50.png" />
        </div>
        <!-- 专辑相关信息 -->
        <div class="mleft-40 list-content">
          <!-- 热门50首 -->
          <div class="top-text">
            <span class="font-bold">热门50首</span>
            <button class="no-btn mleft-20 font-20" @click="playClickAll">
              <i class="el-icon-video-play"></i>
            </button>
          </div>
          <!-- 列表 -->
          <el-table
            :data="dotopList"
            style="width: 100%"
            size="mini"
            stripe
            class="pointer"
            @row-click="playMusic"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="musicName" label="音乐标题">
              <template slot-scope="scope">
                <span>{{ scope.row.musicName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="totalTime" label="时长">
              <template slot-scope="scope">
                <span>{{ (scope.row.totalTime / 1000) | timeFormat }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 查看全部 -->
          <div class="view-more" v-if="!showAll">
            <button class="pointer no-btn mtop-10" @click="displayAll()">
              查看全部{{ topList.length }}首
              <i class="el-icon-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- 专辑组件 -->
      <album-list
        v-for="(item, index) in albumList"
        :key="index"
        :albumInfo="item.album"
        :musicInAlbumList="item.songs||[]"
      >
      </album-list>
    </div>
  </div>
</template>

<script>
import {
  getArtistTop,
  getArtistAlbum
} from '@/api/api_artist'
import { getAlbumDetail } from '@/api/api_album'
import AlbumList from '../../../components/list/AlbumList'
import {tranferMusicData} from '../../../utils/constant'
export default {
  name: 'ArtistAlbum',
  components: { AlbumList },
  data () {
    return {
      topList: [],
      albumList: [],
      showAll: false
    }
  },
  computed: {
    dotopList () {
      if (!this.showAll) {
        return this.topList.slice(0, 10)
      } else {
        return this.topList
      }
    }
  },
  created () {
    this.getArtistTop()
    this.getArtistAlbum()
  },
  methods: {
    // 歌手热门 50 首歌曲
    async getArtistTop () {
      const res = await getArtistTop(this.$route.params.id)
      if (res.data.code !== 200) { return }
      this.topList = res.data.songs.map(item => {
        return tranferMusicData(item)
      })
    },
    // 获取歌手专辑
    async getArtistAlbum () {
      const res = await getArtistAlbum(this.$route.params.id)
      if (res.data.code !== 200) { return }
      res.data.hotAlbums.forEach((item) => {
        this.getAlbumDetail(item.id)
      })
    },
    // 获取专辑内容
    async getAlbumDetail (id) {
      const res = await getAlbumDetail(id)
      if (res.data.code !== 200) { return }
      let resData = res.data
      resData = {
        ...resData,
        songs: res.data.songs.map(item => {
          return tranferMusicData(item)
        })
      }
      this.albumList.push(resData)
    },
    // 查看全部
    displayAll () {
      this.showAll = true
    },
    // 播放音乐
    playMusic (row) {
      this.$store.commit('setMusicInfo', {
        musicList: this.topList,
        id: row.id
      })
    },
    // 播放全部音乐
    playClickAll () {
      let id = this.topList[0].id
      this.$store.commit('setMusicInfo', {
        musicList: this.topList,
        id
      })
    }
  }
}
</script>

<style scoped>
.list-container {
  display: flex;
}
.list-content {
  flex: 1;
}
</style>
