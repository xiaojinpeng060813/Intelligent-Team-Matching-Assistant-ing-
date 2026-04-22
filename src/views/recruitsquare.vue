<template>
  <div class="page px-4 bg-gray-50" :class="{ active: isActive && !showDetail }">
    <!-- 固定头部：包含标题和搜索筛选功能 -->
    <div class="fixed-header">
      <div class="text-center py-6">
        <h1 class="text-3xl font-bold">智能组队小助手</h1>
      </div>

      <!-- 搜索筛选栏 -->
      <div class="flex items-center gap-2 mb-6">
        <div class="relative flex-1">
          <!-- 搜索输入框 -->
          <input 
            type="text" 
            placeholder="搜索组队信息" 
            class="w-full py-2 px-10 rounded-search bg-gray-100 focus:outline-none text-base focus:border-primary"
            v-model="searchKey"
          >
          <i class="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
        </div>
        <!-- 筛选按钮 -->
        <button class="bg-primary text-white py-2 px-5 rounded-search flex items-center gap-1 cursor-pointer hover:opacity-80 transition" @click="showFilter = true">
          <i class="fa fa-filter text-xl"></i>
          <span class="text-lg font-medium">筛选</span>
        </button>
      </div>
    </div>

    <!-- 筛选弹窗 -->
    <div class="filter-mask" v-if="showFilter" @click="showFilter = false"></div>
    <div class="filter-popup" v-if="showFilter">
      <div class="filter-header flex justify-between items-center pb-3 border-b border-gray-200">
        <h3 class="text-lg font-bold">筛选标签</h3>
        <i class="fa fa-close text-gray-500 cursor-pointer" @click="showFilter = false"></i>
      </div>
      <div class="filter-content py-4">
        <div class="tag-list flex flex-wrap gap-3">
          <!-- 筛选标签选项 -->
          <div 
            class="tag-item"
            :class="activeTag === '全部' ? 'active' : ''"
            @click="activeTag = '全部'"
          >
            全部
          </div>
          <div 
            class="tag-item"
            :class="activeTag === '竞赛' ? 'active' : ''"
            @click="activeTag = '竞赛'"
          >
            竞赛
          </div>
          <div 
            class="tag-item"
            :class="activeTag === '考研' ? 'active' : ''"
            @click="activeTag = '考研'"
          >
            考研
          </div>
          <div 
            class="tag-item"
            :class="activeTag === '运动' ? 'active' : ''"
            @click="activeTag = '运动'"
          >
            运动
          </div>
        </div>
      </div>
      <div class="filter-footer flex gap-3">
        <button class="flex-1 py-2 border border-gray-200 rounded-search text-gray-600" @click="resetFilter">重置</button>
        <button class="flex-1 py-2 bg-primary text-white rounded-search" @click="confirmFilter">确认</button>
      </div>
    </div>

    <!-- 招募卡片列表 -->
    <div class="space-y-5 pb-10 content-wrapper">
      <!-- 使用RecruitCard组件渲染每个招募信息 -->
      <RecruitCard 
        v-for="item in filterdList" 
        :key="item.id" 
        :item="item" 
        @card-click="handleCardClick(item)"
      />
      <!-- 空状态提示 -->
      <div v-if="filterdList.length === 0" class="empty-state">
        <i class="fa fa-folder-open text-gray-300 text-4xl"></i>
        <p class="text-gray-500 mt-2">暂无匹配的组队信息</p>
      </div>
    </div>
  </div>

  <!-- 招募详情页：当点击卡片时显示 -->
  <RecruitDetail 
    :isActive="showDetail" 
    :detailInfo="currentDetail" 
    @back="showDetail = false"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import RecruitCard from '@/components/recruitcard.vue';
import RecruitDetail from '@/views/RecruitDetail.vue';
import { RECRUIT_CARD_LIST } from '@/constant/index.js';

// 接收父组件传入的页面激活状态
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

// 招募列表原始数据
const recruitCardList = RECRUIT_CARD_LIST;
// 搜索关键词
const searchKey = ref('');
// 筛选弹窗显示状态
const showFilter = ref(false);
// 当前选中的标签
const activeTag = ref('全部');
// 详情页显示状态
const showDetail = ref(false);
// 当前详情页显示的数据
const currentDetail = ref({});

// 计算属性：根据标签筛选和搜索关键词过滤列表
const filterdList = computed(() => {
  let list = recruitCardList;
  
  // 标签筛选：如果不是"全部"，则筛选对应标签
  if (activeTag.value !== '全部') {
    list = list.filter(item => item.tag === activeTag.value);
  }
  
  // 关键词搜索：如果存在搜索关键词，则在标题、描述和标签中搜索
  if (searchKey.value) {
    const key = searchKey.value.trim().toLowerCase();
    list = list.filter(item => 
      item.title.toLowerCase().includes(key) || 
      item.desc.toLowerCase().includes(key) || 
      item.tag.toLowerCase().includes(key)
    );
  }
  
  return list;
});

// 重置筛选条件
const resetFilter = () => {
  activeTag.value = '全部';
};

// 确认筛选，关闭弹窗
const confirmFilter = () => {
  showFilter.value = false;
};

// 处理卡片点击事件：显示详情页
const handleCardClick = (item) => {
  currentDetail.value = item;
  showDetail.value = true;
};
</script>

<style scoped>
.page {
  display: none;
  min-height: 100vh;
}
.page.active {
  display: block;
  width: 100%;
}
.bg-primary {
  background-color: var(--color-primary) !important;
}
.cursor-pointer {
  cursor: pointer;
}
.transition {
  transition: all 0.2s ease;
}
.opacity-80 {
  opacity: 0.8;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f9fafb;
  z-index: 99;
  padding: 0 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  margin-bottom: 0;
}

.content-wrapper {
  padding-top: 165px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.filter-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
}
.filter-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top-left-radius: var(--radius-search);
  border-top-right-radius: var(--radius-search);
  padding: 16px;
  z-index: 1001;
}
.filter-header {
  margin-bottom: 8px;
}
.tag-list {
  padding: 8px 0;
}
.tag-item {
  padding: 8px 16px;
  background: #f5f5f5;
  border-radius: var(--radius-search);
  cursor: pointer;
  font-size: 14px;
}
.tag-item.active {
  background: #409eff;
  color: white;
}
.filter-footer {
  margin-top: 16px;
}
.rounded-search {
  border-radius: var(--radius-search) !important;
}
</style>