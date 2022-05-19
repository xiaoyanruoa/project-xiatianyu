/**
 * 根据权限和角色判定是否和权限规则匹配
 *
 * @param {*} { permissions, roles }
 * @param {*} rules
 * @returns
 */
function meetPermissions({ permissions, roles }, rules) {
  if (typeof rules === 'string') {
    return permissions.has(rules);
  }
  if (rules instanceof Array) {
    return rules.every((permission) => permissions.has(permission));
  }
  if (rules instanceof Function) {
    return rules({ permissions, roles });
  }

  // eslint-disable-next-line no-console
  console.error('Rules is not recognized', rules);

  return false;
}

function hasPermission(store, getters, rules) {
  const permissions = store.getters[getters.permissions];
  const roles = store.getters[getters.roles];

  const result = meetPermissions(
    {
      permissions,
      roles,
    },
    rules,
  );

  return result;
}

export { meetPermissions, hasPermission };

export default meetPermissions;
