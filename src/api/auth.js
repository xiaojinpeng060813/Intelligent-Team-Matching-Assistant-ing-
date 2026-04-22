import apiClient from './index';

export const authApi = {
  // 登录
  login: (credentials) => {
    return apiClient.post('/auth/hnust', credentials);
  },

  // 获取用户信息
  getUserInfo: () => {
    return apiClient.get('/user/info');
  }
};