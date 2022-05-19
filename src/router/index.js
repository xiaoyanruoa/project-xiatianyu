/** @type {import('vue-router').RouterOptions['routes']} */
import routes from './routes';

export default [
  {
    path: '/',
    redirect: '/real-time-body-temperature',
  },
  {
    path: '/login',
    component: () => import('@/view/login/login-view.vue'),
  },
  ...routes,
];
