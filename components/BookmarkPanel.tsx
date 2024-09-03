import { BookmarkPanelTypeWithId, BookmarkTypeWithId } from '@/types/schema';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';

interface IBookmarkPanelProps extends BookmarkPanelTypeWithId {
  onChange: (orig: BookmarkPanelTypeWithId, changed: BookmarkPanelTypeWithId) => void;
  editing: boolean;
}

export const BookmarkPanel: React.FunctionComponent<IBookmarkPanelProps> = props => {
  const [data, setData] = useState(props.bookmarks);

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items: BookmarkTypeWithId[] = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // Update your state with the new order

    const origData: BookmarkPanelTypeWithId = {
      id: props.id,
      label: props.label,
      bookmarks: data,
    };
    const changedData: BookmarkPanelTypeWithId = {
      id: props.id,
      label: props.label,
      bookmarks: items,
    };

    props.onChange(origData, changedData);
    setData(items);
  };

  if (props.editing) {
    return (
      <>
        <div className="panelHeading noWrap">{props.label}</div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={props.id}>
            {provided => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((row, index) => (
                  <Draggable draggableId={row.id} index={index} key={index}>
                    {provided => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <GripVertical className="h-4 w-4 inline-block mr-2" />
                        {row.label}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  } else {
    return (
      <>
        <div className="panelHeading noWrap">{props.label}</div>{' '}
        <ul>
          {data.map((row, index) => (
            <li key={index}>
              <a href={row.url} className="inline-block" target="_blank" rel="noreferrer noopener">
                {row.label}
              </a>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <div className="panelHeading noWrap">{props.label}</div>

      {!props.editing ? null : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={props.id}>
            {provided => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((row, index) => (
                  <Draggable draggableId={row.id} index={index} key={index}>
                    {provided => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <GripVertical className="h-4 w-4 inline-block mr-2" />
                        {row.label}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {props.editing ? null : (
        <ul>
          {data.map((row, index) => (
            <li key={index}>
              <a href={row.url} className="inline-block" target="_blank" rel="noreferrer noopener">
                {row.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
