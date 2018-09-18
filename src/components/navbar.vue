<template>
  <nav class="site-navbar">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">yzt-admin</a>
      </h1>
    </div>
    <div class="site-navbar__body clear">
      <ul class="site-navbar__menu">
        <li>修改密码</li>
        <li @click="logout">退出</li>
      </ul>
      <div class="site-navbar__title">{{username}}</div>
    </div>
  </nav>
</template>

<script>
import {mapMutations} from 'vuex'
import {getStore} from '../config/mUtils'
export default {
  name: 'navbar',
  data () {
    return {
      username: null
    }
  },
  computed: {
    userInfo: {
      get () { return this.$store.state.userInfo }
    }
  },
  mounted () {
    this.username = getStore('username')
  },
  methods: {
    ...mapMutations([
      'LOGOUT'
    ]),
    logout () {
      this.LOGOUT()
      this.$router.push('login')
    }
  }
}
</script>

<style scoped lang="scss">
  .site-navbar{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
    height: 50px;
    background:#17b3a3;
    &__header {
      position: relative;
      float: left;
      width: 230px;
      height: 50px;
      overflow: hidden;
    }
    &__brand {
      display: table-cell;
      vertical-align: middle;
      width: 230px;
      height: 50px;
      margin: 0;
      line-height: 50px;
      font-size: 20px;
      text-align: center;
      text-transform: uppercase;
      white-space: nowrap;
      color: #fff;
      &-lg{
        margin: 0 5px;
        color: #fff;
        &:focus,
        &:hover {
          color: #fff;
          text-decoration: none;
        }
      }
    }
    &__body{
      position: relative;
      margin-left: 230px;
      padding-right: 15px;
      background: #fff;
      .site-navbar__title{
        float: right;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        color: #ef4136;
        margin-right: 10px;
      }
    }
    &__menu{
      float: right;
      background-color: transparent;
      list-style: none;
      border-bottom: 0;
      li {
        height: 50px;
        line-height: 50px;
        margin-left: 10px;
        font-size: 14px;
        float: left;
        cursor: pointer;
      }
    }
  }
</style>
