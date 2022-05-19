<script setup>
// // This starter template is using Vue 3 <script setup> SFCs
// // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/hello-world.vue';
// import HeroIcon from './components/hero-icon.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <RouterView></RouterView>
</template>

<style lang="scss">
#app {
  text-align: center;
}

nav {
  text-align: center;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &::after {
      content: ' | ';
    }

    &:last-child::after {
      content: '';
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
