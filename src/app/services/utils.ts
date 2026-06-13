import { Service } from '@angular/core';

@Service()
export class Utils {
  static setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static getLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
