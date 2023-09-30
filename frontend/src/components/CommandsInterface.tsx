import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Socket } from 'socket.io-client'

export const CommandsInterface = () => {
  const socket = useOutletContext() as Socket

  const handleCommandsUpdate = async () => {
    const response = await fetch(`/commands?clientId=${socket.id}`)
    const commands = await response.json()
    console.log(commands)
  }

  useEffect(() => {
    socket.on('queryResults', handleCommandsUpdate)
    socket.on('queryResultsError', handleCommandsUpdate)
    return () => {
      socket.removeAllListeners('queryResults')
      socket.removeAllListeners('queryResultsError')
    }
  }, [])
  return <div className="basis-1/5 m-auto px-5 bg-pink-400 w-full">commands</div>
}
