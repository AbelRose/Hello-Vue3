<script setup>
// 不能写在这里面 太晚了 应该写在main.js
// import { useStore } from 'vuex';
// import { useRouter } from 'vue-router'

// const store = useStore()
// const router = useRouter()
// store.commit('addMenu', router)
</script>

<template>
  <router-view />
</template>

<style>
#app {
  height: 100%;
}
</style>
