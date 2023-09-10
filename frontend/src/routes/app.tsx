import { QueryInterface } from '../components/QueryInterface'
import { TablesInterface } from '../components/TablesInterface'
import { CommandsInterface } from '../components/CommandsInterface'

const App = () => {
  return (
    <div className="flex flex-row justify-start w-[100vw] h-[100vh]">
      <TablesInterface />
      <div className="flex flex-col basis-4/5">
        <QueryInterface />
        <CommandsInterface />
      </div>
    </div>
  )
}

export default App
