import { ProjectStep } from '../services/app-data.service';

export const BASIC_TODO_DATA: {
  project: {
    slug: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    estimatedHours: number;
    techStack: string[];
    prerequisites: string[];
    learningOutcomes: string[];
    fileStructure: Record<string, string>;
    dependencies: {
      npm: Record<string, string>;
      installCommands: string[];
    };
  };
  steps: ProjectStep[];
} = {
  project: {
    slug: 'todo-app-basic',
    title: 'Build a Todo App with HTML, CSS & JavaScript',
    description: "Build a fully functional Todo application from scratch using plain HTML, CSS, and JavaScript. You'll learn DOM manipulation, event handling, local storage, and how to structure a frontend project without any frameworks.",
    category: 'web',
    difficulty: 'beginner',
    estimatedHours: 3,
    techStack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'LocalStorage API'],
    prerequisites: [
      'Basic understanding of HTML tags',
      'Familiarity with CSS properties',
      'Basic JavaScript variables and functions',
    ],
    learningOutcomes: [
      'Manipulate the DOM using JavaScript',
      'Handle user events (click, keypress, input)',
      'Use LocalStorage to persist data across page reloads',
      'Apply CSS Flexbox for layout',
      'Organize a small frontend project into separate files',
    ],
    fileStructure: {
      'index.html': 'Main HTML file',
      'style.css': 'All styles for the app',
      'app.js': 'Application logic and DOM manipulation',
    },
    dependencies: {
      npm: {},
      installCommands: [],
    },
  },

  steps: [
    {
      title: 'Project Setup & HTML Boilerplate',
      description: 'Create the project folder and set up the base HTML file that links the CSS and JS files.',
      explanation: "## Setting Up the Project\n\nEvery web project starts with an `index.html` file. This file acts as the entry point for the browser. We'll also link our CSS and JavaScript files from here.\n\nCreate a folder called `todo-app/` and inside it create three files:\n- `index.html`\n- `style.css`\n- `app.js`",
      commands: ['mkdir todo-app', 'cd todo-app', 'touch index.html style.css app.js'],
      codeBlocks: [
        {
          filename: 'index.html',
          language: 'html',
          action: 'create',
          code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Todo App</title>\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <div id="app">\n      <h1>My Todo List</h1>\n    </div>\n    <script src="app.js"></script>\n  </body>\n</html>',
          explanation: 'The `<link>` tag in `<head>` loads our CSS before the page renders. The `<script>` tag is placed at the bottom of `<body>` so the HTML elements exist before JavaScript tries to access them.',
        },
      ],
      expectedOutput: "Opening index.html in a browser should show a plain white page with the heading 'My Todo List'.",
      troubleshooting: [
        'If the page is blank, check that index.html is saved and opened directly in a browser.',
        'If styles don\'t apply later, make sure style.css is in the same folder as index.html.',
      ],
    },
    {
      title: 'Build the HTML Structure',
      description: 'Add the input field, add button, filter tabs, and todo list container to the HTML.',
      explanation: "## Structuring the App\n\nOur todo app needs three main UI areas:\n1. **Input area** — a text field and a button to add todos\n2. **Filter area** — tabs to show All / Active / Completed todos\n3. **List area** — where the todo items will be rendered\n\nWe'll also add a footer showing how many items are left.",
      commands: [],
      codeBlocks: [
        {
          filename: 'index.html',
          language: 'html',
          action: 'create',
          code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Todo App</title>\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <div id="app">\n      <header>\n        <h1>My Todo List</h1>\n      </header>\n\n      <div class="input-row">\n        <input\n          type="text"\n          id="todo-input"\n          placeholder="What needs to be done?"\n          autocomplete="off"\n        />\n        <button id="add-btn">Add</button>\n      </div>\n\n      <div class="filters">\n        <button class="filter-btn active" data-filter="all">All</button>\n        <button class="filter-btn" data-filter="active">Active</button>\n        <button class="filter-btn" data-filter="completed">Completed</button>\n      </div>\n\n      <ul id="todo-list"></ul>\n\n      <footer id="footer">\n        <span id="items-left">0 items left</span>\n        <button id="clear-completed">Clear Completed</button>\n      </footer>\n    </div>\n\n    <script src="app.js"></script>\n  </body>\n</html>',
          explanation: '`data-filter` attributes on the filter buttons let JavaScript read which filter is active without needing separate IDs. The `<ul id="todo-list">` is empty — JavaScript will fill it dynamically.',
        },
      ],
      expectedOutput: 'The page should now show an input box, an Add button, three filter buttons, and a footer — all unstyled.',
      troubleshooting: [
        "If the footer doesn't appear, make sure the closing </div> for #app is at the very end before </body>.",
      ],
    },
    {
      title: 'Style the App Layout',
      description: 'Write CSS to give the app a clean, centered card layout using Flexbox.',
      explanation: "## Styling with CSS Flexbox\n\nWe'll center the app on the page and give it a card-like appearance. Flexbox makes it easy to align items both horizontally and vertically.\n\nKey CSS concepts used here:\n- `display: flex` for layout\n- `box-shadow` for card depth\n- CSS custom properties (variables) for consistent colors",
      commands: [],
      codeBlocks: [
        {
          filename: 'style.css',
          language: 'css',
          action: 'create',
          code: "*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n:root {\n  --primary: #4f46e5;\n  --primary-hover: #4338ca;\n  --danger: #ef4444;\n  --bg: #f3f4f6;\n  --card-bg: #ffffff;\n  --text: #111827;\n  --muted: #6b7280;\n  --border: #e5e7eb;\n  --radius: 8px;\n}\n\nbody {\n  background: var(--bg);\n  color: var(--text);\n  font-family: 'Segoe UI', system-ui, sans-serif;\n  min-height: 100vh;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 48px 16px;\n}\n\n#app {\n  background: var(--card-bg);\n  border-radius: var(--radius);\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);\n  width: 100%;\n  max-width: 520px;\n  padding: 32px;\n}\n\nheader h1 {\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin-bottom: 24px;\n  color: var(--primary);\n}\n\n.input-row {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n\n.input-row input {\n  flex: 1;\n  padding: 10px 14px;\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  font-size: 1rem;\n  outline: none;\n  transition: border-color 0.2s;\n}\n\n.input-row input:focus {\n  border-color: var(--primary);\n}\n\n.input-row button {\n  padding: 10px 20px;\n  background: var(--primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius);\n  font-size: 1rem;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n\n.input-row button:hover {\n  background: var(--primary-hover);\n}\n\n.filters {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n\n.filter-btn {\n  flex: 1;\n  padding: 8px;\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  background: transparent;\n  font-size: 0.875rem;\n  cursor: pointer;\n  color: var(--muted);\n  transition: all 0.2s;\n}\n\n.filter-btn.active {\n  background: var(--primary);\n  color: #fff;\n  border-color: var(--primary);\n}\n\n#todo-list {\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  min-height: 48px;\n}\n\n.todo-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  transition: opacity 0.2s;\n}\n\n.todo-item.completed {\n  opacity: 0.5;\n}\n\n.todo-item input[type=\"checkbox\"] {\n  width: 18px;\n  height: 18px;\n  accent-color: var(--primary);\n  cursor: pointer;\n  flex-shrink: 0;\n}\n\n.todo-item .todo-text {\n  flex: 1;\n  font-size: 1rem;\n}\n\n.todo-item.completed .todo-text {\n  text-decoration: line-through;\n  color: var(--muted);\n}\n\n.todo-item .delete-btn {\n  background: transparent;\n  border: none;\n  color: var(--danger);\n  font-size: 1.1rem;\n  cursor: pointer;\n  padding: 2px 6px;\n  border-radius: 4px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n\n.todo-item:hover .delete-btn {\n  opacity: 1;\n}\n\n#footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 16px;\n  padding-top: 12px;\n  border-top: 1px solid var(--border);\n  font-size: 0.875rem;\n  color: var(--muted);\n}\n\n#clear-completed {\n  background: transparent;\n  border: none;\n  color: var(--muted);\n  cursor: pointer;\n  font-size: 0.875rem;\n  text-decoration: underline;\n}\n\n#clear-completed:hover {\n  color: var(--danger);\n}\n\n.empty-state {\n  text-align: center;\n  color: var(--muted);\n  padding: 24px 0;\n  font-size: 0.9rem;\n}",
          explanation: 'CSS custom properties defined in `:root` let us change the entire color scheme in one place. The `.delete-btn` is hidden by default and only appears on hover using `opacity`, keeping the UI clean.',
        },
      ],
      expectedOutput: 'The page now shows a centered white card with a styled input area, filter buttons, and footer.',
      troubleshooting: [
        "If the card is not centered, make sure the body has `display: flex` and `justify-content: center`.",
        'If custom properties are not working, check that they are defined inside `:root {}`.',
      ],
    },
    {
      title: 'Initialize JavaScript & State',
      description: 'Set up the JavaScript file, select DOM elements, and define the application state.',
      explanation: "## Application State\n\nIn JavaScript apps, **state** is the data your app relies on. For a todo app the state is:\n- An array of todo objects\n- The current active filter\n\nWe'll load saved todos from `localStorage` so they survive page refreshes.\n\nEach todo is an object with three properties:\n```js\n{ id, text, completed }\n```",
      commands: [],
      codeBlocks: [
        {
          filename: 'app.js',
          language: 'javascript',
          action: 'create',
          code: "'use strict';\n\nconst todoInput = document.getElementById('todo-input');\nconst addBtn = document.getElementById('add-btn');\nconst todoList = document.getElementById('todo-list');\nconst itemsLeft = document.getElementById('items-left');\nconst clearCompletedBtn = document.getElementById('clear-completed');\nconst filterBtns = document.querySelectorAll('.filter-btn');\n\nlet todos = loadTodos();\nlet currentFilter = 'all';\n\nfunction loadTodos() {\n  try {\n    const saved = localStorage.getItem('todos');\n    return saved ? JSON.parse(saved) : [];\n  } catch {\n    return [];\n  }\n}\n\nfunction saveTodos() {\n  localStorage.setItem('todos', JSON.stringify(todos));\n}\n\nfunction generateId() {\n  return Date.now().toString(36) + Math.random().toString(36).slice(2);\n}\n\nrender();\n\nfunction render() {\n  console.log('State:', todos, '| Filter:', currentFilter);\n}",
          explanation: "`'use strict'` enables strict mode which catches common mistakes early. We select all DOM elements once at the top. `loadTodos()` wraps `JSON.parse` in try/catch so corrupted localStorage data doesn't crash the app.",
        },
      ],
      expectedOutput: "Open the browser console (F12). On page load you should see 'State: [] | Filter: all' logged with no errors.",
      troubleshooting: [
        "If you get 'Cannot read properties of null', ensure the HTML IDs match exactly — they are case-sensitive.",
        'Make sure app.js is at the bottom of <body> so all elements exist before the script runs.',
      ],
    },
    {
      title: 'Add Todos',
      description: 'Implement the logic to add a new todo when the user clicks Add or presses Enter.',
      explanation: "## Adding Todos\n\nWhen the user types text and clicks **Add** (or presses **Enter**), we:\n1. Read and trim the input value\n2. Validate it is not empty\n3. Create a new todo object\n4. Push it into the `todos` array\n5. Save to localStorage and re-render\n\nWe also build the `render()` and `createTodoElement()` functions so items display on screen.",
      commands: [],
      codeBlocks: [
        {
          filename: 'app.js',
          language: 'javascript',
          action: 'create',
          code: "'use strict';\n\nconst todoInput = document.getElementById('todo-input');\nconst addBtn = document.getElementById('add-btn');\nconst todoList = document.getElementById('todo-list');\nconst itemsLeft = document.getElementById('items-left');\nconst clearCompletedBtn = document.getElementById('clear-completed');\nconst filterBtns = document.querySelectorAll('.filter-btn');\n\nlet todos = loadTodos();\nlet currentFilter = 'all';\n\nfunction loadTodos() {\n  try {\n    const saved = localStorage.getItem('todos');\n    return saved ? JSON.parse(saved) : [];\n  } catch {\n    return [];\n  }\n}\n\nfunction saveTodos() {\n  localStorage.setItem('todos', JSON.stringify(todos));\n}\n\nfunction generateId() {\n  return Date.now().toString(36) + Math.random().toString(36).slice(2);\n}\n\nfunction addTodo() {\n  const text = todoInput.value.trim();\n  if (!text) return;\n\n  todos.push({ id: generateId(), text, completed: false });\n  saveTodos();\n  todoInput.value = '';\n  todoInput.focus();\n  render();\n}\n\naddBtn.addEventListener('click', addTodo);\ntodoInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTodo(); });\n\nfunction render() {\n  todoList.innerHTML = '';\n  const filtered = getFilteredTodos();\n\n  if (filtered.length === 0) {\n    todoList.innerHTML = '<li class=\"empty-state\">No todos here!</li>';\n  } else {\n    filtered.forEach(todo => todoList.appendChild(createTodoElement(todo)));\n  }\n\n  updateFooter();\n}\n\nfunction getFilteredTodos() {\n  if (currentFilter === 'active') return todos.filter(t => !t.completed);\n  if (currentFilter === 'completed') return todos.filter(t => t.completed);\n  return todos;\n}\n\nfunction createTodoElement(todo) {\n  const li = document.createElement('li');\n  li.className = 'todo-item' + (todo.completed ? ' completed' : '');\n  li.dataset.id = todo.id;\n\n  li.innerHTML = `\n    <input type=\"checkbox\" ${todo.completed ? 'checked' : ''} aria-label=\"Mark complete\" />\n    <span class=\"todo-text\">${escapeHtml(todo.text)}</span>\n    <button class=\"delete-btn\" aria-label=\"Delete todo\">&times;</button>\n  `;\n\n  return li;\n}\n\nfunction escapeHtml(str) {\n  return str\n    .replace(/&/g, '&amp;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\"/g, '&quot;');\n}\n\nfunction updateFooter() {\n  const activeCount = todos.filter(t => !t.completed).length;\n  itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;\n}\n\nrender();",
          explanation: "`escapeHtml` prevents XSS attacks — if a user types `<script>alert('xss')</script>` as a todo it will display as plain text, not execute. We use `innerHTML = ''` to clear the list before re-rendering, which is simple and effective for small lists.",
        },
      ],
      expectedOutput: 'Type a todo and click Add or press Enter. The todo appears in the list. The item count in the footer updates.',
      troubleshooting: [
        'If clicking Add does nothing, open the console and check for errors.',
        "If the item count doesn't update, make sure `updateFooter()` is called inside `render()`.",
      ],
    },
    {
      title: 'Toggle & Delete Todos',
      description: 'Use event delegation to handle checkbox toggles and delete button clicks.',
      explanation: "## Event Delegation\n\nInstead of attaching click listeners to every todo item, we attach **one listener to the parent `<ul>`**. When a click happens inside the list, we check `event.target` to see what was clicked.\n\nThis pattern is called **event delegation** — it is more efficient and automatically works for dynamically added items.",
      commands: [],
      codeBlocks: [
        {
          filename: 'app.js',
          language: 'javascript',
          action: 'create',
          code: "'use strict';\n\nconst todoInput = document.getElementById('todo-input');\nconst addBtn = document.getElementById('add-btn');\nconst todoList = document.getElementById('todo-list');\nconst itemsLeft = document.getElementById('items-left');\nconst clearCompletedBtn = document.getElementById('clear-completed');\nconst filterBtns = document.querySelectorAll('.filter-btn');\n\nlet todos = loadTodos();\nlet currentFilter = 'all';\n\nfunction loadTodos() {\n  try {\n    const saved = localStorage.getItem('todos');\n    return saved ? JSON.parse(saved) : [];\n  } catch {\n    return [];\n  }\n}\n\nfunction saveTodos() {\n  localStorage.setItem('todos', JSON.stringify(todos));\n}\n\nfunction generateId() {\n  return Date.now().toString(36) + Math.random().toString(36).slice(2);\n}\n\nfunction addTodo() {\n  const text = todoInput.value.trim();\n  if (!text) return;\n\n  todos.push({ id: generateId(), text, completed: false });\n  saveTodos();\n  todoInput.value = '';\n  todoInput.focus();\n  render();\n}\n\naddBtn.addEventListener('click', addTodo);\ntodoInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTodo(); });\n\ntodoList.addEventListener('click', (e) => {\n  const li = e.target.closest('.todo-item');\n  if (!li) return;\n  const id = li.dataset.id;\n\n  if (e.target.matches('input[type=\"checkbox\"]')) toggleTodo(id);\n  if (e.target.matches('.delete-btn')) deleteTodo(id);\n});\n\nfunction toggleTodo(id) {\n  todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);\n  saveTodos();\n  render();\n}\n\nfunction deleteTodo(id) {\n  todos = todos.filter(t => t.id !== id);\n  saveTodos();\n  render();\n}\n\nfilterBtns.forEach(btn => {\n  btn.addEventListener('click', () => {\n    currentFilter = btn.dataset.filter;\n    filterBtns.forEach(b => b.classList.remove('active'));\n    btn.classList.add('active');\n    render();\n  });\n});\n\nclearCompletedBtn.addEventListener('click', () => {\n  todos = todos.filter(t => !t.completed);\n  saveTodos();\n  render();\n});\n\nfunction render() {\n  todoList.innerHTML = '';\n  const filtered = getFilteredTodos();\n\n  if (filtered.length === 0) {\n    todoList.innerHTML = '<li class=\"empty-state\">No todos here!</li>';\n  } else {\n    filtered.forEach(todo => todoList.appendChild(createTodoElement(todo)));\n  }\n\n  updateFooter();\n}\n\nfunction getFilteredTodos() {\n  if (currentFilter === 'active') return todos.filter(t => !t.completed);\n  if (currentFilter === 'completed') return todos.filter(t => t.completed);\n  return todos;\n}\n\nfunction createTodoElement(todo) {\n  const li = document.createElement('li');\n  li.className = 'todo-item' + (todo.completed ? ' completed' : '');\n  li.dataset.id = todo.id;\n\n  li.innerHTML = `\n    <input type=\"checkbox\" ${todo.completed ? 'checked' : ''} aria-label=\"Mark complete\" />\n    <span class=\"todo-text\">${escapeHtml(todo.text)}</span>\n    <button class=\"delete-btn\" aria-label=\"Delete todo\">&times;</button>\n  `;\n\n  return li;\n}\n\nfunction escapeHtml(str) {\n  return str\n    .replace(/&/g, '&amp;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\"/g, '&quot;');\n}\n\nfunction updateFooter() {\n  const activeCount = todos.filter(t => !t.completed).length;\n  itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;\n}\n\nrender();",
          explanation: '`closest(\'.todo-item\')` walks up the DOM tree from the clicked element to find the parent `<li>`. We use `{ ...t, completed: !t.completed }` (spread operator) to create a new object rather than mutating the existing one, which is a safer pattern.',
        },
      ],
      expectedOutput: 'Clicking a checkbox strikes through the todo and dims it. Hovering reveals the delete button. Clicking × removes the todo. Filter buttons and Clear Completed all work.',
      troubleshooting: [
        "If toggle doesn't work, check that `li.dataset.id` matches `todo.id`.",
        "If items don't update visually, make sure `render()` is called at the end of `toggleTodo` and `deleteTodo`.",
      ],
    },
    {
      title: "Final Testing & What's Next",
      description: 'Test all features end-to-end, verify persistence, and explore ideas for extending the app.',
      explanation: "## Final Checklist\n\nTest each feature before calling the project complete:\n\n| Feature | How to test |\n|---|---|\n| Add todo | Type text + click Add |\n| Add with Enter | Type text + press Enter |\n| Empty input guard | Click Add with no text — nothing should happen |\n| Toggle complete | Click checkbox — text strikes through |\n| Delete | Hover item → click × |\n| Filter: Active | Hides completed items |\n| Filter: Completed | Shows only completed items |\n| Filter: All | Shows everything |\n| Clear Completed | Removes all checked todos |\n| Persistence | Add todos → refresh page → todos still there |\n\nTo verify localStorage, open **DevTools (F12) → Application → Local Storage** and look for the `todos` key.\n\n## Ideas to Extend the App\n- **Edit a todo** — double-click the text to make it editable\n- **Drag to reorder** — use the HTML5 Drag and Drop API\n- **Due dates** — add a date input to each todo\n- **Dark mode** — toggle CSS custom properties with a button",
      commands: [],
      codeBlocks: [],
      expectedOutput: 'All features in the checklist work correctly. No console errors appear during normal use. Todos persist after a page refresh.',
      troubleshooting: [
        'If styles look broken on mobile, ensure the viewport meta tag is in <head>.',
        'If the delete button is always visible, check that `.todo-item .delete-btn { opacity: 0 }` and `.todo-item:hover .delete-btn { opacity: 1 }` are both in style.css.',
      ],
    },
  ],
};
