import { BookmarkDataType, BookmarkDataSchema, BookmarkDataTypeWithId } from '@/types/schema';
import * as defaultDataJson from '@/types/sample-data.json';

function loadDataFromJson(json: string): BookmarkDataTypeWithId | undefined {
  const { success, data } = BookmarkDataSchema.safeParse(json);
  if (!success) {
    console.warn('Invalid JSON data');
    return undefined;
  }
  return setIdsForData(data);
}

function saveDataToJson(data: BookmarkDataType): string {
  return JSON.stringify(setIdsForData(data), null, 2);
}

function defaultData(): BookmarkDataTypeWithId {
  return setIdsForData(defaultDataJson);
}

export function saveToLocalStorage(data: BookmarkDataType): void {
  if (typeof window === 'undefined') {
    console.warn('Window object not found');
    return;
  }

  localStorage.setItem('bookmarkData', saveDataToJson(data));
}

export function readFromLocalStorage(): BookmarkDataTypeWithId {
  let parsedData = defaultData();
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('bookmarkData');
    if (data) {
      const savedData = loadDataFromJson(data);
      if (savedData) {
        parsedData = savedData;
      }
    }
  }
  return parsedData;
}

function setIdsForData(data: BookmarkDataType): BookmarkDataTypeWithId {
  const panels = data.panels.map((panel, pIndex) => {
    const bookmarks = panel.bookmarks.map((bookmark, bIndex) => {
      return { ...bookmark, id: `p${pIndex}-b${bIndex}` };
    });
    return { ...panel, bookmarks, id: `p${pIndex}` };
  });
  return { ...data, panels };
}
