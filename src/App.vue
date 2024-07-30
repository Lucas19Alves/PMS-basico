<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <router-view></router-view>
  </div>

</template>

<style scoped>

</style>
