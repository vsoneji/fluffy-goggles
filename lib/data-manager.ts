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
