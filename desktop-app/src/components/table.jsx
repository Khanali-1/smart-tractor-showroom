function Table({ columns, data }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-blue-300">
            <tr>
              {columns.map((item) => (
                <th
                  key={item.key}// key we havw wrote bcz in -board.jsx it has mentioned key which mean sunique
                  className="px-5 py-4 text-sm font-semibold text-slate-600"
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">

            {data.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50">

                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-5 py-4 text-sm text-slate-700"
                  >
                    {row[column.key]}
                  </td>
                ))}

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Table;