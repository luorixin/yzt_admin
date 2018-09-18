<template>
  <div>
    <nav-bar/>
    <side-bar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '../components/navbar'
import SideBar from '../components/sidebar'
export default {
  components: {
    NavBar,
    SideBar
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/index";
</style>
