<template>
  <section class="app-main">

    <router-view
      class="app-container"
      v-slot="{ Component }"
    >
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>

  </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path;
    },
  },
});
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /*52 = header  */
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #f0f2f5;
}

.fixed-header+.app-main {
  padding-top: 102px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
// .el-popup-parent--hidden {
//   .fixed-header {
//     padding-right: 15px;
//   }
// }
</style>
