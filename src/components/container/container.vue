<template>
  <div>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from '../../components/m-header/m-header.vue'
import Tab from '../../components/tab/tab.vue'
import player from '../../components/player/player.vue'
export default {
  name: 'container',
  components: {
    MHeader,
    Tab,
    player
  }
}
</script>

<style>
</style>
