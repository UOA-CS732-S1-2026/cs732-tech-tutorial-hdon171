<template>
  <div class="comparison-container">
    <div class="comparison-card">
      <h2>Vue 3 vs React Comparison</h2>
      <p class="subtitle">Technical comparison of framework choices</p>

      <div class="comparison-grid">
        <!-- Reactivity comparison -->
        <div class="comparison-item">
          <div class="left-section">
            <h3>Reactivity System</h3>
            <div class="code-block">
              <p class="label">Vue 3 (Composition API)</p>
              <pre><code>const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks)
const filteredTasks = computed(() => taskStore.filteredTasks)

// Automatic dependency tracking
// Updates when tasks change</code></pre>
            </div>
            <p class="benefit">✓ Automatically tracks dependencies in computed properties like filteredTasks and stats, reducing the risk of missing dependencies and improving code reliability</p>
          </div>
          <div class="right-section">
            <h3>React</h3>
            <div class="code-block">
              <p class="label">React (Hooks)</p>
              <pre><code>const [tasks, setTasks] = useState([])
const filteredTasks = useMemo(() => {
  return tasks.filter(task => !task.completed)
}, [tasks]) 

// Manual dependency array required</code></pre>
            </div>
            <p class="benefit">✓ Requires explicit dependency arrays in useMemo/useEffect</p>
          </div>
        </div>

        <!-- State management comparison -->
        <div class="comparison-item">
          <div class="left-section">
            <h3>State Management</h3>
            <div class="code-block">
              <p class="label">Vue + Pinia</p>
              <pre><code>const taskStore = useTaskStore()

// All logic (add, delete, update) 
// encapsulated in the store</code></pre>
              <p class="benefit">✓ Clean, centralized state with minimal boilerplate</p>
            </div>
          </div>
          <div class="right-section">
            <h3>React</h3>
            <div class="code-block">
              <p class="label">Redux / Zustand</p>
              <pre><code>const tasks = useSelector(s => s.tasks)
dispatch(addTask(title))

// More setup & boilerplate</code></pre>
              <p class="benefit">✓ Mature but more complex ecosystem</p>
            </div>
          </div>
        </div>

        <!-- Rendering performance comparison -->
        <div class="comparison-item">
          <div class="left-section">
            <h3>Rendering Performance</h3>
            <div class="code-block">
              <p class="label">Vue 3</p>
              <pre><code>Fine-grained reactivity
Only updates affected components
More precise updates compared to React’s component-level re-rendering
function addTask() {
  taskStore.addTask(newTaskTitle.value)
  newTaskTitle.value = ''
}
</code></pre>
              <p class="benefit">✓ Efficient updates for task toggling & deletion</p>
            </div>
          </div>
          <div class="right-section">
            <h3>React</h3>
            <div class="code-block">
              <p class="label">React 18+</p>
              <pre><code>Virtual DOM diffing
Components re-render when state changes
Optimization via useMemo / React.memo
function addTask() {
  dispatch(addTask(newTaskTitle))
  setNewTaskTitle('')
}
</code></pre>
              <p class="benefit">✓ Powerful but needs extra optimization</p>
            </div>
          </div>
        </div>

        <!-- Learning curve comparison -->
        <div class="comparison-item">
          <div class="left-section">
            <h3>Learning Curve</h3>
            <div class="code-block">
              <p class="label">Vue 3</p>
              <pre><code>Template syntax with v-for, v-if
Clear separation of HTML & JS
Intuitive for beginners

div v-if="filteredTasks.length === 0" class="empty-state"{{ emptyMessage }}
</code></pre>
              <p class="benefit">✓ Easier to learn & read</p>
            </div>
          </div>
          <div class="right-section">
            <h3>React</h3>
            <div class="code-block">
              <p class="label">React</p>
              <pre><code>JSX mixes HTML & logic
Functional programming model
Steeper initial learning curve

