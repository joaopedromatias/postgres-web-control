import { QueryInterface } from '../components/QueryInterface'
import { TablesInterface } from '../components/TablesInterface'
import { Commands } from '../components/Commands'

const App = () => {
  return (
    <div className="flex flex-row align-baseline justify-between w-[100vw] px-5">
      <TablesInterface />
      <QueryInterface />
      <Commands />
    </div>
  )
}

export default App
