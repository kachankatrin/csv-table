import React from 'react';

export default function Cell({value, cellClass}) {
    return (
        <td className={cellClass ? (cellClass + " table-cell table-cell-data") : "table-cell table-cell-data"}>
        {value}
      </td>
    )
}