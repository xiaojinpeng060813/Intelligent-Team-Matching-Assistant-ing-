import apiClient from './index';

export const feedbackApi = {
  // 提交反馈
  submitFeedback: (content) => {
    return apiClient.post('/feedback/send', { content });
  }
};