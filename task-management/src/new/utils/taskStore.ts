export interface Task {
  id: string
  name: string
  assignee: string
  dueDate: string
  startDate?: string
  priority: "High" | "Medium" | "Low"
  status: "Pending" | "In Progress" | "Completed"
  comments: string
  notes?: string
  dependentTask?: string
  description?: string
  attachments?: FileList | null
}

class TaskStore {
  private tasks: Task[] = []
  private listeners: (() => void)[] = []

  getTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id)
  }

  addTask(task: Task): void {
    this.tasks.push(task)
    this.notifyListeners()
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const index = this.tasks.findIndex((task) => task.id === id)
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updates }
      this.notifyListeners()
    }
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id)
    this.notifyListeners()
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener())
  }
}

export const taskStore = new TaskStore()
