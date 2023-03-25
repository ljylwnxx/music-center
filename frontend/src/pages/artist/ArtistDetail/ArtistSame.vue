<template>
  <div>
    <div v-if="sameArtistList.length === 0">没有相似歌手</div>
    <ImgList
      v-else
      @clickImg="toArtistDetail"
      :list="sameArtistList"
      type="artist"
    >
      <template v-slot="{ item }">
        <div class="text-hidden">
          {{ item.name }}
        </div>
      </template>
    </ImgList>
  </div>
</template>

<script>
import { getArtistSame } from '@/api/api_artist'
import ImgList from '../../../components/list/ImgList.vue'
export default {
  components: { ImgList },
  name: 'ArtistSame',
  data () {
    return {
      sameArtistList: []
    }
  },
  created () {
    this.getArtistSame()
  },
  methods: {
    // 获取相似歌手
    async getArtistSame () {
      const res = await getArtistSame(this.$route.params.id)
      if (res.data.code !== 200) { return }
      this.sameArtistList = res.data.artists
    },
    toArtistDetail (id) {
      if (typeof id === 'number') this.$router.push('/artistdetail/' + id)
    }
  }
}
</script>

<style>
</style>
