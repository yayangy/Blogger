<template>
  <div class="password-login-container">
    <div class="login-box">
      <div class="login-header">
        <button @click="handleBack" class="back-button">
          <i i-ant-design-left-circle-outlined /> 返回主页
        </button>
        <h1>后台管理系统</h1>
        <p>请输入密码以访问后台管理</p>
      </div>
      
      <div class="login-form">
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="请输入密码"
            @keyup.enter="validatePassword"
            class="password-input"
          />
        </div>
        
        <div class="form-actions">
          <button @click="validatePassword" class="login-button">
            登录
          </button>
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import MessageService from '../services/MessageService.js'

const password = ref('')
const errorMessage = ref('')
const isAuthenticated = ref(false)
const correctPassword = ref('')

// 处理返回主页
const handleBack = () => {
  window.location.reload()
}

// 获取数据库中第一条留言，生成正确的密码
const getFirstMessage = async () => {
  try {
    const messages = await MessageService.getAllMessages()
    if (messages && messages.length > 0) {
      const firstMessage = messages[0]
      // 密码是第一个留言的用户名和留言内容的拼接
      correctPassword.value = firstMessage.username + firstMessage.content
      console.log('正确的密码已生成')
    } else {
      console.log('数据库中没有留言记录')
      errorMessage.value = '无法获取验证信息，请稍后再试'
    }
  } catch (error) {
    console.error('获取留言失败:', error)
    errorMessage.value = '无法连接到服务器，请稍后再试'
  }
}

// 验证密码
const validatePassword = () => {
  if (!password.value) {
    errorMessage.value = '请输入密码'
    return
  }
  
  if (password.value === correctPassword.value) {
    errorMessage.value = ''
    console.log('密码验证通过，准备跳转到后台管理页面')
    
    // 在本地存储中设置验证状态（添加存在性检查）
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('adminAuthenticated', 'true')
    }
    
    // 跳转到后台管理页面
    // 由于没有使用vue-router，我们通过URL参数控制显示哪个组件
    window.location.hash = '#admin-panel'
    window.location.reload()
  } else {
    errorMessage.value = '密码错误，请重新输入'
    password.value = ''
  }
}

// 组件挂载时获取第一条留言
onMounted(() => {
  console.log('密码验证页面已加载')
  getFirstMessage()
})
</script>

<style scoped>
/* 密码登录界面样式 */
.password-login-container {
  min-height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  margin: 10px 0;
  color: #1890ff;
  font-size: 24px;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

.back-button {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
  position: absolute;
  top: 10px;
  left: 10px;
}

.back-button:hover {
  color: #1890ff;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.password-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.password-input:focus {
  outline: none;
  border-color: #1890ff;
}

.form-actions {
  margin-bottom: 15px;
}

.login-button {
  width: 100%;
  padding: 12px;
  background: #1890ff;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background: #40a9ff;
}

.error-message {
  color: #ff4d4f;
  font-size: 14px;
  text-align: center;
}
</style>