<template>
  <div class="playdetail-tabs-menu">
    <div class="tab">
      <el-tabs v-model="activeName">
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
        <compontent :is="currentName" :list="list"></compontent>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CollMusic from '../../pages/playlist/PlayList/CollMusic'
import CollComment from '../../pages/playlist/PlayList/CollComment'
import Collectors from '../../pages/playlist/PlayList/Collectors'
export default {
  name: 'PlayTabsMenu',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => {}
    }
  },
  components: {
    CollMusic,
    CollComment,
    Collectors
  },
  data () {
    return {
      activeName: 'first',
      currentName: 'CollMusic',
      tabMenu: [
        {
          label: '歌曲列表',
          name: 'first',
          compoment: CollMusic
        },
        {
          label: '评价',
          name: 'second',
          compoment: CollComment
        },
        {
          label: '收藏者',
          name: 'third',
          compoment: Collectors
        }
      ]
    }
  },
  watch: {
    activeName: function (newVal) {
      this.currentName = this.tabMenu.find(
        (item) => item.name === this.activeName
      ).compoment
    }
  }
}
</script>

<style >
.tab {
  display: flex;
    justify-content: space-between
}
.playdetail-tabs-menu {
  left: 200px;
  z-index: 99;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}
.detail-search {
  width: 200px;
  margin-right: 180px;
  margin-top: 10px;
}
</style>
