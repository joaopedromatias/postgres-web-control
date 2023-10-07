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
    fetch(`/commands?clientId=${socket.id}`)
      .then((res) => res.json())
      .then(({ commands }) => {
        if (commands) setCommands(commands)
      })
    return () => {
      socket.removeAllListeners('queryResults')
      socket.removeAllListeners('queryResultsError')
    }
  }, [])

  return (
    <div className="basis-1/3 max-h-[1/3vh] bg-blue-300 w-full overflow-y-auto">
      <div className="flex justify-start gap-5 p-3 items-center font-bold">
        <div className="basis-1/4">timestamp</div>
        <div className="basis-1/4">query</div>
        <div className="basis-1/4">command type</div>
        <div className="basis-1/4">rows affected</div>
      </div>
      <hr className="border-t-stone-900" />
      <div className="h-[80%] overflow-y-auto">
        {commands.map((command, index) => {
          return (
            <div key={index}>
              <div className="flex justify-start gap-5 p-3 items-center">
                <div className="basis-1/4">{command.timestamp.split('.')[0]}</div>
                <div className="basis-1/4">{command.query}</div>
                <div className="basis-1/4">command type: {command.command}</div>
                <div className="basis-1/4">rows affected: {command.rowCount}</div>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  )
}
