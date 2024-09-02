import { z } from 'zod';

const BookmarkSchema = z.object({
  id: z.string().optional(),
  url: z.string(),
  label: z.string(),
});

const BookmarkSchemaWithId = BookmarkSchema.extend({
  id: z.string(),
});

const BookmarkPanelSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  ignored: z.boolean().optional(),
  bookmarks: z.array(BookmarkSchema),
});

const BookmarkPanelSchemaWithId = BookmarkPanelSchema.extend({
  id: z.string(),
  bookmarks: z.array(BookmarkSchemaWithId),
});

export const BookmarkDataSchema = z.object({
  title: z.string(),
  columns: z.number(),
  panels: z.array(BookmarkPanelSchema),
});

export const BookmarkDataSchemaWithId = BookmarkDataSchema.extend({
  panels: z.array(BookmarkPanelSchemaWithId),
});

export type BookmarkType = z.infer<typeof BookmarkSchema>;
export type BookmarkPanelType = z.infer<typeof BookmarkPanelSchema>;
export type BookmarkDataType = z.infer<typeof BookmarkDataSchema>;

export type BookmarkTypeWithId = z.infer<typeof BookmarkSchemaWithId>;
export type BookmarkPanelTypeWithId = z.infer<typeof BookmarkPanelSchemaWithId>;
export type BookmarkDataTypeWithId = z.infer<typeof BookmarkDataSchemaWithId>;
