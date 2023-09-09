import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { Table } from './Table'

export const TablesInterface = () => {
  const socket = useOutletContext() as Socket
  const [tablesInfo, setTablesInfo] = useState([] as Record<string, string>[])
  const [isResultAnError, setIsResultAnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleTableResults = (tables: Record<string, string>[]) => {
    setIsResultAnError(false)
    setTablesInfo(tables)
  }

  const handleTableResultsError = (message: string) => {
    setIsResultAnError(true)
    setErrorMessage(message)
  }

  useEffect(() => {
    socket.emit('getTables')
    socket.on('getTablesResults', handleTableResults)
    socket.on('getTablesResultsError', handleTableResultsError)
    return () => {
      socket.removeAllListeners('getTablesResults')
      socket.removeAllListeners('getTablesResultsError')
    }
  }, [])

  return (
    <div className="basis-1/3 m-auto px-5">
      {isResultAnError ? (
        <span className="text-red-500 block text-left" role="alert">
          {errorMessage}
        </span>
      ) : tablesInfo.length > 0 ? (
        <Table rows={tablesInfo} />
      ) : (
        <div>no tables to display</div>
      )}
    </div>
  )
}
