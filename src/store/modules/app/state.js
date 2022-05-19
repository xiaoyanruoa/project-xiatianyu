import storage from 'store2';

const state = {
  sidebar: {
    opened: storage.get('sidebarStatus') ? !!+storage.get('sidebarStatus') : true,
    withoutAnimation: false,
  },
  device: 'desktop',
};

export default state;
