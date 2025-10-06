
<script setup>
import { onMounted, reactive, ref } from 'vue'
import StarTrails from './components/StarTrails.vue'
import MessageBoard from './components/MessageBoard.vue'
import AdminDashboard from './components/AdminDashboard.vue'
import AdminPanel from './components/AdminPanel.vue'
import BlogHome from './components/BlogHome.vue'
import BlogPostDetail from './components/BlogPostDetail.vue'

const showMessageBoard = ref(false)
const showAdminDashboard = ref(false)
const showAdminPanel = ref(false)
const showBlogHome = ref(false)
const showBlogPostDetail = ref(false)

// 检查URL hash和认证状态来决定显示哪个组件
const checkUrlHash = () => {
  // 清除所有状态
  showMessageBoard.value = false
  showAdminDashboard.value = false
  showAdminPanel.value = false
  showBlogHome.value = false
  showBlogPostDetail.value = false
  
  // 检查URL hash
  const hash = window.location.hash
  
  // 安全地检查认证状态
  let isAuthenticated = false
  if (typeof localStorage !== 'undefined') {
    isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
  }
  
  if ((hash === '#admin-panel' || hash === '#dashboard' || hash === '#messages' || hash === '#settings') && isAuthenticated) {
    showAdminPanel.value = true
  } else if (hash === '#admin-dashboard' || showAdminDashboard.value) {
    showAdminDashboard.value = true
  } else if (hash === '#message-board') {
    showMessageBoard.value = true
  } else if (hash === '#blog' || hash === '#blog-home') {
    showBlogHome.value = true
  } else if (hash.startsWith('#blog/post/')) {
    showBlogPostDetail.value = true
  }
}

// 监听URL hash变化
window.addEventListener('hashchange', checkUrlHash)

// 处理项目链接点击
const handleProjectClick = (link) => {
  window.location.hash = link
}

// 组件挂载时检查hash
onMounted(() => {
  checkUrlHash()
} )

const data = reactive({
  titleList: [
    '热爱……',
    '敬畏之心！',
    '赞美之心！',
    '我很好奇！',
    '你好，请多指教',
    '*舒缓的现代音乐*',
    '希望能成为有趣的人',
    '相信美好的事情即将发生',
    '平凡的日常正奇迹的发生着',
    '你所热爱的<br/>就是你的生活',
    '给时光以生命<br/>给岁月以文明',
    '路虽远行则将至<br/>事虽难做则必成',
    '一望无际的迷雾中<br/>有人在寻找光明',
    '当你在凝视着网页的时候<br/>网页也正在凝视着你',
    '我们向广袤的虚空伸出手<br/>无尽的虚空变成了我们',
  ],
  navLinks: [{
    name: '博 客',
    link: 'https://blog.sunguoqi.com',
  }, {
    name: '影 集',
    link: 'https://camera.sunguoqi.com',
  }, {
    name: '运 动',
    link: 'https://bicycling.sunguoqi.com',
  }, {
    name: '后 台',
    link: 'https://blog.sunguoqi.com/comments',
  }],

  myProjects: [{
    name: '留言板',
    description: '留下您的想法和建议',
    link: '#message-board',
  }, {
    name: 'Blog',
    description: '个人博客，学习&随笔',
    link: '#blog',
  }, {
    name: 'Brain',
    description: '知识库、第二大脑',
    link: 'https://github.com/sun0225SUN/brain',
  }, {
    name: 'Camera',
    description: '摄影相册',
    link: 'https://github.com/sun0225SUN/camera',
  }, {
    name: 'Camera Tools',
    description: '摄影工具箱',
    link: 'https://github.com/sun0225SUN/camera-tools',
  }, {
    name: 'Bicycling',
    description: '骑行主页',
    link: 'https://github.com/sun0225SUN/bicycling',
  }, {
    name: 'Life Map',
    description: '人生地图、点亮足迹',
    link: 'https://github.com/sun0225SUN/life-map',
  }, {
    name: 'Coder',
    description: '闪闪发光的程序们',
    link: 'https://github.com/sun0225SUN/coder',
  }, {
    name: 'Starter',
    description: '前端项目起手架模版',
    link: 'https://github.com/sun0225SUN/starter',
  }],

  socialLinks: [{
    icon: '<i i-ant-design-github-outlined />',
    link: 'https://github.com/sun0225SUN',
    label: 'Github',
  }, {
    icon: '<i i-ant-design-x-outlined />',
    link: 'https://twitter.com/sun0225SUN',
    label: 'Twitter',
  }, {
    icon: '<i i-ant-design-youtube-outlined />',
    link: 'https://youtube.com/@sun0225SUN',
    label: 'YouTube',
  }, {
    icon: '<i i-ant-design-bilibili-outlined />',
    link: 'https://space.bilibili.com/448488855/',
    label: 'Bilibili',
  }],
})

