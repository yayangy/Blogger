import axios from 'axios';

// 创建axios实例
const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器 - 记录请求信息
API.interceptors.request.use(
  config => {
    console.log(`[API请求] 开始: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    console.error('[API请求] 配置错误:', error);
    return Promise.reject(new Error('请求配置错误，请检查API设置'));
  }
);

// 响应拦截器 - 统一处理错误
API.interceptors.response.use(
  response => {
    console.log(`[API响应] 成功: ${response.config.method.toUpperCase()} ${response.config.baseURL}${response.config.url}`);
    return response.data;
  },
  error => {
    let errorMessage = '未知错误';

    if (error.response) {
      // 服务器返回错误状态码
      errorMessage = `服务器错误: ${error.response.status} ${error.response.statusText}`;
      console.error(`[API响应] 失败: 状态码 ${error.response.status}`, error.response.data);
    } else if (error.request) {
      // 请求已发送但没有收到响应
      errorMessage = `无法连接到后端服务: ${API.defaults.baseURL}`;
      console.error('[API响应] 失败: 无法连接到服务器', error.request);
    } else {
      // 请求配置错误
      errorMessage = `请求错误: ${error.message}`;
      console.error('[API响应] 失败: 请求配置错误', error.message);
    }

    return Promise.reject(new Error(errorMessage));
  }
);

// 留言服务类
class MessageService {
  // 获取所有留言
  async getAllMessages() {
    try {
      console.log('[MessageService] 尝试获取所有留言数据');
      const data = await API.get('/messages');
      console.log('[MessageService] 获取所有留言成功', data.length, '条记录');
      return data;
    } catch (error) {
      console.error('[MessageService] 获取所有留言失败:', error.message);
      throw new Error(`获取留言列表失败: ${error.message}。请检查后端服务是否正常运行，以及代理配置是否正确。`);
    }
  }

  // 提交新留言
  async createMessage(message) {
    try {
      console.log(`[MessageService] 尝试创建新留言:`, message.username);
      const data = await API.post('/messages', message);
      console.log(`[MessageService] 创建留言成功:`, message.username);
      return data;
    } catch (error) {
      console.error(`[MessageService] 创建留言失败:`, error.message);
      throw new Error(`创建留言失败: ${error.message}`);
    }
  }

  // 根据ID获取单条留言
  async getMessageById(id) {
    try {
      console.log(`[MessageService] 尝试获取留言ID: ${id} 的数据`);
      const data = await API.get(`/messages/${id}`);
      console.log(`[MessageService] 获取留言ID: ${id} 成功`);
      return data;
    } catch (error) {
      console.error(`[MessageService] 获取留言ID: ${id} 失败:`, error.message);
      throw new Error(`获取留言信息失败: ${error.message}。ID: ${id}`);
    }
  }

  // 根据ID删除留言
  async deleteMessage(id) {
    try {
      console.log(`[MessageService] 尝试删除留言ID: ${id}`);
      const data = await API.delete(`/messages/${id}`);
      console.log(`[MessageService] 删除留言ID: ${id} 成功`);
      return data;
    } catch (error) {
      console.error(`[MessageService] 删除留言ID: ${id} 失败:`, error.message);
      throw new Error(`删除留言失败: ${error.message}`);
    }
  }
}

export default new MessageService();
