<template>
  <div class="header">
    <div class="header-left">
      <span>物联网医院体温监测平台</span>
    </div>
    <!-- <div class="header-right">
      <div
        class="mr-5"
        @click="onMessageManagementClick"
      >
        <a-badge
          :count="unreadMessage"
          :offset="[-2, 5]"
          :numberStyle="{
            boxShadow: 'none',
          }"
        >
          <img
            src="@/assets/message-icon.png"
            alt="message-icon"
          />
        </a-badge>
      </div>
      <a-dropdown :trigger="['click']">
        <div class="header-avatar">
          <a-avatar
            :src="avatarUrl"
            :size="35"
          ></a-avatar>
          <span class="header-avatar-text">{{ name }}，你好!</span>
          <ChevronDownIcon :class="[{ 'active-icon': isDropdown }, 'icon']"></ChevronDownIcon>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">
              <span
                style="display: block"
                @click="onPersonalCenterClick"
              >
                个人中心
              </span>
            </a-menu-item>
            <a-menu-item
              key="2"
              v-if="isManager"
            >
              <span
                style="display: block"
                @click="onTaskManagementClick"
              >
                任务管理
              </span>
            </a-menu-item>
            <a-menu-item key="4">
              <span
                style="display: block"
                @click="logout"
              >注销</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div> -->
  </div>
</template>

<script>
// import { ChevronDownIcon } from '@heroicons/vue/solid';
import { mapGetters } from 'vuex';

import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    // ChevronDownIcon,
  },
  data() {
    return {
      isDropdown: false,
      timer: null,
    };
  },
  computed: {
    ...mapGetters(['name', 'unreadMessage', 'avatarUrl', 'isManager']),
  },
  methods: {
    // onPersonalCenterClick() {
    //   this.$router.push({
    //     name: 'PersonalCenterMain',
    //   });
    // },
    // onTaskManagementClick() {
    //   this.$router.push({
    //     name: 'TaskManagementList',
    //   });
    // },
    // onMessageManagementClick() {
    //   this.$router.push({
    //     name: 'MessageManagementList',
    //   });
    // },
    // async logout() {
    //   await this.$store.dispatch('LOGOUT');
    //   this.tim.logout();
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    // },
  },

});
</script>

<style
  lang="scss"
  scoped
>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  z-index: 99;
  width: 100%;

  .header-left {
    color: blue;
    font-size: 20px;
  }

  .header-right {
    cursor: pointer;
    display: flex;
    align-items: center;

    .header-avatar {
      color: white;
      display: flex;
      align-items: center;

      .header-avatar-text {
        margin: 0 5px;
      }

      .icon {
        width: 20px;
      }

      .active-icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
