const Table = ({ columns, dataSource }) => {
  return (
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 table-auto">
        <thead class="bg-gray-50">
          <tr>
            {columns.map((column) => {
              return (
                <th
                  scope="col"
                  key={column.name}
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {dataSource.map((data) => {
            return (
              <tr key={`${data.address}-${data.network}`}>
                {columns.map((column) => {
                  return (
                    <td
                      class="px-6 py-4 whitespace-nowrap color-black"
                      key={column.name}
                    >
                      {column.render
                        ? column.render(data[column.name])
                        : data[column.name]}
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
};

export default Table;
