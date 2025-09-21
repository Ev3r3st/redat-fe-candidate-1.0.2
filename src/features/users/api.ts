import type { User } from './types';

export async function fetchUsersApi(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const raw = (await res.json()) as unknown;
  if (Array.isArray(raw)) {
    return raw as User[];
  }
  return [];
}

