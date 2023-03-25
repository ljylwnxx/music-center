<template>
  <div class="video">
    <!-- 全部视频及热门视频按钮 -->
    <div class="list-tag mtop-10">
      <!-- 所有标签弹出框 -->
      <div class="layer-wrapper">
        <el-popover
          placement="bottom-start"
          trigger="manual"
          v-model="visible"
          :popper-options="{
            boundariesElement: '.layer-wrapper',
            gpuAcceleration: false,
          }"
        >
          <el-button
            slot="reference"
            class="circle-btn tag-btn"
            @click="visible = !visible"
          >
            {{ videoTagBtn }}
            <i class="el-icon-arrow-right"></i>
          </el-button>
          <!-- 全部视频按钮 -->
          <div class="layer">
            <div class="h-60">
              <button
                class="no-btn"
                :class="{ isActive: currenTagId === 0 }"
                @click="selectAll"
              >
                全部视频
              </button>
            </div>
            <div class="div-line"></div>
            <!-- 所有标签 -->
            <div class="tag-list">
              <div
                class="list-text"
                v-for="(a, index) in allTagList"
                :key="a.id"
              >
                <button
                  @click="selectAllTag(a.id, index)"
                  class="no-btn"
                  :class="{ isActive: a.selectTab }"
                >
                  {{ a.name }}
                </button>
              </div>
            </div>
          </div>
        </el-popover>
      </div>
      <!-- 热门标签 -->
      <div class="hot-tag mtop-10">
        <div
          class="hot-tag-name mright-10 font-12"
          v-for="(h, index) in hotTagList"
          :key="h.id"
          :class="{ isActive: h.selectTab }"
          @click="selectHotTag(h.id, index)"
        >
          {{ h.name }}
        </div>
      </div>
    </div>
    <!-- 视频列表 -->
    <VideoList
      @loadMore="load"
      :disabled="disabled"
      :type="listType"
      :list="videoList"
    >
    </VideoList>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import {
  getAllVideo,
  getVideoByTags,
  getVideoAllTag,
  getVideoHotTag
} from '@/api/api_video'
import {
  VIDEO_DEFAULT_VISIBLE,
  VIDEO_DEFAULT_TAGBTN,
  VIDEO_DEFAULT_VIDEOTYPE,
  VIDEO_DEFAULT_HASMORE,
  VIDEO_DEFAULT_ISLOADING,
  VIDEO_MODE_FIRST,
  VIDEO_DEFAULT_OFFSET,
  VIDEO_CURREN_TAGID
} from '../../constant.js'
import VideoList from './VideoList'
export default {
  name: 'Video',
  components: { VideoList },
  data () {
    return {
      allTagList: [],
      hotTagList: [],
      videoList: [],
      visible: VIDEO_DEFAULT_VISIBLE,
      videoTagBtn: VIDEO_DEFAULT_TAGBTN,
      listType: VIDEO_DEFAULT_VIDEOTYPE,
      hasMore: VIDEO_DEFAULT_HASMORE,
      isLoading: VIDEO_DEFAULT_ISLOADING,
      mode: VIDEO_MODE_FIRST,
      currenTagId: VIDEO_CURREN_TAGID,
      offset: VIDEO_DEFAULT_OFFSET
    }
  },
  computed: {
    disabled () {
      return this.loading || !this.hasMore
    }
  },
  created () {
    this.getVideo()
    this.getVideoHotTag()
    this.getVideoAllTag()
  },
  methods: {
    // 获取视频的热门标签
    async getVideoHotTag () {
      const res = await getVideoHotTag()
      if (res.data.code !== 200) {
        return
      }
      this.hotTagList = res.data.data
    },
    // 获取视频的全部标签
    async getVideoAllTag () {
      if (this.allTagList.length !== 0) { return }
      const res = await getVideoAllTag()
      if (res.data.code !== 200) {
        return
      }
      this.allTagList = res.data.data
      this.allTagList.forEach((item) => {
        item.selectTab = item.id === this.currenTagId
      })
    },
    // 获取全部视频列表
    async getVideo () {
      if (this.isLoading) { return }
      this.isLoading = true
      if (this.mode === VIDEO_MODE_FIRST) { this.offset = VIDEO_DEFAULT_OFFSET }
      const res = this.currenTagId === 0 ? await getAllVideo(this.offset) : await getVideoByTags(this.currenTagId, this.offset)
      if (res.data.code !== 200) {
        return this.$message.info('操作频繁，请稍候再试')
      }
      if (this.mode === VIDEO_MODE_FIRST) {
        this.videoList = res.data.datas
        this.hasMore = res.data.hasmore
        if (this.videoList.length === 0) {
          this.$message.error('暂时没有推荐视频，请稍后再试')
        }
      } else {
        this.videoList.push(...res.data.datas)
        this.hasMore = res.data.hasmore
      }
      this.isLoading = false
    },
    // 从弹出框里访问标签
    selectAllTag (id, index) {
      id === 1000 ? (this.listType = 'mv') : (this.listType = 'video')
      this.allTagList.forEach((item) => {
        item.selectTab = false
      })
      this.hotTagList.forEach((item) => {
        item.selectTab = false
        item.selectTab = item.id === id
      })
      this.allTagList[index].selectTab = true
      this.videoTagBtn = this.allTagList[index].name
      this.visible = !this.visible
      this.currenTagId = id
      this.mode = VIDEO_MODE_FIRST
      this.getVideo()
    },
    // 从热门标签访问标签
    selectHotTag (id, index) {
      id === 1000 ? (this.listType = 'mv') : (this.listType = 'video')
      this.hotTagList.forEach((item) => {
        item.selectTab = false
      })
      this.hotTagList[index].selectTab = true
      this.videoTagBtn = this.hotTagList[index].name
      this.currenTagId = id
      this.mode = VIDEO_MODE_FIRST
      this.getVideo()
    },
    // 从弹出框里访问全部视频标签
    selectAll () {
      this.videoTagBtn = '全部视频'
      this.visible = !this.visible
      this.currenTagId = 0
      this.hotTagList.forEach((item) => {
        item.selectTab = false
      })
      this.mode = VIDEO_MODE_FIRST
      this.getVideo()
    },
    load (size) {
      if (this.isLoading) {
        return
      }
      if (!this.hasMore) {
        return this.$message.info('已经到底了')
      }
      this.offset = size + 8
      this.mode = 'more'
      this.getVideo()
    }
  }
}
</script>

<style scoped>
.layer {
  background-color: #ffffff;
  z-index: 99;
  border-radius: 4px;
  font-size: 14px;
  height: 400px;
  overflow-y: scroll;
}
.list-tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  margin: 0 auto;
}
.list-text {
  width: 100px;
  height: 26px;
  text-align: center;
  margin: 16px 0;
}
.layer .h-60 {
  line-height: 60px;
  padding-left: 20px;
}
.hot-tag {
  display: flex;
  height: 26px;
  line-height: 26px;
  padding: 0 10px;
  cursor: pointer;
}
.hot-tag-name {
  height: 26px;
  line-height: 26px;
  padding: 0 10px;
  cursor: pointer;
}
.picimages {
  display: flex;
  flex-wrap: wrap;
}
.img-item-li {
  width: 250px;
  height: 210px;
  padding: 10px 20px;
}
.isActive {
  background-color: #b6d4a4;
  color: #fff;
  border-radius: 13px;
}
.no-btn {
  width: 100px;
  cursor: pointer;
  padding: 6px 10px;
}
.backtop {
  right: 20px !important;
  bottom: 79px !important;
}
</style>
