'use client';

export function DataTable({
  columns,
  rows,
}: {
  columns: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full min-w-[680px] border-collapse text-left text-[13px] leading-5">
        <thead className="bg-zinc-50 text-[12px] font-semibold text-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200">
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
              key={`${r[0]}-${idx}`}
              className="border-t border-zinc-200 dark:border-zinc-800"
            >
              {r.map((cell, cIdx) => (
                <td
                  key={`${cell}-${cIdx}`}
                  className={`px-5 py-3 ${cIdx === 0 ? 'font-semibold text-zinc-900 dark:text-zinc-50' : 'text-zinc-600 dark:text-zinc-300'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

