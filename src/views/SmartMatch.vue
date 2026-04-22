<template>
  <div class="page" :class="{ active: isActive }">
    <!-- 顶部标题栏 -->
    <div class="match-header">
      <div class="header-content">
        <i class="fa fa-exchange text-white" style="font-size: 32px;"></i>
        <div class="title-text">
          <h2 class="text-white text-xl font-bold">智能匹配</h2>
          <p class="text-white/80 text-sm">基于AI算法，为您推荐最适合的队友</p>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <div class="form-container">
        <h3 class="form-title">选择您所要匹配的类型</h3>
        
        <!-- 类别选择 -->
        <div class="form-item">
          <label class="form-label">类别</label>
          <select class="form-input">
            <option>不限</option>
            <option>竞赛</option>
            <option>考研</option>
            <option>运动</option>
          </select>
        </div>

        <!-- 年级选择 -->
        <div class="form-item">
          <label class="form-label">年级</label>
          <select class="form-input">
            <option>不限</option>
            <option>大一</option>
            <option>大二</option>
            <option>大三</option>
            <option>大四</option>
          </select>
        </div>

        <!-- 学院输入 -->
        <div class="form-item">
          <label class="form-label">学院</label>
          <input 
            type="text" 
            placeholder="请输入您的学院" 
            class="form-input"
          >
        </div>

        <!-- 专业输入 -->
        <div class="form-item">
          <label class="form-label">专业</label>
          <input 
            type="text" 
            placeholder="请输入您的专业" 
            class="form-input"
          >
        </div>

        <!-- 主题输入 -->
        <div class="form-item">
          <label class="form-label">主题</label>
          <input 
            type="text" 
            placeholder="如数学建模大赛、程序设计大赛" 
            class="form-input"
          >
        </div>

        <!-- 其他要求文本域 -->
        <div class="form-item">
          <label class="form-label">其他</label>
          <textarea 
            placeholder="请输入额外的匹配要求 (如技能、时间等)" 
            class="form-textarea"
          ></textarea>
        </div>

        <!-- 匹配按钮 -->
        <button 
          @click="openDetailPage" 
          class="match-btn"
        >
          匹&nbsp;&nbsp;配
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 接收父组件传入的页面激活状态
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

// 定义组件发出的事件
const emit = defineEmits(['open-detail']);

// 打开匹配详情页面
const openDetailPage = () => {
  emit('open-detail');
};
</script>

<style scoped>
.page {
  display: none;
  min-height: 100vh;
  background-color: #f9f9f9;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
}

.page.active {
  display: block;
  width: 100% !important;
}

.match-header {
  background-color: #1E88E5;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 9999;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  box-sizing: border-box;
}

.title-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.4;
}

.title-text h2 {
  font-size: 20px;
  margin: 0;
  color: white;
  font-weight: bold;
}

.title-text p {
  font-size: 14px;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}

.form-wrapper {
  padding: 0 16px;
  box-sizing: border-box;
  margin-top: 88px;
  width: 100%;
}

.form-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  margin-bottom: 100px;
  width: 100%;
}

.form-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  color: #333;
  font-size: 16px; /* 增大字体大小 */
  font-weight: 600; /* 加粗 */
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
}

.form-input:focus {
  border-color: #1E88E5;
  box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.1);
}

.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
  box-sizing: border-box;
  outline: none;
  resize: vertical;
}

.form-textarea:focus {
  border-color: #1E88E5;
  box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.1);
}

.match-btn {
  width: 100%;
  padding: 12px;
  background-color: #1E88E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 20px; /* 增大字体大小 */
  font-weight: 700; /* 加粗按钮文字 */
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.match-btn:hover {
  background-color: #1976D2;
}

.match-btn:active {
  background-color: #1565C0;
}
</style>