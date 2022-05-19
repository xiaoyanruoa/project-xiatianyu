<template>
  <Header class="app-header" />
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      class="drawer-bg"
      v-if="device === 'mobile' && sidebar.opened"
      @click="handleClickOutside"
    />
    <sidebar />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import {
  Header, Navbar, Sidebar, AppMain,
} from './components';

export default defineComponent({
  name: 'layout-view',
  components: {
    Header,
    Navbar,
    Sidebar,
    AppMain,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
    },
  },
});
</script>

<style
  lang="scss"
  scoped
>
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';

.app-header {
  height: 52px;
  background-color: #fff;
  border-bottom: 1px solid #000000;

}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: calc(100% - 52px);
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 52px;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 52px;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 80px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
