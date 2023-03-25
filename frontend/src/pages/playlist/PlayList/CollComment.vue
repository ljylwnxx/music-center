<template>
  <div class="collcomment">
    <Comment
      :type="2"
      :id="$route.params.id"
      scrollDom=".el-main"
    >
    </Comment>
  </div>
</template>

<script>
import Comment from '@/components/comment/Comment'
export default {
  name: 'CollComment',
  components: {
    Comment
  }
}
</script>

<style scoped>
</style>
