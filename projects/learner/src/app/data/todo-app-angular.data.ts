import { ProjectStep } from '../services/app-data.service';

export const ANGULAR_TODO_DATA: {
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
    slug: 'todo-app-angular',
    title: 'Build a Todo App with Angular & Tailwind CSS',
    description: "Build a fully functional Todo application using Angular and Tailwind CSS. You'll learn Angular components, services, reactive forms, signals, and how to style a modern UI with utility classes — all without writing custom CSS.",
    category: 'angular',
    difficulty: 'beginner',
    estimatedHours: 4,
    techStack: ['Angular 17+', 'Tailwind CSS 3', 'TypeScript', 'Angular Signals', 'LocalStorage API'],
    prerequisites: [
      'Basic understanding of HTML and CSS',
      'Familiarity with TypeScript or JavaScript',
      'Node.js and npm installed on your machine',
    ],
    learningOutcomes: [
      'Scaffold and run an Angular project with the Angular CLI',
      'Create and use Angular components',
      'Manage state with Angular Signals',
      'Build a service to share data across components',
      'Use Angular directives like @for, @if, and ngClass',
      'Style a UI entirely with Tailwind CSS utility classes',
      'Persist data to LocalStorage from an Angular service',
    ],
    fileStructure: {
      'src/app/models/todo.model.ts': 'Todo interface definition',
      'src/app/services/todo.service.ts': 'State management and LocalStorage logic',
      'src/app/components/todo-input/todo-input.component.ts': 'Input field and add button',
      'src/app/components/todo-list/todo-list.component.ts': 'Renders the list of todos',
      'src/app/components/todo-item/todo-item.component.ts': 'Single todo row',
      'src/app/components/todo-footer/todo-footer.component.ts': 'Filter tabs and item count',
      'src/app/app.component.ts': 'Root component that composes the app',
    },
    dependencies: {
      npm: {
        tailwindcss: '^3.4.0',
        postcss: '^8.4.0',
        autoprefixer: '^10.4.0',
      },
      installCommands: [
        'npm install -D tailwindcss postcss autoprefixer',
        'npx tailwindcss init',
      ],
    },
  },

  steps: [
    {
      title: 'Scaffold the Angular Project',
      description: 'Use the Angular CLI to create a new project, then install and configure Tailwind CSS.',
      explanation: "## Creating the Project\n\nThe Angular CLI (`ng`) generates a ready-to-run project with all the tooling configured. We'll use the `--standalone` flag (the modern Angular default) which removes the need for `NgModule`.\n\nAfter scaffolding, we install Tailwind CSS and point it at our source files so it can purge unused styles in production.",
      commands: [
        'npm install -g @angular/cli',
        'ng new todo-app-angular --standalone --style=css --routing=false',
        'cd todo-app-angular',
        'npm install -D tailwindcss postcss autoprefixer',
        'npx tailwindcss init',
      ],
      codeBlocks: [
        {
          filename: 'tailwind.config.js',
          language: 'javascript',
          action: 'create',
          code: "/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\n    './src/**/*.{html,ts}'\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};",
          explanation: 'The `content` array tells Tailwind which files to scan for class names. Any class not found here will be stripped from the production build, keeping the CSS bundle tiny.',
        },
        {
          filename: 'src/styles.css',
          language: 'css',
          action: 'create',
          code: '@tailwind base;\n@tailwind components;\n@tailwind utilities;',
          explanation: "These three directives inject Tailwind's base reset, reusable component classes, and the full utility class set into the compiled CSS.",
        },
      ],
      expectedOutput: 'Running `ng serve` opens the browser at http://localhost:4200 with the default Angular welcome page. No errors in the terminal.',
      troubleshooting: [
        'If `ng` is not found, close and reopen your terminal after the global install.',
        'If Tailwind classes have no effect, make sure `src/styles.css` is listed in the `styles` array inside `angular.json`.',
      ],
    },
    {
      title: 'Define the Todo Model',
      description: 'Create a TypeScript interface that describes the shape of a single todo item.',
      explanation: "## Why a Model?\n\nA **model** (or interface) defines the shape of your data. Every todo in the app will conform to this shape, which gives us autocomplete and compile-time type checking.\n\n```ts\ninterface Todo {\n  id: string;\n  text: string;\n  completed: boolean;\n}\n```\n\nDefining it once in its own file means all components and services import from one place — no duplication.",
      commands: ['mkdir src/app/models'],
      codeBlocks: [
        {
          filename: 'src/app/models/todo.model.ts',
          language: 'typescript',
          action: 'create',
          code: "export interface Todo {\n  id: string;\n  text: string;\n  completed: boolean;\n}\n\nexport type FilterType = 'all' | 'active' | 'completed';",
          explanation: '`FilterType` is a union type that restricts the filter value to exactly three strings. Using a type alias here means TypeScript will warn us if we ever pass an invalid filter string anywhere in the app.',
        },
      ],
      expectedOutput: 'No errors in the terminal. The model file is created and ready to import.',
      troubleshooting: [
        "If you see 'Cannot find module', check the import path uses the correct relative path from the file importing it.",
      ],
    },
    {
      title: 'Create the Todo Service',
      description: 'Build a service that holds all todo state using Angular Signals and persists it to LocalStorage.',
      explanation: "## Angular Services & Signals\n\nA **service** is a singleton class that holds shared state and business logic. Components inject the service rather than managing state themselves.\n\n**Angular Signals** (introduced in Angular 16) are reactive primitives — when a signal's value changes, any template that reads it automatically updates.\n\n```ts\nconst count = signal(0);   // create\ncount();                    // read\ncount.set(1);              // write\ncount.update(v => v + 1); // update based on previous value\n```\n\n`computed()` derives a value from one or more signals and stays in sync automatically.",
      commands: ['ng generate service services/todo'],
      codeBlocks: [
        {
          filename: 'src/app/services/todo.service.ts',
          language: 'typescript',
          action: 'create',
          code: "import { Injectable, signal, computed } from '@angular/core';\nimport { Todo, FilterType } from '../models/todo.model';\n\n@Injectable({ providedIn: 'root' })\nexport class TodoService {\n  private readonly STORAGE_KEY = 'ng-todos';\n\n  private _todos = signal<Todo[]>(this.loadFromStorage());\n  private _filter = signal<FilterType>('all');\n\n  readonly filter = this._filter.asReadonly();\n\n  readonly filteredTodos = computed(() => {\n    const todos = this._todos();\n    const filter = this._filter();\n    if (filter === 'active') return todos.filter(t => !t.completed);\n    if (filter === 'completed') return todos.filter(t => t.completed);\n    return todos;\n  });\n\n  readonly activeCount = computed(() =>\n    this._todos().filter(t => !t.completed).length\n  );\n\n  readonly hasCompleted = computed(() =>\n    this._todos().some(t => t.completed)\n  );\n\n  addTodo(text: string): void {\n    const trimmed = text.trim();\n    if (!trimmed) return;\n\n    this._todos.update(todos => [\n      ...todos,\n      { id: this.generateId(), text: trimmed, completed: false }\n    ]);\n    this.saveToStorage();\n  }\n\n  toggleTodo(id: string): void {\n    this._todos.update(todos =>\n      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)\n    );\n    this.saveToStorage();\n  }\n\n  deleteTodo(id: string): void {\n    this._todos.update(todos => todos.filter(t => t.id !== id));\n    this.saveToStorage();\n  }\n\n  clearCompleted(): void {\n    this._todos.update(todos => todos.filter(t => !t.completed));\n    this.saveToStorage();\n  }\n\n  setFilter(filter: FilterType): void {\n    this._filter.set(filter);\n  }\n\n  private generateId(): string {\n    return Date.now().toString(36) + Math.random().toString(36).slice(2);\n  }\n\n  private loadFromStorage(): Todo[] {\n    try {\n      const saved = localStorage.getItem(this.STORAGE_KEY);\n      return saved ? JSON.parse(saved) : [];\n    } catch {\n      return [];\n    }\n  }\n\n  private saveToStorage(): void {\n    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._todos()));\n  }\n}",
          explanation: "`providedIn: 'root'` registers the service as a singleton for the whole app — no need to add it to any providers array. The private `_todos` signal is exposed as a readonly `filteredTodos` computed signal so components can read but never directly mutate state.",
        },
      ],
      expectedOutput: 'No TypeScript errors. The service file is created with all state logic in one place.',
      troubleshooting: [
        "If you see 'signal is not exported from @angular/core', make sure your Angular version is 16 or higher. Run `ng version` to check.",
      ],
    },
    {
      title: 'Build the Todo Input Component',
      description: 'Create a component with a text input and Add button that calls the service to add new todos.',
      explanation: "## Standalone Components\n\nIn modern Angular, each component is standalone by default — it declares its own imports rather than belonging to a module. This makes components more self-contained and easier to understand.\n\nWe use Angular's **two-way binding** with a local signal to track the input value, and call `todoService.addTodo()` on submit.",
      commands: ['ng generate component components/todo-input --standalone'],
      codeBlocks: [
        {
          filename: 'src/app/components/todo-input/todo-input.component.ts',
          language: 'typescript',
          action: 'create',
          code: "import { Component, signal, inject } from '@angular/core';\nimport { FormsModule } from '@angular/forms';\nimport { TodoService } from '../../services/todo.service';\n\n@Component({\n  selector: 'app-todo-input',\n  standalone: true,\n  imports: [FormsModule],\n  template: `\n    <div class=\"flex gap-2 mb-4\">\n      <input\n        type=\"text\"\n        [(ngModel)]=\"inputText\"\n        (keydown.enter)=\"submit()\"\n        placeholder=\"What needs to be done?\"\n        class=\"flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm\n               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent\"\n      />\n      <button\n        (click)=\"submit()\"\n        class=\"px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg\n               hover:bg-indigo-700 transition-colors\"\n      >\n        Add\n      </button>\n    </div>\n  `\n})\nexport class TodoInputComponent {\n  private todoService = inject(TodoService);\n  inputText = '';\n\n  submit(): void {\n    this.todoService.addTodo(this.inputText);\n    this.inputText = '';\n  }\n}",
          explanation: '`inject(TodoService)` is the modern Angular way to get a service — cleaner than constructor injection for simple cases. `[(ngModel)]` is two-way binding: the input updates `inputText` and `inputText` updates the input. `(keydown.enter)` is Angular\'s shorthand for listening to the Enter key.',
        },
      ],
      expectedOutput: 'No TypeScript or template errors. The component file is ready to be used.',
      troubleshooting: [
        'If `ngModel` throws an error, make sure `FormsModule` is in the `imports` array of the component.',
        "If the input does not clear after submit, verify `this.inputText = ''` runs after `addTodo`.",
      ],
    },
    {
      title: 'Build the Todo Item Component',
      description: 'Create a component for a single todo row with a checkbox, label, and delete button.',
      explanation: "## Inputs and Outputs\n\nComponents communicate via:\n- **`@Input()`** — parent passes data down to child\n- **`@Output()`** — child emits events up to parent\n\nThe `TodoItemComponent` receives a `todo` object as input and emits `toggle` and `delete` events when the user interacts with it.",
      commands: ['ng generate component components/todo-item --standalone'],
      codeBlocks: [
        {
          filename: 'src/app/components/todo-item/todo-item.component.ts',
          language: 'typescript',
          action: 'create',
          code: "import { Component, Input, Output, EventEmitter } from '@angular/core';\nimport { NgClass } from '@angular/common';\nimport { Todo } from '../../models/todo.model';\n\n@Component({\n  selector: 'app-todo-item',\n  standalone: true,\n  imports: [NgClass],\n  template: `\n    <li class=\"flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg\n               group hover:border-indigo-200 transition-colors\">\n      <input\n        type=\"checkbox\"\n        [checked]=\"todo.completed\"\n        (change)=\"toggle.emit(todo.id)\"\n        class=\"w-4 h-4 accent-indigo-600 cursor-pointer flex-shrink-0\"\n      />\n      <span\n        [ngClass]=\"todo.completed\n          ? 'flex-1 text-sm line-through text-gray-400'\n          : 'flex-1 text-sm text-gray-800'\"\n      >\n        {{ todo.text }}\n      </span>\n      <button\n        (click)=\"delete.emit(todo.id)\"\n        class=\"text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100\n               transition-opacity text-lg leading-none px-1\"\n        aria-label=\"Delete todo\"\n      >\n        &times;\n      </button>\n    </li>\n  `\n})\nexport class TodoItemComponent {\n  @Input({ required: true }) todo!: Todo;\n  @Output() toggle = new EventEmitter<string>();\n  @Output() delete = new EventEmitter<string>();\n}",
          explanation: "`group` and `group-hover:opacity-100` are Tailwind's group utility — when the user hovers the `<li>` (the group), the delete button becomes visible. `@Input({ required: true })` tells Angular to throw an error if the parent forgets to pass the `todo` property.",
        },
      ],
      expectedOutput: 'No TypeScript errors. The component is ready to receive a todo object and emit events.',
      troubleshooting: [
        'If the delete button is always visible, check that the `<li>` has the `group` class and the button has `group-hover:opacity-100`.',
        "If checkbox changes don't propagate, verify `toggle.emit(todo.id)` is on the `(change)` event, not `(click)`.",
      ],
    },
    {
      title: 'Build the Todo List Component',
      description: 'Create a component that reads the filtered todos from the service and renders a TodoItem for each one.',
      explanation: "## The @for Control Flow Block\n\nAngular 17 introduced a new built-in control flow syntax using `@for`, `@if`, and `@else` directly in templates — no need to import `NgFor` or `NgIf`.\n\n```html\n@for (item of items; track item.id) {\n  <app-item [data]=\"item\" />\n}\n```\n\n`track` is required and tells Angular how to identify each item for efficient DOM updates.",
      commands: ['ng generate component components/todo-list --standalone'],
      codeBlocks: [
        {
          filename: 'src/app/components/todo-list/todo-list.component.ts',
          language: 'typescript',
          action: 'create',
          code: "import { Component, inject } from '@angular/core';\nimport { TodoService } from '../../services/todo.service';\nimport { TodoItemComponent } from '../todo-item/todo-item.component';\n\n@Component({\n  selector: 'app-todo-list',\n  standalone: true,\n  imports: [TodoItemComponent],\n  template: `\n    <ul class=\"flex flex-col gap-2 min-h-12\">\n      @for (todo of todoService.filteredTodos(); track todo.id) {\n        <app-todo-item\n          [todo]=\"todo\"\n          (toggle)=\"todoService.toggleTodo($event)\"\n          (delete)=\"todoService.deleteTodo($event)\"\n        />\n      } @empty {\n        <li class=\"text-center text-gray-400 text-sm py-8\">\n          No todos here!\n        </li>\n      }\n    </ul>\n  `\n})\nexport class TodoListComponent {\n  todoService = inject(TodoService);\n}",
          explanation: '`filteredTodos()` is called with `()` because it is a computed signal — signals are functions you call to read their current value. The `@empty` block renders automatically when the `@for` iterable is empty, replacing the need for a separate `@if` check.',
        },
      ],
      expectedOutput: 'No TypeScript or template errors. The list component is ready to be composed into the app.',
      troubleshooting: [
        'If `@for` causes a template parse error, confirm your Angular version is 17+. For older versions use `*ngFor` and import `NgFor`.',
        "If events from TodoItem don't reach the service, check that `(toggle)` and `(delete)` match the `@Output()` names exactly.",
      ],
    },
    {
      title: 'Build the Todo Footer Component',
      description: 'Create the footer with an active item count, filter buttons, and a clear completed button.',
      explanation: "## Computed Signals in Templates\n\nBecause `activeCount`, `filter`, and `hasCompleted` are signals or computed signals, the footer template will automatically re-render when any of them change — no manual subscription or change detection needed.",
      commands: ['ng generate component components/todo-footer --standalone'],
      codeBlocks: [
        {
          filename: 'src/app/components/todo-footer/todo-footer.component.ts',
          language: 'typescript',
          action: 'create',
          code: "import { Component, inject } from '@angular/core';\nimport { NgClass } from '@angular/common';\nimport { TodoService } from '../../services/todo.service';\nimport { FilterType } from '../../models/todo.model';\n\n@Component({\n  selector: 'app-todo-footer',\n  standalone: true,\n  imports: [NgClass],\n  template: `\n    <div class=\"mt-4 pt-3 border-t border-gray-200 flex items-center justify-between\n                text-sm text-gray-500\">\n      <span>\n        {{ todoService.activeCount() }}\n        {{ todoService.activeCount() === 1 ? 'item' : 'items' }} left\n      </span>\n\n      <div class=\"flex gap-1\">\n        @for (f of filters; track f.value) {\n          <button\n            (click)=\"todoService.setFilter(f.value)\"\n            [ngClass]=\"todoService.filter() === f.value\n              ? 'px-3 py-1 rounded-md bg-indigo-600 text-white text-xs font-medium'\n              : 'px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100 text-xs'\"\n          >\n            {{ f.label }}\n          </button>\n        }\n      </div>\n\n      @if (todoService.hasCompleted()) {\n        <button\n          (click)=\"todoService.clearCompleted()\"\n          class=\"underline hover:text-red-500 transition-colors text-xs\"\n        >\n          Clear Completed\n        </button>\n      }\n    </div>\n  `\n})\nexport class TodoFooterComponent {\n  todoService = inject(TodoService);\n\n  readonly filters: { label: string; value: FilterType }[] = [\n    { label: 'All', value: 'all' },\n    { label: 'Active', value: 'active' },\n    { label: 'Completed', value: 'completed' }\n  ];\n}",
          explanation: '`[ngClass]` accepts a ternary expression to toggle between two full class strings based on whether the filter button is active. "Clear Completed" is hidden with `@if` when there are no completed todos, keeping the UI clean.',
        },
      ],
      expectedOutput: 'No TypeScript or template errors. The footer component renders item count, filter buttons, and the conditional clear button.',
      troubleshooting: [
        "If filter buttons don't highlight, confirm `todoService.filter()` is called with `()` — it is a signal, not a plain property.",
        "If 'Clear Completed' never appears, check that `hasCompleted` computed signal reads from `_todos()` correctly in the service.",
      ],
    },
    {
      title: 'Compose the Root App Component',
      description: 'Wire all components together in the root AppComponent to produce the final app.',
      explanation: "## Composing the App\n\nThe root `AppComponent` is the shell — it imports and arranges all the child components inside a centered card layout. This is where Tailwind's `max-w`, `shadow`, and `rounded` utilities create the card appearance.\n\nBecause all components are standalone, we simply list them in the `imports` array.",
      commands: [],
      codeBlocks: [
        {
          filename: 'src/app/app.component.ts',
          language: 'typescript',
          action: 'create',
          code: "import { Component } from '@angular/core';\nimport { TodoInputComponent } from './components/todo-input/todo-input.component';\nimport { TodoListComponent } from './components/todo-list/todo-list.component';\nimport { TodoFooterComponent } from './components/todo-footer/todo-footer.component';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  imports: [TodoInputComponent, TodoListComponent, TodoFooterComponent],\n  template: `\n    <div class=\"min-h-screen bg-gray-100 flex items-start justify-center pt-16 px-4\">\n      <div class=\"bg-white rounded-2xl shadow-lg w-full max-w-md p-8\">\n        <h1 class=\"text-2xl font-bold text-indigo-600 mb-6\">My Todo List</h1>\n        <app-todo-input />\n        <app-todo-list />\n        <app-todo-footer />\n      </div>\n    </div>\n  `\n})\nexport class AppComponent {}",
          explanation: 'The template is purely structural — layout and spacing via Tailwind, composition via Angular component selectors. There is zero business logic in the root component, which is the correct pattern: state lives in the service, UI logic lives in each component.',
        },
        {
          filename: 'src/app/app.config.ts',
          language: 'typescript',
          action: 'create',
          code: "import { ApplicationConfig } from '@angular/core';\nimport { provideAnimations } from '@angular/platform-browser/animations';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideAnimations()\n  ]\n};",
          explanation: "`provideAnimations()` enables Angular's animation support globally. It is not strictly required for this project but is a good default to include for future enhancements.",
        },
      ],
      expectedOutput: 'The browser shows the full Todo app — a white card centered on a gray background with the heading, input, empty list state, and footer.',
      troubleshooting: [
        "If you see 'app-todo-input is not a known element', make sure `TodoInputComponent` is in the `imports` array of `AppComponent`.",
        'If the page is completely blank, check the browser console for errors and verify `main.ts` bootstraps `AppComponent` with `appConfig`.',
      ],
    },
    {
      title: 'Verify main.ts Bootstrap',
      description: 'Ensure the entry point correctly bootstraps the Angular app with the standalone AppComponent.',
      explanation: "## The Entry Point\n\n`main.ts` is where Angular starts. For standalone apps it uses `bootstrapApplication` instead of the older `platformBrowserDynamic().bootstrapModule()`. Let's verify it looks correct — the CLI may have generated it already.",
      commands: [],
      codeBlocks: [
        {
          filename: 'src/main.ts',
          language: 'typescript',
          action: 'create',
          code: "import { bootstrapApplication } from '@angular/platform-browser';\nimport { AppComponent } from './app/app.component';\nimport { appConfig } from './app/app.config';\n\nbootstrapApplication(AppComponent, appConfig)\n  .catch(err => console.error(err));",
          explanation: '`bootstrapApplication` is the standalone API. It takes the root component and a config object. Any errors during bootstrap are caught and logged to the console rather than silently failing.',
        },
      ],
      expectedOutput: 'Running `ng serve` shows no errors. The app loads at http://localhost:4200 with the full todo UI visible.',
      troubleshooting: [
        "If you see 'NG0908: In Ivy, the NgModule... is not present', you may have a module-based bootstrap. Replace it with `bootstrapApplication` as shown above.",
        'If the page is blank with no console errors, check that the `<app-root>` selector exists in `src/index.html`.',
      ],
    },
    {
      title: 'Test All Features End-to-End',
      description: 'Run the app and verify every feature works correctly, including LocalStorage persistence.',
      explanation: "## Final Checklist\n\nTest each feature in the browser:\n\n| Feature | How to test |\n|---|---|\n| Add todo | Type text + click Add |\n| Add with Enter | Type text + press Enter |\n| Empty input guard | Click Add with no text — nothing should happen |\n| Toggle complete | Click checkbox — text strikes through |\n| Delete | Hover item → click × |\n| Filter: Active | Shows only uncompleted todos |\n| Filter: Completed | Shows only completed todos |\n| Filter: All | Shows everything |\n| Clear Completed | Only visible when completed todos exist; removes them |\n| Persistence | Add todos → refresh page → todos still there |\n\nTo inspect state, open **DevTools → Application → Local Storage → localhost:4200** and look for the `ng-todos` key.\n\n## Ideas to Extend the App\n- **Edit in place** — double-click a todo text to make it an `<input>` field\n- **Drag to reorder** — use the Angular CDK DragDrop module\n- **Animations** — add Angular animations to fade items in/out\n- **Unit tests** — test the `TodoService` methods with `TestBed`\n- **Reactive Forms** — replace `ngModel` with a `FormControl` for more control",
      commands: ['ng serve'],
      codeBlocks: [],
      expectedOutput: 'All checklist items pass. No console errors during normal use. Todos persist after a hard refresh (Ctrl+Shift+R).',
      troubleshooting: [
        'If styles are missing after `ng serve`, confirm the three `@tailwind` directives are in `src/styles.css` and that file is referenced in `angular.json`.',
        'If signal values are stale in the template, make sure you call signals as functions: `todoService.activeCount()` not `todoService.activeCount`.',
      ],
    },
  ],
};
