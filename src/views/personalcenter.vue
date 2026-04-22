<template>
  <div class="page bg-gray-50" :class="{ active: isActive }">
    <!-- 顶部标题栏 -->
    <div class="bg-purple-600 text-white py-4 px-4 flex items-center w-full fixed top-0 left-0 z-50">
      <i class="fa fa-user text-3xl mr-3"></i>
      <h2 class="text-xl font-bold">个人中心</h2>
    </div>

    <div class="content-wrapper px-4 pt-16">
      <!-- 个人信息卡片 -->
      <div class="bg-white mt-4 p-4 rounded-card shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-14 h-14 rounded-lg bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
              刘
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-bold">刘同学</h3>
              <p class="text-xs text-gray-500">大二 | 学号：2414020121</p>
              <p class="text-xs text-gray-500">计算机科学与技术 | 计算机科学与工程学院</p>
            </div>
          </div>
          <i class="fa fa-pencil text-gray-400 text-xl cursor-pointer" @click="handleEditResume"></i>
        </div>

        <div class="flex justify-between mt-5 mb-5">
          <div class="text-center">
            <p class="text-2xl font-bold text-red-500">3.92</p>
            <p class="text-xs text-gray-500">GPA绩点</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-red-500">1/124</p>
            <p class="text-xs text-gray-500">专业排名</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-red-500">1/124</p>
            <p class="text-xs text-gray-500">综测排名</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-5">
          <span class="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">Python</span>
          <span class="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">C语言</span>
          <span class="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">C++</span>
          <span class="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">数据分析</span>
          <span class="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">JavaScript</span>
        </div>
      </div>

      <!-- AI智能总结卡片 -->
      <div class="bg-white mt-4 p-4 rounded-card shadow-sm border-l-4 border-blue-500">
        <h3 class="text-lg font-bold text-blue-600 mb-2 flex items-center">
          <i class="fa fa-lightbulb-o mr-2"></i>AI智能总结
        </h3>
        <p class="text-sm text-blue-500 leading-relaxed">
          刘同学为湖南科技大学计算机科学与技术专业大二学生，学业成绩优异，GPA3.92，专业与综测均排名第一。他熟练掌握多种编程语言与数据分析技能，在全国大学生数学竞赛、数学建模竞赛、ACM-ICPC等高水准赛事中多次斩获国家级、省部级奖项，兼具出色的学习能力与实践竞赛能力。
        </p>
      </div>

      <!-- 获奖成果卡片 -->
      <div class="bg-white mt-4 p-4 rounded-card shadow-sm">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-base font-bold">获奖成果</h3>
          <span class="text-xs text-blue-500 flex items-center cursor-pointer">
            查看全部 <i class="fa fa-angle-right ml-1"></i>
          </span>
        </div>
        <div class="space-y-3">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <i class="fa fa-trophy"></i>
            </div>
            <div class="ml-2 flex-1">
              <p class="text-sm font-medium">全国大学生数学竞赛</p>
              <p class="text-xs text-gray-500">国家级二等奖 | 2025年</p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <i class="fa fa-certificate"></i>
            </div>
            <div class="ml-2 flex-1">
              <p class="text-sm font-medium">全国大学生数学建模大赛</p>
              <p class="text-xs text-gray-500">省部级一等奖 | 2025年</p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <i class="fa fa-code"></i>
            </div>
            <div class="ml-2 flex-1">
              <p class="text-sm font-medium">ACM-ICPC国际大学生程序设计竞赛</p>
              <p class="text-xs text-gray-500">省部级二等奖 | 2025年</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能菜单 -->
      <div class="bg-white mt-4 p-4 rounded-card shadow-sm space-y-3">
        <div class="flex items-center justify-between py-2 border-b border-gray-100 cursor-pointer" @click="handleEditResume">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <i class="fa fa-file-text-o"></i>
            </div>
            <span class="ml-3 text-base">编辑简历</span>
          </div>
          <i class="fa fa-angle-right text-gray-400"></i>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-gray-100 cursor-pointer" @click="handleGotoMyPublish">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <i class="fa fa-paper-plane-o"></i>
            </div>
            <span class="ml-3 text-base">我的发布</span>
          </div>
          <i class="fa fa-angle-right text-gray-400"></i>
        </div>
        <div class="flex items-center justify-between py-2 cursor-pointer" @click="handleGotoFeedback">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <i class="fa fa-question-circle"></i>
            </div>
            <span class="ml-3 text-base">反馈</span>
          </div>
          <i class="fa fa-angle-right text-gray-400"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 接收父组件传入的页面激活状态
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

// 定义组件发出的事件
const emit = defineEmits(['goto-modify-resume', 'goto-feedback', 'goto-mypublish']);

// 编辑简历：跳转到修改简历页面
const handleEditResume = () => {
  emit('goto-modify-resume');
};

// 跳转反馈页面
const handleGotoFeedback = () => {
  emit('goto-feedback');
};

// 跳转我的发布页面
const handleGotoMyPublish = () => {
  emit('goto-mypublish');
};
</script>

<style scoped>
.page {
  display: none;
  min-height: 100vh;
  overflow-x: hidden;
}
.page.active {
  display: block;
  width: 100%;
}
.content-wrapper {
  width: 100%;
  box-sizing: border-box;
}
.leading-relaxed {
  line-height: 1.6;
}
.cursor-pointer {
  cursor: pointer;
  transition: color 0.2s ease;
}
.cursor-pointer:hover {
  color: var(--color-primary);
}
.rounded-card {
  border-radius: 8px;
}
</style>