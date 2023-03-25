<template>
  <div class="follow-list">
    <div class="follow-list-wrap">
      <div class="follow-item" v-for="i in list" :key="i.userId">
        <!-- 图片展示 -->
        <div class="img-wrap pointer" @click="clickImg(i)">
          <img class="img img-h" :src="i.avatarUrl" />
        </div>
        <!-- 昵称性别个签 -->
        <div class="content-wrap">
          <div class="content-item pointer text-hidden" @click="clickImg(i)">
            <span>{{ i.nickname }}</span>
            <span class="mleft-10">
              <i
                v-if="i.gender == 1"
                style="color: #3da1d1"
                class="el-icon-male"
              >
              </i>
              <i
                v-else-if="i.gender == 2"
                style="color: #ea5a95"
                class="el-icon-female"
              >
              </i>
            </span>
          </div>
          <div class="content-item text-hidden font-12">{{ i.signature }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FollowList',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => {}
    },
    type: {
      type: Number,
      required: true
    }
  },
  methods: {
    clickImg (item) {
      this.$emit('clickImg', item)
    }
  }
}
</script>

<style scoped>
  .follow-list {
  background-color: #fff;
  }
  .follow-list-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  }
  .img-wrap {
  border: 1px solid #eeeeee;
  width: 100px;
  height: 100px;
  min-width: 100px;
  border-radius: 50%;
  }
  img {
  border-radius: 50%;
  }
  .content-wrap {
  padding-left: 10px;
  }
  .content-item {
  width: 200px;
  }
  .follow-item {
  width: 30%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  }
</style>
