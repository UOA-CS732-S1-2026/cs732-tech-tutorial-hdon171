<template>
  <div class="todo-container">
    <div class="todo-card">
      <!-- Header -->
      <div class="todo-header">
        <h2>Tasks</h2>
        <div class="stats">
          <span class="stat-item"><strong>{{ stats.total }}</strong> Total</span>
          <span class="stat-item"><strong>{{ stats.completed }}</strong> Completed</span>
          <span class="stat-item"><strong>{{ stats.active }}</strong> Active</span>
        </div>
      </div>

      <!-- Add Task Input -->
      <div class="input-section">
        <div class="input-wrapper">
          <input
            v-model="newTaskTitle"
            @keyup.enter="addTask"
            type="text"
            placeholder="Enter a new task... (press Enter to add)"
            class="task-input"
          />
          <button @click="addTask" class="add-btn">Add Task</button>
        </div>
      </div>

      <!-- Filter Buttons -->
      <div class="filter-section">
        <button
          v-for="filterOption in ['active', 'completed', 'all']"
          :key="filterOption"
          @click="setFilter(filterOption)"
          :class="['filter-btn', { active: filter === filterOption }]"
        >
          {{ filterLabels[filterOption] }}
        </button>
      </div>

      <!-- Task List -->
      <div class="task-list">
        <div v-if="filteredTasks.length === 0" class="empty-state">
          <p>{{ emptyMessage }}</p>
        </div>

        <transition-group name="task-list" tag="div">
          <div
            v-for="task in filteredTasks"
            :key="task.id"
            class="task-item"
            :class="{ completed: task.completed, selected: selectedTasks.has(task.id) }"
          >
            <div class="task-content">
              <input
                type="checkbox"
                :checked="selectedTasks.has(task.id)"
                @change="toggleSelected(task.id)"
                class="task-checkbox"
              />
              <span class="task-title">{{ task.title }}</span>
              <span class="task-time">{{ task.createdAt }}</span>
            </div>
            <button @click="deleteTask(task.id)" class="delete-btn">Delete</button>
          </div>
        </transition-group>
      </div>

      <!-- Action Buttons -->
      <div v-if="tasks.length > 0" class="action-section">
        <!-- Active: Complete selected tasks -->
        <button
          v-if="filter === 'active' && selectedTasks.size > 0"
          @click="completeSelected"
          class="complete-btn"
        >
          Complete Selected ({{ selectedTasks.size }})
        </button>
        
        <!-- Completed: Mark as active + Delete selected -->
        <div v-if="filter === 'completed'" class="button-group">
          <button
            v-if="selectedTasks.size > 0"
            @click="markAsActive"
            class="activate-btn"
          >
            Mark as Active ({{ selectedTasks.size }})
          </button>
          <button
            v-if="selectedTasks.size > 0"
            @click="deleteSelected"
            class="delete-btn-action"
          >
            Delete Selected ({{ selectedTasks.size }})
          </button>
        </div>

        <!-- All Tasks: Delete selected tasks -->
        <button
          v-if="filter === 'all' && selectedTasks.size > 0"
          @click="deleteSelected"
          class="delete-btn-action"
        >
          Delete Selected ({{ selectedTasks.size }})
        </button>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
      <div class="modal-box">
        <h3>Delete Confirmation</h3>
        <p>{{ deleteModalText }}</p>
        <div class="modal-buttons">
          <button @click="closeDeleteModal" class="btn-cancel">Cancel</button>
          <button @click="confirmDelete" class="btn-delete">
            Delete {{ selectedCount }} Task(s)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
const newTaskTitle = ref('')
const selectedTasks = ref(new Set())
const showDeleteModal = ref(false)
const selectedCount = computed(() => selectedTasks.value.size)

const filterLabels = {
  all: 'All Tasks',
  active: 'Active',
  completed: 'Completed'
}

const emptyMessage = computed(() => {
  if (taskStore.filter === 'active') {
    return 'All tasks completed'
  } else if (taskStore.filter === 'completed') {
    return 'No completed tasks'
  }
  return 'No tasks yet'
})

function addTask() {
  taskStore.addTask(newTaskTitle.value)
  newTaskTitle.value = ''
}

function toggleSelected(id) {
  const newSet = new Set(selectedTasks.value)
  if (newSet.has(id)) {
    newSet.delete(id)
  } else {
    newSet.add(id)
  }
  selectedTasks.value = newSet
}

