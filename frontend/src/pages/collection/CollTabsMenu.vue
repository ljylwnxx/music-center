<template>
  <div class="collection-tabs-menu">
    <div class="tab">
      <el-tabs v-model="activeName" >
      <el-tab-pane
        v-for="item in tabMenu"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    </div>
    <div class="tab-content">
      <keep-alive>
      <compontent :is="currentName"></compontent>
      </keep-alive>
    </div>
    <!-- <div>
      <template>
        <el-alert
          title="提示"
          type="info"
          description="请先登录，登录后会有看到精彩的内容！"
          show-icon>
        </el-alert>
      </template>
    </div> -->
  </div>
</template>

<script>
import CollectAlbum from './collectionPages/CollectAlbum'
import CollectArtists from './collectionPages/CollectArtists'
import CollectMv from './collectionPages/CollectMv'
export default {
  name: 'CollTabsMenu',
  components: {
    CollectAlbum,
    CollectArtists,
    CollectMv
  },
  data () {
    return {
      activeName: sessionStorage.getItem('collection-main-active-name') || 'first',
      currentName: 'CollectAlbum',
      tabMenu: [
        {
          label: '专辑',
          name: 'first',
          compoment: CollectAlbum
        },
        {
          label: '歌手',
          name: 'second',
          compoment: CollectArtists
        },
        {
          label: '视频',
          name: 'third',
          compoment: CollectMv
        }
      ]
    }
  },
  watch: {
    activeName: {
      handler: function (newVal) {
        sessionStorage.setItem('collection-main-active-name', newVal)
        this.currentName = this.tabMenu.find(
          (item) => item.name === this.activeName
        ).compoment
      },
      immediate: true
    }
  },
}
</script>

<style >
.collection-tabs-menu {
    left: 200px;
    z-index: 99;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
}
</style>
