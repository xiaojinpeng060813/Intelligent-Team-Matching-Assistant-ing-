<template>
  <div class="match-result-detail-page" style="position: fixed; top: 0; left: 0; z-index: 9999;">
    <!-- 顶部标题栏 -->
    <div class="detail-header">
      <div class="back-icon" @click="goBack">←</div>
      <div class="header-content">
        <span class="header-title">智能匹配</span>
        <span class="header-subtitle">基于AI算法，为您推荐最适合的队友</span>
      </div>
    </div>

    <!-- 匹配结果列表 -->
    <div class="match-result-list">
      <div class="match-card" v-for="(item, index) in matchList" :key="index">
        <!-- 学生基本信息 -->
        <div class="student-header">
          <div class="avatar">
            <span class="avatar-text">{{ item.name.charAt(0) }}</span>
          </div>
          <div class="student-info">
            <div class="student-name">{{ item.name }}</div>
            <div class="student-desc">{{ item.major }} | {{ item.major }}学院 | {{ item.grade }}</div>
          </div>
        </div>

        <!-- 技能标签 -->
        <div class="skill-tags">
          <span class="tag" v-for="skill in item.skills" :key="skill">{{ skill }}</span>
        </div>

        <!-- 获奖成果 -->
        <div class="awards-section">
          <div class="section-title">获奖成果</div>
          <div class="award-item" v-for="award in item.awards" :key="award">
            <i class="award-icon">🏆</i>
            <span class="award-text">{{ award }}</span>
          </div>
        </div>

        <!-- AI推荐理由 -->
        <div class="reason-section">
          <div class="section-title reason-title">
            <i class="reason-icon">🔍</i>
            AI推荐理由
          </div>
          <div class="reason-text">{{ item.reason }}</div>
        </div>

        <!-- 联系按钮 -->
        <button class="contact-btn" @click="openQrCode(item)">联&nbsp;&nbsp;系</button>
      </div>
    </div>

    <!-- 二维码弹窗 -->
    <div class="qr-modal" v-if="showQrModal" @click="closeQrCode">
      <div class="qr-modal-content" @click.stop>
        <div class="qr-title">扫码添加 {{ currentStudent.name }} 企业微信</div>
        <img class="qr-image" src="https://picsum.photos/300/300" alt="微信二维码">
        <div class="qr-tip">企业微信扫码添加</div>
        <button class="qr-close-btn" @click="closeQrCode">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义组件发出的事件
const emit = defineEmits(['close-detail']);
const goBack = () => {
  emit('close-detail');
};

// 模拟匹配数据（测试用）
const matchList = ref([
  {
    name: "刘同学",
    major: "计算机科学与技术",
    grade: "大二",
    skills: ["Python", "C语言", "C++", "数据分析", "JavaScript"],
    awards: [
      "全国大学生数学竞赛国家级二等奖",
      "全国大学生数学建模大赛省级一等奖",
      "湖南省大学生程序设计大赛省级二等奖"
    ],
    reason: "他熟练掌握多种编程语言与数据分析技能，在全国大学生数学竞赛、数学建模竞赛、ACM-ICPC等高水平赛事中多次斩获国家级、省部级奖项，兼具出色的学习能力与实践竞赛能力。"
  },
  {
    name: "刘同学",
    major: "计算机科学与技术",
    grade: "大二",
    skills: ["Python", "C++", "数据分析", "JavaScript"],
    awards: [
      "全国大学生数学竞赛国家级二等奖",
      "全国大学生数学建模大赛省级一等奖",
      "湖南省大学生程序设计大赛省级二等奖"
    ],
    reason: "他熟练掌握多种编程语言与数据分析技能，在全国大学生数学竞赛、数学建模竞赛、ACM-ICPC等高水平赛事中多次斩获国家级、省部级奖项，兼具出色的学习能力与实践竞赛能力。"
  }
]);

// 二维码弹窗控制
const showQrModal = ref(false);
const currentStudent = ref({ name: '' });

// 打开二维码弹窗
const openQrCode = (item) => {
  currentStudent.value = item;
  showQrModal.value = true;
};

// 关闭二维码弹窗
const closeQrCode = () => {
  showQrModal.value = false;
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.match-result-detail-page {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #F5F7FA;
}

.detail-header {
  height: 72px;
  width: 100%;
  background-color: #1E88E5;
  padding: 0 16px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
}

.back-icon {
  font-size: 28px;
  font-weight: 700;
  cursor: pointer;
  margin-right: 12px;
}

.header-content {
  flex: 1;
}

.header-title {
  font-size: 24px;
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
}

.header-subtitle {
  font-size: 14px;
  opacity: 0.9;
  display: block;
}

.match-result-list {
  padding: 24px;
  min-height: calc(100vh - 72px);
}

.match-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.student-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #1E88E5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.avatar-text {
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 600;
}

.student-name {
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 4px;
}

.student-desc {
  font-size: 14px;
  color: #666666;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  background-color: #E8F3FF;
  color: #1E88E5;
  font-size: 14px;
  padding: 6px 14px;
  border-radius: 16px;
}

.awards-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
}

.reason-title {
  color: #0088FF !important;
  font-family: "Alibaba PuHuiTi", sans-serif !important;
}

.award-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 15px;
  color: #666666;
}

.award-icon {
  margin-right: 8px;
  font-size: 16px;
}

.reason-section {
  margin-bottom: 20px;
}

.reason-icon {
  margin-right: 6px;
}

.reason-text {
  font-size: 15px;
  color: #0088FF !important;
  line-height: 1.6;
  text-align: justify;
  font-family: "Alibaba PuHuiTi", sans-serif !important;
  text-indent: 2em;
}

.contact-btn {
  width: 100%;
  height: 48px;
  background-color: #1E88E5;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.contact-btn:active {
  background-color: #1976D2;
}

@media (min-width: 768px) {
  .match-result-list {
    max-width: 600px;
    margin: 0 auto;
  }
  .match-card {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
}

.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.qr-modal-content {
  background: #fff;
  width: 320px;
  padding: 30px 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.qr-image {
  width: 260px;
  height: 260px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
  display: block;
}

.qr-tip {
  font-size: 12px;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
}

.qr-close-btn {
  width: 100%;
  height: 44px;
  background: #1E88E5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}
</style>