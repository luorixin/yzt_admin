<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">yzt_admin</h2>
        </div>
        <div class="login-main" v-if="showLogin">
          <form class="login-form">
            <section class="input_container">
              <input type="text" autocomplete="off" placeholder="账号" name="phone" maxlength="11" v-model="username">
            </section>
            <section class="input_container">
              <input v-if="!showPassword" autocomplete="off"  type="password" placeholder="密码"  v-model="password">
              <input v-else type="text" autocomplete="off"  placeholder="密码"  v-model="password">
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
          <button class="btn btn-primary" @click="mobileLogin">登录</button>
          <p class="tip" v-show="showAlert">{{alertText}}</p>
        </div>
        <div class="login-main"  v-else>
          <section class="login-has">
            <p>系统检测到已有账号 {{username}} 登录。</p>
            <p><router-link  tag='span' to="home">登录</router-link> | <span @click="toggleLogin">更换账号</span></p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import {getcaptchas, login, getUser} from '../../service/getData'
import {getStore} from '../../config/mUtils'
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
      showLogin: true,
      showAlert: null,
      alertText: null
    }
  },
  mounted () {
    this.username = getStore('username')
    if (this.username) {
      this.showLogin = false
    }
    this.getCaptchaCode()
  },
  computed: {
    ...mapState(['userInfo']),
    // 判断手机号码
    rightPhoneNumber: function () {
      return true
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
    toggleLogin () {
      this.showLogin = !this.showLogin
      this.username = ''
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
        let info = await getUser(this.username)
        if (info.meta.code === 0) {
          this.RECORD_USERINFO(info.data.items[0])
          this.$router.push('home')
        } else {
          this.showAlert = true
          this.alertText = info.meta.message
        }
      } else {
        this.showAlert = true
        this.alertText = result.meta.message
      }
    }
  },
  watch: {
    userInfo: function (newValue) {
      console.log(newValue)
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
    background-color: #324057;
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
      background: #324057;
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
        margin: auto;
        color: #333;
        text-align: center;
        .brand-info__text {
          margin:  0 0 22px 0;
          font-size: 34px;
          font-weight: bold;
          text-transform : uppercase;
          color: #fff;
        }
        .brand-info__intro {
          margin: 10px 0;
          color: #fff;
          font-size: 16px;
          line-height: 1.58;
          opacity: .6;
        }
      }
      .login-main {
        width: 360px;
        height: 250px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -125px;
        margin-left: -180px;
        padding: 25px;
        @include borderRadius(5px);
        text-align: center;
        background-color: #fff;
        .login-form{
          background: #fff;
          .input_container {
            display: flex;
            justify-content: space-between;
            height: 40px;
            border: 1px solid #f1f1f1;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            margin-bottom: 10px;
            &:hover {
              border-color: #8391a5;
            }
            &:focus {
              border-color: #20a0ff;
            }
            input{
              line-height: 36px;
              font-size: 12px;
              height: 36px;
              width: 100%;
              padding: 3px 10px;
            }
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
            .img_change_img{
              display: flex;
              align-items: center;
              img{
                @include wh(50px, 30px);
                margin-right: 10px;
              }
              .change_img{
                display: flex;
                flex-direction: 'column';
                flex-wrap: wrap;
                width: 40px;
                justify-content: center;
                p{
                  @include sc(10px, #666);
                }
                p:nth-of-type(2){
                  color: #3b95e9;
                  margin-top: 1px;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .btn {
          width: 100%;
          font-size: 16px;
        }
        .tip {
          @include sc(12px, #ef4136);
          margin-top: 3px;
        }
        .login-has {
          margin-top: 80px;
          span{
            color: #ef4136;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
