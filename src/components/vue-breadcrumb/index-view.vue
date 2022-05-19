<template>
  <a-breadcrumb
    class="app-breadcrumb"
    :routes="breadcrumbList"
  >
    <template #itemRender="{ route }">
      <span v-if="!route.to">
        {{ route.label }}
      </span>
      <router-link
        v-else
        :to="route.to"
      >
        {{ route.label }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  watch: {
    $route: {
      handler() {
        const breadcrumbRouteList = this.getBReadcrumbList().filter(
          (item) => item.meta?.breadcrumb,
        );

        this.breadcrumbList = breadcrumbRouteList.map((item, index) => {
          let breadcrumb = item.meta?.breadcrumb;
          if (typeof breadcrumb === 'function') {
            breadcrumb = breadcrumb.call(this, this.$route.params);
          }
          if (index === breadcrumbRouteList.length - 1) {
            return {
              label: breadcrumb.label,
            };
          }
          return {
            label: breadcrumb.label,
            to: item,
          };
        });
      },
      immediate: true,
    },
  },

  data() {
    return {
      breadcrumbList: [],
    };
  },

  methods: {
    getBReadcrumbList() {
      function findParents(routeName, matches = []) {
        const childRoute = this.$router.resolve({
          name: routeName,
        });

        let breadcrumb = childRoute.meta?.breadcrumb;

        if (typeof breadcrumb === 'function') {
          breadcrumb = breadcrumb.call(this, this.$route.params);
        }

        const parentName = breadcrumb?.parent;

        if (parentName) {
          const fosterParent = this.$router.resolve({
            name: parentName,
          });
          const isRecursion = fosterParent.name === routeName;
          if (isRecursion) {
            throw new Error(
              `出现同名路由${routeName}或者${routeName}的面包屑指向的parent的redirect指向${routeName}导致递归`,
            );
          }
          matches.unshift(fosterParent);
          return findParents.call(this, fosterParent.name, matches);
        }

        this.$router.resolve({
          name: routeName,
        });
        const { matched } = this.$route;

        if (matched.length < 2) {
          return matches;
        }

        const bloodParent = matched[matched.length - 2];

        matches.unshift(bloodParent);

        return matches;
      }

      const matched = findParents.call(this, this.$route.name, []);

      const allBreadcrumbList = [...matched, this.$route];

      return allBreadcrumbList.map((route) => (route.path.length === 0 ? { ...route, path: '/' } : route));
    },
  },
});
</script>

<style lang='scss'>
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

.app-breadcrumb.ant-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
