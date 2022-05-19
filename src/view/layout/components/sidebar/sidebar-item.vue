<template>
  <template v-if="!isHidden">
    <template v-if="isItemShow">
      <a-menu-item
        :class="{ 'submenu-title-noDropdown': !isNest }"
        :key="resolvePath(onlyOneChild.path)"
      >
        <Item
          :icon="onlyOneChild.meta.menu.icon || (item.meta?.menu && item.meta.menu.icon)"
          :to="resolvePath(onlyOneChild.path)"
          :title="onlyOneChild.meta.menu.name"
          :isActive="isSubActive"
        />
      </a-menu-item>
    </template>

    <a-sub-menu
      v-else
      ref="subMenu"
      popper-append-to-body
      :key="resolvePath(item.path)"
    >
      <template #title>
        <Item
          v-if="item.meta.menu"
          :icon="item.meta.menu && item.meta.menu.icon"
          :title="item.meta.menu.name"
          :isActive="isActive"
        />
      </template>
      <SidebarItem
        v-for="(item, index) in item.children"
        :key="index"
        :item="item"
        :is-nest="true"
        :base-path="resolvePath(item.path)"
      />
    </a-sub-menu>
  </template>
</template>

<script>
import { computed, defineComponent } from 'vue';
import path from 'path-browserify';

import isExternal from '@/utils/validate';
import Item from './item-view.vue';

export default defineComponent({
  components: {
    Item,
  },
  props: {
    item: {
      type: Object,
    },
    basePath: {
      type: String,
      default: '',
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    activeMenu: {
      type: String,
    },
  },
  setup(props) {
    let onlyOneChild = null;
    const getHasOneShowingChild = (parent, children = []) => {
      const showingChildren = children.filter((item) => {
        if (item.meta.hidden) {
          return false;
        }
        // Temp set(will be used if only has one showing child)
        onlyOneChild = item;
        return true;
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }

      return false;
    };
    const hasOneShowingChild = getHasOneShowingChild(props.item, props.item.children);
    const onlyOneLayerChild = !onlyOneChild.children || onlyOneChild.noShowingChildren;
    const isItemShow = hasOneShowingChild && onlyOneLayerChild && !props.item.alwaysShow;

    const resolvePath = (routePath) => {
      const menuBasePath = props.basePath;
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(menuBasePath)) {
        return menuBasePath;
      }

      return path.resolve(menuBasePath, routePath);
    };

    const hasMenuMeta = computed(() => props.item.meta?.menu);
    const isHidden = computed(() => {
      if (hasMenuMeta.value) {
        return props.item.meta.menu.hidden;
      }
      return true;
    });

    // eslint-disable-next-line max-len
    const isActive = computed(() => props.item.children.map((item) => item.path).includes(props.activeMenu));
    const isSubActive = computed(() => props.activeMenu === resolvePath(onlyOneChild.path));

    return {
      onlyOneChild,
      isItemShow,
      resolvePath,
      isHidden,
      isActive,
      isSubActive,
    };
  },
});
</script>

<style>
</style>
