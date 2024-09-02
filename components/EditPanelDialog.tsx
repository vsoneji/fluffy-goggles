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
import { BookmarkPanelTypeWithId, BookmarkTypeWithId } from '@/types/schema';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

interface EditPanelDialogProps {
  panel: BookmarkPanelTypeWithId;
}

export const EditPanelDialog: React.FunctionComponent<EditPanelDialogProps> = ({ panel }) => {
  const [data, setData] = useState(panel.bookmarks);

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items: BookmarkTypeWithId[] = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // Update your state with the new order
    setData(items);
  };

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
        <span className="panelHeading">{panel.label}</span>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={panel.id}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((row, index) => (
                  <Draggable draggableId={row.id} index={index} key={index}>
                    {provided => (
                      <div
                        className="border border-input bg-background hover:bg-accent hover:text-accent-foreground draggable"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {row.label}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
