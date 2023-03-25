<template>
  <div class="new-music">
    <!-- 新歌新碟按钮 -->
      <div class="new-music-head">
            <div class="head-btn-wrap" >
                <el-button
                v-for="(item,index) of tabList" :key="item.title"
                :type="item.buttonType"
                round
                class="btn-newmusic"
                :class="{ 'btn-newmusic_active': dIndex === index }"
                @click="changeCompo(index)"
                >
                {{item.title}}
                </el-button>

            </div>
      </div>
      <div class="new-music-view">
      <component :is="compo"></component>
      </div>
      <!-- 返回 -->
      <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import NewSong from './newmusic/NewSong'
import NewAlbum from './newmusic/NewAlbum'
export default {
  name: 'NewMusic',
  components: {
    NewSong,
    NewAlbum
  },
  data () {
    return {
      dyCompo: ['NewSong', 'NewAlbum'],
      dIndex: 0,
      tabList: [
        {
          title: '新歌速递',
          buttonType: 'danger'
        },
        {
          title: '新碟上架'
        }
      ]
    }
  },
  computed: {
    compo () {
      return this.dyCompo[this.dIndex]
    }
  },
  methods: {
    changeCompo (index) {
      this.dIndex = index
    }
  }
}
</script>

<style scoped>
  .new-music-head {
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .head-btn-wrap {
  display: flex;
  width: 202px;
  height: 40px;
  }
  .btn-newmusic {
  width: 100px;
  height: 40px;
  outline: 0;
  border: 0;
  border-radius: 20px;
  box-sizing: border-box;
  transition: all 0.5s;
  }
  .backtop {
  right: 20px !important;
  bottom: 79px !important;
  }
</style>
