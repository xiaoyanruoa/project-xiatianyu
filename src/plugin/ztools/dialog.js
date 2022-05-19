import globalDialog from './dialog/global-dialog';

export default {
  install(app, options) {
    const dialog = globalDialog(null, true, app);
    app.config.globalProperties.$ztools.dialog = dialog(options.component, true, app);
  },
};
