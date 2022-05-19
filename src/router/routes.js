import Layout from '@/view/layout/layout-view.vue';

export default [
  {
    path: '/real-time-body-temperature',
    meta: {
      menu: {
        name: '实时体温数据',
      },
    },
    component: Layout,
    redirect: '/real-time-body-temperature/main',
    children: [
      {
        path: '/real-time-body-temperature/main',
        meta: {
          menu: {
            name: '实时体温数据',
          },
        },
        component: () => import('@/view/real-time-body-temperature/main-view.vue'),
      },
    ],
  },
  {
    path: '/admission-registration',
    meta: {
      menu: {
        name: '患者入院登记',
      },
    },
    component: Layout,
    redirect: '/admission-registration/main',
    children: [
      {
        path: '/admission-registration/main',
        meta: {
          menu: {
            name: '患者入院登记',
          },
        },
        component: () => import('@/view/admission-registration/main-view.vue'),
      },
    ],
  },
  {
    path: '/ward-division',
    meta: {
      menu: {
        name: '病区划分',
      },
    },
    component: Layout,
    redirect: '/ward-division/main',
    children: [
      {
        path: '/ward-division/main',
        meta: {
          menu: {
            name: '病区划分',
          },
        },
        component: () => import('@/view/ward-division/main-view.vue'),
      },
    ],
  },
];
