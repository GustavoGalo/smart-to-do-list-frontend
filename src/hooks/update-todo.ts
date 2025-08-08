
import { api } from "@/lib/axios"
import { UpdateTodoApiResponse, UpdateTodoBody } from "@/types"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"



async function updateTodo(body: UpdateTodoBody) {
  const response = await api.put<UpdateTodoApiResponse>(`/todo/${body.id}`, body)

  return response.data
}

export const useUpdateTodo = (options?: UseMutationOptions<UpdateTodoApiResponse, AxiosError, UpdateTodoBody>) => {
  return useMutation({
    mutationKey: ["update-todo"],
    mutationFn: async (body) => await updateTodo(body),
    ...options,
  })
}