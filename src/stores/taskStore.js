import { defineStore } from 'pinia'
import { ref, computed} from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  const filter = ref('active')
  const nextId = ref(1)

  const filteredTasks = computed(() => {
    if (filter.value === 'active') {
      return tasks.value.filter(task => !task.completed)
    } else if (filter.value === 'completed') {
      return tasks.value.filter(task => task.completed)
    }
    return tasks.value
  })

  const stats = computed(() => {
    const total = tasks.value.length
    const completed = tasks.value.filter(task => task.completed).length
    const active = total - completed

    return {
      total,
      completed,
      active
    }
  })
  function addTask(title) {
    if (!title.trim()) return

    tasks.value.push({
      id: nextId.value++,
      title: title.trim(),
      completed: false,
      createdAt: new Date().toLocaleString('en-US')
    })

    saveTasks()
  }

  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      saveTasks()
    }
  }

  function setTaskCompleted(id, isCompleted) {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = isCompleted
    saveTasks()
  }
}

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveTasks()
  }

  function setFilter(newFilter) {
    filter.value = newFilter
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
    localStorage.setItem('nextId', JSON.stringify(nextId.value))
  }

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks')
  const savedNextId = localStorage.getItem('nextId')

  if (savedTasks) {
    try {
      tasks.value = JSON.parse(savedTasks)
    } catch (e) {
      tasks.value = []
    }
  }
  if (savedNextId) {
    try {
      nextId.value = JSON.parse(savedNextId)
    } catch (e) {
      nextId.value = 1
    }
  }
}

  function clearCompleted() {
    tasks.value = tasks.value.filter(t => !t.completed)
    saveTasks()
  }

  function init() {
    loadTasks()
  }

  return {
    tasks,
    filter,
    filteredTasks,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    setFilter,
    clearCompleted,
    init,
    setTaskCompleted
  }
})
