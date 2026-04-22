<template>
  <div class="app-container" style="width:100%;height:100vh;overflow:hidden;">
    <div class="page-wrapper" style="width:100%;height:100%;">
      <RecruitSquare :isActive="activePage === 1" />
      <SmartMatch :isActive="activePage === 2" ref="smartMatchRef" @open-detail="openMatchDetail" />
      <personalcenter 
        :isActive="activePage === 3" 
        @goto-modify-resume="handleGotoModifyResume"
        @goto-feedback="handleGotoFeedback"
        @goto-mypublish="handleGotoMyPublish"
      ></personalcenter>
      <ModifyResume 
        :isActive="activePage === 4" 
        @change-page="handlePageChange"
      ></ModifyResume>
      <Feedback 
        :isActive="activePage === 5" 
        @change-page="handlePageChange"
      />
      <!-- MyPublish 激活状态：activePage=6 -->
      <MyPublish 
        :isActive="activePage === 6" 
        @change-page="handlePageChange"
      />
      <MatchResultDetail v-if="showDetail" @close-detail="closeMatchDetail"></MatchResultDetail>
    </div>
    
    <BottomNav 
      v-if="!showDetail && activePage !== 4" 
      :active-page="activePage" 
      @change-page="handlePageChange" 
      class="bottom-nav" 
      style="position:fixed;bottom:0;left:0;width:100%;z-index:999;"
    ></BottomNav>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RecruitSquare from '@/views/recruitsquare.vue';
import SmartMatch from '@/views/SmartMatch.vue';
import personalcenter from '@/views/personalcenter.vue';
import BottomNav from '@/components/bottom.vue';
import MatchResultDetail from '@/views/MatchResultDetail.vue';
import ModifyResume from '@/views/ModifyResume.vue';
import Feedback from '@/views/Feedback.vue';
import MyPublish from '@/views/MyPublish.vue';

// 页面核心状态管理
const activePage = ref(1); // 当前激活的页面标识
const showDetail = ref(false); // 匹配详情页显隐状态
const smartMatchRef = ref(null); // 智能匹配组件引用

// 通用页面切换逻辑
const handlePageChange = (pageNum) => {
  console.log('页面切换：', pageNum);
  activePage.value = pageNum;
  if (pageNum === 2) {
    showDetail.value = false;
  }
};

// 跳转编辑简历页面
const handleGotoModifyResume = () => {
  console.log('跳转编辑简历，activePage=4');
  activePage.value = 4;
};

// 跳转反馈页面
const handleGotoFeedback = () => {
  console.log('跳转反馈，activePage=5');
  activePage.value = 5;
};

// 跳转我的发布页面
const handleGotoMyPublish = () => {
  console.log('跳转我的发布，activePage=6');
  activePage.value = 6;
};

// 关闭匹配详情页
const closeMatchDetail = () => {
  showDetail.value = false;
};

// 打开匹配详情页
const openMatchDetail = () => {
  showDetail.value = true;
};
</script>

<style scoped>
.app-container {
  position: relative;
}
.page-wrapper {
  position: relative;
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;
}

:deep(.detail-header) {
  height: 72px;
  width: 100%;
  background-color: #1E88E5;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

:deep(.detail-header .back-icon) {
  font-size: 24px;
  color: #FFFFFF;
  font-weight: 700;
  cursor: pointer;
  margin-right: 12px;
}

:deep(.detail-header .header-title) {
  font-size: 22px;
  color: #FFFFFF;
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
}

:deep(.detail-header .header-subtitle) {
  font-size: 12px;
  color: #FFFFFF;
  opacity: 0.9;
  display: block;
}

:deep(.match-header), :deep(.bg-purple-600) {
  height: 72px;
  width: 100%;
  background-color: #1E88E5;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

:deep(.smart-match-header),
:deep(.personal-center-header) {
  width: 100%;
  background-color: #1E88E5;
  box-sizing: border-box;
}
</style>