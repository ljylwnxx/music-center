<template>
  <div class="verification-code mtop-20">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :label-position="labelPosition"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="ruleForm.phone"
          placeholder="请输入手机号"
          prefix-icon="el-icon-mobile"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-col :span="14">
          <el-input
            v-model="ruleForm.captcha"
            prefix-icon="el-icon-key"
            placeholder="请输入验证码"
            clearable
          >
          </el-input>
        </el-col>
        <el-col :offset="1" :span="4">
          <el-button :disabled="!show" @click="getVerificationCode">
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{ count }}s</span>
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <div>
        <el-button type="primary" @click="login('ruleForm')">
         登录
        </el-button>
        <el-button @click="resetForm('ruleForm')">
         重置
        </el-button>
    </div>
  </div>
</template>

<script>
import { getVerificationCode, testVerificationCode } from '@/api/api_login'
export default {
  name: 'LoginByVerificationCode',
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (
          this.ruleForm.phone === '' ||
          this.ruleForm.phone.length <= 10 ||
          !reg.test(this.ruleForm.phone)
        ) {
          callback(new Error('手机号错误'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      labelPosition: 'left',
      ruleForm: {
        phone: '',
        captcha: ''
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      count: '',
      show: 'false'
    }
  },
  methods: {
    // 获取验证码
    async getVerificationCode () {
      if (this.ruleForm.phone === '') {
        return this.message.error('请输入手机号码')
      }
      let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!reg.test(this.ruleForm.phone)) {
        return this.message.error('手机号码输入错误')
      }
      if (!this.timer) {
        this.count = 60
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      const res = await getVerificationCode(this.ruleForm.phone)
      if (res.data.data !== true) {
        this.show = true
        clearInterval(this.timer)
        return this.$message.error('当天发送验证码的条数超过限制')
      }
      if (res.data.code !== 200) {
        return this.$message.error('发送失败，请检查手机号')
      } else {
        this.$message.success('发送成功！请查看手机信息')
      }
    },
    // 验证验证码
    async login (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请输入正确信息')
        }
        const res = await testVerificationCode(this.ruleForm)
        console.log(res, 'res')
        if (res.data.code !== 200) {
          return this.$message.error('验证失败,请检查手机号和验证码')
        } else {
          this.$message.success('登录成功')
          this.$router.push('/personalrecommend')
        }
      })
    },
    // 清空
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.verification-code {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
