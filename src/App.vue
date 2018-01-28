<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from '../src/components/m-header/m-header.vue'
import Tab from '../src/components/tab/tab.vue'
import player from '../src/components/player/player.vue'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    player
  }
}
</script>

<style>
</style>
