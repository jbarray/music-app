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
</style>
