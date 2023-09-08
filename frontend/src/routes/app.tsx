import { useState } from 'react'
import { Button } from '../components/Button'
import { useOutletContext } from 'react-router-dom'
import { Socket } from 'socket.io-client'

type QueryResults = {
  results: Record<string, string>[]
  metadata: Record<string, string>
}

const App = () => {
  const socket = useOutletContext() as Socket
  const [isResultAnError, setIsResultAnError] = useState(false)
  const [isResultATable, setIsResultATable] = useState(false)
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<string[][]>([])

  const handleSend = () => {
    socket.emit('query', query)
    socket.on('queryResults', ({ results, metadata }: QueryResults) => {
      const command = metadata.command
      if (results.length > 0) {
        const tableToShow = [] as string[][]
        const headers = Object.keys(results[0])
        tableToShow.push(headers)
        results.forEach((result) => {
          const values = Object.values(result)
          tableToShow.push(values)
        })
        setResult(tableToShow)
        setIsResultATable(true)
      } else {
        if (command === 'SELECT') {
          setResult([['no data to be showed']])
        } else {
          setResult([[`command ${command} runned successfully`]])
        }
        setIsResultATable(false)
      }
      setIsResultAnError(false)
    })
    socket.on('queryResultsError', (errorMessage: string) => {
      setResult([[errorMessage]])
      setIsResultAnError(true)
    })
  }

  return (
    <>
      {result.length > 0 && (
        <div>
          {isResultAnError ? (
            <span className="text-red-500 block text-left" role="alert">
              {result[0][0]}
            </span>
          ) : isResultATable ? (
            <table className="border-2 border-spacing-2 border-cyan-300">
              {result.map((row, index) => {
                if (index === 0) {
                  return (
                    <thead className="font-bold" key={index}>
                      {row.map((header, index) => (
                        <td className="p-2" key={index}>
                          {header}
                        </td>
                      ))}
                    </thead>
                  )
                } else {
                  return (
                    <tbody key={index}>
                      {row.map((value, index) => (
                        <td className="p-2" key={index}>
                          {value}
                        </td>
                      ))}
                    </tbody>
                  )
                }
              })}
            </table>
          ) : (
            <span className="block text-left">{result[0][0]}</span>
          )}
        </div>
      )}
      <textarea
        value={query}
        onInput={(e) => {
          const value = (e.target as HTMLTextAreaElement).value
          setQuery(value)
          if (!value) {
            setResult([[]])
          }
        }}
        cols={40}
        rows={60}
        className="border-2 rounded pl-1 h-[100px]"
      />
      <Button isDisabled={!query} type="button" text={'send'} onClick={handleSend} />
    </>
  )
}

export default App
