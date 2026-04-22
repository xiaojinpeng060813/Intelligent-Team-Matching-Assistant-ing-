<template>
  <div class="modify-resume-page" v-show="isActive">
    <div class="page-header">
      <div class="back-icon" @click="handleBack">←</div>
      <div class="header-title">编辑简历</div>
    </div>

    <div class="content-container">
      <div class="section">
        <div class="section-title">基本信息</div>
        <div class="form-list">
          <div class="form-item">
            <label class="label-text">姓名</label>
            <input class="input-box" v-model="resumeInfo.name" placeholder="请输入姓名" />
          </div>
          <div class="form-item">
            <label class="label-text">专业</label>
            <input class="input-box" v-model="resumeInfo.major" placeholder="请输入专业" />
          </div>
          <div class="form-item">
            <label class="label-text">学院</label>
            <input class="input-box" v-model="resumeInfo.college" placeholder="请输入学院" />
          </div>
          <div class="form-item">
            <label class="label-text">年级</label>
            <input class="input-box" v-model="resumeInfo.grade" placeholder="请输入年级" />
          </div>
          <div class="form-item">
            <label class="label-text">学号</label>
            <input class="input-box" v-model="resumeInfo.studentId" placeholder="请输入学号" />
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">成绩信息</div>
        <div class="form-list">
          <div class="form-item">
            <label class="label-text">GPA</label>
            <input class="input-box" v-model="resumeInfo.gpa" placeholder="请输入GPA" />
          </div>
          <div class="form-item">
            <label class="label-text">成绩排名</label>
            <input class="input-box" v-model="resumeInfo.scoreRank" placeholder="请输入成绩排名" />
          </div>
          <div class="form-item">
            <label class="label-text">综测排名</label>
            <input class="input-box" v-model="resumeInfo.comprehensiveRank" placeholder="请输入综测排名" />
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">技能标签</div>
        <div class="tag-container">
          <div class="tag-item" v-for="tag in tagList" :key="tag">{{ tag }}</div>
        </div>
        <div class="add-tag-row">
          <input class="tag-input" placeholder="添加新的技能标签" v-model="newTag" />
          <button class="add-btn" @click="addTag">添加</button>
        </div>
      </div>

      <div class="section">
        <div class="section-title-row">
          <div class="section-title">获奖经历</div>
          <button class="add-award-btn" @click="addAward">+添加</button>
        </div>
        <div class="award-item" v-for="(award, index) in resumeInfo.awards" :key="index">
          <input class="award-input" placeholder="获奖名称" v-model="award.name" />
          <input class="award-input" placeholder="获奖级别及等级" v-model="award.level" />
          <input class="award-input" placeholder="第几作者" v-model="award.author" />
          <input class="award-input" placeholder="获奖年份" v-model="award.year" />
        </div>
      </div>

      <div class="ai-tip">
        <div class="tip-title">关于AI总结</div>
        <div class="tip-content">
          保存后，AI将根据您填写的信息自动生成个人总结。AI生成的内容不可手动修改，以确保真实性。
        </div>
      </div>

      <button class="save-btn" @click="handleSave">保存</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['change-page']);

// 简历信息数据
const resumeInfo = ref({
  name: '刘同学（可编辑）',
  major: '计算机科学与技术',
  college: '计算机科学与工程学院',
  grade: '大二',
  studentId: '2414020121',
  gpa: '3.92',
  scoreRank: '1/124',
  comprehensiveRank: '1/124',
  awards: [
    { name: '全国大学生数学建模大赛', level: '省级一等奖', author: '第二作者', year: '2025' },
    { name: '国家奖学金', level: '', author: '', year: '2025' },
    { name: '', level: '', author: '', year: '' }
  ]
});

// 技能标签数据
const tagList = ref(['Python', 'Java', 'MATLAB']);
const newTag = ref('');

const handleBack = () => {
  emit('change-page', 3);
};

const addTag = () => {
  if (newTag.value.trim()) {
    tagList.value.push(newTag.value.trim());
    newTag.value = '';
  }
};

const addAward = () => {
  resumeInfo.value.awards.push({ name: '', level: '', author: '', year: '' });
};

const handleSave = () => {
  // 传递给后端的数据结构
  console.log('保存的简历信息：', resumeInfo.value);
  alert('简历保存成功！');
};
</script>

<style scoped>
/* 主容器样式 */
.modify-resume-page {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f9fafb;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.page-header {
  height: 50px;
  width: 100%;
  background-color: #1E88E5;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.back-icon {
  font-size: 20px;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  margin-right: 10px;
}

.header-title {
  font-size: 19px;
  color: #ffffff;
  font-weight: 600;
}

.content-container {
  padding: 70px 16px 20px 16px;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section, .ai-tip {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 14px 16px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-bottom: 12px;
}

.section-title {
  font-size: 17px;
  color: #333333;
  font-weight: 600;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f0f0f0;
}

.form-list {
  width: 100%;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label-text {
  width: 80px;
  font-size: 15px;
  color: #333333;
  text-align: left;
}

.input-box {
  flex: 1;
  height: 35px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 15px;
  color: #333333;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  background-color: #ffffff;
}

.input-box:focus {
  border-color: #1E88E5;
  box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.1);
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.tag-item {
  background-color: #e8f4fd;
  color: #1e88e5;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
}

.add-tag-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tag-input {
  flex: 1;
  height: 35px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  background-color: #ffffff;
}

.tag-input:focus {
  border-color: #1E88E5;
  box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.1);
}

.add-btn {
  background-color: #1e88e5;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #1976d2;
}

.add-award-btn {
  font-size: 14px;
  color: #1e88e5;
  background: none;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 3px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-award-btn:hover {
  background-color: #f5f9ff;
  border-color: #1e88e5;
}

.award-item {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.award-input {
  flex: 1;
  min-width: 120px;
  height: 35px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 14px;
  color: #333333;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  background-color: #ffffff;
}

.award-input:focus {
  border-color: #1E88E5;
  box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.1);
}

.ai-tip {
  background-color: #fff5f5;
  padding: 10px 16px;
  border-radius: 8px;
  border-left: 4px solid #dc3545;
}

.tip-title {
  font-size: 20px;
  color: #dc3545;
  font-weight: 600;
  margin-bottom: 4px;
}

.tip-content {
  font-size: 15px;
  color: #dc3545;
  line-height: 1.5;
  font-weight: 600;
}

.save-btn {
  width: 100%;
  max-width: 600px;
  height: 48px;
  background-color: #1e88e5;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 8px rgba(30, 136, 229, 0.3);
  margin-top: 10px;
  margin-bottom: 20px;
}

.save-btn:hover {
  background-color: #1976d2;
}

.save-btn:active {
  background-color: #1565c0;
}
</style>

<!-- 全局样式 -->
<style>
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #f9fafb;
  }
</style>