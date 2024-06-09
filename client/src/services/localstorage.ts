export class LocalStorage {
  constructor() {}

  public get<T>(key: string): T | null {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public set<T>(key: string, value: T): void {
    const item = value ? JSON.stringify(value) : "";
    window.localStorage.setItem(key, item);
  }

  public remove(key: string): void {
    window.localStorage.removeItem(key);
  }

  public clear(): void {
    window.localStorage.clear();
  }
}

export const LocalStorageService = new LocalStorage();
