<template>
  <div class="personal-recom">
    <!-- 精品歌单banner -->
    <div class="quality-goods" v-if="hasHighInfo">
      <img class="back-img" :src="highQuaLityInfo.coverImgUrl" />
      <img class="img-80" :src="highQuaLityInfo.coverImgUrl" alt="" />
      <div class="info-wrapper">
        <div>
          <button class="circle-btn">
            <i class="iconfont icon-huiyuanhuangguanguanjun-xianxing"></i>
            精品歌单
          </button>
        </div>
        <div class="mtop-10">
          <span>{{highQuaLityInfo.name }}</span>
        </div>
      </div>
    </div>
    <!-- 标签区域 -->
    <div class="list-tag">
      <!-- 全部标签弹出层容器 -->
      <div class="list-wrapper">
        <el-popover
          placement="bottom-start"
          trigger="manual"
          v-model="visible"
          :popper-options="{
            boundariesElement: '.list-wrapper',
            gpuAcceleration: false,
          }"
        >
          <el-button
            slot="reference"
            class="circle-btn tag-btn"
            @click="visible = !visible"
          >
            {{ listTagBtn }}
            <i class="el-icon-arrow-right"></i>
          </el-button>
          <!-- 全部标签弹出层 -->
          <div class="layer">
            <div class="h-60">全部歌单</div>
            <div class="div-line"></div>
            <div
              class="tag-list"
              v-for="(item, index) in categories"
              :key="index"
            >
              <div class="list-text">
                {{ item }}
              </div>
              <div class="type-name">
                <div
                  v-for="cat in allCats[index]"
                  :key="cat.name"
                  class="span-name"
                >
                  <button
                    @click="changefromAll(cat.name)"
                    class="no-btn"
                    :class="{ isActive: cat.isActive }"
                  >
                    {{ cat.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </el-popover>
        <!--热门歌单标签 -->
        <div class="hot-tag">
          <div class="hottag-list">
            <button
              class="hot-text no-btn"
              v-for="hotTags in hotCats"
              :key="hotTags.id"
              @click="changeCat(hotTags.name)"
              :class="{ isActive: hotTags.isActive }"
            >
              {{ hotTags.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 图片区域 -->
    <ImgList @clickImg="toPlayListDetail" :list="playList" type="playlist">
      <template v-slot="{ item }">
        <div class="text-hidden">
          {{ item.name }}
        </div>
      </template>
    </ImgList>
    <!-- 分页 -->
    <div class="flex-center" style="width: 100%">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        background
        :page-size="50"
        layout="prev, pager, next"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import ImgList from '@/components/list/ImgList.vue'
import {
  getPlayListHighQuality,
  getAllCat,
  getHotCat,
  getPlayList
} from '@/api/api_playlist'
import {
  DEFAULT_OFFSET,
  DEFAULT_INFOPAGE_CURRENTPAGE,
  DEFAULT_INFOPAGE_TOTAL
} from '@/utils/constant'
import {
  PLAYLIST_DEFAULT_BUTTON,
  PLAYLIST_QUERYINFO_LIMIT,
  PLAYLIST_QUERYINFO_OFFSET,
  PLAYLIST_QUERYINFO_ORDER,
  PLAYLIST_DEFAULT_VISIBLE,
  PLAYLIST_DEFAULT_HASHIGHINFO} from './constant'
export default {
  name: 'PlayList',
  props: {
    data: {
      type: Array
    }
  },
  components: {
    ImgList
  },
  data () {
    return {
      listTagBtn: PLAYLIST_DEFAULT_BUTTON,
      visible: PLAYLIST_DEFAULT_VISIBLE,
      allCats: {},
      hotCats: {},
      highQuaLityInfo: {},
      categories: {},
      playList: [],
      hasHighInfo: PLAYLIST_DEFAULT_HASHIGHINFO,
      pageInfo: {
        total: DEFAULT_INFOPAGE_TOTAL,
        currentPage: DEFAULT_INFOPAGE_CURRENTPAGE
      },
      queryInfo: {
        limit: PLAYLIST_QUERYINFO_LIMIT,
        order: PLAYLIST_QUERYINFO_ORDER,
        cat: PLAYLIST_DEFAULT_BUTTON,
        offset: DEFAULT_OFFSET
      }
    }
  },
  created () {
    this.getAllCat()
    this.getHotCat()
  },
  methods: {
    // 获取精品歌单首页封面展示
    async getPlayListHighQuality (cat) {
      const res = await getPlayListHighQuality(1, cat)
      if (res.data.code !== 200) { return }
      if (res.data.playlists.length === 0) {
        this.hasHighInfo = false
        return
      }
      this.highQuaLityInfo = Object.freeze(res.data.playlists[0])
      this.hasHighInfo = true
    },
    // 根据分类获取歌单
    async getPlayListByCat () {
      this.getPlayListHighQuality(this.queryInfo.cat)
      const res = await getPlayList(this.queryInfo)
      if (res.data.code !== 200) { return }
      this.playList = Object.freeze(res.data.playlists)
      this.pageInfo.total = res.data.total
    },
    // 歌单分类
    async getAllCat () {
      const res = await getAllCat()
      if (res.data.code !== 200) { return }
      res.data.sub.forEach((item) => {
        if (!this.allCats[item.category]) {
          this.allCats[item.category] = [item]
        } else {
          this.allCats[item.category].push(item)
        }
      })
      this.categories = res.data.categories
    },
    // 从弹框里访问标签
    changefromAll (cat) {
      this.changeCat(cat)
      this.visible = !this.visible
    },
    // 热门歌单分类
    async getHotCat () {
      const res = await getHotCat()
      if (res.data.code !== 200) { return }
      this.hotCats = res.data.tags
      this.hotCats[0].isActive = true
      this.getPlayListByCat(0)
    },
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      this.queryInfo.offset = (val - 1) * PLAYLIST_QUERYINFO_OFFSET
      document.querySelector('.el-main').scrollTop = 0
      this.getPlayListByCat(this.queryInfo.offset)
    },
    // 更改分类
    changeCat (name) {
      this.queryInfo.offset = 0
      this.pageInfo.currentPage = DEFAULT_INFOPAGE_CURRENTPAGE
      this.queryInfo.cat = name
      this.listTagBtn = name
      this.hotCats.forEach((item) => {
        item.isActive = item.name === name
      })
      this.getPlayListByCat(0)
    },
    toPlayListDetail (id) {
      if (typeof id === 'number') {
        this.$router.push({ path: '/playlistdetail/' + id })
      }
    }
  }
}
</script>

<style scoped>
.back-img {
  z-index: 1;
  width: 100%;
  filter: blur(45px);
  position: absolute;
}
.quality-goods {
  background-color: rgba(0, 0, 0, 0);
  height: 200px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.img-80 {
  margin: 0 20px;
  border-radius: 6px;
  z-index: 2;
}
.info-wrapper {
  z-index: 2;
}
.layer {
  background-color: #ffffff;
  z-index: 99;
  border-radius: 4px;
  font-size: 14px;
  height: 300px;
  overflow-y: scroll;
}
.list-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.layer .h-60 {
  line-height: 60px;
  padding-left: 20px;
}
.list-wrapper {
  display: flex;
  padding: 10px;
}
.type-name {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  line-height: 26px;
  margin: 10px 0px 20px 0;
}
.list-text {
  width: 100px;
  height: 26px;
  color: #cfcfcf;
}
.span-name {
  width: 100px;
  height: 26px;
}
.isActive {
  background-color: #b6d4a4;
  color: #fff;
  border-radius: 13px;
}
.hot-tag {
  display: flex;
}
.isActive {
  background-color: #b6d4a4;
  color: #fff;
  border-radius: 13px;
}
.no-btn {
  cursor: pointer;
  padding: 4px 10px;
}
.backtop {
  right: 20px !important;
  bottom: 79px !important;
}
</style>
