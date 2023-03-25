<template>
  <div class="home-view">
    <div class="tab-list">
      <coll-tabs-menu></coll-tabs-menu>
    </div>
  </div>
</template>

<script>
import CollTabsMenu from './CollTabsMenu'

export default {
  name: 'Collection',
  components: {
    CollTabsMenu
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
