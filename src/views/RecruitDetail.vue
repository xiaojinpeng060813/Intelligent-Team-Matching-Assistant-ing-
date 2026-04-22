<template>
  <div class="page bg-gray-50" :class="{ active: isActive }">
    <!-- 顶部导航栏 -->
    <div class="detail-header flex items-center w-full fixed top-0 left-0 z-50 px-4 py-2">
      <i class="fa fa-angle-left text-3xl text-white mr-3 cursor-pointer" @click="handleBack"></i>
      <h2 class="text-xl font-bold text-white">招募详情</h2>
    </div>

    <div class="content-wrapper px-4 pt-20 pb-20">
      <!-- 招募标题部分 -->
      <div class="bg-white mt-6 p-4 rounded-lg">
        <div class="flex items-center mb-2">
          <span class="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full mr-2 flex items-center">
            <i class="fa fa-trophy text-xs mr-1"></i>竞赛
          </span>
          <h3 class="text-lg font-bold text-black flex-1">{{ detailInfo.title }}</h3>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed mb-3">{{ detailInfo.desc }}</p>
        <div class="flex items-center text-xs text-gray-500">
          <i class="fa fa-clock-o mr-1"></i>
          <span>{{ detailInfo.time }}</span>
          <span class="mx-2">|</span>
          <i class="fa fa-users mr-1"></i>
          <span>{{ detailInfo.count }}</span>
        </div>
      </div>

      <!-- 队友要求部分 -->
      <div class="bg-white mt-3 p-4 rounded-lg">
        <h4 class="text-base font-medium text-black mb-3">队友要求</h4>
        <ul class="text-sm text-gray-600 space-y-2">
          <li class="flex items-start">
            <div class="w-2 h-2 bg-black rounded-full mt-1.5 mr-2"></div>
            <span>{{ detailInfo.requirement1 || '熟练掌握Python、C语言、Java等两种及以上编程语言' }}</span>
          </li>
          <li class="flex items-start">
            <div class="w-2 h-2 bg-black rounded-full mt-1.5 mr-2"></div>
            <span>{{ detailInfo.requirement2 || '逻辑分析能力、数据分析能力好' }}</span>
          </li>
          <li class="flex items-start">
            <div class="w-2 h-2 bg-black rounded-full mt-1.5 mr-2"></div>
            <span>{{ detailInfo.requirement3 || '具有良好的论文写作能力' }}</span>
          </li>
          <li class="flex items-start">
            <div class="w-2 h-2 bg-black rounded-full mt-1.5 mr-2"></div>
            <span>{{ detailInfo.requirement4 || '时间充裕、能全程参与比赛（9月中上旬之前）、服从团队安排' }}</span>
          </li>
          <li class="flex items-start">
            <div class="w-2 h-2 bg-black rounded-full mt-1.5 mr-2"></div>
            <span>{{ detailInfo.requirement5 || '数学专业、计算机专业、电子信息专业及其相关专业以及有相关竞赛经验者优先' }}</span>
          </li>
        </ul>
      </div>

      <!-- 发布者信息部分 -->
      <div class="bg-white mt-3 p-4 rounded-lg">
        <h4 class="text-base font-medium text-black mb-3">发布者信息</h4>
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl mr-3">
            {{ (detailInfo.name || '张').charAt(0) }}
          </div>
          <div class="flex-1 text-left">
            <p class="text-base font-medium text-black">{{ detailInfo.name || '张同学' }}</p>
            <p class="text-xs text-gray-500">{{ detailInfo.major || '计算机科学与技术 · 大三' }}</p>
          </div>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          <!-- 技能标签 -->
          <span v-for="(tag, idx) in (detailInfo.skills || ['Python', 'C语言', 'C++', '数据分析', 'JavaScript'])" :key="idx" 
                class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- 群聊二维码部分 -->
      <div class="bg-white mt-3 p-4 rounded-lg mb-6">
        <h4 class="text-base font-medium text-black mb-3">群聊二维码</h4>
        <div class="qrcode-container bg-white border border-gray-200 rounded-lg p-3 w-48 mx-auto flex flex-col items-center">
          <img :src="detailInfo.qrcode || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgPGcgZmlsbD0ibm9uZSI+CiAgICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0id2hpdGUiLz4KICAgIDxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiIGZpbGw9ImJsYWNrIi8+CiAgICA8cGF0aCBkPSJNMjUgMGgyMHYyMEgyNXoiIGZpbGw9ImJsYWNrIi8+CiAgICA8cGF0aCBkPSJNMjUgMjVoMjB2MjBIMjV6IiBmaWxsPSJibGFjayIvPgogICAgPHBhdGggZD0iTTUwIDBoMjB2MjBINTB6IiBmaWxsPSJibGFjayIvPgogICAgPHBhdGggZD0iTTAgMjVoMjB2MjBIMHoiIGZpbGw9ImJsYWNrIi8+CiAgICA8cGF0aCBkPSJNNzUgMGgyMHYyMEg3NXoiIGZpbGw9ImJsYWNrIi8+CiAgICA8cGF0aCBkPSJNNzUgMjVoMjB2MjBINzV6IiBmaWxsPSJibGFjayIvPgogICAgPHBhdGggZD0iTTAgNTBoMjB2MjBIMHoiIGZpbGw9ImJsYWNrIi8+CiAgICA8cGF0aCBkPSJNMjUgNTBoMjB2MjBIMjV6IiBmaWxsPSJibGFjayIvPgogICAgPHBhdGggZD0iTTUwIDUwaDIwdjIwSDUweiIgZmlsbD0iYmxhY2siLz4KICAgIDxwYXRoIGQ9Ik03NSA1MGgyMHYyMEg3NXoiIGZpbGw9ImJsYWNrIi8+CiAgICA8cGF0aCBkPSJNMTAgMTBoMTB2MTBIMTB6IiBmaWxsPSJ3aGl0ZSIvPgogICAgPHBhdGggZD0iTTM1IDEwaDEwdjEwSDM1eiIgZmlsbD0id2hpdGUiLz4KICAgIDxwYXRoIGQ9Ik02MCAxMGgxMHYxMEg2MHoiIGZpbGw9IndoaXRlIi8+CiAgICA8cGF0aCBkPSJNOTAgMTBoMTB2MTBIO TB6IiBmaWxsPSJ3aGl0ZSIvPgogICAgPHBhdGggZD0iTTAgODBoMjB2MjBIMHoiIGZpbGw9ImJsYWNrIi8+CiAgICA8cGF0aCBkPSJNMjUgODBoMjB2MjBIMjV6IiBmaWxsPSJibGFjayIvPgogICAgPHBhdGggZD0iTTUwIDgwaDIwdjIwSDUweiIgZmlsbD0iYmxhY2siLz4KICAgIDxwYXRoIGQ9Ik03NSA4MGgyMHYyMEg3NXoiIGZpbGw9ImJsYWNrIi8+CiAgICA8cGF0aCBkPSJNMTAgOTAwaDEwdjEwSDEweiIgZmlsbD0id2hpdGUiLz4KICAgIDxwYXRoIGQ9Ik0zNSA5MGgxMHYxMEgzNXoiIGZpbGw9IndoaXRlIi8+CiAgICA8cGF0aCBkPSJNNjAgOTBoMTB2MTBGNjB6IiBmaWxsPSJ3aGl0ZSIvPgogICAgPHBhdGggZD0iTTkwIDkwaDEwdjEwSDkweiIgZmlsbD0id2hpdGUiLz4KICAgIDxwYXRoIGQ9Ik01IDU1aDEwdjEwSDV6IiBmaWxsPSJibGFjayIvPgogICAgPHBhdGggZD0iTTMwIDU1aDEwdjEwSDMweiIgZmlsbD0iYmxhY2siLz4KICAgIDxwYXRoIGQ9Ik01NSA1NWgxMHYxMEg1NXoiIGZpbGw9ImJsYWNrIi8+CiAgICA8cGF0aCBkPSJNODAgNTVoMTB2MTBIODB6IiBmaWxsPSJibGFjayIvPgogIDwvZz4KPC9zdmc+'" 
               alt="群聊二维码" class="w-full h-auto">
          <p class="text-xs text-gray-500 mt-2 text-center">扫描二维码加入群聊</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

