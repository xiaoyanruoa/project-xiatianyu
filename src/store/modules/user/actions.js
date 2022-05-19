// import {
//   login, getUserInfo, getIMUserAccount, logout,
// } from '@/api/account';
// import { getMessageNumber } from '@/api/message-management';
// import { removeToken } from '@/utils/local-store-token';
// import tim from '@/tim';
// import { removeCurrentConversionId } from '@/utils/local-store-chat';

// // 登录;
// export async function LOGIN({ commit }, userInfo) {
//   const account = userInfo.account.trim();
//   const { password } = userInfo;
//   const loginResponse = await login({ account, password });
//   const { token } = loginResponse.data.data;

//   commit('SET_TOKEN', token);
// }

// // 获取用户信息;
// export async function GET_INFO({ commit }) {
//   const getUserInfoResponse = await getUserInfo();
//   const { data } = getUserInfoResponse;
//   commit('SET_ACCOUNT', data.data.account);
//   commit('SET_ACCOUNT_ID', data.data.id);
//   commit('SET_NAME', data.data.name);
//   commit('SET_AVATAR_URL', data.data.avatarUrl);

//   const isManager = data.data.roles.map((item) => item.name).includes('平台管理员');
//   commit('SET_IS_MANAGER', isManager);

//   const IMAccount = await getIMUserAccount();
//   const { imUserId, userSig } = IMAccount.data.data;
//   commit('SET_IMUSERID', imUserId);

//   if (imUserId) {
//     await tim.login({
//       userID: imUserId,
//       userSig,
//     });
//   }
// }

// // 获取消息数量
// export async function GET_MESSAGE_NUMBER({ commit }) {
//   const messageInfo = await getMessageNumber();
//   commit('SET_UNREADMESSAGE', messageInfo.data.data.count);
// }

// // 登出;
// export async function LOGOUT({ commit }) {
//   await logout();
//   commit('SET_TOKEN', '');
//   commit('SET_ROLES', []);
//   removeCurrentConversionId();
//   removeToken();
//   window.location.reload();
// }

// // 前端登出
// export async function FED_LOGOUT({ commit }) {
//   commit('SET_TOKEN', '');
//   removeCurrentConversionId();
//   removeToken();
//   window.location.reload();
// }
