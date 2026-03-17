import { userSchema, type User } from "../types/schemas";
import { apiGet } from "./client";

/**
 * Fetches all users from the API
 * @returns A promise resolving to an array of users
 */
export async function getUsers(): Promise<User[]> {
  const data = await apiGet<unknown[]>("/users");
  return data.map((item) => userSchema.parse(item));
}
