import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { Delete } from './Icons/Delete'
import { Upload } from './Icons/Upload'
import { Modal } from './Modal'

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

  const handleTableResults = (tables: TablesInfo[]) => {
    setTablesInfo(tables)
  }

  const handleDeletedTable = () => {
    socket.emit('getTables')
  }

  const handleDeleteTable = (tableName: string) => {
    socket.emit('deleteTable', tableName)
  }

  const handleUploadData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsInsertDataModalOpen(false)
  }

  useEffect(() => {
    socket.emit('getTables')
    socket.on('getTablesResults', handleTableResults)
    socket.on('deletedTable', handleDeletedTable)
    return () => {
      socket.removeAllListeners('getTablesResults')
      socket.removeAllListeners('deletedTable')
    }
  }, [])

  return (
    <div className="basis-1/5 bg-slate-500 text-left py-3 overflow-x-hidden overflow-y-auto">
      {isInsertDataModalOpen && (
        <Modal
          title="Upload data"
          icon={<Upload size={80} isFixedColor={true} highlightColor="black" />}
          onSubmit={handleUploadData}
          ctaText="Upload"
          onClose={() => setIsInsertDataModalOpen(false)}
        >
          <div className="flex flex-col items-start gap-1">
            <div>Choose a csv file</div>
            <input type="file" accept="csv" placeholder="file..." />
            <div className="flex justify-start gap-4">
              <div className="flex gap-1">
                <input type="radio" name="insert-mode" id="append" value="append" />
                <label htmlFor="append">append data</label>
              </div>
              <div className="flex gap-1">
                <input type="radio" name="insert-mode" id="override" value="override" />
                <label htmlFor="override">override existing data</label>
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
                <div className="basis-9/12 px-4">
                  <div className="flex flex-col justify-start items-start gap-2 w-[15vw] max-w-[15vw] overflow-x-auto whitespace-nowrap">
                    <div>name: {tableName}</div>
                    <div className="flex flex-col justify-start text-xs gap-1">
                      <div>indexes: {String(tableInfo.hasindexes)}</div>
                      <div>owner: {String(tableInfo.tableowner)}</div>
                    </div>
                  </div>
                </div>
                <div className="basis-2/12 flex flex-col gap-3">
                  <div role="button" aria-label={`Upload data to table ${tableName}`}>
                    <Upload
                      size={20}
                      highlightColor="lightgreen"
                      isFixedColor={false}
                      onClick={() => setIsInsertDataModalOpen(true)}
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
    </div>
  )
}
