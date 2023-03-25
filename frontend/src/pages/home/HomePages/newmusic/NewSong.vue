<template>
  <div class="new-song">
    <!-- 新歌类型按钮 -->
    <div class="new-song-head">
      <div class="area-wrap">
        <el-button
          class="no-btn mright-10 font-16 color"
          @click="changeType(typebtn.id)"
          v-for="typebtn in typeList"
          :key="typebtn.id"
          :class="{is_Active: is_Active(typebtn.id)}"
        >
          {{ typebtn.name }}
        </el-button>
      </div>
      <div class="btn-wrap">
        <button class="btn btn-red"  @click="playClickAll">
          <i class="iconfont icon-bofang"></i>
          <span class="btn-text">播放全部</span>
        </button>
      </div>
    </div>
    <!-- 新歌页面 -->
    <div class="new-song-view">
      <InfoList :list="list" @clickitem="playMusic">
        <template #index="{ index }">
          <div class="sub-index">
            {{ index > 8 ? index + 1 : '0' + (index + 1) }}
          </div>
        </template>
        <template #img="{ item }">
          <img v-lazy="item.musicPic" class="new-song-img mleft-10" />
        </template>
        <template #title="{ item }">
          {{item.musicName}}
        </template>
        <template #item1="{ item }">
          <span
          class="sub-item font-12"
          style="color: #676767"
          @click.stop="toArtistDetail(item.ar[0].id)"
          >{{ item.authorName }}
          </span>
        </template>
        <template #item2="{ item }">
          <span
          class="sub-item font-12"
          style="color: #676767"
          @click.stop="toAlbumDetail(item.al.id)"
          >{{ item.al.name }}
          </span>
        </template>
        <template #item3="{ item }">
         {{item.totalTime / 1000 |timeFormat}}
        </template>
      </InfoList>
    </div>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import InfoList from '../../../../components/list/InfoList'
import { getNewTopMusic } from '@/api/api_music'
import {tranferNewSongMusicData} from '@/utils/constant'
export default {
  name: 'NewSong',
  components: {
    InfoList
  },
  data () {
    return {
      typeList: [
        { id: 0, name: '全部' },
        { id: 7, name: '华语' },
        { id: 96, name: '欧美' },
        { id: 8, name: '日本' },
        { id: 16, name: '韩国' }
      ],
      type: 0,
      list: []
    }
  },
  watch: {
    type () {
      this.getNewTopMusic()
    }
  },
  computed: {
    is_Active () {
      return function (isActiveId) {
        return this.type === isActiveId
      }
    }
  },
  created () {
    this.getNewTopMusic()
  },
  methods: {
    changeType (id) {
      this.type = id
    },
    // 获取新歌速递
    async getNewTopMusic () {
      const res = await getNewTopMusic(this.type)
      if (res.data.code !== 200) { return }
      let list = []
      res.data.data.forEach((item) => {
        list.push(tranferNewSongMusicData(item))
      })
      this.list = list
    },
    playMusic (row) {
      this.$store.commit('setMusicInfo', {
        musicList: this.list,
        id: row.id
      })
    },
    playClickAll () {
      let id = this.list[0].id
      this.$store.commit('setMusicInfo', {
        musicList: this.list,
        id
      })
    },
    toArtistDetail (id) {
      if (typeof id === 'number' && id !== 0) { this.$router.push('/artistdetail/' + id) }
    },
    toAlbumDetail (id) {
      if (typeof id === 'number') { this.$router.push('/albumdetail/' + id) }
    }
  }
}
</script>

<style scoped>
.new-song-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-top: 10px;
}
.new-song-view{
  margin-top: 10px;
}
.new-song-view:nth-child(even) {
  background-color: #ffffff;
}
.new-song-view:hover {
  background-color: #f0f1f2;
}
.new-song-img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}
.sub-index {
  text-align: center;
  color: #cfcfdf;
}
.song-name {
  min-width: 100px;
  flex: 1;
}
.sub-item {
  width: 150px;
  color: #c3c3c4;
}
.sub-final {
  width: 100px;
  text-align: center;
}
.backtop {
  right: 20px !important;
  bottom: 79px !important;
}
.is_Active {
  color:#a1ba80
}
.color {
  background-color: #fff;
}
</style>
