import { z } from "zod";

const BookmarkSchema = z.object({
  url: z.string(),
  label: z.string(),
});

const BookmarkPanelSchema = z.object({
  label: z.string(),
  ignored: z.boolean().optional(),
  bookmarks: z.array(BookmarkSchema),
});

export const BookmarkDataSchema = z.object({
  title: z.string(),
  columns: z.number(),
  panels: z.array(BookmarkPanelSchema),
});

export type BookmarkType = z.infer<typeof BookmarkSchema>;
export type BookmarkPanelType = z.infer<typeof BookmarkPanelSchema>;
export type BookmarkDataType = z.infer<typeof BookmarkDataSchema>;

export interface IBookmark {
  url: string;
  label: string;
}

export interface IBookmarkPanel {
  label: string;
  ignored?: boolean;
  bookmarks: IBookmark[];
}

export interface IBookmarkData {
  title: string;
  columns: number;
  panels: IBookmarkPanel[];
}
