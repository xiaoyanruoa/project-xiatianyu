import globalDialog from './dialog/global-dialog';
import useDialogPluginComponent from './composable/use-dialog-plugin-component';

export default {
  install(app, options) {
    const ztools = {};
    ztools.dialog = globalDialog(options?.dialog?.component, true, app);
    app.config.globalProperties.$ztools = ztools;
  },
};

export { useDialogPluginComponent };
