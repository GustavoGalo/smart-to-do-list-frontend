
import { api } from "@/lib/axios"
import { GenerateTodoApiResponse, GenerateTodoBody } from "@/types"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"


async function generateTodos(body: GenerateTodoBody) {
  const response = await api.post<GenerateTodoApiResponse>("/todo/generate", body)

  return response.data
}

export const useGenerateTodos = (options?: UseMutationOptions<GenerateTodoApiResponse, AxiosError, GenerateTodoBody>) => {
  return useMutation({
    mutationKey: ["generate-todo"],
    mutationFn: async (body) => await generateTodos(body),
    ...options
  })
}