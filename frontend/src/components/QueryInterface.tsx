import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { Button } from './Button'
import { Table } from './Table'

type QueryResults = {
  rows: Record<string, string>[]
  rowCount: number | null
  command: string
}

export const QueryInterface = () => {
  const socket = useOutletContext() as Socket
  const [query, setQuery] = useState(window.sessionStorage.getItem('query')?.toString() || '')
  const [tableData, setTableData] = useState<Record<string, string>[]>([])
  const [isResultAnError, setIsResultAnError] = useState(false)
  const [message, setMessage] = useState('')

  const handleSend = () => {
    window.sessionStorage.setItem('query', query)
    socket.emit('query', query)
  }

  const handleQueryResults = ({ command, rowCount, rows }: QueryResults) => {
    const isResultATable = rows.length > 0
    if (isResultATable) {
      return setTableData(rows)
    }

    let message = ''
    if (command.toLowerCase() === 'select') {
      message = 'no data to be showed'
    } else {
      message = `command ${command} runned successfully, ${rowCount ? rowCount : '0'} rows affected`
      socket.emit('getTables', query)
    }
    setIsResultAnError(false)
    setMessage(message)
    setTableData([])
  }

  const handleQueryResultsError = (errorMessage: string) => {
    setIsResultAnError(true)
    setMessage(errorMessage)
    setTableData([])
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
    <div className="basis-4/5 m-auto px-5 w-full relative max-h-[80vh]">
      <div className="absolute top-2 right-2">
        <Button isDisabled={!query} type="button" text={'run'} onClick={handleSend} />
      </div>
      <div className="h-[40vh]">
        <div>Output:</div>
        {tableData.length > 0 ? (
          <Table rows={tableData} />
        ) : isResultAnError ? (
          <span className="text-red-500 block text-left" role="alert">
            {message}
          </span>
        ) : (
          <span className="block text-left">{message}</span>
        )}
      </div>
      <textarea
        value={query}
        onInput={(e) => {
          const value = (e.target as HTMLTextAreaElement).value
          setQuery(value)
        }}
        cols={40}
        rows={60}
        className="border-2 rounded-lg h-[40vh] w-full resize-none"
      />
    </div>
  )
}
