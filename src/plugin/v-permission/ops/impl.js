function or(rules, { permissions }) {
  if (!rules) {
    return true;
  }

  if (typeof rules === 'string') {
    // eslint-disable-next-line no-param-reassign
    rules = [rules];
  }

  return rules.some((permission) => permissions.has(permission));
}

function and(rules, { permissions }) {
  if (!rules) {
    return true;
  }

  if (typeof rules === 'string') {
    // eslint-disable-next-line no-param-reassign
    rules = [rules];
  }

  return rules.every((permission) => permissions.has(permission));
}

function not(rules, { permissions }) {
  if (!rules) {
    return true;
  }

  if (typeof rules === 'string') {
    // eslint-disable-next-line no-param-reassign
    rules = [rules];
  }

  return rules.every((permission) => !permissions.has(permission));
}

export {
  and,
  or,
  not,
};
