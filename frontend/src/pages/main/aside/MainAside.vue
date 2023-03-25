<template>
  <div>
    <el-menu
    router
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    @select="handleSelect">
      <el-menu-item
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-menu-item-group v-if="this.$store.state.isLogin">
        <template slot="title">
          <i class="el-icon-apple"></i>
          我的音乐
          </template>
        <el-menu-item
          v-for="subItem in hasChildren"
          :key="subItem.id"
          :index="subItem.path"
        >
        <i :class="'el-icon-' + subItem.icon"></i>
          <span>{{ subItem.title }}</span>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group v-if="this.$store.state.isLogin">
        <template slot="title">
          <i class="el-icon-lollipop"></i>
          创建歌单
          </template>
        <el-menu-item
          v-for="(subItem, index) in creList"
          :key="subItem.id"
          :index="songPath(subItem.id)"
        >
          <div slot="title" class="text-hidden">
            <i v-if="index === 0" class="iconfont icon-aixin"></i>
            <i v-else class="iconfont icon-gedan"></i>{{ subItem.name }}
          </div>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group v-if="this.$store.state.isLogin">
        <template slot="title">
          <i class="el-icon-ice-cream-round"></i>
          收藏歌单
          </template>
        <el-menu-item
          v-for="subItem in subList"
          :key="subItem.id"
          :index="songPath(subItem.id)"
        >
          <div slot="title" class="text-hidden">
            <i class="iconfont icon-gedan"></i>{{ subItem.name }}
          </div>
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'MainAside',
  data () {
    return {
      activeIndex: '/personalrecommend',
      asideList: [
        {
          title: '发现音乐',
          icon: 'grape',
          path: '/personalrecommend'
        },
        {
          title: '视频',
          icon: 'watermelon',
          path: '/videodetail'
        },
        {
          title: '私人FM',
          icon: 'cherry',
          path: '/personalfmpage'
        },
        {
          title: '每日推荐',
          icon: 'pear',
          path: '/recommendsong'
        }
      ],
      musicAsideList: [
        {
          index: '1-1',
          title: '最近播放',
          icon: 'orange',
          path: '/historyplay'
        },
        {
          index: '1-2',
          title: '我的收藏',
          icon: 'ice-tea',
          path: '/collection'
        }
      ]
    }
  },
  created () {
    if (window.sessionStorage.getItem('activeIndex')) { this.activeIndex = window.sessionStorage.getItem('activeIndex') }
  },
  computed: {
    noChildren () {
      return this.asideList.filter((item) => !item.children)
    },
    hasChildren () {
      return this.musicAsideList.filter((item) => !item.children)
    },
    creList () {
      return this.$store.state.myPlayList.filter((item) => item.userId === this.userId)
    },
    subList () {
      return this.$store.state.myPlayList.filter((item) => item.userId !== this.userId)
    },
    userId () {
      return this.$store.state.isLogin ? this.$store.state.profile.userId : 0
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      window.sessionStorage.setItem('activeIndex', key)
      this.activeIndex = key
    },
    songPath (id) {
      if (typeof id === 'number') return `/playlistdetail/${id}`
    }
  }
}
</script>
<style>
</style>
