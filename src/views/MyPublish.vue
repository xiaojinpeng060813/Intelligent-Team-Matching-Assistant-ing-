<template>
  <div class="page bg-gray-50" :class="{ active: isActive }">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <i class="fa fa-arrow-left back-icon" @click="handleBack"></i>
      <h2 class="nav-title">我的发布</h2>
    </div>

    <!-- 发布卡片列表 -->
    <div class="content-wrapper">
      <div class="publish-card" v-for="item in publishList" :key="item.id">
        <div class="card-header">
          <div class="header-left">
            <div class="trophy-box">
              <i class="fa fa-trophy trophy-icon"></i>
            </div>
            <div class="title-wrap">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-time">{{ item.time }}</p>
            </div>
          </div>
          <div class="header-right">
            <span class="tag-competition">{{ item.tag }}</span>
            <span class="tag-count">{{ item.count }}</span>
          </div>
        </div>
        <div class="card-content">
          <p class="content-text">{{ item.desc }}</p>
          <i class="fa fa-angle-right content-arrow"></i>
        </div>
        <div class="card-footer">
          <div class="user-info">
            <div class="avatar">{{ item.userName.charAt(0) }}</div>
            <div class="user-detail">
              <p class="user-name">{{ item.userName }}</p>
              <p class="user-major">{{ item.userMajor }}</p>
            </div>
          </div>
          <button class="delete-btn" @click="handleDelete(item.id)">
            <i class="fa fa-trash-o"></i>删除
          </button>
        </div>
      </div>

      <!-- 空状态 -->
      <div class="empty-state" v-if="publishList.length === 0">
        <i class="fa fa-paper-plane-o empty-icon"></i>
        <p class="empty-text">暂无发布的招募信息</p>
        <button class="empty-btn" @click="handleAddPublish">去发布</button>
      </div>
    </div>

    <!-- 发布按钮 -->
    <div class="publish-btn" @click="handleAddPublish">
      <i class="fa fa-paper-plane publish-icon"></i>
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
const emit = defineEmits(['change-page', 'goto-publish-form']);

// 发布列表数据
const publishList = ref([]);

// --- 模拟数据 (Mock Data) ---
// 用于在没有后端 API 的情况下展示页面效果
const mockData = [
  {
    id: 1,
    title: '寻找前端开发队友',
    time: '2023-10-24 14:30',
    tag: '编程开发',
    count: '2/4人',
    desc: '我们需要一位熟悉Vue3和Tailwind CSS的同学加入我们的团队，一起完成期末大作业。',
    userName: '张三',
    userMajor: '计算机科学与技术'
  },
  {
    id: 2,
    title: '商业计划书合伙人',
    time: '2023-10-23 09:15',
    tag: '创新创业',
    count: '1/3人',
    desc: '创业项目寻找市场营销方向的合伙人，有相关比赛经验者优先。',
    userName: '李四',
    userMajor: '工商管理'
  }
];

// 初始化加载模拟数据
publishList.value = mockData;

// 返回个人中心
const handleBack = () => {
  console.log('点击返回，切回个人中心');
  emit('change-page', 3);
};

// 新增发布 - 跳转到发布表单页面
const handleAddPublish = () => {
  // 添加点击动画效果
  const btn = document.querySelector('.publish-btn');
  if (btn) {
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 150);
  }

  // 跳转到发布表单页面
  emit('goto-publish-form');
};

// 删除发布 (仅前端模拟删除)
const handleDelete = (id) => {
  if (confirm('确定要删除这条发布吗？')) {
    // 模拟删除逻辑，仅在前端数组中移除
    console.log('模拟删除 ID:', id);
    publishList.value = publishList.value.filter(item => item.id !== id);
    // 注意：这里没有调用后端 API
  }
};
</script>

<style scoped>
.page {
  display: none;
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}
.page.active {
  display: block;
  width: 100%;
}

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #9333ea;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  z-index: 99;
}
.back-icon {
  font-size: 20px;
  cursor: pointer;
  margin-right: 15px;
}
.nav-title {
  font-size: 19px;
  font-weight: 600;
}

.content-wrapper {
  padding: 70px 16px 80px;
  box-sizing: border-box;
}

.publish-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}
.header-left {
  display: flex;
  align-items: flex-start;
}
.trophy-box {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
}
.trophy-icon {
  color: #fff;
  font-size: 16px;
}
.title-wrap {
  margin-left: 12px;
}
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
}
.card-time {
  font-size: 12px;
  color: #9ca3af;
  margin: 4px 0 0 0;
}
.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}
.tag-competition {
  font-size: 12px;
  background-color: #fef2f2;
  color: #dc2626;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 500;
}
.tag-count {
  font-size: 12px;
  background-color: #f0f9ff;
  color: #0369a1;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 500;
}
.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 10px;
}
.content-text {
  flex: 1;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  box-orient: vertical;
  overflow: hidden;
  display: box;
}
.content-arrow {
  color: #d1d5db;
  font-size: 18px;
  margin-left: 10px;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
}
.user-info {
  display: flex;
  align-items: center;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #2563eb;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
.user-detail {
  margin-left: 10px;
}
.user-name {
  font-size: 15px;
  color: #1f2937;
  margin: 0;
  font-weight: 500;
}
.user-major {
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0 0;
}
.delete-btn {
  font-size: 12px;
  background-color: #fef2f2;
  color: #dc2626;
  border: none;
  padding: 5px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.delete-btn:hover {
  background-color: #fee2e2;
}
.delete-btn .fa-trash-o {
  margin-right: 4px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}
.empty-icon {
  font-size: 64px;
  color: #e5e7eb;
}
.empty-text {
  font-size: 14px;
  color: #6b7280;
  margin-top: 8px;
}
.empty-btn {
  font-size: 14px;
  color: #409eff;
  border: none;
  background: none;
  margin-top: 16px;
  cursor: pointer;
}

.publish-btn {
  position: fixed;
  bottom: 120px;
  right: 30px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
  cursor: pointer;
  z-index: 98;
  transition: all 0.2s ease;
  padding: 0;
  border: none;
  box-sizing: border-box;
  outline: none;
}
.publish-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.5);
}
.publish-btn:active {
  transform: scale(0.95);
}
.publish-icon {
  font-size: 30px;
  color: #fff;
  line-height: 0;
  margin: 0;
  display: block;
  transform: translate(-3px, 0);
}
</style>