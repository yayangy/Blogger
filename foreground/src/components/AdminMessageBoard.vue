<template>
  <div class="admin-message-board">
    <h2>留言管理</h2>
    
    <!-- 留言表单 -->
    <div class="message-form">
      <h3>添加新留言</h3>
      <div class="form-group">
        <label for="admin-username">用户名：</label>
        <input
          type="text"
          id="admin-username"
          v-model="newMessage.username"
          placeholder="请输入用户名"
          maxlength="50"
        />
      </div>
      <div class="form-group">
        <label for="admin-content">留言内容：</label>
        <textarea
          id="admin-content"
          v-model="newMessage.content"
          placeholder="请输入留言内容"
          rows="4"
          maxlength="500"
        ></textarea>
      </div>
      <button class="submit-button" @click="submitMessage" :disabled="loading">
        {{ loading ? '提交中...' : '提交留言' }}
      </button>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>

    <!-- 留言列表 -->
    <div class="message-list">
      <h3>留言列表</h3>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="messages.length === 0" class="empty-message">暂无留言</div>
      <div v-else>
        <div class="message-item" v-for="message in messages" :key="message.id">
          <div class="message-header">
            <span class="username">{{ message.username }}</span>
            <span class="created-at">{{ formatDate(message.createdAt) }}</span>
            <button 
              class="delete-button" 
              @click="deleteMessage(message.id)"
              :disabled="deletingIds.includes(message.id)"
            >
              {{ deletingIds.includes(message.id) ? '删除中...' : '删除' }}
            </button>
          </div>
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MessageService from '../services/MessageService.js'

const messages = ref([])
const newMessage = ref({ username: '', content: '' })
const loading = ref(false)
const deletingIds = ref([])
const error = ref('')

// 加载所有留言
const loadMessages = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await MessageService.getAllMessages()
    messages.value = data
  } catch (err) {
    error.value = '加载留言失败: ' + err.message
    console.error('Failed to load messages:', err)
  } finally {
    loading.value = false
  }
}

// 提交新留言
const submitMessage = async () => {
  error.value = ''
  try {
    // 简单验证
    if (!newMessage.value.username.trim()) {
      error.value = '请输入用户名'
      return
    }
    if (!newMessage.value.content.trim()) {
      error.value = '请输入留言内容'
      return
    }
    
    loading.value = true
    const savedMessage = await MessageService.createMessage(newMessage.value)
    
    // 将新留言添加到列表顶部
    messages.value.unshift(savedMessage)
    
    // 清空表单
    newMessage.value = { username: '', content: '' }
    
    // 重新加载留言列表，确保数据最新
    await loadMessages()
    
    alert('留言提交成功！')
  } catch (err) {
    error.value = '提交留言失败: ' + err.message
    console.error('Failed to submit message:', err)
  } finally {
    loading.value = false
  }
}

// 删除留言
const deleteMessage = async (id) => {
  if (!confirm('确定要删除这条留言吗？')) {
    return
  }
  
  deletingIds.value.push(id)
  try {
    await MessageService.deleteMessage(id)
    
    // 从列表中移除删除的留言
    messages.value = messages.value.filter(message => message.id !== id)
    
    alert('留言删除成功！')
  } catch (err) {
    error.value = '删除留言失败: ' + err.message
    console.error('Failed to delete message:', err)
  } finally {
    deletingIds.value = deletingIds.value.filter(deletingId => deletingId !== id)
  }
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// 组件挂载时加载留言
onMounted(() => {
  loadMessages()
})
</script>

<style scoped>
/* 后台留言管理界面样式 */
.admin-message-board {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.admin-message-board h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
}

.admin-message-board h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #555;
}

/* 留言表单样式 */
.message-form {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #666;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

/* 按钮样式 */
.submit-button {
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover:not(:disabled) {
  background-color: #40a9ff;
}

.submit-button:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover:not(:disabled) {
  background-color: #ff7875;
}

.delete-button:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

/* 留言列表样式 */
.message-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.message-item {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.message-item:hover {
  background-color: #fafafa;
}

.message-item:last-child {
  border-bottom: none;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.username {
  font-weight: 600;
  color: #333;
}

.created-at {
  font-size: 12px;
  color: #999;
}

.message-content {
  color: #666;
  line-height: 1.6;
  word-break: break-word;
}

/* 状态提示样式 */
.loading,
.empty-message {
  text-align: center;
  padding: 40px 0;
  color: #999;
}

.error-message {
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-message-board {
    padding: 15px;
  }
  
  .message-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .delete-button {
    align-self: flex-end;
    margin-top: -25px;
  }
}
</style>