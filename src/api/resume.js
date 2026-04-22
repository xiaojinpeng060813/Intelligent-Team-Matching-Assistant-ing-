import apiClient from './index';

export const resumeApi = {
  // 获取简历
  getResume: () => {
    return apiClient.get('/resume/get');
  },

  // 更新简历
  updateResume: (data) => {
    return apiClient.put('/resume/update', data);
  }
};