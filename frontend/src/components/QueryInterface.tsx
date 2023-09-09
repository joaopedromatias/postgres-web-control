import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { Button } from './Button'
import { Table } from './Table'

type QueryResults = {
  results: Record<string, string>[]
  metadata: Record<string, string>
}

export const QueryInterface = () => {
  const socket = useOutletContext() as Socket
  const [query, setQuery] = useState(window.sessionStorage.getItem('query')?.toString() || '')
  const [result, setResult] = useState<string[][]>([])
  const [isResultAnError, setIsResultAnError] = useState(false)
  const [isResultATable, setIsResultATable] = useState(false)

  const handleSend = () => {
    window.sessionStorage.setItem('query', query)
    socket.emit('query', query)
  }

  const handleQueryResults = ({ results, metadata }: QueryResults) => {
    setIsResultAnError(false)
    const isResultATable = results.length > 0
    setIsResultATable(isResultATable)

    if (isResultATable) {
      const tableToShow = [] as string[][]
      const headers = Object.keys(results[0])
      tableToShow.push(headers)
      results.forEach((row) => {
        const rows = Object.values(row)
        tableToShow.push(rows)
      })
      setResult(tableToShow)
    } else {
      let message = ''
      const command = metadata.command
      if (command === 'SELECT') {
        message = 'no data to be showed'
      } else {
        message = `command ${command} runned successfully`
      }
      setResult([[message]])
    }
  }

  const handleQueryResultsError = (errorMessage: string) => {
    setIsResultAnError(true)
    setResult([[errorMessage]])
  }

  useEffect(() => {
    socket.on('queryResults', handleQueryResults)
    socket.on('queryResultsError', handleQueryResultsError)
    return () => {
      socket.removeAllListeners('queryResults')
      socket.removeAllListeners('queryResultsError')
    }
  }, [])

  return (
    <div className="basis-1/3 m-auto px-5">
      {result.length > 0 && (
        <div>
          {isResultAnError ? (
            <span className="text-red-500 block text-left" role="alert">
              {result[0][0]}
            </span>
          ) : isResultATable ? (
            <Table result={result} />
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
    </div>
  )
}