<template>
  <div class="artistdetail-tabs-menu">
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
  </div>
</template>

<script>
import ArtistAlbum from '../../pages/artist/ArtistDetail/ArtistAlbum'
import ArtistMvList from '../../pages/artist/ArtistDetail/ArtistMvList'
import ArtistIntro from '../../pages/artist/ArtistDetail/ArtistIntro'
import ArtistSame from '../../pages/artist/ArtistDetail/ArtistSame'
export default {
  name: 'ArtTabsMenu',
  components: {
    ArtistAlbum,
    ArtistMvList,
    ArtistIntro,
    ArtistSame
  },
  data () {
    return {
      activeName: 'first',
      currentName: 'ArtistAlbum',
      tabMenu: [
        {
          label: '专辑',
          name: 'first',
          compoment: ArtistAlbum
        },
        {
          label: 'MV',
          name: 'second',
          compoment: ArtistMvList
        },
        {
          label: '歌手详情',
          name: 'third',
          compoment: ArtistIntro
        },
        {
          label: '相似歌手',
          name: 'forth',
          compoment: ArtistSame
        }
      ]
    }
  },
  watch: {
    activeName: function (newVal) {
      this.currentName = this.tabMenu.find(item => item.name === this.activeName).compoment
    }
  }
}
</script>

<style >
.artistdetail-tabs-menu {
    left: 200px;
    z-index: 99;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
}
</style>
