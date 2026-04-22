<template>
  <div class="page bg-gray-50" :style="{ display: isActive ? 'block' : 'none' }">
    <div class="fixed-header">
      <div class="feedback-header">
        <div class="back-icon" @click="handleBack" :style="{ pointerEvents: isLoading ? 'none' : 'auto' }">←</div>
        <div class="header-title">反馈</div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="feedback-card">
        <div class="card-title">意见反馈</div>
        <textarea 
          class="feedback-textarea"
          placeholder="请输入内容"
          rows="10"
          v-model="feedbackContent"
          :disabled="isLoading"
        ></textarea>
        <button class="submit-btn" @click="handleSubmit" :disabled="isLoading">
          <template v-if="isLoading">
            <span class="loading-icon"></span> 提交中...
          </template>
          <template v-else>
            提 交
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 接收父组件传入的页面激活状态
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

// 定义组件发出的事件
const emit = defineEmits(['change-page']);

// 反馈内容
const feedbackContent = ref('');
// 加载状态
const isLoading = ref(false);

// 返回个人中心
const handleBack = () => {
  if (isLoading.value) return;
  console.log('点击返回：回到个人中心');
  emit('change-page', 3);
};

// 提交反馈
const handleSubmit = async () => {
  if (!feedbackContent.value.trim()) {
    alert('请输入反馈内容！');
    return;
  }

  isLoading.value = true;
  try {
    // 模拟接口调用，实际项目中应替换为真实接口
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('反馈提交成功！感谢您的建议～');
    feedbackContent.value = '';
    handleBack();
  } catch (error) {
    alert('提交失败，请稍后重试！');
    console.error('提交反馈失败：', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.page {
  display: none;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}
.page.active {
  display: block;
}

.bg-gray-50 {
  background-color: #f9fafb !important;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 99;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

.feedback-header {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
}

.back-icon {
  font-size: 20px;
  color: #333;
  margin-right: 15px;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s ease;
}
.back-icon:hover {
  color: #409eff;
}

.header-title {
  font-size: 19px;
  color: #333;
  font-weight: 600;
}

.content-wrapper {
  padding: 70px 1rem 2rem;
  box-sizing: border-box;
  width: 100%;
}

.feedback-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.card-title {
  font-size: 18px;
  color: #333;
  font-weight: 600;
  margin-bottom: 15px;
}

.feedback-textarea {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  resize: none;
  font-size: 16px;
  color: #333;
  outline: none;
  line-height: 1.6;
}
.feedback-textarea::placeholder {
  color: #999;
  font-size: 16px;
}
.feedback-textarea:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.submit-btn {
  width: 100%;
  height: 50px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.submit-btn:active {
  background-color: #337ecc;
}
.submit-btn:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.loading-icon {
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: loading-rotate 0.8s linear infinite;
}
@keyframes loading-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>