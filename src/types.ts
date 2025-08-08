export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface CreateTodoBody {
  title: string
}

export interface CreateTodoApiResponse extends Todo {}

export interface DeleteTodoBody {
  id: string
}

export interface DeleteTodoApiResponse extends Todo {}

export interface GenerateTodoBody {
  goal: string
}

export interface GenerateTodoApiResponse {
  count: number
}

export interface ListTodosApiResponse {
  todos: Todo[]
  metadata: {
    countTodos: number;
    countPendingTodos: number;
    countCompletedTodos: number;
  }
}

export interface UpdateTodoBody {
  id: string
  title?: string
  isCompleted?: boolean
}

export interface UpdateTodoApiResponse extends Todo {}