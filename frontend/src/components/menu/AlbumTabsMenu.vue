<template>
  <ul class="tab-menu">
    <li
      v-for="(item, index) in menuList"
      @click="handMenuClick(index, item)"
      class="pointer"
      :class="{ isActive: tabIndex === index }"
      :key="index"
    >
      <span v-if="mode === 'menu'">{{ item }}</span>
      <span v-else-if="mode === 'router'">{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      required: true
    },
    mode: {
      type: String,
      default: 'menu'
    }
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (val) {
        if (this.mode === 'router') {
          this.tabIndex = this.menuList.findIndex((item) => item.path === val)
        }
      }
    }
  },
  methods: {
    handMenuClick (index, item) {
      if (this.mode === 'menu') {
        this.tabIndex = index
        this.$emit('menuClick', index)
      } else if (this.mode === 'router') {
        if (this.$route.path !== item.path) {
          this.$router.push(item.path)
        }
      }
    }
  }
}
</script>

<style scoped>
.tab-menu {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.tab-menu li {
    margin: 10px;
}
.tab-menu li .isActive {
  font-size: 18px;
  font-weight: bold;
}
.tab-menu li.isActive::after {
  display: block;
  content: '';
  height: 4px;
  width: 90%;
  margin: 0 auto;
  background-color: #b6d4a4;
  border-radius: 2px;
}
</style>
