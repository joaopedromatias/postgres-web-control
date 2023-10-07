import { useEffect, useState } from 'react'

interface Props {
  data: Record<string, string>[]
}

export const Table = ({ data }: Props) => {
  const [tableData, setTableData] = useState([] as string[][])

  useEffect(() => {
    const newTableData = []
    const headers = Object.keys(data[0])
    newTableData.push(headers)
    data.forEach((row) => {
      const values = Object.values(row)
      newTableData.push(values)
    })
    setTableData(newTableData)
  }, [data])

  return (
    <table className="border-2 border-spacing-2 border-cyan-300 mb-3">
      {tableData.map((row, index) => {
        if (index === 0) {
          return (
            <thead key={index} className="font-bold border-b-2">
              <tr>
                {row.map((header, index) => (
                  <th className="p-2" key={index}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )
        }
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
      })}
    </table>
  )
}