{filteredTasks.length === 0 && (<div className="empty-state">{emptyMessage}</div>)} 
</code></pre>
              <p class="benefit">✓ More flexible but less structured</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparison table -->
      <div class="summary-table">
        <h3>Comparison Matrix</h3>
        <table>
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Vue 3</th>
              <th>React</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in comparisonRows"
              :key="row.dimension"
              :class="{ active: selectedRow.dimension === row.dimension }"
              @click="selectRow(row)"
            >
              <td>{{ row.dimension }}</td>
              <td class="vue-green">{{ row.vue }}</td>
              <td class="react-blue">{{ row.react }}</td>
            </tr>
          </tbody>
        </table>

        <div class="table-note">
          <p class="note-title">Selected metric</p>
          <p>{{ selectedRow.highlight }}</p>
        </div>
      </div>

      <!-- Conclusion -->
      <div class="conclusion">
        <h3>Key Takeaways</h3>
        <div class="conclusion-items">
          <div class="item">
            <span class="icon">✓</span>
            <div>
              <h4>Vue 3 is ideal for</h4>
              <p>Small to medium projects, rapid prototyping, high development velocity, clean and elegant code, fast iteration cycles</p>
            </div>
          </div>
          <div class="item">
            <span class="icon">✓</span>
            <div>
              <h4>React is ideal for</h4>
              <p>Large enterprise applications, extensive third-party libraries, large teams, complex component reuse, long-term maintenance</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Why this project uses Vue -->
      <div class="why-vue">
        <h3>Why Vue for This Project</h3>
        <ul>
          <li><strong>Reactivity System:</strong> Features like filteredTasks and stats automatically update when tasks change, no manual dependency handling.</li>
          <li><strong>Pinia State Management:</strong> Clean, centralized store for all task logic (add, delete, toggle) with very little boilerplate.</li>
          <li><strong>Template Syntax:</strong> Clear UI logic using v-if, v-for, making the code easy to read and maintain.</li>
          <li><strong>Development Speed:</strong> Fast iteration with less code, perfect for this task management application.</li>
          <li><strong>Performance:</strong> Efficient updates when modifying tasks, ensuring smooth interactions.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const comparisonRows = [
  {
    dimension: 'Learning Difficulty',
    vue: '3/5',
    react: '4/5',
    highlight: 'Vue offers a smoother introduction for new developers and a more concise workflow for component-driven teams.',
  },
  {
    dimension: 'Development Speed',
    vue: '5/5',
    react: '4/5',
    highlight: 'Vue’s template and reactive system support fast iteration, especially for design-driven interfaces.',
  },
  {
    dimension: 'Bundle Size',
    vue: '5/5',
    react: '4/5',
    highlight: 'Vue projects typically ship a leaner runtime bundle, which improves initial load performance.',
  },
  {
    dimension: 'Reactivity Experience',
    vue: '5/5',
    react: '4/5',
    highlight: 'Vue automatically tracks dependencies, reducing boilerplate and improving developer productivity.',
  },
  {
    dimension: 'Community Ecosystem',
    vue: '4/5',
    react: '5/5',
    highlight: 'React maintains the largest ecosystem, while Vue is strong for focused application stacks and rapid delivery.',
  },
  {
    dimension: 'Enterprise Applications',
    vue: '4/5',
    react: '5/5',
    highlight: 'React is often the enterprise standard for very large teams and extensive reusable component libraries.',
  },
]

const selectedRow = ref(comparisonRows[0])

function selectRow(row) {
  selectedRow.value = row
}
</script>

<style scoped>
.comparison-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.comparison-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 1000px;
  padding: 40px;
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

.comparison-card h2 {
  font-size: 32px;
  background: linear-gradient(135deg, #1B5E75 0%, #2BA49B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 16px;
  margin-bottom: 40px;
}

.comparison-grid {
  display: grid;
  gap: 30px;
  margin-bottom: 40px;
}

.comparison-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  border: 1px solid #eee;
}

.comparison-item h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

.left-section h3 {
  color: #1B5E75;
}

.right-section h3 {
  color: #2BA49B;
}

.code-block {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  overflow-x: auto;
}

.code-block p.label {
  font-size: 11px;
  color: #999;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.code-block pre {
  margin: 0;
  color: #333;
  line-height: 1.5;
}

.code-block code {
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.benefit {
  font-size: 13px;
  color: #667eea;
  margin-top: 8px;
  font-weight: 500;
}

.right-section .benefit {
  color: #764ba2;
}

.summary-table {
  margin: 40px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
}

.summary-table h3 {
  font-size: 20px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  background: linear-gradient(135deg, #1B5E75 0%, #2BA49B 100%);
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
}

table td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

table tbody tr:nth-child(odd) {
  background: white;
}

table tbody tr:nth-child(even) {
  background: #fafafa;
}

table tbody tr:hover {
  background: #f0f0f0;
}

table tbody tr.active {
  background: rgba(43, 164, 155, 0.12);
}

table tbody tr {
  cursor: pointer;
}

.vue-green {
  color: #1B5E75;
  font-weight: 600;
}

.react-blue {
  color: #2BA49B;
  font-weight: 600;
}

.table-note {
  margin-top: 20px;
  padding: 16px;
  border-radius: 10px;
  background: white;
  border: 1px solid #e0e0e0;
}

.note-title {
  margin: 0 0 10px;
  color: #333;
  font-weight: 600;
}

.conclusion {
  margin: 40px 0;
  padding: 20px;
  background: linear-gradient(135deg, rgba(27, 94, 117, 0.1) 0%, rgba(43, 164, 155, 0.1) 100%);
  border-radius: 12px;
  border-left: 4px solid #1B5E75;
}

.conclusion h3 {
  font-size: 20px;
  margin-bottom: 20px;
}

.conclusion-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.item {
  display: flex;
  gap: 15px;
  padding: 15px;
  background: white;
  border-radius: 8px;
}

.item .icon {
  font-size: 24px;
  flex-shrink: 0;
}

.item h4 {
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
}

.item p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.why-vue {
  margin-top: 40px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  border: 1px solid #eee;
}

.why-vue h3 {
  font-size: 20px;
  margin-bottom: 20px;
}

.why-vue ul {
  list-style: none;
  padding: 0;
}

.why-vue li {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-size: 15px;
  line-height: 1.6;
  color: #555;
}

.why-vue li:last-child {
  border-bottom: none;
}

.why-vue strong {
  color: #1B5E75;
}

@media (max-width: 768px) {
  .comparison-card {
    padding: 20px;
  }

  .comparison-card h2 {
    font-size: 24px;
  }

  .comparison-item {
    grid-template-columns: 1fr;
  }

  .conclusion-items {
    grid-template-columns: 1fr;
  }

  .code-block {
    font-size: 11px;
  }

  table {
    font-size: 14px;
  }

  table th,
  table td {
    padding: 10px;
  }
}
</style>