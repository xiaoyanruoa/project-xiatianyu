const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (key in state) {
      state[key] = value;
    }
  },
};

export default mutations;
