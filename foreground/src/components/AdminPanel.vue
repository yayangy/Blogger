<template>
  <div class="admin-dashboard">
    <div class="admin-header">
      <div class="header-top">
        <button @click="handleBack" class="back-button">
          <i i-ant-design-left-circle-outlined /> 返回主页
        </button>
      </div>
      <h1>后台管理系统</h1>
      <p>欢迎来到后台管理页面</p>
    </div>
    
    <div class="admin-content">
      <div class="admin-sidebar">
        <nav>
          <ul>
            <li><a href="#dashboard" @click.prevent="showDashboard" :class="{ active: activeSection === 'dashboard' }">仪表盘</a></li>
            <li><a href="#messages" @click.prevent="showMessageManagement" :class="{ active: activeSection === 'messages' }">留言管理</a></li>
            <li><a href="#settings" @click.prevent="showSettings" :class="{ active: activeSection === 'settings' }">系统设置</a></li>
          </ul>
        </nav>
      </div>
      
      <div class="admin-main">
        <div v-if="activeSection === 'dashboard'">
          <div class="admin-card">
            <h2>仪表盘</h2>
            <p>这里将显示系统的概览信息。</p>
          </div>
          
          <div class="admin-card">
            <h2>最新留言</h2>
            <p>留言管理功能已实现，请点击左侧菜单访问。</p>
          </div>
        </div>
        
        <div v-else-if="activeSection === 'messages'">
          <AdminMessageBoard />
        </div>
        
        <div v-else-if="activeSection === 'settings'">
          <div class="admin-card">
            <h2>系统设置</h2>
            <p>系统设置功能正在开发中...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminMessageBoard from './AdminMessageBoard.vue'

const activeSection = ref('dashboard')

// 处理返回主页
const handleBack = () => {
  // 清除认证状态
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('adminAuthenticated')
  }
  
  // 重置URL hash，确保返回到主页
  window.location.hash = ''
  
  // 刷新页面以应用更改
  window.location.reload()
}

// 显示仪表盘
const showDashboard = () => {
  window.location.hash = '#dashboard'
  activeSection.value = 'dashboard'
}

// 显示留言管理
const showMessageManagement = () => {
  window.location.hash = '#messages'
  activeSection.value = 'messages'
}

// 显示系统设置
const showSettings = () => {
  window.location.hash = '#settings'
  activeSection.value = 'settings'
}

// 监听URL hash变化
const handleHashChange = () => {
  const hash = window.location.hash
  if (hash === '#dashboard') {
    activeSection.value = 'dashboard'
  } else if (hash === '#messages') {
    activeSection.value = 'messages'
  } else if (hash === '#settings') {
    activeSection.value = 'settings'
  }
}

// 组件挂载时检查初始hash值
onMounted(() => {
  handleHashChange()
  window.addEventListener('hashchange', handleHashChange)
})
</script>

<style scoped>
/* 后台管理界面样式 */
.admin-dashboard {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.admin-header {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative;
}

.header-top {
  margin-bottom: 20px;
}

.admin-header h1 {
  margin: 0;
  color: #1890ff;
  font-size: 28px;
}

.admin-header p {
  margin-top: 10px;
  color: #666;
  font-size: 16px;
}

.admin-content {
  display: flex;
  gap: 20px;
}

.admin-sidebar {
  width: 200px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.admin-sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.admin-sidebar nav ul li {
  margin-bottom: 15px;
}

.admin-sidebar nav ul li a {
  display: block;
  padding: 15px 20px;
  color: #333;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s;
  font-weight: 500;
  font-size: 16px;
}

.admin-sidebar nav ul li a:hover {
  background-color: #e6f7ff;
  color: #1890ff;
  transform: translateX(5px);
}

/* 当前激活的导航项 */
.admin-sidebar nav ul li a.active {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: 600;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.admin-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.admin-card h2 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 20px;
}

.admin-card p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .admin-content {
    flex-direction: column;
  }
  
  .admin-sidebar {
    width: 100%;
  }
  
  .admin-sidebar nav ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .admin-sidebar nav ul li {
    margin-bottom: 0;
  }
}
</style>