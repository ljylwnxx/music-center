<template>
  <div class="tabs-menu">
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item
          v-for="(item, index) in tabMenu"
          :key="index"
          :to="{path: item.path}"
          class="pointer"
        >
        {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'TabsMenu',
  props: {
    tabMenu: {
      type: Array,
      required: true
    }
  }
}
</script>

<style >
.tabs-menu {
  display: flex;
  flex-direction: column;
  z-index: 99;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}
</style>
