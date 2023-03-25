<template>
  <div class="user-edit mtop-20">
    <span class="font-20 font-bold">编辑个人信息</span>
    <div class="form-info mtop-20">
      <!-- 个人信息 -->
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="昵称:">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="介绍:">
          <el-input type="textarea" v-model="form.signature"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio-group v-model="form.gender">
            <el-radio-button :label="0">保密</el-radio-button>
            <el-radio-button :label="1">男</el-radio-button>
            <el-radio-button :label="2">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日:">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birthday"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitUserInfo">保存</el-button>
          <el-button @click="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- 修改头像 -->
      <div class="edit-img-container">
        <ImgCut btnText="修改头像" :imgUrl="imgUrl" @upload="upload"></ImgCut>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { uploadAvatar } from '@/utils/axios'
import { updatedUserInfo } from '@/api/api_user'
import ImgCut from '../../components/imgcut/ImgCut'

export default {
  name: 'UserEdit',
  components: {
    ImgCut
  },
  data () {
    return {
      form: {
        nickname: '',
        gender: 0,
        birthday: '',
        signature: ''
      }
    }
  },
  computed: {
    ...mapState(['profile']),
    imgUrl () {
      return this.profile.avatarUrl ? this.profile.avatarUrl : ''
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    // 获取个人信息
    getInfo () {
      if (Object.keys(this.profile).length !== 0) {
        this.form.gender = this.profile.gender
        this.form.signature = this.profile.signature
        this.form.nickname = this.profile.nickname
        this.form.birthday = new Date(this.profile.birthday)
      } else {
        setTimeout(() => {
          this.getInfo()
        }, 200)
      }
    },
    // 上传头像
    async upload ({ file, imgSize }) {
      var formData = new FormData()
      formData.append('imgFile', file)
      const imgObj = {
        imgSize: imgSize.width,
        data: formData
      }
      const res = await uploadAvatar(imgObj)
      if (res.code !== 200) return this.$message.error('上传失败')
      this.$message.success('上传成功')
      this.$store.dispatch('getAcount')
    },
    // 更新用户信息
    async onSubmitUserInfo () {
      const obj = {
        nickname: this.form.nickname,
        signature: this.form.signature,
        gender: this.form.gender,
        birthday: this.form.birthday.getTime()
      }
      const res = await updatedUserInfo(obj)
      if (res.data.code !== 200) {
        return this.$message.error('更新失败')
      }
      this.$message.success('更新成功')
      this.$store.dispatch('getAcount')
    }
  }
}
</script>

<style scoped>
.user-edit {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  align-items: center;
}
.form-info {
  display: flex;
}
.avatar-uploader {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
  }
.avatar-uploader-icon {
  font-size: 0;
  color: #fff;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.el-icon-plus{
  font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
