import qs from 'qs';
import axios from 'axios';

export const request = axios.create({
  baseURL: '/api/v1',
  paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'brackets',
    });
  },
  // 请求超时时间
  withCredentials: true,
  timeout: 5000,
});
