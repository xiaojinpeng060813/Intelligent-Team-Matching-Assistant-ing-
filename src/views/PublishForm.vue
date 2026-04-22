<template>
  <div class="publish-form-page" :class="{ active: isActive }">
    <div class="top-nav">
      <i class="fa fa-arrow-left back-icon" @click="handleCancel"></i>
      <h2 class="nav-title">发布招募</h2>
      <button class="submit-btn" @click="handleSubmit" :disabled="isSubmitting">
        <i v-if="isSubmitting" class="fa fa-spinner fa-spin mr-2"></i>
        {{ isSubmitting ? '发布中...' : '发布' }}
      </button>
    </div>

    <div class="form-content">
      <div class="form-group">
        <label class="form-label">招募标题 *</label>
        <input 
          type="text" 
          class="form-input" 
          placeholder="请输入招募标题，如：全国大学生数学建模大赛"
          v-model="formData.title"
          @focus="onFocus('title')"
          @blur="onBlur('title')"
        />
        <transition name="fade">
          <small v-if="focusedField === 'title'" class="helper-text">请输入清晰明确的招募标题</small>
        </transition>
      </div>

      <div class="form-group">
        <label class="form-label">标签分类 *</label>
        <div class="tag-selector">
          <div 
            v-for="tag in availableTags" 
            :key="tag.value"
            class="tag-option"
            :class="{ active: formData.tag === tag.value }"
            @click="selectTag(tag.value)"
            @mouseenter="hoveredTag = tag.value"
            @mouseleave="hoveredTag = null"
          >
            <i :class="`fa ${tag.icon} mr-2`"></i>
            {{ tag.label }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">招募详情 *</label>
        <textarea 
          class="form-textarea" 
          placeholder="请详细描述招募信息，如：组建团队参加2026年全国大学生数学建模竞赛..."
          v-model="formData.desc"
          @focus="onFocus('desc')"
          @blur="onBlur('desc')"
          :maxlength="maxLength.desc"
        ></textarea>
        <div class="char-counter">{{ formData.desc.length }}/{{ maxLength.desc }}</div>
        <transition name="fade">
          <small v-if="focusedField === 'desc'" class="helper-text">详细描述招募信息，包括活动目的、计划安排等</small>
        </transition>
      </div>

      <div class="form-group">
        <label class="form-label">队员要求 *</label>
        <div class="requirement-list">
          <div 
            class="requirement-item"
            v-for="(req, index) in formData.requirements" 
            :key="index"
            :class="{ shake: shakeIndex === index }"
          >
            <input
              type="text"
              class="form-input req-input"
              placeholder="例如：熟悉Python编程"
              v-model="req.content"
              @keydown.enter="addRequirementIfFilled(index)"
              @input="addRequirementIfFilled(index)"
            />
            <button 
              class="remove-req-btn"
              @click="removeRequirement(index)"
              @mouseenter="hoveredRemoveBtn = index"
              @mouseleave="hoveredRemoveBtn = null"
            >
              <i class="fa fa-minus" v-if="hoveredRemoveBtn === index"></i>
              <i class="fa fa-times" v-else></i>
            </button>
          </div>
        </div>
        <button class="add-req-btn" @click="addRequirement">
          <i class="fa fa-plus mr-2"></i> 添加要求
        </button>
      </div>

      <div class="form-group upload-section">
        <label class="form-label">联系方式二维码</label>
        <div 
          class="upload-area"
          @click="triggerFileSelect"
          @dragover.prevent="handleDragOver"
          @drop.prevent="handleDrop"
          :class="{ 'drag-over': isDragOver }"
          :style="{ backgroundImage: formData.qrcode ? `url(${formData.qrcode})` : 'none' }"
        >
          <div v-if="!formData.qrcode" class="upload-placeholder">
            <i class="fa fa-2x fa-qrcode mb-2" style="color: #c5c8ce;"></i>
            <p class="upload-text">点击上传或拖拽图片</p>
          </div>
          <div v-else class="qrcode-preview">
            <img 
              :src="formData.qrcode" 
              alt="二维码" 
              class="qrcode-img"
              @load="onImageLoad"
            />
            <button class="remove-qrcode" @click.stop="removeQRCode">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>
        <input 
          type="file" 
          ref="fileInputRef"
          accept="image/*"
          @change="handleImageUpload"
          style="display: none;"
        />
      </div>

      <div class="form-group preview-section">
        <label class="form-label">发布预览</label>
        <div 
          class="preview-card"
          :class="{ 'updated-preview': previewUpdated }"
        >
          <div class="preview-header">
            <div class="preview-icon">
              <i 
                :class="getTagIcon(formData.tag)" 
                :style="{ color: getTagColor(formData.tag) }"
              ></i>
            </div>
            <div class="preview-title-wrap">
              <h3 class="preview-card-title">{{ formData.title || '未填写标题' }}</h3>
              <p class="preview-time">刚刚</p>
            </div>
            <div class="preview-tags">
              <span 
                class="preview-tag" 
                :style="{ backgroundColor: getTagColor(formData.tag), color: '#fff' }"
              >
                {{ getTagLabel(formData.tag) }}
              </span>
              <span class="preview-count">0/3</span>
            </div>
          </div>
          
          <p class="preview-desc">{{ formData.desc || '未填写详情' }}</p>
          
          <div class="preview-footer">
            <div class="preview-user">
              <div class="preview-avatar">{{ userInfo.name.charAt(0) }}</div>
              <div>
                <p class="preview-user-name">{{ userInfo.name }}</p>
                <p class="preview-user-major">{{ userInfo.major }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, reactive, watch } from 'vue';

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['cancel', 'submit', 'change-page']);