function completeSelected() {
  selectedTasks.value.forEach((taskId) => {
    const task = taskStore.tasks.find((t) => t.id === taskId)
    if (task && !task.completed) {
      taskStore.setTaskCompleted(taskId, true)
    }
  })
  selectedTasks.value = new Set()
}

function markAsActive() {
  selectedTasks.value.forEach((taskId) => {
    const task = taskStore.tasks.find((t) => t.id === taskId)
    if (task && task.completed) {
      taskStore.setTaskCompleted(taskId, false)
    }
  })
  selectedTasks.value = new Set()
}

function deleteTask(id) {
  taskStore.deleteTask(id)
}

function deleteSelected() {
  showDeleteModal.value = true
}

function confirmDelete() {
  selectedTasks.value.forEach(id => {
    taskStore.deleteTask(id)
  })
  selectedTasks.value = new Set()
  showDeleteModal.value = false
}

function closeDeleteModal() {
  showDeleteModal.value = false
}

function setFilter(filterType) {
  taskStore.setFilter(filterType)
  selectedTasks.value = new Set()
}

const tasks = computed(() => taskStore.tasks)
const filter = computed(() => taskStore.filter)
const filteredTasks = computed(() => taskStore.filteredTasks)
const stats = computed(() => taskStore.stats)

const deleteModalText = computed(() => {
  return `Are you sure you want to delete ${selectedCount.value} selected task(s)?`
})
</script>

<style scoped>
.todo-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: relative;
}

.todo-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  animation: slideUp 0.6s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.todo-header {
  background: linear-gradient(135deg, #1B5E75 0%, #2BA49B 100%);
  color: white;
  padding: 30px;
}

.todo-header h2 {
  font-size: 28px;
  margin-bottom: 15px;
}

.stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-item {
  font-size: 14px;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.input-section {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.input-wrapper {
  display: flex;
  gap: 10px;
}

.task-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.task-input:focus {
  outline: none;
  border-color: #2BA49B;
  box-shadow: 0 0 0 3px rgba(43, 164, 155, 0.1);
}

.add-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #1B5E75 0%, #2BA49B 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(27, 94, 117, 0.3);
}

.add-btn:active {
  transform: translateY(0);
}

.filter-section {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: #ececec;
}

.filter-btn.active {
  background: linear-gradient(135deg, #1B5E75 0%, #2BA49B 100%);
  color: white;
  border-color: #2BA49B;
}

.filter-icon {
  display: none;
}

.task-list {
  min-height: 100px;
  max-height: 500px;
  overflow-y: auto;
  padding: 10px 0;
}

.task-list::-webkit-scrollbar {
  width: 6px;
}

.task-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.task-list::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 3px;
}

.task-list::-webkit-scrollbar-thumb:hover {
  background: #764ba2;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
  transition: all 0.3s ease;
  animation: slideInLeft 0.3s ease;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.task-item:hover {
  background: #fafafa;
  padding-right: 0;
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.selected {
  background: rgba(43, 164, 155, 0.08);
}

.task-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #2BA49B;
}

.task-title {
  font-size: 16px;
  flex: 1;
  word-break: break-all;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #999;
}

.task-time {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  margin-left: 10px;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.delete-btn:hover {
  opacity: 1;
  transform: scale(1.2);
}

.action-section {
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.complete-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #1B5E75 0%, #2BA49B 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.complete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(43, 164, 155, 0.3);
}

.button-group {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.activate-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #1B5E75 0%, #2BA49B 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.activate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(43, 164, 155, 0.3);
}

.delete-btn-action {
  width: 100%;
  padding: 12px;
  background: #D64E4E;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-btn-action:hover {
  background: #B83C3C;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(214, 78, 78, 0.3);
}

.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.task-list-move {
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .todo-container {
    padding: 10px;
  }

  .todo-header {
    padding: 20px;
  }

  .todo-header h2 {
    font-size: 24px;
  }

  .stats {
    gap: 10px;
  }

  .stat-item {
    font-size: 12px;
  }

  .input-wrapper {
    flex-direction: column;
  }

  .add-btn {
    width: 100%;
  }

  .task-list {
    max-height: 300px;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-box {
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
  z-index: 10; 
}
.modal-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}
.btn-cancel {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
}
.btn-delete {
  padding: 8px 16px;
  background: #D64E4E;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>