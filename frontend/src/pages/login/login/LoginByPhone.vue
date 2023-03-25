<template>
  <div class="phone mtop-20">
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
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          prefix-icon="el-icon-key"
          placeholder="请输入密码"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
           type="password"
           v-model="ruleForm.checkPass"
           prefix-icon="el-icon-key"
           placeholder="请确认密码"
           clearable
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="phone-bottom-btn">
        <el-button type="primary" @click="doPhoneLogin('ruleForm')"
          >登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
    <div class="msg-notification">注：因存在验证,密码登录暂时不要使用</div>
  </div>
</template>

<script>
import { doPhoneLogin } from '@/api/api_login'
import md5 from 'js-md5'
export default {
  name: 'LoginByPhone',
  data () {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (this.ruleForm.phone === '' || this.ruleForm.phone.length <= 10 || !reg.test(this.ruleForm.phone)) {
          callback(new Error('手机号错误'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        let reg1 = /^[\w_-]{6,16}$/
        if (this.ruleForm.pass !== '' || !reg1.test(this.ruleForm.pass)) {
          callback(new Error('密码格式不正确'))
        } else {
          callback()
        }
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'left',
      ruleForm: {
        phone: '',
        pass: '',
        checkPass: '',
        md5_password: ''
      },
      rules: {
        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    doPhoneLogin (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请输入正确信息')
        }
        this.ruleForm.md5_password = md5(this.ruleForm.pass)
        const res = await doPhoneLogin(this.ruleForm)
        if (res.data.code !== 200) {
          return this.$message.error('登录失败,请检查手机号和密码')
        } else {
          this.$message.success('登录成功')
          this.$router.push('/personalrecommend')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.phone {
  display: flex;
  flex-direction: column;
  align-items: center
}
.msg-notification{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.25rem;
  margin-top: 10px;
}
</style>
