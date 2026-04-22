<template>
  <div class="bottom-nav rounded-t-nav py-3 px-6 shadow-md">
    <div class="flex justify-around items-center">
      <!-- 招聘广场导航项 -->
      <div 
        class="nav-item flex flex-col items-center justify-center"
        :class="activePage === 1 ? 'nav-active' : 'nav-inactive'"
        @click="handleNavClick(1)"
      >
        <div class="icon-wrapper mb-1">
          <i class="fa fa-home text-5xl"></i>
        </div>
        <span class="text-base font-bold">招聘广场</span>
      </div>
      <!-- 智能推荐导航项 -->
      <div 
        class="nav-item flex flex-col items-center justify-center"
        :class="activePage === 2 ? 'nav-active' : 'nav-inactive'"
        @click="handleNavClick(2)"
      >
        <div class="icon-wrapper mb-1">
          <i class="fa fa-random text-5xl"></i>
        </div>
        <span class="text-base font-bold">智能推荐</span>
      </div>
      <!-- 个人信息导航项 -->
      <div 
        class="nav-item flex flex-col items-center justify-center"
        :class="activePage === 3 ? 'nav-active' : 'nav-inactive'"
        @click="handleNavClick(3)"
      >
        <div class="icon-wrapper mb-1">
          <i class="fa fa-user text-5xl"></i>
        </div>
        <span class="text-base font-bold">个人信息</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 接收父组件传入的当前激活页面
const props = defineProps({
  activePage: {
    type: Number,
    default: 1
  }
});

// 定义组件发出的事件
const emit = defineEmits(['change-page']);

// 处理导航项点击事件
const handleNavClick = (pageNum) => {
  emit('change-page', pageNum);
};
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 999;
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1px solid #f0f0f0;
}

.nav-item {
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px 0;
  width: 80px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-wrapper {
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px !important;
}

.nav-active {
  color: #409eff;
  transform: scale(1.05);
  font-weight: bold;
}

.nav-inactive {
  color: #999;
  font-weight: bold;
}

.nav-item:hover {
  color: #409eff;
}

.text-5xl {
  font-size: 32px !important;
}

.text-base {
  font-size: 16px !important;
  font-family: "Alibaba PuHuiTi", "Microsoft YaHei", "PingFang SC", sans-serif;
  font-weight: lighter;
}
</style>