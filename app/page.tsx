'use client';

import { BookmarkPanel } from '@/components/BookmarkPanel';
import { defaultData } from '@/lib/data-manager';
import { chunkArray } from '@/lib/helpers';
export default function Home() {
    const chunkRows = chunkArray(defaultData().panels, 5);
    let sequenceNumber = 0;
    const colorsArrays = [
        ['cellColorA', 'cellColorB', 'cellColorC'],
        ['cellColorC', 'cellColorA', 'cellColorB'],
    ];
    return (
        <div>
            <h1>Bookmarks App</h1>
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
