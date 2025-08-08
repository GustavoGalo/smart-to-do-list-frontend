"use client";

import { useState, useCallback, MouseEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Sparkles, Loader2 } from "lucide-react";
import { useListTodos } from "@/hooks/list-todos";
import { useCreateTodo } from "@/hooks/create-todo";
import { useDeleteTodo } from "@/hooks/delete-todo";
import { useGenerateTodos } from "@/hooks/generate-todo";
import { useUpdateTodo } from "@/hooks/update-todo";
import { Badge } from "@/components/ui/badge";

export default function SmartTodoList() {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");

  const { data: response, isLoading, refetch: refetchTodos } = useListTodos();
  const { mutate: createTodo } = useCreateTodo({
    onSuccess: () => {
      setNewTodoTitle("");
      refetchTodos();
    },
  });
  const { mutate: deleteTodo } = useDeleteTodo({
    onSuccess: () => {
      refetchTodos();
    },
  });
  const { mutate: generateTodos, isPending: isGenerating } = useGenerateTodos({
    onSuccess: () => {
      setAiPrompt("");
      refetchTodos();
    },
  });
  const { mutate: updateTodo } = useUpdateTodo({
    onSuccess: () => {
      refetchTodos();
    },
  });

  const handleAiTodosGeneration = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      generateTodos({ goal: aiPrompt });
    },
    [aiPrompt]
  );

  const handleTodoCreation = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      createTodo({ title: newTodoTitle });
    },
    [newTodoTitle]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando tarefas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Smart To-Do List</h1>
          <p className="text-gray-600">
            Gerencie suas tarefas com inteligência artificial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {response?.metadata.countTodos}
              </div>
              <div className="text-sm text-gray-600">Total de Tarefas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {response?.metadata.countCompletedTodos}
              </div>
              <div className="text-sm text-gray-600">Concluídas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {response?.metadata.countPendingTodos}
              </div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Gerador de Tarefas IA
              </CardTitle>
              <CardDescription>
                Descreva seu objetivo e a IA criará uma lista de tarefas para
                você
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Ex: Planejar uma viagem para Paris, Organizar um evento de aniversário, Aprender React..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
              />
              <Button
                onClick={handleAiTodosGeneration}
                disabled={!aiPrompt.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Gerando tarefas...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Gerar Tarefas com IA
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                Adicionar Tarefa Manual
              </CardTitle>
              <CardDescription>
                Crie uma tarefa específica manualmente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTodoCreation} className="space-y-4">
                <Input
                  placeholder="Digite o título da tarefa..."
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={!newTodoTitle.trim()}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Tarefa
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Suas Tarefas</CardTitle>
            <CardDescription>
              Gerencie e acompanhe o progresso das suas tarefas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {response === undefined || response.metadata.countTodos === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhuma tarefa encontrada.</p>
                <p className="text-sm">
                  Adicione uma tarefa manualmente ou use a IA para gerar
                  tarefas.
                </p>
              </div>
            ) : (
              <>
                {response.todos.length > 0 && (
                  <div className="space-y-3">
                    {response.todos.map((todo) => (
                      <div
                        key={todo.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <Checkbox
                          checked={todo.isCompleted}
                          onCheckedChange={() =>
                            updateTodo({
                              isCompleted: !todo.isCompleted,
                              id: todo.id,
                            })
                          }
                        />
                        <div className="flex-1">
                          <p className="font-medium">{todo.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {new Date(todo.createdAt).toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                            {todo.generatedByAI && (
                              <Badge variant="outline" className="text-xs">
                                <Sparkles className="h-3 w-3 mr-1" />
                                IA
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTodo(todo)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
