<template>
  <div class="artist-intro">
       <div v-if="introduction.length === 0">
       没有相似歌手
       </div>
       <div
       v-else
       class="mtop-20"
       v-for="text in introduction" :key="text.ti">
         <h2 class="font-bold font-14">{{text.ti}}</h2>
         <div
         class="my-pre font-14"
         v-for="(desc,index) in text.txt" :key="index"
         >
           <p>{{desc}}</p>
         </div>
       </div>
  </div>
</template>

<script>
import { getArtistIntro } from '@/api/api_artist'
export default {
  name: 'ArtistIntro',
  data () {
    return {
      introduction: []
    }
  },
  created () {
    this.getIntro()
  },
  methods: {
    // 获取歌手描述
    async  getIntro () {
      const res = await getArtistIntro(this.$route.params.id)
      res.data.introduction.forEach(item => {
        item.txt = item.txt.split('\n')
      })
      if (res.data.briefDesc) {
        res.data.introduction.unshift({
          ti: '个人简介',
          txt: [res.data.briefDesc]
        })
      }
      this.introduction = Object.freeze(res.data.introduction)
    }
  }
}
</script>

<style scoped>
.my-pre {
  text-indent: 2em;
  line-height: 2;
  width: 100%;
}
.my-pre p {
    color: #676767;
  }
</style>
