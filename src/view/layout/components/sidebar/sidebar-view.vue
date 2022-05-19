<template>
  <div class="sidebar-container">
    <CustomScrollbar style="height: calc(100vh - 52px); width: 200px">
      <a-menu
        class="overflow-x-hidden"
        :selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        :inlineCollapsed="isCollapse"
      >
        <SidebarItem
          v-for="(item, index) in defaultRoutes"
          :key="index"
          :item="item"
          :base-path="item.path"
        />
      </a-menu>
    </CustomScrollbar>
  </div>
</template>

<script>
import {
  computed, ref, watch, defineComponent,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import variables from '@/styles/variables-for-js';
import defaultRoutes from '@/router/routes';
import SidebarItem from './sidebar-item.vue';

export default defineComponent({
  components: {
    SidebarItem,
  },
  setup() {
    const route = useRoute();
    const selectedKeys = ref([]);
    // // if set path, the sidebar will highlight the path you set
    watch(
      route,
      (newVal) => {
        const { meta, path } = newVal;
        if (meta.activeMenu) {
          selectedKeys.value = [meta.activeMenu];
        } else {
          selectedKeys.value = [path];
        }
      },
      {
        immediate: true,
      },
    );
    const parentRoute = route.matched[route.matched.length - 2];
    const openKeys = ref([parentRoute.path]);

    const store = useStore();
    const isCollapse = computed(() => !store.getters.sidebar.opened);
    // const isCollapse = ref(true);

    return {
      selectedKeys,
      openKeys,
      variables,
      defaultRoutes,
      isCollapse,
    };
  },
});
</script>
