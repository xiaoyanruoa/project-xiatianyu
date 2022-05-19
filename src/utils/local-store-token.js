import store from 'store2';

const TokenKey = 'project-xiatianyu';

export function getToken() {
  const localStoreToken = store.get(TokenKey);
  if (localStoreToken) {
    return localStoreToken;
  }
  return store.session.get(TokenKey);
}

export function setToken(token) {
  return store.set(TokenKey, token);
}

export function setSessionToken(token) {
  return store.session.set(TokenKey, token);
}

export function removeToken() {
  return store.remove(TokenKey);
}
