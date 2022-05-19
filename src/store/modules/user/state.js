import { getToken } from '@/utils/local-store-token';

export default () => ({
  token: getToken(),
  imUserId: '',
  name: '',
  account: '',
  avatarUrl: '',
  accountId: '',
  roles: [],
  unreadMessage: '',
  isFormMessage: false,
  toCurrentImGroupId: '',
  dynamicRoutes: [],
});
