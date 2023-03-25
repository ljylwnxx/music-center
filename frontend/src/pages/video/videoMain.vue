<template>
  <div class="video-view">
    <div class="tab-list">
      <tabs-menu :tabMenu="tabMenu"></tabs-menu>
    </div>
    <div class="video-page-view">
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import TabsMenu from '@/components/menu/TabsMenu'
import Video from './videoPage/video/Video'
import mv from './videoPage/mv/mv'
export default {
  name: 'videoPage',
  components: {
    TabsMenu
  },
  data () {
    return {
      tabMenu: [
        {
          path: '/videodetail',
          name: '视频',
          compoment: Video
        },
        {
          path: '/mvdetail',
          name: 'MV',
          compoment: mv
        }
      ]
    }
  }
}
</script>

<style scoped>
.video-view {
    height: 100%;
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
}
</style>
