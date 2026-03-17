import { todoSchema, type Todo } from "../types/schemas";
import { apiGet, apiPost, apiPut, apiDelete } from "./client";

/**
 * Fetches all todos from the API
 * @returns A promise resolving to an array of todos
 */
export async function getTodos(): Promise<Todo[]> {
  const data = await apiGet<unknown[]>("/todos");
  return data.flatMap((item) => {
    const result = todoSchema.safeParse(item);
    return result.success ? [result.data] : [];
  });
}

/**
 * Creates a new todo
 * @param body The todo data
 * @returns A promise resolving to the created todo
 */

export async function createTodo(
  body: Omit<Todo, "id">,
): Promise<Todo> {
  const data = await apiPost<unknown>("/todos", body);
  return todoSchema.parse(data);
}

/**
 * Updates a todo
 * @param id The ID of the todo to update
 * @param body The updated todo data
 * @returns A promise resolving to the updated todo
 */
export async function updateTodo(
  id: number,
  body: Partial<Todo>,
): Promise<Todo> {
  const data = await apiPut<unknown>(`/todos/${id}`, body);
  return todoSchema.parse(data);
}


/**
 * Deletes a todo
 * @param id The ID of the todo to delete
 * @return A promise resolving when the todo is deleted
 */
export async function deleteTodo(id: number): Promise<void> {
  await apiDelete(`/todos/${id}`);
}
