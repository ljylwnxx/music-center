<template>
  <div class="home-view">
    <div class="tab-list">
      <tabs-menu :tabMenu="tabMenuList"></tabs-menu>
    </div>
    <div class="home-page-view">
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import TabsMenu from '@/components/menu/TabsMenu'
export default {
  name: 'HomeMain',
  components: {
    TabsMenu
  },
  data () {
    return {
      tabMenuList: [
        { path: '/personalrecommend', name: '个性推荐' },
        { path: '/playlist', name: '歌单' },
        { path: '/toplist', name: '排行榜' },
        { path: '/artistlist', name: '歌手' },
        { path: '/newmusic', name: '最新音乐' }

      ]
    }
  }
}
</script>

<style>
.home-view {
    height: 100%;
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
}
</style>
