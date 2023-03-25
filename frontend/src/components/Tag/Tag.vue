<template>
  <div class="tag"
  :style="{ color, backgroundColor: bgcolor,borderColor:color }">
  {{text}}

  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: ['text', 'color', 'bgcolor']
}
</script>

<style scoped>
.tag{
    display: inline-block;
    border: 1px solid #778f3d;
    padding:0 2px;
    font-size: 14px;
    height: 22px;
    line-height: 22px;
    color: #778f3d;
    border-radius: 2px;
}
</style>