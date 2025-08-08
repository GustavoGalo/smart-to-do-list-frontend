"use client"

import { api } from "@/lib/axios"
import { CreateTodoApiResponse, CreateTodoBody } from "@/types"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"


async function createTodo(body: CreateTodoBody) {
  const response = await api.post<CreateTodoApiResponse>("/todo", body)
  return response.data
}

export const useCreateTodo = (options?: UseMutationOptions<CreateTodoApiResponse, AxiosError, CreateTodoBody>) => {
  return useMutation({
    mutationKey: ["create-todo"],
    mutationFn: async (body) => await createTodo(body),
    ...options,
  })
}