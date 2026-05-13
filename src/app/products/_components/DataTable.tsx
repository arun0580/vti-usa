'use client';

export type DataTableCell = string | { value: string; colSpan: number };

export function DataTable({
  columns,
  rows,
}: {
  columns: readonly string[];
  rows: readonly (readonly DataTableCell[])[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
      <table className="w-full min-w-[680px] border-collapse text-left text-[13px] leading-5">
        <thead className="bg-zinc-50 text-[12px] font-semibold text-zinc-700">
          <tr>
            {columns.map((c) => (
              <th key={c} className="whitespace-nowrap px-5 py-3">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr
              key={`${typeof r[0] === 'string' ? r[0] : r[0].value}-${idx}`}
              className="border-t border-zinc-200"
            >
              {r.map((cell, cIdx) => {
                const value = typeof cell === 'string' ? cell : cell.value;
                const colSpan = typeof cell === 'string' ? undefined : cell.colSpan;
                return (
                  <td
                    key={`${value}-${cIdx}`}
                    colSpan={colSpan}
                    className={`px-5 py-3 ${cIdx === 0 ? 'font-semibold text-zinc-900' : 'text-zinc-600'}`}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

