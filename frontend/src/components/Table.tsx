import { useEffect, useState } from 'react'

interface Props {
  rows: Record<string, string>[]
}

export const Table = ({ rows }: Props) => {
  const [tableData, setTableData] = useState([] as string[][])

  useEffect(() => {
    const newTableData = []
    const headers = Object.keys(rows[0])
    newTableData.push(headers)
    rows.forEach((row) => {
      const values = Object.values(row)
      newTableData.push(values)
    })
    setTableData(newTableData)
  }, [rows])

  return (
    <table className="border-2 border-spacing-2 border-cyan-300 m-auto mb-5">
      {tableData.map((row, index) => {
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
                    {value ? value.toString() : '-'}
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
