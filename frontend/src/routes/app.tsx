import { QueryInterface } from '../components/QueryInterface'
import { TablesInterface } from '../components/TablesInterface'
import { CommandsInterface } from '../components/CommandsInterface'
import { Socket } from 'socket.io-client'
import { LoaderFunctionArgs, defer, useLoaderData } from 'react-router-dom'

export const loader = (socket: Socket, _: LoaderFunctionArgs) => {
  socket.emit('getTables')
  const tablesPromise = new Promise((res, rej) => {
    try {
      socket.on('getTablesResults', (tables) => {
        res(tables)
      })
    } catch (err) {
      rej(err)
    }
  })

  return defer({ tablesPromise })
}

const App = () => {
  const { tablesPromise } = useLoaderData() as { tablesPromise: Promise<object[]> }

  return (
    <div className="flex flex-row justify-between w-[100vw] px-5 pt-5">
      <TablesInterface promise={tablesPromise} />
      <QueryInterface />
      <CommandsInterface />
    </div>
  )
}

export default App
