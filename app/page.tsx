'use client';

import { BookmarkPanel } from '@/components/BookmarkPanel';
import { SettingsDialog } from '@/components/SettingsDialog';
import { Toggle } from '@/components/ui/toggle';
import { readFromLocalStorage } from '@/lib/data-manager';
import { chunkArray } from '@/lib/helpers';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
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

  return (
    <div>
      <h1>
        Bookmarks App &nbsp;
        <SettingsDialog />
        <Toggle size="sm" variant="outline" onPressedChange={toggleEditing}>
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
                      <BookmarkPanel
                        {...panel}
                        editing={editing}
                        onChange={(orig, changed) => {
                          console.log('Panel changed', orig, changed);
                        }}
                      />
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
