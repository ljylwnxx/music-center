<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      size="mini"
      stripe
      class="pointer"
      v-if="isDisplay"
      @row-dblclick="playMusic"
      empty-text="当前没有音乐，请登录哦"
    >
      <!-- 序号 -->
      <el-table-column type="index" width="50">
        <template v-slot="scope">
          <span class="active-color" v-if="showCurren(scope.row.id)">
            <i v-if="isPlay" class="iconfont icon-shengyin_shiti"></i>
            <i v-else class="iconfont icon-sound"></i>
          </span>
          <span v-else style="color: #c3c3db">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- 喜欢按钮 -->
      <el-table-column width="30">
        <template v-slot="{ row }">
          <div class="pointer" @click.stop="likeMusic(row.id)">
            <i v-if="!isLiked(row.id)" class="iconfont icon-aixin"></i>
            <i v-else style="color: #ec4141" class="iconfont icon-aixin1"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="musicName" label="音乐标题" class="df">
        <template v-slot="{ row }">
          <span :class="{ 'active-color': showCurren(row.id) }">{{ row.musicName }}</span>
          <span v-if="row.alia && row.alia.length !== 0"> ({{ row.alia[0] }}) </span>
          <span v-if="row.fee == 1" class="vip-tag">VIP</span>
          <span
            v-if="row.mv !== 0"
            class="vip-tag pointer"
            @click.stop="toMvDeTail(row.mv)"
            style="color: #778f3d; border-color: #778f3d"
          >
            MV
            <i class="el-icon-caret-right"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="authorName" label="歌手" width="240">
        <template v-slot="{ row }">
          <span
            class="pointer artist-list"
            @click.stop="toArtistDetail(row.authorId)"
          >
            {{ row.authorName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="albumName" label="专辑名" width="200">
        <template v-slot="{ row }">
          <span class="pointer" @click.stop="toAlbumDetail(row.albumId)">
            {{row.albumName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="totalTime" label="时长" width="180">
        <template v-slot="{ row }">
          <span>{{ (row.totalTime / 1000) | timeFormat }}</span>
        </template>
      </el-table-column>
      <slot name="one">操作</slot>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { likeMusic } from '@/api/api_music'
export default {
  name: 'MusicList',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => {}
    }
  },
  computed: {
    ...mapState([
      'isPlay',
      'isLogin',
      'likeIdList'
    ]),
    isDisplay () {
      return this.list !== 'true'
    }
  },
  methods: {
    // 喜欢音乐
    async likeMusic (id) {
      if (!this.isLogin) { return this.$message.error('需要登录') }
      if (typeof id !== 'number') { return }
      let liked = this.isLiked(id)
      const res = await likeMusic(id, !liked)
      if (res.data.code !== 200) {
        return
      }
      this.$message.success(`${liked ? '取消喜欢' : '喜欢'}成功`)
      if (liked) {
        this.$store.commit('setLikeIdList', {
          type: 'remove',
          data: id
        })
      } else {
        this.$store.commit('setLikeIdList', {
          type: 'unshift',
          data: id
        })
      }
    },
    // 播放音乐
    playMusic (row) {
      this.$store.commit('setMusicInfo', {
        musicList: this.list,
        id: row.id
      })
    },
    // 播放全部音乐
    playClickAll () {
      let id = this.list[0].id
      this.$store.commit('setMusicInfo', {
        musicList: this.list,
        id
      })
    },
    showCurren (id) {
      return this.$store.state.musicData.id === id
    },
    toMvDeTail (id) {
      if (typeof id === 'number') {
        this.$router.push('/videodetail/mv/' + id)
      }
    },
    toArtistDetail (id) {
      if (typeof id === 'number') {
        this.$router.push('/artistdetail/' + id)
      }
    },
    toAlbumDetail (id) {
      if (this.$route.path === '/albumdetail/' + id) {
        return
      }

      if (typeof id === 'number') {
        this.$router.push('/albumdetail/' + id)
      }
    },
    isLiked (id) {
      return this.likeIdList.indexOf(id) !== -1
    }
  }
}
</script>

<style scoped>
.vip-tag {
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #778f3d;
  border-radius: 2px;
  color: #778f3d;
  margin-left: 10px;
  height: 14px;
  padding: 0 2px;
  line-height: 1;
}
.active-color {
  color:#778f3d;
}
.df {
  text-align: center;
}
</style>
