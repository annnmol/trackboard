import useAppStore from "@/store";
import { LocalStorageService } from "./localstorage";

/* eslint-disable no-debugger */
export const DEFAULT_HEADERS = { "Content-Type": "application/json" };

export const SERVER_BASE_URL =
  (import.meta.env.VITE_SERVER_URL! as string) ?? "http://localhost:5000";

export class Network {
  constructor() {}

  public async get<T>(url: string, headers = DEFAULT_HEADERS): Promise<T> {
    const fullUrl = `${SERVER_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      headers,credentials: "include"
    });
    //handle unauthorized
    if (response.status === 401) {
      LocalStorageService.clear();
      useAppStore.getState().setAuthSession(null);
      // window.location.href = "/auth/login";
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response?.json();
  }

  public async post<T>(
    url: string,
    body: any,
    headers = DEFAULT_HEADERS
  ): Promise<T> {
    const fullUrl = `${SERVER_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),credentials: "include"
    });
    return response.json();
  }

  public async put<T>(
    url: string,
    body: any,
    headers = DEFAULT_HEADERS
  ): Promise<T> {
    const fullUrl = `${SERVER_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),credentials: "include"
    });
    return response.json();
  }

  public async delete<T>(url: string, headers = DEFAULT_HEADERS): Promise<T> {
    const fullUrl = `${SERVER_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: "DELETE",
      headers,credentials: "include"
    });
    return response.json();
  }

  public async download(url: string, headers = DEFAULT_HEADERS): Promise<void> {
    const fullUrl = `${SERVER_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      headers,credentials: "include"
    });

    if (response.ok) {
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "transactions.csv"; // name of file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return Promise.resolve();
    } else {
      console.error("HTTP-Error: " + response.status);
      return Promise.reject();
    }
  }
}

export const NetworkService = new Network();
