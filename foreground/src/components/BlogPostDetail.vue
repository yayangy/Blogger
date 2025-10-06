<template>
  <div class="blog-post-detail">
    <!-- 文章头部 -->
    <div class="post-detail-header">
      <button @click="handleBack" class="back-button">
        <i i-ant-design-left-circle-outlined /> 返回列表
      </button>
      <h1 class="post-detail-title">{{ post.title }}</h1>
      <div class="post-detail-meta">
        <span class="post-detail-date">{{ formatDate(post.createdAt) }}</span>
        <span class="post-detail-category">{{ getCategoryName(post.categoryId) }}</span>
        <span class="post-detail-views"><i i-ant-design-eye-outlined /> {{ post.views }}</span>
        <span class="post-detail-comments"><i i-ant-design-comment-outlined /> {{ post.comments }}</span>
      </div>
      <div class="post-detail-tags">
        <span v-for="tagId in post.tags" :key="tagId" class="post-detail-tag">
          {{ getTagName(tagId) }}
        </span>
      </div>
    </div>

    <!-- 文章内容 -->
    <div class="post-detail-content-wrapper">
      <div class="post-detail-content" v-html="processedContent"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 文章数据 - 这里使用静态数据，可以根据需要替换为从文件或其他地方加载
const posts = [
  {
    id: 1,
    title: 'Vue+Spring Boot 项目安装教学',
    excerpt: '前后端分离用起来是真不方便',
    content: `
      <h2>实验环境</h2>
      <p>阿里云服务器 Ubuntu 22.04预装软件宝塔面板</p>
      <p>如果用不了就去阿里云安全组放开对应端口号</p>
      <img src="https://image.acg.lol/file/2025/10/06/c001b3505f136558b1ddcc814df38665.png" alt="Vue+Spring Boot 项目安装教学" style="max-width: 100%; height: auto; display: block; margin: 1rem auto; box-sizing: border-box;" />
      <p>已经在本地win10系统开发与生产环境运行项目</p>
      <img src="https://image.acg.lol/file/2025/10/06/15a8245d4c9a8cc51727f5fb3ee39fae.png" alt="Vue+Spring Boot 项目安装教学" style="max-width: 100%; height: auto; display: block; margin: 1rem auto; box-sizing: border-box;" />
      <p>好了,接下来会很少用到宝塔，因为用这个部署前后端分离的项目是真费劲</p>
      <img src="https://image.acg.lol/file/2025/10/06/60c3741a202c557b152f535fa6df0188.png" alt="Vue+Spring Boot 项目安装教学" style="max-width: 100%; height: auto; display: block; margin: 1rem auto; box-sizing: border-box;" />
      <img src="https://image.acg.lol/file/2025/10/06/e60739b83a82388299e2f6e15041061d.png" alt="Vue+Spring Boot 项目安装教学" style="max-width: 100%; height: auto; display: block; margin: 1rem auto; box-sizing: border-box;" />
      <p>明明只需要启动一个前端和一个后端的</p>
      <p>可以在宝塔里先给root密码改了在整个mydb数据库里面在做个表测试一下</p>
      <img src="https://image.acg.lol/file/2025/10/06/246ea9041561c299084eccc660b10f82.png" alt="Vue+Spring Boot 项目安装教学" style="max-width: 100%; height: auto; display: block; margin: 1rem auto; box-sizing: border-box;" />
      <p>在装npm包管理工具之前需要卸载一下上古版本的nodejs确保装的版本新一些</p>
      <img src="https://image.acg.lol/file/2025/10/06/cf80c88332838b88ef274c27632ad929.png" alt="Vue+Spring Boot 项目安装教学" style="max-width: 100%; height: auto; display: block; margin: 1rem auto; box-sizing: border-box;" />
      <p>这个版本和宝塔里面的是不通的</p>
      <p>处理好之后npm install安装一下依赖</p>
      <p>在打包一下npm run build</p>
      <p>测试一下npm run preview能否使用然后ctrl+c退出</p>
      <h2>检查java版本,更新到java17.启动java -jar 名字.jar</h2>
      <p>确保前后端都能用接下来使用screen让服务在终端断开之后也能用</p>
      <p>先来安装一下sudo apt-get install screen</p>
      <p>安装完成后使用screen -S 名字启动一个会话</p>
      <p>在会话里面启动java -jar 名字.jar</p>
      <p>然后ctrl+a d退出会话</p>
      <p>screen -ls查看所有会话</p>
      <p>以后需要启动服务的时候就用screen -r 名字重新attach到会话里面</p>
      <p>前端同理</p>
      <p>在会话里面启动npm run preview</p>
      <p>彻底关闭会话记录screen -X -S 会话ID quit</p>


      <h2>总结</h2>
      <p>现在开源博客用的技术栈都挺多的有时还可能需要安装一些其他服务</p>
    `,
    categoryId: 2,
    tags: [7],
    createdAt: '2024-05-10T10:30:00',
    views: 235,
    comments: 12
  },
  {
    id: 2,
    title: '常用前后端分离测试命令',
    excerpt: '在前后端分离的项目开发中，我们需要测试前端和后端的交互是否正常。以下是一些常用的测试命令：',
    content: `
      <p>脚手架 性能2 npm create vite@latest . -- --template vue</p>
      <p>环境1 npm init vue@latest</p>
      <p>依赖1 npm install</p>
      <p>前端开发启动npm run dev</p>
      <p>后端启动node server.js /npm run server</p>
      <p>全体启动npm run start</p>
      <p>打包npm run build</p>
      <p>构建后预览npm run preview</p>
      <p>通用预览npx serve dist</p>
      <p>使用npx serve 预览：npx serve .</p>
      <p>安装mysql组建 npm install express mysql2 cors</p>
      <p>npx serve D:/aaaaatest/fangzhichang/127.0.0.1</p>
      <p>index.html- main.js-App.vue</p>
      <p>java 开发运行 mvn spring-boot:run</p>
      <p>java 打包 mvn clean package</p>
      <p>java 生产运行 java -jar spring-backend-0.0.1-SNAPSHOT.jar</p>
      <h2>总结</h2>
      <p>php是最好的语言</p>
    `,
    categoryId: 2,
    tags: [2, 3, 6],
    createdAt: '2024-05-05T14:20:00',
    views: 189,
    comments: 8
  },
  {
    id: 3,
    title: '程序员的成长之路：如何持续学习',
    excerpt: '在技术快速迭代的今天，持续学习能力对程序员至关重要。本文分享了一些有效的学习方法和时间管理技巧...',
    content: `
      <h2>为什么持续学习很重要？</h2>
      <p>在互联网行业，技术更新迭代的速度非常快。作为程序员，如果不保持持续学习的习惯，很容易被行业淘汰。</p>

      <h2>有效的学习方法</h2>
      <p>1. <strong>费曼学习法</strong>：通过教授他人来巩固自己的知识</p>
      <p>2. <strong>项目驱动学习</strong>：通过实际项目来应用和深化所学知识</p>
      <p>3. <strong>番茄工作法</strong>：专注学习25分钟，休息5分钟，保持高效学习状态</p>
      <p>4. <strong>建立知识体系</strong>：将零散的知识点系统化，形成自己的知识网络</p>

      <h2>如何选择学习资源</h2>
      <p>1. <strong>官方文档</strong>：学习新技术的首选资源，内容最权威、最全面</p>
      <p>2. <strong>优质博客和文章</strong>：关注行业内的技术专家和团队博客</p>
      <p>3. <strong>视频教程</strong>：对于视觉学习者来说是很好的选择</p>
      <p>4. <strong>技术书籍</strong>：适合深入学习某个技术领域</p>

      <h2>时间管理技巧</h2>
      <p>1. <strong>制定学习计划</strong>：明确学习目标和时间安排</p>
      <p>2. <strong>利用碎片时间</strong>：在通勤、排队等时间阅读技术文章</p>
      <p>3. <strong>避免信息过载</strong>：专注于当前学习的内容，不要同时学习太多新东西</p>
      <p>4. <strong>定期回顾</strong>：每隔一段时间回顾和复习所学内容</p>

      <h2>总结</h2>
      <p>持续学习是程序员职业发展的关键。通过选择合适的学习方法和资源，制定合理的学习计划，我们可以在技术快速发展的时代保持竞争力。</p>
    `,
    categoryId: 4,
    tags: [5],
    createdAt: '2024-04-28T09:15:00',
    views: 156,
    comments: 15
  },
  {
    id: 4,
    title: '用 CSS Grid 构建响应式布局',
    excerpt: 'CSS Grid 布局系统为我们提供了强大的二维布局能力。本文通过实例介绍了如何使用 CSS Grid 构建灵活的响应式布局...',
    content: `
      <h2>CSS Grid 简介</h2>
      <p>CSS Grid 是一个二维布局系统，可以同时处理行和列，为网页布局提供了更灵活的解决方案。</p>

      <h2>基本概念</h2>
      <p>1. <strong>网格容器</strong>：设置了 display: grid 的元素</p>
      <p>2. <strong>网格项</strong>：网格容器的直接子元素</p>
      <p>3. <strong>网格线</strong>：划分网格的水平和垂直线</p>
      <p>4. <strong>网格轨道</strong>：两条相邻网格线之间的空间</p>
      <p>5. <strong>网格单元格</strong>：最小的网格单元，由行和列交叉形成</p>

      <h2>基本用法</h2>
      <p>创建一个 3×3 的网格：</p>
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
}</code></pre>

      <h2>响应式布局示例</h2>
      <p>使用媒体查询和 minmax 函数创建响应式网格：</p>
      <pre><code>.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* 在小屏幕上调整 */
@media (max-width: 600px) {
  .responsive-grid {
    grid-template-columns: 1fr;
  }
}</code></pre>

      <h2>高级特性</h2>
      <p>1. <strong>网格区域</strong>：使用 grid-area 和 grid-template-areas 定义复杂布局</p>
      <p>2. <strong>对齐方式</strong>：使用 justify-items、align-items、justify-content、align-content 控制对齐</p>
      <p>3. <strong>隐式网格</strong>：当内容超过定义的网格时自动创建的网格</p>

      <h2>总结</h2>
      <p>CSS Grid 是一个强大的布局工具，可以帮助我们创建复杂、灵活的网页布局。通过掌握其基本概念和用法，我们可以更高效地实现各种布局需求，提升用户体验。</p>
    `,
    categoryId: 2,
    tags: [3, 6],
    createdAt: '2024-04-20T16:45:00',
    views: 124,
    comments: 6
  }
]

