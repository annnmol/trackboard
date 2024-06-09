export class CookieStorage {
    constructor() {}
  
    public get(key: string): string | null {
        const matches = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
        const cookie = matches ? decodeURIComponent(matches.pop() || "") : null;

        
        
        console.log(`🚀 ~ file: cookies.ts:8 ~ CookieStorage ~ get ~ matches:`, matches);
    
        console.log(`🚀 ~ file: cookies.ts:8 ~ CookieStorage ~ get ~ matches.pop():`, matches?.pop());
        
        console.log(`🚀 ~ file: cookies.ts:8 ~ CookieStorage ~ get ~ cookie:`, cookie);

        
        return cookie ??null;
    }
  
    public set(key: string, value: string): void {
      const date = new Date();
      date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000)); // Cookie will expire in 1 day
      const expires = "; expires=" + date.toUTCString();
      document.cookie = key + "=" + (value || "")  + expires + "; path=/";
    }
  
    public remove(key: string): void {
      document.cookie = key + '=; Max-Age=-99999999;'; 
    }
  
    public clear(): void {
      const cookies = document.cookie.split(";");
  
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
  }
  
  export const CookieStorageService = new CookieStorage();