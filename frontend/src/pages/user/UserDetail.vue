<template>
  <div class="user-detail mtop-20">
    <!-- 用户相关信息 -->
    <div class="user-info">
      <!-- 图片展示 -->
      <div class="user-img-wrapper">
        <img class="img image-radius-8 image-border" :src="info.avatarUrl" />
      </div>
      <!-- 用户信息相关 -->
      <div class="info-wrap mleft-20" >
        <!-- 昵称 -->
       <div class="font-24 font-bold">{{ info.nickname }}</div>
       <!-- 相关按钮 -->
        <div class="info-btn">
            <div>
              <!-- 等级 -->
                 <el-tag size="medium" effect="plain" class="font-12 level-wrap">Lv.{{ level }}</el-tag>
                 <!-- 性别 -->
                 <span class="font-14 sex-wrap">
                    <i
                        v-if="info.gender == 1"
                        style="color: #3da1d1"
                        class="el-icon-male"
                    >
                    </i>
                    <i
                        v-else-if="info.gender == 2"
                        style="color: #ea5a95"
                        class="el-icon-female"
                    >
                    </i>
                 </span>
            </div>
            <!-- 编辑个人信息 -->
            <div v-if="this.$store.state.isLogin && this.$store.state.profile.userId === userId">
                <el-button
                size="small"
                round
                plain
                class="btn btn-white"
                @click="UserEdit"
                >
                 <i class="el-icon-edit"></i>编辑个人信息
                </el-button>
            </div>
            <div v-else>
              <!-- 发私信 -->
              <el-button
                size="small"
                round
                plain
                >
                 <i class="el-icon-message"></i>发私信
              </el-button>
              <!-- 关注 -->
              <el-button
                size="small"
                round
                plain
                class="btn btn-white mleft-10"
                @click="follow"
              >
                  <template v-if="!followed">
                  <i class="el-icon-plus"></i> 关注
                  </template>
                  <template v-else>
                  <i class="el-icon-check"></i> 已关注
                  </template>
              </el-button>
          </div>
        </div>
        <!-- 分割线 -->
        <div class="div-line"></div>
        <!-- 动态，关注，粉丝按钮 -->
        <div class="info-num mtop-10">
          <!-- 动态 -->
          <div class="num-item">
            <el-tag type="danger" class="item-text font-12">动态</el-tag>
            <el-tag type="danger" effect="plain" class="font-20 font-bold" >{{ info.eventCount }}</el-tag>
          </div>
          <!-- 关注量 -->
          <div class="num-item">
            <el-tag type="warning" class="item-text font-12">关注</el-tag>
            <el-tag type="warning" effect="plain" class="font-20 font-bold" >{{ info.follows }}</el-tag>
          </div>
          <!-- 粉丝数 -->
          <div class="num-item">
            <el-tag type="success" class="item-text font-12">粉丝</el-tag>
            <el-tag type="success" effect="plain" class="font-20 font-bold" >{{ info.followeds }}</el-tag>
          </div>
        </div>
        <!-- 所在地区 -->
        <div class="desc-item mtop-10 font-14" v-if="this.region">
          所在地区:{{region}}
        </div>
        <!-- 个人介绍 -->
        <el-collapse accordion>
          <el-collapse-item class="brief">
            <template slot="title">
              个人介绍：
              <i class="header-icon el-icon-info"></i>
            </template>
            <div style="max-width: 1000px">
              {{ info.signature || "暂无简介" }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 菜单tab -->
    <div class="menu-wrap mtop-20">
      <AlbumTabsMenu
        :menuList="['创建的歌单', '收藏的歌单']"
        @menuClick="handMenuClick"
      >
      </AlbumTabsMenu>
    </div>
    <!-- 创建歌单 -->
    <div class="mtop-20" v-show="showtab === 1">
      <ImgList @clickImg="toPlayListDetail" :list="creList" type="playlist">
        <template v-slot="{ item }">
          <div class="text-hidden">
            {{ item.name }}
          </div>
        </template>
      </ImgList>
    </div>
    <!-- 收藏歌单 -->
    <div class="mtop-20" v-show="showtab === 2">
    <div v-if="subList.length !== 0">
       <ImgList @clickImg="toPlayListDetail" :list="subList" type="playlist">
        <template v-slot="{ item }">
          <div class="text-hidden">
            {{ item.name }}
          </div>
        </template>
      </ImgList>
    </div>
      <div v-else>该用户没有收藏的歌单或用户设置了隐私模式</div>
    </div>
  </div>
</template>

<script>
import {
  getUserDetail,
  getUserPlayList,
  follow
} from '@/api/api_user'
import { httpGet } from '@/utils/axios.js'
import AlbumTabsMenu from '../../components/menu/AlbumTabsMenu'
import ImgList from '../../components/list/ImgList'
export default {
  name: 'PlayListDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    ImgList,
    AlbumTabsMenu
  },
  data () {
    return {
      info: {},
      list: [],
      level: 0,
      followed: false,
      offset: 0,
      showtab: 1,
      region: '未知'
    }
  },
  computed: {
    sex () {
      return this.info.gender === 1 ? '男' : '女'
    },
    userId () {
      return this.info.userId
    },
    creList () {
      return this.list.filter((item) => item.userId === this.userId)
    },
    subList () {
      return this.list.filter((item) => item.userId !== this.userId)
    }
  },
  watch: {
    id () {
      this.list = []
      this.getUserDetail()
      this.getUserPlayList()
    }
  },
  created () {
    this.getUserDetail()
    this.getUserPlayList()
  },

  methods: {
    // 获取用户详情
    async getUserDetail () {
      const res = await getUserDetail(this.id)
      if (res.data.code !== 200) { return }
      this.info = Object.freeze(res.data.profile)
      this.city = this.info.city
      this.level = res.data.level
      this.followed = res.data.profile.followed
      this.getCityInfo()
    },
    // 获取用户歌单
    async getUserPlayList () {
      const res = await getUserPlayList(this.id, this.offset)
      if (res.data.code !== 200) { return }
      if (this.list.length === 0) {
        this.list = res.data.playlist
      } else {
        this.list.push(...res.data.playlist)
      }
      if (res.data.more) {
        this.offset += 30
        this.getUserPlayList()
      }
    },
    // 关注/取消关注用户
    async follow () {
      if (!this.$store.state.isLogin) { return this.$message.warning('需要登录') }
      let cancel = false
      if (this.followed) {
        await this.$confirm('绑定手机号或短信验证成功后，可进行下一步操作哦~', {
          distinguishCancelAndClose: true,
          confirmButtonText: '去验证',
          cancelButtonText: '取消'
        })
          .then(() => {
            cancel = false
          })
          .catch((action) => {
            cancel = true
            this.$message({
              type: 'info',
              message: action === 'cancel' ? '取消' : '出错'
            })
          })
      }
      if (cancel) return
      let followObj = {
        id: this.info.userId,
        t: this.followed ? 0 : 1
      }
      const res = await follow(followObj)
      if (res.data.code !== 200) {
        return this.$message.error('操作失败') 
      }
      this.followed = !this.followed
      this.$message.success(`${this.followed ? '关注' : '取关'}成功`)     
    },
    // 获取用户城市信息
    getCityInfo () {
      httpGet('/static/city.json')
        .then(res => {
          let data = res.data
          let province = data.find(item => item.value === (this.info.province).toString()) || {}
          let city = (province.children || []).find(item => item.value === JSON.stringify(this.info.city))
          this.region = province && city ? province.label + city.label : '未知'
        })
    },
    handMenuClick (index) {
      this.showtab = index + 1
    },
    toPlayListDetail (id) {
      this.$router.push({ path: '/playlistdetail/' + id })
    },
    UserEdit () {
      this.$router.push('/useredit')
    }
  }
}
</script>

<style scoped>
.user-detail {
  margin-left: 50px;
}
.user-info {
  display: flex;
}
.user-img-wrapper img{
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.info-wrap {
    width: 70%;
}
.info-btn {
    display: flex;
    align-items: center;
    justify-content: space-between
}
.info-num {
    display: flex;
}
.num-item {
    display: flex;
   margin-left: 10px;
}
.num-item .item-text {
    margin-right: 10px;
}
.div-line {
    margin-top: 10px;
}
</style>
