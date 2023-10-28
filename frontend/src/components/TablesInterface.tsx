import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { Delete } from './Icons/Delete'
import { Upload } from './Icons/Upload'
import { Modal } from './shared/Modal'

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
  const [isInsertDataModalOpen, setIsInsertDataModalOpen] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [message, setMessage] = useState('')
  const [isMessageError, setIsMessageError] = useState(false)

  const handleTableResults = (tables: TablesInfo[]) => {
    setTablesInfo(tables)
  }

  const handleTableResultsError = (errorMessage: string) => {
    setIsMessageError(true)
    setMessage(errorMessage)
  }

  const handleDeleteTable = (tableName: string) => {
    const deleteTableQuery = `DROP TABLE IF EXISTS ${tableName}`
    socket.emit('query', deleteTableQuery, window.sessionStorage.getItem('sessionId'))
  }

  const handleUploadData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const file = formData.get('file')
      const response = await fetch(
        `/upload/presign-url?tableName=${selectedTable}&socketId=${socket.id}`
      )
      const { presignedUrl } = await response.json()

      await fetch(presignedUrl, {
        method: 'PUT',
        body: file
      })
      const insertMode = formData.get('insert-mode')

      socket.emit('insertData', insertMode ? insertMode.toString() : '', selectedTable)
    } catch (err) {
      setIsMessageError(true)
      setMessage((err as Error).message)
    } finally {
      setIsInsertDataModalOpen(false)
    }
  }

  const handleDataInserted = () => {
    setIsMessageError(false)
    setMessage('data sucessfully inserted')
  }

  const handleDataInsertedError = (errorMessage: string) => {
    setIsMessageError(true)
    setMessage(errorMessage)
  }

  useEffect(() => {
    socket.emit('getTables')
    socket.on('tables', handleTableResults)
    socket.on('tablesError', handleTableResultsError)
    socket.on('dataInserted', handleDataInserted)
    socket.on('dataInsertedError', handleDataInsertedError)
    return () => {
      socket.removeAllListeners('tables')
      socket.removeAllListeners('tablesError')
      socket.removeAllListeners('dataInserted')
      socket.removeAllListeners('dataInsertedError')
    }
  }, [])

  return (
    <div className="basis-1/5 bg-slate-500 text-left py-3 overflow-x-hidden overflow-y-auto relative">
      {isInsertDataModalOpen && (
        <Modal
          title="Upload data"
          icon={<Upload size={80} isFixedColor={true} highlightColor="black" />}
          onSubmit={handleUploadData}
          ctaText="Upload"
          setIsModalOpen={setIsInsertDataModalOpen}
        >
          <div className="flex flex-col items-start py-4 gap-4">
            <div>
              <input
                type="file"
                accept="csv"
                name="file"
                aria-label="choose file"
                placeholder="file..."
              />
            </div>
            <div className="flex justify-start gap-4">
              <div className="flex gap-1">
                <input type="radio" name="insert-mode" id="append" value="append" defaultChecked />
                <label htmlFor="append">append data</label>
              </div>
              <div className="flex gap-1">
                <input type="radio" name="insert-mode" id="replace" value="replace" />
                <label htmlFor="replace">replace data</label>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className="text-lg font-bold pl-3 text-center">Tables</div>
      {tablesInfo.length > 0 ? (
        <div className="w-full">
          {tablesInfo.map((tableInfo, index) => {
            const tableName = tableInfo.tablename
            return (
              <div key={index} className="pl-2 my-5 flex justify-between items-center">
                <div className="basis-1/12">{index + 1}</div>
                <div className="basis-9/12 px-4 w-[15vw]">
                  <div className="flex flex-col justify-start items-start gap-2 overflow-x-auto whitespace-nowrap">
                    <div>name: {tableName}</div>
                    <div className="flex flex-col justify-start text-xs gap-1">
                      <div>indexes: {String(tableInfo.hasindexes)}</div>
                      <div>owner: {String(tableInfo.tableowner)}</div>
                    </div>
                  </div>
                </div>
                <div className="basis-2/12 flex flex-col gap-3 items-center">
                  <div role="button" aria-label={`Upload data to table ${tableName}`}>
                    <Upload
                      size={20}
                      highlightColor="lightgreen"
                      isFixedColor={false}
                      onClick={() => {
                        setIsInsertDataModalOpen(true)
                        setSelectedTable(tableName)
                      }}
                    />
                  </div>
                  <div role="button" aria-label={`Delete table ${tableName}`}>
                    <Delete onClick={() => handleDeleteTable(tableName)} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center pt-2">There are no tables yet</div>
      )}
      {message && (
        <div
          className={`${
            isMessageError ? 'bg-red-200 text-red-500' : 'bg-emerald-200 text-green-700'
          } absolute bottom-[20%] left-[50%] translate-x-[-50%] z-10 flex items-center justify-between gap-6 p-3 rounded-md`}
        >
          <div role="alert" className="basis-5">
            {isMessageError && 'Error: '} {message}
          </div>
          <button onClick={() => setMessage('')} className="basis-1">
            x
          </button>
        </div>
      )}
    </div>
  )
}
