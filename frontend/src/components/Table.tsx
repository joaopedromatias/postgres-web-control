interface Props {
  result: string[][]
}

export const Table = ({ result }: Props) => {
  return (
    <table className="border-2 border-spacing-2 border-cyan-300">
      {result.map((row, index) => {
        if (index === 0) {
          return (
            <thead className="font-bold" key={index}>
              <tr>
                {row.map((header, index) => (
                  <th className="p-2" key={index}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )
        } else {
          return (
            <tbody key={index}>
              <tr>
                {row.map((value, index) => (
                  <td className="p-2" key={index}>
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          )
        }
      })}
    </table>
  )
}
