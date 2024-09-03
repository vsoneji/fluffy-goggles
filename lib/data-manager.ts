import { BookmarkDataType, BookmarkDataSchema, BookmarkDataTypeWithId, BookmarkDataSchemaWithId } from '@/types/schema';
import { defaultBookmarksData } from '@/types/defaultData';

function loadDataFromJson(json: string): BookmarkDataTypeWithId | undefined {
  const parsedData = JSON.parse(json);
  if (typeof parsedData !== 'object') {
    throw new Error('Invalid JSON data');
  }

  try {
    return BookmarkDataSchemaWithId.parse(parsedData);
  } catch (e) {
    console.warn('Invalid JSON data');
    console.warn(e);
    return undefined;
  }
}

function saveDataToJson(data: BookmarkDataTypeWithId): string {
  return JSON.stringify(data);
}

function defaultData(): BookmarkDataTypeWithId {
  return setIdsForData(defaultBookmarksData);
}

export function saveToLocalStorage(data: BookmarkDataTypeWithId): void {
  if (typeof window === 'undefined') {
    console.warn('Window object not found');
    return;
  }
  // TODO: figure out the correct way to use localStorage in Next.js
  console.log(`NOT Saving to local storage`);
  // localStorage.setItem('bookmarkData', saveDataToJson(data));
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
