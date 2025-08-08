
import { api } from "@/lib/axios"
import { DeleteTodoApiResponse, DeleteTodoBody } from "@/types"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"



async function deleteTodo({ id }: DeleteTodoBody) {
  const response = await api.delete<DeleteTodoApiResponse>(`/todo/${id}`)

  return response.data
}

export const useDeleteTodo = (options?: UseMutationOptions<DeleteTodoApiResponse, AxiosError, DeleteTodoBody>) => {
  return useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: async (body) => await deleteTodo(body),
    ...options,
  })
}