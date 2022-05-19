import { createApp } from 'vue';

export function createChildApp(appCfg, parentApp) {
  const app = createApp(appCfg);

  app.config.globalProperties = parentApp.config.globalProperties;

  const { reload, ...appContext } = parentApp._context;
  Object.assign(app._context, appContext);

  return app;
}
