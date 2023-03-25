<template>
  <div>
    <div class="picimages">
      <div
        class="picimages-wrapper"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-delay="300"
      >
        <div
          v-for="item in list"
          :key="item.id"
          class="picimages-item"
        >
          <div class="img-wrap pointer" @click="clickImg(item.id)">
            <img
              v-lazy="picUrl(item)"
              class="image image-radius-8 image-border"
            />
            <div class="video-playcount font-12" v-if="item.playCount || item.playcount">
              <i class="iconfont icon-24gl-play"></i>
              {{ item.playCount || item.playcount | countFormat }}
            </div>
            <div v-if="showPlayBtn" class="play-btn pointer">
              <i class="iconfont icon-bofang"></i>
            </div>
          </div>
          <slot :item="item"></slot>
        </div>
      </div>
    </div>
    <div class="loading-wrap" v-show="isLoading">
      <i class="el-icon-loading"></i>加载中
    </div>
    <div class="loading-wrap" v-if="noMore">没有更多了</div>
  </div>
</template>

<script>
export default {
  name: 'ImgList',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    infinite: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /* 无限滚动禁用 */
    disabled () {
      return !this.infinite || !this.hasMore || this.isLoading
    },
    showPlayBtn () {
      return this.type === 'playlist' || this.type === 'album'
    },
    noMore () {
      return this.infinite && !this.hasMore
    }
  },
  methods: {
    /* 点击图片的回调 */
    clickImg (id) {
      this.$emit('clickImg', id)
    },
    picUrl (item) {
      if (this.type === 'playlist') {
        return `${item.picUrl ? item.picUrl : item.coverImgUrl}?param=300y300`
      } else if (this.type === 'artist') {
        return `${item.img1v1Url}?param=300y300`
      } else if (this.type === 'album') {
        return `${item.picUrl}?param=300y300`
      }
    },
    load () {
      if (this.hasMore) {
        this.$emit('loadMore', this.list.length)
      }
    }
  }
}
</script>

<style>
.picimages-wrapper {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
.picimages-item {
  margin-bottom: 30px;
  width: 18%;
  margin-right: 2%;
}
.img-wrap {
  position: relative;
}
.video-playcount {
    color: #ffffff;
    position: absolute;
    right: 10px;
    top: 10px;
    text-shadow: 0 0 2px #000;
}
.video-playcount .iconfont {
      font-size: 12px;
}
.play-btn {
    position: absolute;
    right: 15px;
    bottom: 15px;
    background-color: #fbf7f6;
    color: #94ae73;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s;
}
.play-btn i {
      font-size: 16px;
}
.img-wrap:hover .play-btn {
    opacity: 1;
}
.loading-wrap {
  font-size: 16px;
  height: 50px;
  text-align: center;
}
</style>
