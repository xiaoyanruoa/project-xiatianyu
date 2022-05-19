import Antd from 'ant-design-vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import CustomScrollbar from 'custom-vue-scrollbar';
// import { beforeEach } from '@/plugin/router-permission';
import ztools from './plugin/ztools/ztools';
import App from './App.vue';
import routes from './router/index';
import store from './store/index';
import getErrorMessage from './plugin/vuelidate-errors/get-error-message';
import 'custom-vue-scrollbar/dist/style.css';
import '@/utils/request-interceptors';
import './styles/tailwind.css';
import 'ant-design-vue/dist/antd.css';
import '@/styles/index.scss';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => beforeEach(to, from, next));

createApp(App)
  .use(Antd)
  .use(router)
  .use(store)
  .component(CustomScrollbar.name, CustomScrollbar)
  .use(getErrorMessage)
  .use(ztools)
  .mount('#app');
