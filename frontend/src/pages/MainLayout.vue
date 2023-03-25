<template>
  <div class="main-layout">
    <div>
      <el-header style="height: 60px">
        <header-menu></header-menu>
      </el-header>
      <div class="middle-content">
        <el-aside width="200px">
          <main-aside></main-aside>
        </el-aside>
        <el-main class="main">
           <transition name="el-fade-in">
             <router-view></router-view>
           </transition>
        </el-main>
      </div>
      <div>
        <el-footer style="height: 60px">
          <main-footer></main-footer>
        </el-footer>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from './main/header/HeaderMenu'
import MainAside from './main/aside/MainAside'
import MainFooter from './main/footer/MainFooter'

export default {
  name: 'MainLayout',
  components: {
    HeaderMenu,
    MainAside,
    MainFooter
  }
}
</script>

<style scoped>
.main-layout {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #a1ba80;
  width: 100%;
}
.middle-content{
  display: flex;
}
.main {
  display: flex;
  height: 690px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
