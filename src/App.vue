<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from '../src/components/m-header/m-header.vue'
import Tab from '../src/components/tab/tab.vue'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style>
  *{
    margin:0;
    padding:0;
  }
#app {
  background-color: #2c3e50;
  margin:0;
  overflow: hidden;
}
</style>
