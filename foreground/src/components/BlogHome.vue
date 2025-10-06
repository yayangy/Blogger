<template>
  <div class="blog-home">
    <div class="blog-header">
      <button @click="handleBack" class="back-button">
        <i i-ant-design-left-circle-outlined /> 返回主页
      </button>
      <h1>博客文章系统</h1>
      <p>欢迎来到我的个人博客</p>
    </div>

    <div class="blog-content">
      <!-- 博客分类 -->
      <div class="blog-categories">
        <h2>文章分类</h2>
        <div class="category-list">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category-item"
            :class="{ active: activeCategory === category.id }"
            @click="setActiveCategory(category.id)"
          >
            {{ category.name }}
            <span class="category-count">({{ category.count }})</span>
          </div>
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="blog-posts">
        <h2>最新文章</h2>
        <div class="post-list">
          <div
            v-for="post in posts"
            :key="post.id"
            class="post-item"
          >
            <div class="post-header">
              <h3 class="post-title">{{ post.title }}</h3>
              <div class="post-meta">
                <span class="post-date">{{ formatDate(post.createdAt) }}</span>
                <span class="post-category">{{ getCategoryName(post.categoryId) }}</span>
              </div>
            </div>
            <div class="post-excerpt">{{ post.excerpt }}</div>
            <div class="post-footer">
              <span class="post-views"><i i-ant-design-eye-outlined /> {{ post.views }}</span>
              <span class="post-comments"><i i-ant-design-comment-outlined /> {{ post.comments }}</span>
              <button class="read-more" @click="viewPostDetail(post.id)">阅读全文 →</button>
            </div>
          </div>

          <!-- 加载更多 -->
          <div class="load-more" @click="loadMorePosts">
            加载更多
          </div>
        </div>
      </div>

      <!-- 热门标签 -->
      <div class="blog-tags">
        <h2>热门标签</h2>
        <div class="tag-list">
          <span
            v-for="tag in tags"
            :key="tag.id"
            class="tag-item"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 模拟数据 - 分类
const categories = ref([
  { id: 1, name: '全部', count: 12 },
  { id: 2, name: '技术博客', count: 8 },
  { id: 3, name: '生活随笔', count: 4 },
  { id: 4, name: '读书笔记', count: 3 },
  { id: 5, name: '项目记录', count: 2 }
])

// 模拟数据 - 标签
const tags = ref([
  { id: 1, name: 'Vue.js', count: 6 },
  { id: 2, name: 'JavaScript', count: 8 },
  { id: 3, name: '前端开发', count: 10 },
  { id: 4, name: '学习笔记', count: 5 },
  { id: 5, name: '生活分享', count: 4 },
  { id: 6, name: '项目实战', count: 3 }
])

// 模拟数据 - 文章
const posts = ref([
  {
    id: 1,
    title: 'Vue+Spring Boot 项目安装教学',
    excerpt: '前后端分离用起来是真不方便',
    categoryId: 2,
    tags: [7],
    createdAt: '2025-10-06T10:30:00',
    views: 999,
    comments: 99
  },
  {
    id: 2,
    title: '常用前后端分离测试命令',
    excerpt: '在前后端分离的项目开发中，我们需要测试前端和后端的交互是否正常。以下是一些常用的测试命令：',
    categoryId: 2,
    tags: [7],
    createdAt: '2025-10-06T14:20:00',
    views: 888,
    comments: 88
  },
  {
    id: 3,
    title: '程序员的成长之路：如何持续学习',
    excerpt: '在技术快速迭代的今天，持续学习能力对程序员至关重要。本文分享了一些有效的学习方法和时间管理技巧...',
    categoryId: 4,
    tags: [5],
    createdAt: '2025-04-28T09:15:00',
    views: 156,
    comments: 15
  },
  {
    id: 4,
    title: '用 CSS Grid 构建响应式布局',
    excerpt: 'CSS Grid 布局系统为我们提供了强大的二维布局能力。本文通过实例介绍了如何使用 CSS Grid 构建灵活的响应式布局...',
    categoryId: 2,
    tags: [3, 6],
    createdAt: '2025-10-06T16:45:00',
    views: 124,
    comments: 6
  }
])

