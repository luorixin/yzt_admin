<template>
  <aside class="sidebar">
    <div class="sidebar__inner">
      <ul class="sidebar__menu">
        <li :class="{'menu-item':!menu.subMenu.length,'submenu-item':menu.subMenu.length}" v-for="menu in menus" :key="menu.key" @click.prevent="changeRoute(menu)">
          <template v-if="!menu.subMenu.length">
            <font-awesome-icon :icon="menu.icon" />
            <span>{{menu.name}}</span>
          </template>
          <template v-else>
            <div class="submenu-title">
              <font-awesome-icon :icon="menu.icon" />
              <span>{{menu.name}}</span>
              <i></i>
            </div>
            <transition name="fade">
            <ul class="sidebar__menu submenu--inline" v-show="menu.isSubShow">
              <li class="menu-item" v-for="sub in menu.subMenu" :key="sub.name" @click.stop="changeRoute(sub)">
                <font-awesome-icon :icon="sub.icon" />
                <span>{{sub.name}}</span>
              </li>
            </ul>
            </transition>
          </template>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      menus: [
        {
          name: '首页',
          url: 'home',
          isSubShow: false,
          icon: 'home',
          subMenu: []
        },
        {
          name: 'demo',
          url: '',
          icon: 'star',
          isSubShow: false,
          subMenu: [
            {
              name: 'test',
              url: 'login',
              icon: 'dna',
              isSubShow: false,
              subMenu: []
            }
          ]
        }
      ]
    }
  },
  methods: {
    changeRoute (menu) {
      console.log(menu)
      if (menu.url) {
        this.$router.push(menu.url)
      } else {
        menu.isSubShow = !menu.isSubShow
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .sidebar{
    position: fixed;
    width: 230px;
    top: 50px;
    left: 0;
    bottom: 0;
    z-index: 1020;
    overflow: hidden;
    background-color: #263238;
    .sidebar__inner{
      position: relative;
      z-index: 1;
      width: 250px;
      height: 100%;
      padding-bottom: 15px;
      overflow-y: scroll;
      .sidebar__menu{
        background: #263238;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        .menu-item{
          color: #8a979e;
          padding: 0 20px;
          height: 56px;
          line-height: 56px;
          position: relative;
          -webkit-box-sizing: border-box;
          white-space: nowrap;
          list-style: none;
          cursor: pointer;
          * {
            vertical-align: middle;
          }
          &:hover{
            color: #fff;
          }
        }
        .submenu-item{
          list-style: none;
          margin: 0;
          padding-left: 0;
          .submenu-title{
            color: #8a979e;
            height: 56px;
            padding-left: 20px;
            line-height: 56px;
            position: relative;
            -webkit-box-sizing: border-box;
            white-space: nowrap;
            list-style: none;
            cursor: pointer;
            &:hover{
              color: #fff;
            }
          }
          .submenu--inline{
            list-style: none;
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
            min-width: 200px;
            color: #8a979e;
            .menu-item{
              padding-left: 20px;
              height: 50px;
              line-height: 50px;
            }
          }
        }
      }
    }
  }
  .sidebar__inner>.sidebar__menu{
    width: 230px;
    border-right: 0;
  }
</style>
