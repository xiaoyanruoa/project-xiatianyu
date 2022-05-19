import { meetPermissions } from '@/plugins/v-permission/utils';
import dynamicRoutes from '@/router/dynamic-routes';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param permissions
 * @param route
 */
export function hasPermission(permissions, route, orgType) {
  if (route.meta && route.meta.orgType && route.meta.orgType !== orgType) {
    return false;
  }

  if (route.meta && route.meta.permissions) {
    const result = meetPermissions({ permissions }, route.meta.permissions);
    return result;
  }

  return true;
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param permissions
 */
export function filterAsyncRouter(routes, permissions, orgType) {
  const result = [];

  routes.forEach((route) => {
    const tmpRoute = { ...route };
    if (hasPermission(permissions, tmpRoute, orgType)) {
      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRouter(tmpRoute.children, permissions, orgType);
      }
      result.push(tmpRoute);
    }
  });

  return result;
}

export function generateRoutes(data) {
  if (!data) {
    return [];
  }

  const { permissions, orgType } = data;
  if (process.env.NODE_ENV === 'development') {
    if (permissions.size === 0) {
      return dynamicRoutes;
    }
  }
  const accessedRouters = filterAsyncRouter(dynamicRoutes, permissions, orgType);

  return accessedRouters;
}
