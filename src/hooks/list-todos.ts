
import { api } from "@/lib/axios"
import { ListTodosApiResponse } from "@/types"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"

async function listTodos() {
  const response = await api.get<ListTodosApiResponse>("/todo")

  return response.data
}

export const useListTodos = (options?: UseQueryOptions<ListTodosApiResponse, AxiosError>) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => await listTodos(),
    ...options
  })
}