// 分类数据
const categories = [
  { id: 1, name: '全部', count: 12 },
  { id: 2, name: '技术博客', count: 8 },
  { id: 3, name: '生活随笔', count: 4 },
  { id: 4, name: '读书笔记', count: 3 },
  { id: 5, name: '项目记录', count: 2 }
]

// 标签数据
const tags = [
  { id: 1, name: 'Vue.js', count: 6 },
  { id: 2, name: 'JavaScript', count: 8 },
  { id: 3, name: '前端开发', count: 10 },
  { id: 4, name: '学习笔记', count: 5 },
  { id: 5, name: '生活分享', count: 4 },
  { id: 6, name: '项目实战', count: 3 },
  { id: 7, name: '新手教程', count: 2 }
]

// 当前文章
const post = ref({})
// 处理后的内容，用于确保图片正确缩放
const processedContent = ref('')

// 从URL中获取文章ID
const getPostIdFromUrl = () => {
  const hash = window.location.hash
  const match = hash.match(/^#blog\/post\/(\d+)$/)
  return match ? parseInt(match[1]) : null
}

// 根据ID获取文章
const getPostById = (id) => {
  return posts.find(p => p.id === id) || posts[0] // 默认返回第一篇文章
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
  const category = categories.find(cat => cat.id === categoryId)
  return category ? category.name : '未分类'
}

// 获取标签名称
const getTagName = (tagId) => {
  const tag = tags.find(t => t.id === tagId)
  return tag ? tag.name : '未知标签'
}

// 返回文章列表
const handleBack = () => {
  window.location.hash = '#blog'
}

// 处理文章内容，确保图片正确缩放
const processContent = (content) => {
  // 创建一个临时div来处理HTML内容
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = content

  // 为所有图片添加内联样式
  const images = tempDiv.querySelectorAll('img')
  images.forEach(img => {
    // 直接设置图片的style属性
    img.setAttribute('style', 'max-width: 100% !important; width: 100% !important; height: auto !important; display: block !important; margin: 1rem auto !important; box-sizing: border-box !important;')
  })

  return tempDiv.innerHTML
}

// 组件挂载时初始化数据
onMounted(() => {
  const postId = getPostIdFromUrl()
  post.value = getPostById(postId)

  // 增加浏览量
  post.value.views++

  // 处理文章内容
  processedContent.value = processContent(post.value.content)

  // 添加图片大小调整逻辑
  const resizeImages = () => {
    const images = document.querySelectorAll('.blog-post-detail img')
    images.forEach(img => {
      // 直接设置宽度为100%，而不仅仅是max-width
      img.style.width = '100%'
      img.style.maxWidth = '100%'
      img.style.height = 'auto'
      img.style.display = 'block'
      img.style.margin = '1rem auto'
      img.style.boxSizing = 'border-box'
      img.style.overflow = 'hidden'

      // 强制重新计算
      img.onload = function() {
        this.style.width = '100%'
        this.style.maxWidth = '100%'
        this.style.height = 'auto'

        // 强制重绘
        this.style.opacity = '0.99'
        setTimeout(() => {
          this.style.opacity = '1'
        }, 10)
      }

      // 如果图片已经加载完成，手动触发onload事件
      if (img.complete) {
        const event = new Event('load')
        img.dispatchEvent(event)
      }
    })
  }

  // 初始调整
  setTimeout(resizeImages, 100)

  // 添加窗口大小变化监听
  window.addEventListener('resize', resizeImages)

  // 组件卸载时移除监听
  onUnmounted(() => {
    window.removeEventListener('resize', resizeImages)
  })
})
</script>

<style scoped>
/* 文章详情页样式 */
.blog-post-detail {
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
  padding: 20px;
}

.post-detail-header {
  background: rgba(30, 30, 30, 0.8);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
}

.back-button {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: rgba(24, 144, 255, 0.1);
}

.post-detail-title {
  margin: 0 0 20px 0;
  color: #ffffff;
  font-size: 32px;
  line-height: 1.4;
}

.post-detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 14px;
  color: #999999;
  margin-bottom: 20px;
}

