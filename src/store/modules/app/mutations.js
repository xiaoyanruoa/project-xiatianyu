import storage from 'store2';

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      storage.set('sidebarStatus', 1);
    } else {
      storage.set('sidebarStatus', 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    storage.set('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
};

export default mutations;
