<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">yzt_admin</h2>
          <p class="brand-info__intro">一站通管理后台</p>
        </div>
        <div class="login-main">
          <form class="login-form">
            <section class="input_container">
              <input type="text" placeholder="账号" name="phone" maxlength="11" v-model="username">
            </section>
            <section class="input_container">
              <input v-if="!showPassword" type="password" placeholder="密码"  v-model="password">
              <input v-else type="text" placeholder="密码"  v-model="password">
              <div class="button_switch" :class="{change_to_text: showPassword}">
                <div class="circle_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
                <span>abc</span>
                <span>...</span>
              </div>
            </section>
            <section class="input_container captcha_code_container">
              <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
              <div class="img_change_img">
                <img v-show="captchaCodeImg" :src="captchaCodeImg">
                <div class="change_img" @click="getCaptchaCode">
                  <p>看不清</p>
                  <p>换一张</p>
                </div>
              </div>
            </section>
          </form>
          <button class="login_container" @click="mobileLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getcaptchas, login, getUser} from '../../service/getData'
export default {
  name: 'login',
  data () {
    return {
      showPassword: false,
      username: '',
      password: '',
      validate_token: null,
      captchaCodeImg: '',
      codeNumber: null,
      showAlert: null,
      alertText: null
    }
  },
  created () {
    this.getCaptchaCode()
  },
  computed: {
    // 判断手机号码
    rightPhoneNumber: function () {
      return /^1\d{10}$/gi.test(this.username)
    }
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO'
    ]),
    // 是否显示密码
    changePassWordType () {
      this.showPassword = !this.showPassword
    },
    async getCaptchaCode () {
      try {
        let res = await getcaptchas(60, 60)
        this.captchaCodeImg = res
      } catch (e) {
        console.log(e)
      }
    },
    async mobileLogin () {
      if (!this.username) {
        this.showAlert = true
        this.alertText = '请输入手机号/邮箱/用户名'
        return
      } else if (!this.password) {
        this.showAlert = true
        this.alertText = '请输入密码'
        return
      }
      // 用户名登录
      const result = await login(this.username, this.password)
      console.log(result)
      if (result.meta.code === 0) {
        this.$cookie.set('token', result.data.token)
        this.userInfo = await getUser(this.username)
        this.RECORD_USERINFO(this.userInfo)
      } else {
        this.showAlert = true
        this.alertText = result.meta.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/index";
  .site-wrapper.site-page--login{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    overflow: hidden;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: '';
      /*background-image: url('../../assets/img/login_bg.jpg');*/
      /*background-size: cover;*/
      background: #fff;
    }
  }
  .site-content__wrapper{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
    .site-content {
      min-height: 100%;
      padding: 30px 30px 30px 30px;
      .brand-info {
        margin: 30px auto 0 auto;
        color: #333;
        text-align: center;
        .brand-info__text {
          margin:  0 0 22px 0;
          font-size: 48px;
          font-weight: 400;
          text-transform : uppercase;
        }
        .brand-info__intro {
          margin: 10px 0;
          font-size: 16px;
          line-height: 1.58;
          opacity: .6;
        }
      }
      .login-main {
        margin: 30px auto;
        .login-form{
          background: #fff;
          .input_container {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #f1f1f1;
            button{
              padding: 10px;
              border: 1px;
              border-radius: 3px;
            }
            .right_phone_number{
              background-color: #4cd964;
            }
          }
          .captcha_code_container{
            height: 30px;
            .img_change_img{
              display: flex;
              align-items: center;
              img{
                @include wh(30px, 30px);
                margin-right: 10px;
              }
              .change_img{
                display: flex;
                flex-direction: 'column';
                flex-wrap: wrap;
                width: 2rem;
                justify-content: center;
                p{
                  @include sc(.55rem, #666);
                }
                p:nth-of-type(2){
                  color: #3b95e9;
                  margin-top: .2rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
