import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Socket } from 'socket.io-client'

interface TablesInfo {
  schemaname: string
  tablename: string
  tableowner: string
  tablespace: string
  hasindexes: boolean
  hasrules: boolean
  hastriggers: boolean
  rowsecurity: string
}

export const TablesInterface = () => {
  const socket = useOutletContext() as Socket
  const [tablesInfo, setTablesInfo] = useState([] as TablesInfo[])
  const [isResultAnError, setIsResultAnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleTableResults = (tables: TablesInfo[]) => {
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
        <div className="border-2 border-cyan-300">
          {tablesInfo.map((tableInfo, index) => (
            <div key={index}>
              {index + 1}. {tableInfo.tablename}
            </div>
          ))}
        </div>
      ) : (
        <div>no tables to display</div>
      )}
    </div>
  )
}
