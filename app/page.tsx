'use client';

import { BookmarkPanel } from '@/components/BookmarkPanel';
import { SettingsDialog } from '@/components/SettingsDialog';
import { Toggle } from '@/components/ui/toggle';
import { readFromLocalStorage, saveToLocalStorage } from '@/lib/data-manager';
import { chunkArray } from '@/lib/helpers';
import { BookmarkPanelTypeWithId } from '@/types/schema';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
export default function Home() {
  const [data, setData] = useState(readFromLocalStorage());
  const [editing, setEditing] = useState(false);

  const chunkRows = chunkArray(data.panels, 5);
  const colorsArrays = [
    ['cellColorA', 'cellColorB', 'cellColorC'],
    ['cellColorC', 'cellColorA', 'cellColorB'],
  ];
  function toggleEditing(pressed: boolean): void {
    setEditing(pressed);
  }
  function showData(pressed: boolean): void {
    console.log(data);
  }

  const handlePanelChange = (orig: BookmarkPanelTypeWithId, changed: BookmarkPanelTypeWithId) => {
    console.log('Panel changed', orig, changed);

    const newPanels = data.panels.map(panel => {
      if (panel.id === orig.id) {
        return changed;
      }
      return panel;
    });

    const newData = { title: data.title, columns: data.columns, panels: newPanels };

    console.log('New data', newData);
    setData(newData);
  };

  useEffect(() => {
    saveToLocalStorage(data);
  });

  return (
    <div>
      <h1>
        Bookmarks App &nbsp;
        <SettingsDialog />
        <Toggle size="sm" variant="outline" onPressedChange={toggleEditing}>
          <Pencil className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" variant="outline" onPressedChange={showData}>
          <Pencil className="h-4 w-4" />
        </Toggle>
      </h1>
      <table>
        <tbody>
          {chunkRows.map((row, i) => {
            return (
              <tr key={i}>
                {row.map((panel, j) => {
                  const colColorNumber = j % 3;
                  const rowColorNumber = i % 2;
                  const cellStyle = colorsArrays[rowColorNumber][colColorNumber];

                  return (
                    <td key={j} className={cellStyle}>
                      <BookmarkPanel {...panel} editing={editing} onChange={handlePanelChange} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