// 接收父组件传入的参数
const props = defineProps({
  // 页面激活状态
  isActive: {
    type: Boolean,
    default: false
  },
  // 招募详情数据
  detailInfo: {
    type: Object,
    default: () => ({
      id: 0,
      title: '全国大学生数学建模大赛',
      tag: '竞赛',
      desc: '组建团队参加2026年全国大学生数学建模竞赛，团队已有一名指导老师，欢迎擅长编程和论文写作的伙伴加入！',
      time: '2小时前',
      count: '1/3',
      name: '张同学',
      major: '计算机科学与技术 · 大三',
      skills: ['Python', 'C语言', 'C++', '数据分析', 'JavaScript'],
      requirement1: '熟练掌握Python、C语言、Java等两种及以上编程语言',
      requirement2: '逻辑分析能力、数据分析能力好',
      requirement3: '具有良好的论文写作能力',
      requirement4: '时间充裕、能全程参与比赛（9月中上旬之前）、服从团队安排',
      requirement5: '数学专业、计算机专业、电子信息专业及其相关专业以及有相关竞赛经验者优先',
      qrcode: ''
    })
  }
});

// 定义组件发出的事件
const emit = defineEmits(['back']);

// 处理返回按钮点击事件
const handleBack = () => {
  emit('back');
};
</script>

<style scoped>
.page {
  display: none;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #f5f5f5 !important;
}

.page.active {
  display: block;
  width: 100%;
}

.detail-header {
  height: 50px;
  box-sizing: border-box;
  background-color: #2595F6 !important;
}

.content-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding-top: 60px !important; 
  padding-bottom: 60px !important;
}

.qrcode-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.leading-relaxed {
  line-height: 1.5;
}
.rounded-lg {
  border-radius: 8px;
}
.rounded-full {
  border-radius: 9999px;
}
</style>