onMounted(() => {
  // 背景固定
  window.addEventListener('scroll', () => {
    // 只有在不显示留言板且background元素存在时才执行操作
    if (!showMessageBoard.value) {
      const bg = document.getElementById('background')
      if (bg) {
        const scrollTop = window.scrollY
        if (scrollTop > 0.7 * window.innerHeight) {
          bg.classList.add('fixed')
        } else {
          bg.classList.remove('fixed')
        }
      }
    }
  })
})
</script>

<template>
  <!-- 如果显示留言板，渲染留言板组件 -->
  <MessageBoard v-if="showMessageBoard" @back-to-home="showMessageBoard = false" />
  
  <!-- 如果显示后台管理面板，渲染后台管理面板组件 -->
  <AdminPanel v-else-if="showAdminPanel" />
  
  <!-- 如果显示后台登录，渲染后台登录组件 -->
  <AdminDashboard v-else-if="showAdminDashboard" />
  
  <!-- 如果显示博客主页，渲染博客主页组件 -->
  <BlogHome v-else-if="showBlogHome" />
  
  <!-- 如果显示博客文章详情，渲染文章详情组件 -->
  <BlogPostDetail v-else-if="showBlogPostDetail" />

  <!-- 如果不显示留言板、后台管理面板、后台登录和博客相关页面，渲染原来的主页内容 -->
  <div v-else>
    <!-- 导航 -->
    <nav absolute fixed bottom-4 left-4 z-20>
      <div v-for="(item, index) in data.navLinks" :key="index" my-6 text-3 text-white wv>
        <a 
          v-if="item.name !== '后 台'" 
          :href="item.link" 
          opacity-75 text-white tracking-widest hover:opacity-100
        >
          {{ item.name }}
        </a>
        <a 
          v-else 
          href="#admin-dashboard" 
          @click.prevent="() => {
            // 清除认证状态，确保用户重新验证
            if (typeof localStorage !== 'undefined') {
              localStorage.removeItem('adminAuthenticated')
            }
            showAdminDashboard = true
          }" 
          opacity-75 text-white tracking-widest hover:opacity-100
        >
          {{ item.name }}
        </a>
      </div>
    </nav>

  <!-- 主体 -->
  <main bg-transparent absolute w-full top-75vh z-10>
    <!-- 大标题 -->
    <section ml-15vw absolute>
      <div text-10 text-white font-bold tracking-widest v-html="data.titleList[Math.floor(Math.random() * data.titleList.length)]" />
      <div flex items-center>
        <div mr-4 flex gap-2>
          <div bg-red rounded-full h-3 w-3 />
          <div bg-yellow rounded-full h-3 w-3 />
          <div bg-green rounded-full h-3 w-3 />
        </div>
        <div text-4 text-white tracking-widest>
          可以看看这个网站：<a href="https://flag.moe" target="_blank" class="text-white/80 hover:underline">https://flag.moe</a>
        </div>
      </div>
    </section>
    <!-- 个人简介 -->
    <section mx-9vw mt-90>
      <!-- 关于我 -->
      <div text-bold mb-4 ml-10 text-8 text-white>
        About Me
      </div>
      <div mx-10 mb-10 flex justify-between>
        <div class="text-white/80">
          <p leading-10>
            嗨，你好，我是aaaaa。
          </p>
          <p leading-10>
            热爱编程、摄影、读书、旅行。
          </p>
          <p leading-10>
            热爱计算机科学和 IT 互联网事业，希望能成为一名优秀的开发者。
          </p>
          <p leading-10>
            我们正在让这个世界变得更加美好，通过代码的重复使用和延展构建完美体系。
          </p>
          <p leading-10>
            We're making the world a better place. Through constructing elegant hierarchies for maximum code reuse and extensibility.
          </p>
        </div>
        <img hidden rounded-full h-25 w-25 transition md:block hover:-translate-y--2 src="./assets/images/avatar.webp" alt="avatar">
      </div>

      <!-- 我的技能 -->
      <!-- <div text-bold mb-2 ml-10 text-8 text-white>
          My Skills
        </div> -->

      <!-- 我的项目 -->
      <div text-bold mb-2 ml-10 text-8 text-white>
        Projects
      </div>
      <div mb-10 flex flex-wrap justify-between>
        <div v-for="(item, index) in data.myProjects" :key="index" mx-10 my-4 class="basis-3/4 md:basis-1/6">
          <div v-if="item.link.startsWith('#')">
            <a :href="item.link" @click.prevent="handleProjectClick(item.link)">
              <div class="bg-white/5 hover:bg-white/10 p-2 rounded-lg shadow-md flex-col transition backdrop-blur-3xl backdrop-opacity-60 hover:backdrop-opacity-100 hover:-translate-y-2">
                <div text-bold opacity-75 text-white>
                  {{ item.name }}
                </div>
                <div mt-1 opacity-50 text-3 text-white>
                  {{ item.description }}
                </div>
              </div>
            </a>
          </div>
          <div v-else>
            <a :href="item.link" target="_blank">
              <div class="bg-white/5 hover:bg-white/10 p-2 rounded-lg shadow-md flex-col transition backdrop-blur-3xl backdrop-opacity-60 hover:backdrop-opacity-100 hover:-translate-y-2">
                <div text-bold opacity-75 text-white>
                  {{ item.name }}
                </div>
                <div mt-1 opacity-50 text-3 text-white>
                  {{ item.description }}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- 社交链接 -->
      <div text-bold mb-2 ml-10 text-8 text-white>
        Find Me
      </div>
      <div flex flex-wrap justify-between>
        <div v-for="(item, index) in data.socialLinks" :key="index" mx-10 my-4 class="basis-1/6">
          <a class="bg-white/5 hover:bg-white/10" p-2 rounded-lg shadow-md flex-col justify-between items-center transition backdrop-blur-3xl backdrop-opacity-60 hover:backdrop-opacity-100 hover:-translate-y-2 :href="item.link">
            <div mb-1 text-white f-c-c v-html="item.icon" />
            <div text-bold opacity-75 text-white>{{ item.label }}</div>
          </a>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer mb-5>
      <div class="text-white/60" mt-50 f-c-c>
        <i i-ant-design-environment-outlined mr-1 />
        <p>路虽远行则将至，事虽难做则必成</p>
        <i i-ant-design-environment-outlined ml-1 />
      </div>
      <div class="text-white/60" mt-2 f-c-c gap-4>
        <div>皖 ICP 备 2021010058 号</div>
        <div>© 2024 小孙同学</div>
      </div>
    </footer>
  </main>

  <!-- 背景 -->
  <div id="background" absolute wh-full left-0 top-0 z-0>
    <!-- 渐变阴影 -->
    <div to-black-500 absolute h-80vh w-full bottom--30vh left-0 from-black bg-gradient-to-t />
    <!-- 星轨背景 -->
    <StarTrails pb-45vh bg-black />
  </div>
  </div>
</template>

<style lang="scss" scoped>
#background.fixed {
  position: fixed;
  top: -70%;
}
</style>
