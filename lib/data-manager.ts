import { BookmarkDataType, BookmarkDataSchema } from '@/types/schema';
import * as defaultDataJson from '@/types/sample-data.json';

export function loadDataFromJson(json: string): BookmarkDataType | undefined {
  const { success, data } = BookmarkDataSchema.safeParse(json);
  if (!success) {
    console.warn('Invalid JSON data');
    return undefined;
  }
  return data as BookmarkDataType;
}

export function saveDataToJson(data: BookmarkDataType): string {
  return JSON.stringify(data, null, 2);
}

export function defaultData(): BookmarkDataType {
  return defaultDataJson as BookmarkDataType;
}

export function saveToLocalStorage(data: BookmarkDataType): void {
  if (!window) {
    console.warn('Window object not found');
    return;
  }
  window?.localStorage.setItem('bookmarkData', saveDataToJson(data));
}

export function readFromLocalStorage(): BookmarkDataType {
  let parsedData = defaultData();
  if (window) {
    const data = window.localStorage.getItem('bookmarkData');
    if (data) {
      const savedData = loadDataFromJson(data);
      if (savedData) {
        parsedData = savedData;
      }
    }
  }
  return parsedData;
}
