<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import Hamburger from '@/components/hamburger/index.vue';
import Breadcrumb from '@/components/vue-breadcrumb/index-view.vue';

export default defineComponent({
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    .login-btn {
      margin-right: 50px;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        margin-right: 20px;
        position: relative;
        line-height: 1.5rem;

        .user-avatar {
          margin-top: 5px;
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