// 当前激活的分类
const activeCategory = ref(1)

// 根据激活的分类筛选文章
const filteredPosts = computed(() => {
  if (activeCategory.value === 1) {
    return posts.value
  }
  return posts.value.filter(post => post.categoryId === activeCategory.value)
})

// 设置激活的分类
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

// 查看文章详情
const viewPostDetail = (postId) => {
  // 跳转到文章详情页
  window.location.hash = `#blog/post/${postId}`
}

// 加载更多文章
const loadMorePosts = () => {
  // 实际项目中，这里可以调用API加载更多文章
  console.log('加载更多文章')

  // 模拟加载延迟
  setTimeout(() => {
    alert('已加载全部文章')
  }, 500)
}

// 返回主页
const handleBack = () => {
  window.location.hash = ''
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 获取分类名称
const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.name : '未分类'
}
</script>

<style scoped>
/* 博客主页样式 */
.blog-home {
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
  padding: 20px;
}

.blog-header {
  background: rgba(30, 30, 30, 0.8);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
  text-align: center;
}

.back-button {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin: 0 auto 20px;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: rgba(24, 144, 255, 0.1);
}

.blog-header h1 {
  margin: 0 0 10px 0;
  color: #ffffff;
  font-size: 32px;
}

.blog-header p {
  margin: 0;
  color: #cccccc;
  font-size: 18px;
}

.blog-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 分类样式 */
.blog-categories {
  background: rgba(30, 30, 30, 0.8);
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.blog-categories h2 {
  margin: 0 0 20px 0;
  color: #ffffff;
  font-size: 22px;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 10px;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-item {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.category-item:hover {
  background: rgba(24, 144, 255, 0.3);
  transform: translateY(-2px);
}

.category-item.active {
  background: #1890ff;
  color: #ffffff;
}

.category-count {
  font-size: 12px;
  opacity: 0.8;
}

/* 文章列表样式 */
.blog-posts {
  background: rgba(30, 30, 30, 0.8);
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.blog-posts h2 {
  margin: 0 0 20px 0;
  color: #ffffff;
  font-size: 22px;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 10px;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.post-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  border-left: 3px solid #1890ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.post-header {
  margin-bottom: 15px;
}

.post-title {
  margin: 0 0 10px 0;
  color: #ffffff;
  font-size: 20px;
  line-height: 1.4;
}

.post-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #999999;
}

.post-excerpt {
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 15px;
  font-size: 16px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999999;
  font-size: 14px;
}

.post-views,
.post-comments {
  display: flex;
  align-items: center;
  gap: 5px;
}

.read-more {
  background: transparent;
  border: 1px solid #1890ff;
  color: #1890ff;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.read-more:hover {
  background: #1890ff;
  color: #ffffff;
}

.load-more {
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  color: #cccccc;
  font-size: 16px;
  margin-top: 10px;
}

.load-more:hover {
  background: rgba(24, 144, 255, 0.3);
  color: #ffffff;
}

/* 标签样式 */
.blog-tags {
  background: rgba(30, 30, 30, 0.8);
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.blog-tags h2 {
  margin: 0 0 20px 0;
  color: #ffffff;
  font-size: 22px;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 10px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  color: #cccccc;
}

.tag-item:hover {
  background: rgba(24, 144, 255, 0.3);
  color: #ffffff;
  transform: translateY(-2px);
}

/* 响应式布局 */
@media (min-width: 768px) {
  .blog-content {
    grid-template-columns: 250px 1fr;
  }

  .blog-categories {
    grid-column: 1;
    grid-row: 1;
  }

  .blog-posts {
    grid-column: 2;
    grid-row: 1 / 3;
  }

  .blog-tags {
    grid-column: 1;
    grid-row: 2;
  }
}

@media (max-width: 767px) {
  .blog-home {
    padding: 10px;
  }

  .blog-header {
    padding: 20px;
  }

  .blog-header h1 {
    font-size: 26px;
  }

  .blog-content {
    gap: 20px;
  }

  .post-title {
    font-size: 18px;
  }

  .post-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
