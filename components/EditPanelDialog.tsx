import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookmarkPanelType, BookmarkType } from '@/types/schema';
import { useState } from 'react';

interface EditPanelDialogProps {
  panel: BookmarkPanelType;
}

interface TableRow extends BookmarkType {
  id: number;
}

export const EditPanelDialog: React.FunctionComponent<EditPanelDialogProps> = ({ panel }) => {
  const [data, setData] = useState<TableRow[]>(panel.bookmarks.map((bookmark, index) => ({ ...bookmark, id: index })));

  return (
    <Dialog>
      <DialogTrigger>
        <Pencil className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="lg:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit panel</DialogTitle>
          <DialogDescription>Edit the bookmkar panel.</DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <span className="panelHeading">{panel.label}</span>

          {data.map(row => (
            <p key={row.id}>{row.label}</p>
          ))}
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="default">
              Save
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
