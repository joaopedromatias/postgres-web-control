import { QueryInterface } from '../components/QueryInterface'
import { TablesInterface } from '../components/TablesInterface'
import { CommandsInterface } from '../components/CommandsInterface'

const App = () => {
  return (
    <div className="flex flex-row justify-between w-[100vw] px-5">
      <TablesInterface />
      <QueryInterface />
      <CommandsInterface />
    </div>
  )
}

export default App
