<template>
  <div class="message-board-container">
    <!-- 背景层 -->
    <div class="parallax-bg" ref="parallaxBg"></div>
    
    <!-- 遮罩层 -->
    <div class="message-board-overlay"></div>
    
    <!-- 内容层 -->
    <div class="message-board-content-wrapper">
      <h1 class="message-board-title">留言板</h1>
      <div class="message-board-content">
        <p>这里是留言板页面，您可以在这里留下您的想法和建议。</p>

        <!-- 返回主页按钮 -->
        <button class="back-button" @click="goBack">返回主页</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBoard',
  emits: ['backToHome'],
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
    }
  },
  mounted() {
    // 添加事件监听器
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('scroll', this.handleScroll);
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
  justify-content: center;
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

.message-board-content {
  text-align: center;
  font-size: 1.2rem;
  max-width: 600px;
}

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
</style>
