/* eslint-disable no-param-reassign */
import { Modal } from 'ant-design-vue';
import { getToken } from '@/utils/local-store-token';
import store from '@/store';
import { request } from './request';

export function isInternalError(errorCode) {
  return errorCode.toString().startsWith('5') || errorCode.toString().startsWith('4');
}

request.interceptors.request.use(
  (requestConfig) => {
    const token = getToken();
    if (token) {
      requestConfig.headers = {
        ...requestConfig.headers,
        'x-auth-token': token,
      };
    }

    return requestConfig;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const { status } = response;
    if (isInternalError(status)) {
      if (status === 403) {
        Modal.confirm({
          title: '用户凭据失效',
          content: '你已被登出，可以取消继续留在该页面，或者重新登录',
          onOk: () => {
            store.dispatch('FED_LOGOUT');
            window.location.reload();
          },
        });
      }
    }
    return Promise.reject(error);
  },
);
