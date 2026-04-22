<template>
  <div class="bg-white rounded-card p-5 shadow-sm cursor-pointer" @click="handleCardClick">
    <!-- 卡片头部：包含图标、标题、时间和标签 -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center gap-3">
        <!-- 根据ID显示不同的图标 -->
        <div class="icon-container">
          <i class="fa fa-futbol-o text-tag运动" style="font-size: 28px !important;" v-if="item.id === 3"></i>
          <i class="fa fa-trophy text-tag竞赛" style="font-size: 28px !important;" v-if="item.id === 1"></i>
          <i class="fa fa-book text-tag考研" style="font-size: 28px !important;" v-if="item.id === 2"></i>
        </div>
        <div class="title-wrapper">
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <p class="text-textLight text-sm">{{ item.time }}</p>
        </div>
      </div>
      <!-- 标签和人数信息 -->
      <div class="text-right">
        <span :class="[`bg-${item.tagColor}`, 'text-white text-xs px-2 py-1 rounded']">
          {{ item.tag }}
        </span>
        <p class="text-gray-500 text-xs mt-1">{{ item.count }}</p>
      </div>
    </div>
    <!-- 描述信息 -->
    <p class="text-gray-600 mb-4" v-if="item.desc">{{ item.desc }}</p>
    <!-- 发布者信息 -->
    <div class="flex items-center gap-3 pt-3 border-t border-gray-100">
      <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
        {{ (item.name || '').charAt(0) }}
      </div>
      <div>
        <p class="font-medium">{{ item.name }}</p>
        <p class="text-gray-500 text-sm">{{ item.major }}</p>
      </div>
      <i class="fa fa-angle-right ml-auto text-gray-400 text-lg"></i>
    </div>
  </div>
</template>

<script setup>
// 定义组件接收的props
const props = defineProps({
  item: {
    type: Object,
    required: true, // 必须传入
    default: () => ({
      icon: 'fa-calendar',
      tagColor: 'tag竞赛',
      title: '默认标题',
      time: '2025-01-01',
      tag: '默认标签',
      count: '0人参与',
      desc: '',
      name: '默认姓名',
      major: '默认专业'
    })
  }
});

// 定义组件发出的事件
const emit = defineEmits(['card-click']);

// 处理卡片点击事件：触发父组件的card-click事件
const handleCardClick = () => {
  emit('card-click', props.item);
};
</script>

<style scoped>
.icon-container {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.title-wrapper {
  min-width: 0;
}
/* 标签/图标颜色配置 */
.text-tag竞赛 { color: #67c23a !important; }
.bg-tag竞赛 { background-color: #67c23a !important; }
.text-tag考研 { color: #67c23a !important; }
.bg-tag考研 { background-color: #e6a23c !important; }
.text-tag运动 { color: #f56c6c !important; }
.bg-tag运动 { background-color: #f56c6c !important; }
.bg-primary { background-color: #409eff !important; }
/* 文字溢出处理 */
h3, p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cursor-pointer {
  cursor: pointer;
}
.bg-white:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}
</style>