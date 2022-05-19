import { createStore } from 'vuex';

import app from './modules/app';
import settings from './modules/settings';
// import user from './modules/user';
import getters from './getters';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    settings,
    // user,
  },
  getters,
});
