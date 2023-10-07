import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { Table } from './shared/Table'
import { Button } from './shared/Button'

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
    let message = ''

    if (isResultATable) {
      setTableData(rows)
    } else {
      setTableData([])
      if (command.toLowerCase() === 'select') {
        message = 'no data to be showed'
      } else {
        message = `command ${command} runned successfully, ${
          rowCount ? rowCount : '0'
        } rows affected`
      }
    }

    setIsResultAnError(false)
    setMessage(message)
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
    <div className="basis-2/3 max-h-[2/3vh] overflow-hidden">
      <div className="flex justify-between items-center h-[10vh] p-4">
        <div className="text-left">Output:</div>
        <div className="mr-0">
          <Button isDisabled={!query} type="button" text={'run'} onClick={handleSend} />
        </div>
      </div>
      <div className="h-[40vh] px-4 overflow-x-auto">
        {tableData.length > 0 ? (
          <Table data={tableData} />
        ) : (
          <span
            className={`block text-left ${isResultAnError ? 'text-red-500' : ''}`}
            role={isResultAnError ? 'alert' : ''}
          >
            {isResultAnError && 'Error: '} {message}
          </span>
        )}
      </div>
      <textarea
        className="border-2 rounded-lg h-[30vh] w-full resize-none focus:outline-none"
        placeholder="query here!"
        value={query}
        onInput={(e) => {
          const value = (e.target as HTMLTextAreaElement).value
          setQuery(value)
        }}
        cols={40}
        rows={60}
      />
    </div>
  )
}
