const getters = {
  sidebar: (state) => state.app.sidebar,
  token: (state) => state.user.token,
  account: (state) => state.user.account,
};

export default getters;
