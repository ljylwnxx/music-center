<template>
  <div>
    <span>123</span>
    <div class="hot-wrap mtop-20" v-if="hotList.length !== 0">
          <div class="font-16 font-bold">精彩评论</div>
           <CommentItem
             v-for="item in hotList"
             :key="item.commentId"
             :item="item"
             denty="hot"
             @clickUser="toUserDetail"
           >
           </CommentItem>
      </div>
  </div>
</template>

<script>
import CommentItem from '../../components/comment/CommentItem'
import { getHotComment } from '@/api/api_comment'
export default {
  name: 'HotComment',
  components: { CommentItem },
  data () {
    return {
      hotList: []
    }
  },
  created () {
    this.getHotComment()
  },
  methods: {
    // 热门评论
    async getHotComment () {
      if (this.hotList.length !== 0) { return }
      const res = await getHotComment(this.id, this.type)
      if (res.data.code !== 200) { return }
      this.hotList = res.data.hotComments
    }
  },
  toUserDetail (id) {
    if (typeof id !== 'number') { return }
    if (this.$route.path !== '/userdetail/' + id) { this.$router.push('/userdetail/' + id) }
  }
}
</script>

<style scoped>
</style>
