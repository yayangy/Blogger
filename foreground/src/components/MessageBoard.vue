<template>
  <div class="message-board-container">
    <!-- 背景层 -->
    <div class="parallax-bg" ref="parallaxBg"></div>

    <!-- 遮罩层 -->
    <div class="message-board-overlay"></div>

    <!-- 内容层 -->
    <div class="message-board-content-wrapper">
      <h1 class="message-board-title">留言板</h1>

      <!-- 留言表单 -->
      <div class="message-form">
        <h2>留下您的留言</h2>
        <div class="form-group">
          <label for="username">用户名：</label>
          <input
            type="text"
            id="username"
            v-model="newMessage.username"
            placeholder="请输入您的用户名"
            maxlength="50"
          />
        </div>
        <div class="form-group">
          <label for="content">留言内容：</label>
          <textarea
            id="content"
            v-model="newMessage.content"
            placeholder="请输入您的留言内容"
            rows="4"
            maxlength="500"
          ></textarea>
        </div>
        <button class="submit-button" @click="submitMessage">提交留言</button>
      </div>

      <!-- 留言列表 -->
      <div class="message-list">
        <h2>留言列表</h2>
        <div class="message-item" v-for="message in messages" :key="message.id">
          <div class="message-header">
            <span class="username">{{ message.username }}</span>
            <span class="created-at">{{ formatDate(message.createdAt) }}</span>
          </div>
          <div class="message-content">{{ message.content }}</div>
        </div>
        <div v-if="messages.length === 0" class="empty-message">
          暂无留言，快来发布第一条留言吧！
        </div>
      </div>

      <!-- 返回主页按钮 -->
      <button class="back-button" @click="goBack">返回主页</button>
    </div>
  </div>
</template>

<script>
import MessageService from '../services/MessageService.js';

export default {
  name: 'MessageBoard',
  emits: ['backToHome'],
  data() {
    return {
      newMessage: {
        username: '',
        content: ''
      },
      messages: [],
      loading: false,
      error: null
    }
  },
  methods: {
    goBack() {
      // 通过emit事件通知父组件返回主页
      this.$emit('backToHome')
    },
    handleMouseMove(e) {
      // 获取鼠标位置
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;

      // 计算视差效果的移动距离（数值越大，效果越明显）
      const moveX = mouseX * 50; // 增大水平方向移动距离，增强视差效果
      const moveY = mouseY * 50; // 增大垂直方向移动距离，增强视差效果

      // 应用变换到背景元素
      if (this.$refs.parallaxBg) {
        this.$refs.parallaxBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    },
    handleScroll() {
      // 获取滚动位置
      const scrollY = window.scrollY;

      // 应用滚动视差效果
      if (this.$refs.parallaxBg) {
        // 滚动时背景以较慢速度移动，创造深度感
        const moveY = scrollY * 0.7; // 增大滚动视差效果
        this.$refs.parallaxBg.style.transform = `translateY(${moveY}px)`;
      }
    },
    // 加载所有留言
    async loadMessages() {
      this.loading = true;
      this.error = null;
      try {
        // 使用MessageService获取所有留言
        this.messages = await MessageService.getAllMessages();
        console.log('成功加载留言数:', this.messages.length);
      } catch (err) {
        this.error = '加载留言失败，请稍后再试';
        console.error('Failed to load messages:', err);
        console.error('错误详细信息:', err.message);
        // 检查是否是跨域错误
        if (err.message.includes('无法连接到后端服务')) {
          console.error('可能是跨域问题或后端服务未启动');
          this.error = '无法连接到后端服务，请检查后端是否已启动以及跨域设置';
        }
        this.messages = [];
      } finally {
        this.loading = false;
      }
    },
    // 提交留言
    async submitMessage() {
      // 简单验证
      if (!this.newMessage.username.trim()) {
        alert('请输入用户名');
        return;
      }
      if (!this.newMessage.content.trim()) {
        alert('请输入留言内容');
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        console.log('准备提交留言:', this.newMessage);
        // 使用MessageService提交留言
        const savedMessage = await MessageService.createMessage(this.newMessage);
        console.log('成功保存留言:', savedMessage);

        // 将新留言添加到列表顶部
        this.messages.unshift(savedMessage);

        // 清空表单
        this.newMessage = { username: '', content: '' };

        alert('留言提交成功！');

        // 重新加载留言列表，确保数据最新
        this.loadMessages();
      } catch (err) {
        this.error = '提交留言失败，请稍后再试';
        console.error('Failed to submit message:', err);
        console.error('错误详细信息:', err.message);
        // 检查是否是跨域错误
        if (err.message.includes('无法连接到后端服务')) {
          console.error('可能是跨域问题或后端服务未启动');
          this.error = '无法连接到后端服务，请检查后端是否已启动以及跨域设置';
        }
        alert('提交留言失败，请确保后端服务已启动\n错误信息：' + err.message);
      } finally {
        this.loading = false;
      }
    },
    // 格式化日期
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  mounted() {
    // 添加事件监听器
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('scroll', this.handleScroll);

    // 加载留言
    this.loadMessages();
  },
  beforeUnmount() {
    // 移除事件监听器，防止内存泄漏
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
.message-board-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 背景层 */
.parallax-bg {
  position: absolute;
  top: -15%; /* 向上偏移，增加顶部和底部的可视区域 */
  left: -15%; /* 向左偏移，增加左侧可视区域，防止空白出现 */
  width: 140%; /* 进一步增大背景图尺寸，确保在任何视差移动下都不会出现空白 */
  height: 140%;
  background-image: url('@/assets/images/HD.jpg');
  background-size: cover;
  background-position: center;
  z-index: 1;
  transition: transform 0.1s ease-out; /* 平滑过渡 */
  will-change: transform; /* 性能优化 */
  transform-origin: center center; /* 设置变换原点为中心 */
}

/* 遮罩层 */
.message-board-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

/* 内容层 */
.message-board-content-wrapper {
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 800px;
  width: 100%;
  padding: 20px;
}

/* 增加内容的层次感 */
.message-board-content-wrapper {
  transform: translateZ(1px);
}

.message-board-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: bold;
}

/* 留言表单样式 */
.message-form {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
}

.message-form h2 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.15);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

/* 提交按钮样式 */
.submit-button {
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* 留言列表样式 */
.message-list {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  max-height: 500px;
  overflow-y: auto;
}

.message-list h2 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5rem;
}

.message-item {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  text-align: left;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
  color: #f0f0f0;
}

.created-at {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.message-content {
  line-height: 1.6;
  word-break: break-word;
}

.empty-message {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  padding: 40px 0;
}

/* 滚动条样式 */
.message-list::-webkit-scrollbar {
  width: 8px;
}

.message-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.message-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.message-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* 返回按钮样式 */
.back-button {
  margin-top: 2rem;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* 加载状态样式 */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .message-board-title {
    font-size: 2rem;
  }

  .message-board-content-wrapper {
    padding: 10px;
  }

  .message-form, .message-list {
    padding: 15px;
  }
}
</style>
