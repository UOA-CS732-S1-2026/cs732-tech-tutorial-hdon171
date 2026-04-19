<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="nav-content">
        <h1 class="logo">Task Manager</h1>
        <ul class="nav-links">
          <li>
            <RouterLink to="/" :class="{ active: route.path === '/' }">
              Tasks
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/comparison" :class="{ active: route.path === '/comparison' }">
              Comparison
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="app-footer">
      <p>© 2026 Task Manager | Built with Vue 3 + Pinia</p>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { useTaskStore } from './stores/taskStore'

const route = useRoute()
const taskStore = useTaskStore()
taskStore.init()
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f8fa 0%, #eef2f7 100%);
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #1B5E75 0%, #2BA49B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: inline-block;
}

.nav-links a:hover {
  background: linear-gradient(135deg, #1B5E75 0%, #2BA49B 100%);
  color: white;
}

.nav-links a.active {
  background: linear-gradient(135deg, #1B5E75 0%, #2BA49B 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(27, 94, 117, 0.3);
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 40px auto;
  width: 100%;
  padding: 0 20px;
}

.app-footer {
  background: rgba(27, 94, 117, 0.95);
  color: white;
  text-align: center;
  padding: 30px 20px;
  margin-top: auto;
  font-size: 14px;
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    height: auto;
    gap: 15px;
    padding: 15px 20px;
  }

  .nav-links {
    gap: 15px;
  }

  .nav-links a {
    font-size: 14px;
  }

  .logo {
    font-size: 22px;
  }

  .main-content {
    margin: 20px auto;
  }
}
</style>
