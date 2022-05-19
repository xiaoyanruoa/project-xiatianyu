import { meetPermissions } from '../utils';

function permissionDirective(store, getters, el, binding) {
  const permissions = store.getters[getters.permissions];
  const roles = store.getters[getters.roles];

  const rules = binding.value;
  const result = meetPermissions({
    permissions,
    roles,
  }, rules);

  if (!result) {
    // eslint-disable-next-line no-param-reassign
    el.style.display = 'none';
    el.remove();
  }
}

export {
  permissionDirective,
};

export default permissionDirective;
