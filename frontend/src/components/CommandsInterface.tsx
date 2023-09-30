import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Socket } from 'socket.io-client'

interface Command {
  command: string
  query: string
  timestamp: string
  rowCount: string
}

export const CommandsInterface = () => {
  const socket = useOutletContext() as Socket
  const [commands, setCommands] = useState<Command[]>([])

  const handleCommandsUpdate = async () => {
    const response = await fetch(`/commands?clientId=${socket.id}`)
    const { commands } = await response.json()
    setCommands(commands)
  }

  useEffect(() => {
    socket.on('queryResults', handleCommandsUpdate)
    socket.on('queryResultsError', handleCommandsUpdate)
    return () => {
      socket.removeAllListeners('queryResults')
      socket.removeAllListeners('queryResultsError')
    }
  }, [])
  return (
    <div className="basis-1/5 max-h-[20vh] m-auto px-5 bg-pink-400 w-full overflow-y-auto">
      {commands.map((command, index) => {
        return (
          <div key={index}>
            <div className="flex p-3 gap-4">
              <div>{command.timestamp.split('.')[0]}</div>
              <div>{command.query}</div>
              <div>rows affected: {command.rowCount}</div>
              <div>command type: {command.command}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
