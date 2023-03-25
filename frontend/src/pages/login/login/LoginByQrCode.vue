<template>
    <div class="login-by-qrcode mtop-20">
      <div class="img-wrap">
        <img class="img img-h" :src="imgData" />
        <div class="btn-refresh pointer" @click="getQrCodeKey" v-show="EcodeType === 800">
          <i class="el-icon-refresh-left"></i>
        </div>
      </div>
      <div class="msg-wrap">状态：{{ message }}
      </div>
    </div>
</template>

<script>
import {getQrCodeKey, createQrCode, checkQrCode} from '@/api/api_login'
export default {
  name: 'LoginByQrCode',
  data () {
    return {
      imgData: '',
      EcodeType: '',
      key: '',
      message: ''
    }
  },
  created () {
    this.getQrCodeKey()
  },
  methods: {
    // 获取二维码
    async getQrCodeKey () {
      const res = await getQrCodeKey()
      if (res.data.code !== 200) {
        return this.$message.error('获取二维码失败')
      }
      this.key = res.data.data.unikey
      this.createQrCode()
    },
    // 生成二维码
    async createQrCode () {
      const res = await createQrCode(this.key)
      if (res.data.code !== 200) {
        return this.$message.error('生成二维码失败')
      }
      this.imgData = res.data.data.qrimg
      this.checkQrCode()
    },
    // 检查二维码状态
    async checkQrCode () {
      const res = await checkQrCode(this.key)
      this.EcodeType = res.data.code
      this.message = res.data.message
      if (res.data.code === 801 || res.data.code === 802) {
        this.timer = window.setTimeout(() => {
          this.checkQrCode()
        }, 5000)
      } else if (res.data.code === 803) {
        this.$message.success('登录成功')
        this.$router.push('/personalrecommend')
      }
    }
  }
}
</script>

<style scoped>
.login-by-qrcode {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