const userInfo = reactive({
  name: '张同学',
  major: '计算机科学与技术 · 大三',
  skills: ['Python', 'C语言', 'C++', '数据分析', 'JavaScript']
});

const formData = reactive({
  title: '',
  tag: '竞赛', // 默认值
  desc: '',
  requirements: [
    { content: '' }
  ],
  qrcode: null
});

const isSubmitting = ref(false);
const focusedField = ref(null);
const hoveredTag = ref(null);
const hoveredRemoveBtn = ref(null);
const isDragOver = ref(false);
const shakeIndex = ref(-1);
const previewUpdated = ref(false);
const fileInputRef = ref(null);

const maxLength = {
  desc: 500
};

const availableTags = [
  { value: '竞赛', label: '竞赛', icon: 'fa-trophy' },
  { value: '考研', label: '考研', icon: 'fa-book' },
  { value: '运动', label: '运动', icon: 'fa-futbol-o' }
];

watch(formData, () => {
  previewUpdated.value = true;
  setTimeout(() => {
    previewUpdated.value = false;
  }, 300);
}, { deep: true });

const onFocus = (field) => {
  focusedField.value = field;
};

const onBlur = (field) => {
  focusedField.value = null;
};

const selectTag = (tagValue) => {
  formData.tag = tagValue;
  document.querySelector('.tag-selector').animate(
    [
      { transform: 'scale(0.95)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ],
    { duration: 200, easing: 'ease-out' }
  );
};

const addRequirement = () => {
  formData.requirements.push({ content: '' });
  setTimeout(() => {
    const inputs = document.querySelectorAll('.requirement-item input');
    if (inputs.length > 0) {
      inputs[inputs.length - 1].focus();
    }
  }, 50);
};

const addRequirementIfFilled = (index) => {
  if (formData.requirements[index].content.trim() !== '') {
    addRequirement();
  }
};

const removeRequirement = (index) => {
  if (formData.requirements.length <= 1) return;
  
  shakeIndex.value = index;
  setTimeout(() => {
    formData.requirements.splice(index, 1);
    shakeIndex.value = -1;
  }, 500);
};

const triggerFileSelect = () => {
  fileInputRef.value.click();
};

const handleDragOver = () => {
  isDragOver.value = true;
};

const handleDrop = (e) => {
  isDragOver.value = false;
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    processImage(file);
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    processImage(file);
  }
};

const processImage = (file) => {
  if (!file.type.match('image.*')) {
    alert('请选择图片文件！');
    return;
  }
  
  if (file.size > 2 * 1024 * 1024) {
    alert('图片大小不能超过2MB！');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    formData.qrcode = e.target.result;
  };
  reader.readAsDataURL(file);
};

const onImageLoad = () => {
  const imgElement = document.querySelector('.qrcode-img');
  if (imgElement) {
    imgElement.animate(
      [
        { opacity: 0.5 },
        { opacity: 1 }
      ],
      { duration: 300, easing: 'ease-out' }
    );
  }
};

const removeQRCode = () => {
  formData.qrcode = null;
};

const getTagIcon = (tag) => {
  const tagObj = availableTags.find(t => t.value === tag);
  return tagObj ? tagObj.icon : 'fa-tag';
};

const getTagColor = (tag) => {
  const colors = {
    '竞赛': '#67c23a',
    '考研': '#e6a23c',
    '运动': '#f56c6c'
  };
  return colors[tag] || '#909399';
};

const getTagLabel = (tag) => {
  const tagObj = availableTags.find(t => t.value === tag);
  return tagObj ? tagObj.label : tag;
};

const handleCancel = () => {
  document.querySelector('.publish-form-page').animate(
    [
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(-100%)', opacity: 0.8 }
    ],
    { duration: 300, easing: 'ease-in-out' }
  );
  emit('change-page', 6);
};

const handleSubmit = async () => {
  if (!formData.title.trim()) {
    alert('请输入招募标题');
    document.querySelector('.form-input[type="text"]').animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 300, iterations: 1 }
    );
    return;
  }
  
  if (!formData.desc.trim()) {
    alert('请输入招募详情');
    return;
  }
  
  if (formData.requirements.some(req => !req.content.trim())) {
    alert('请完善队员要求');
    return;
  }

  isSubmitting.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const submitData = {
      ...formData,
      userName: userInfo.name,
      userMajor: userInfo.major,
      time: '刚刚',
      count: '0/3',
      id: Date.now()
    };
    
    emit('submit', submitData);
    
    document.querySelector('.publish-form-page').animate(
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.02)', opacity: 0.9 },
        { transform: 'scale(1)', opacity: 1 }
      ],
      { duration: 500, easing: 'ease-out' }
    );
    
    alert('发布成功！');
    
    emit('change-page', 6);
  } catch (error) {
    alert('发布失败，请稍后重试');
    console.error('发布错误:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
:global(html, body) {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  box-sizing: border-box;
}
* {
  box-sizing: border-box;
}

.publish-form-page {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 65px);
  background-color: #f9fafb;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  transition: transform 0.3s ease;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

.publish-form-page.active {
  display: block;
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
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  z-index: 99;
  transition: all 0.3s ease;
}

.back-icon {
  font-size: 20px;
  cursor: pointer;
  margin-right: 15px;
  transition: transform 0.2s ease;
}

.back-icon:hover {
  transform: scale(1.1);
}

.nav-title {
  font-size: 19px;
  font-weight: 600;
  flex: 1;
  text-align: center;
}

.submit-btn {
  font-size: 16px;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  transition: opacity 0.2s;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-content {
  padding: 70px 16px 20px;
  box-sizing: border-box;
}

.form-group {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.form-label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
  box-sizing: border-box;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.form-textarea:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.tag-selector {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tag-option {
  flex: 1;
  min-width: 100px;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-option.active {
  background-color: #e8f4fd;
  border-color: #409eff;
  color: #409eff;
}

.tag-option:hover {
  border-color: #409eff;
}

.requirement-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.req-input {
  flex: 1;
}

.remove-req-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  background: #fff;
  color: #f56c6c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-req-btn {
  width: 100%;
  padding: 8px;
  border: 1px dashed #e0e0e0;
  border-radius: 8px;
  background: #fff;
  color: #606266;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}

.add-req-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.upload-section {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-area {
  width: 120px;
  height: 120px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.2s ease;
}

.upload-area:hover,
.upload-area.drag-over {
  border-color: #409eff;
  background-color: #f8faff;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #c5c8ce;
}

.upload-text {
  font-size: 12px;
  margin: 0;
}

.qrcode-preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.qrcode-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.remove-qrcode {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f56c6c;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.preview-section {
  margin-top: 24px;
}

.preview-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.updated-preview {
  animation: highlight 0.5s ease;
}

@keyframes highlight {
  0% { box-shadow: 0 0 0 2px #409eff; }
  100% { box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08); }
}

.preview-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}

.preview-icon {
  font-size: 24px;
  margin-right: 12px;
}

.preview-title-wrap {
  flex: 1;
}

.preview-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
}

.preview-time {
  font-size: 12px;
  color: #9ca3af;
  margin: 4px 0 0 0;
}

.preview-tags {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.preview-tag {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 500;
}

.preview-count {
  font-size: 12px;
  background-color: #f0f9ff;
  color: #0369a1;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 500;
}

.preview-desc {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  box-orient: vertical;
  overflow: hidden;
}

.preview-footer {
  display: flex;
  align-items: center;
  border-top: 1px solid #f3f4f6;
  padding-top: 12px;
}

.preview-user {
  display: flex;
  align-items: center;
}

.preview-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #2563eb;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
}

.preview-user-name {
  font-size: 14px;
  color: #1f2937;
  margin: 0;
  font-weight: 500;
}

.preview-user-major {
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0 0;
}

.shake {
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.char-counter {
  font-size: 12px;
  color: #909399;
  text-align: right;
  margin-top: 4px;
}

.helper-text {
  font-size: 12px;
  color: #409eff;
  margin-top: 4px;
  display: block;
}
</style>