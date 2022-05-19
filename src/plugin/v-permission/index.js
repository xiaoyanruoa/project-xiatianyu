import * as Ops from './ops';
import { permissionDirective } from './directive';
import { hasPermission } from './utils';

function install(Vue, {
  store,
  getters,
}) {
  const $p = {};
  Object.assign($p, Ops);
  $p.has = hasPermission.bind(null, store, getters);

  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$p = $p;

  Vue.directive('permission', permissionDirective.bind(null, store, getters));
}

export default {
  install,
};
