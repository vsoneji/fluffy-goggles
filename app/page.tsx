'use client';

import { BookmarkPanel } from '@/components/BookmarkPanel';
import { SettingsDialog } from '@/components/SettingsDialog';
import { readFromLocalStorage } from '@/lib/data-manager';
import { chunkArray } from '@/lib/helpers';
import { useState } from 'react';
export default function Home() {
  const [data, setData] = useState(readFromLocalStorage());

  const chunkRows = chunkArray(data.panels, 5);
  const colorsArrays = [
    ['cellColorA', 'cellColorB', 'cellColorC'],
    ['cellColorC', 'cellColorA', 'cellColorB'],
  ];
  return (
    <div>
      <h1>
        Bookmarks App &nbsp;
        <SettingsDialog />
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
