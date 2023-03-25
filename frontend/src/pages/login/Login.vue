<template>
  <div class="login">
      <div class="login-container">
      <div class="login-wrapper">
        <span class="title">{{ activeName }}登录</span>
        <div class="type-btn-wrap type-btn-wrap_active">
          <button
              v-for="(item, index) in Menu"
              :key="index"
              @click="changeType(item.name)"
              class="no-btn login-select-btn"
              >
            {{ item.name }}
          </button>
        </div>
        <component :is="currenComponent" ref="loginRef"></component>
      </div>
    </div>
  </div>
</template>

<script>
import LoginByPhone from './login/LoginByPhone'
import LoginByVerificationCode from './login/LoginByVerificationCode'
import LoginByQrCode from './login/LoginByQrCode'
export default {
  name: 'Login',
  components: { LoginByPhone, LoginByVerificationCode, LoginByQrCode },
  data () {
    return {
      currenComponent: 'LoginByPhone',
      activeName: '手机号',
      Menu: [
        {
          name: '手机号',
          component: LoginByPhone
        },
        {
          name: '二维码',
          component: LoginByQrCode

        },
        {
          name: '验证码',
          component: LoginByVerificationCode
        }
      ]
    }
  },
  watch: {
    activeName: function () {
      this.currenComponent = this.Menu.find(item => item.name === this.activeName).component
    }
  },
  beforeDestroy () {
    this.$store.dispatch('getAcount')
  },
  methods: {
    changeType (index) {
      this.activeName = index
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.login-container {
  min-height: 100vh;
  background-image: url('../../assets/images/bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrapper {
  width: 500px;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 65px 55px 54px 55px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #423d3d;
}
.type-btn-wrap {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}
.login-select-btn {
  font-size: 16px;
}
</style>
