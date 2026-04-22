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
      />
      <ModifyResume 
        :isActive="activePage === 4" 
        @change-page="handlePageChange"
      />
      <Feedback 
        :isActive="activePage === 5" 
        @change-page="handlePageChange"
      />
      <MyPublish 
        :isActive="activePage === 6" 
        @change-page="handlePageChange"
        @goto-publish-form="handleGotoPublishForm"
      />
      <PublishForm 
        :isActive="activePage === 7" 
        @change-page="handlePageChange"
      />
      <MatchResultDetail v-if="showDetail" @close-detail="closeMatchDetail" />
    </div>
    
    <BottomNav 
      v-if="!showDetail && activePage !== 4" 
      :active-page="activePage" 
      @change-page="handlePageChange" 
      class="bottom-nav" 
      style="position:fixed;bottom:0;left:0;width:100%;z-index:999;"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 页面组件引入
import RecruitSquare from '@/views/recruitsquare.vue';
import SmartMatch from '@/views/SmartMatch.vue';
import personalcenter from '@/views/personalcenter.vue';
import BottomNav from '@/components/bottom.vue';
import MatchResultDetail from '@/views/MatchResultDetail.vue';
import ModifyResume from '@/views/ModifyResume.vue';
import Feedback from '@/views/Feedback.vue';
import MyPublish from '@/views/MyPublish.vue';
import PublishForm from '@/views/PublishForm.vue'; // 新增导入

// 全局状态
const activePage = ref(1);
const showDetail = ref(false);
const smartMatchRef = ref(null);

// 通用页面切换
const handlePageChange = (pageNum) => {
  activePage.value = pageNum;
  if (pageNum === 2) {
    showDetail.value = false;
  }
};

// 页面跳转方法
const handleGotoModifyResume = () => {
  activePage.value = 4;
};
const handleGotoFeedback = () => {
  activePage.value = 5;
};
const handleGotoMyPublish = () => {
  activePage.value = 6;
};
// 新增：跳转到发布表单
const handleGotoPublishForm = () => {
  activePage.value = 7;
};

// 匹配详情控制
const closeMatchDetail = () => {
  showDetail.value = false;
};
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
</style>