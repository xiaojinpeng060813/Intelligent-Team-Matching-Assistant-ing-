import apiClient from './index';

export const publishApi = {
  // 创建招募帖
  create: (data) => {
    return apiClient.post('/publish/create', data);
  },

  // 获取我的发布
  getMyPosts: () => {
    return apiClient.get('/publish/my');
  },

  // 删除发布
  deletePost: (id) => {
    return apiClient.delete(`/publish/${id}`);
  }
};