.post-detail-views,
.post-detail-comments {
  display: flex;
  align-items: center;
  gap: 5px;
}

.post-detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.post-detail-tag {
  padding: 6px 12px;
  background: rgba(24, 144, 255, 0.2);
  border-radius: 20px;
  font-size: 14px;
  color: #1890ff;
}

.post-detail-content {
  background: rgba(30, 30, 30, 0.8);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  max-width: 1000px;
  margin: 0 auto;
  line-height: 1.8;
  color: #cccccc;
}

/* 文章内容样式 */
.post-detail-content h2 {
  color: #ffffff;
  margin: 30px 0 15px 0;
  font-size: 24px;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 10px;
}

.blog-post-detail .post-detail-content img {
  max-width: 100% !important;
  height: auto !important;
  display: block !important;
  margin: 1rem auto !important;
  border-radius: 0.5rem;
  box-sizing: border-box !important;
}

.post-detail-content p {
  margin: 15px 0;
  font-size: 16px;
}

.post-detail-content strong {
  color: #ffffff;
  font-weight: 600;
}

.post-detail-content pre {
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 15px 0;
}

.post-detail-content code {
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
}

.post-detail-content pre code {
  background: none;
  padding: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .post-detail-title {
    font-size: 24px;
  }

  .post-detail-header,
  .post-detail-content {
    padding: 20px;
  }

  .post-detail-meta {
    gap: 10px;
    font-size: 13px;
  }
}
</style>

<style>
/* 全局图片样式覆盖 - 确保所有图片在BlogPostDetail组件中正确缩放 */
.blog-post-detail img {
  max-width: 100% !important;
  height: auto !important;
  display: block !important;
  margin: 1rem auto !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}
</style>
