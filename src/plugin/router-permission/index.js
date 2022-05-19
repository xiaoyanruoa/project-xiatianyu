import store from '@/store';

const whiteList = ['/login'];

export async function beforeEach(to, from, next) {
  const { token } = store.getters;
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
      return;
    }
    if (!store.getters.account) {
      try {
        await store.dispatch('GET_INFO');
        next({ ...to, replace: true });
        return;
      } catch (error) {
        await store.dispatch('FED_LOGOUT');
        next({ path: '/' });
        return;
      }
    }

    next();
    return;
  }
  if (whiteList.includes(to.path)) {
    next();
    return;
  }
  next('/login');
}
