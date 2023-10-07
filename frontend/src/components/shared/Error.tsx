import { useRouteError } from 'react-router-dom'
import { Layout } from './Layout'

export const Error = () => {
  const { error, stack } = useRouteError() as {
    error: string
    stack: string
  }
  return (
    <Layout>
      <div className="bg-red-500 rounded-lg text-left">
        <div className="text-lg font-bold">An error happenned :(</div>
        <br />
        <div className="font-bold">{error}</div>
        <div>{stack}</div>
      </div>
    </Layout>
  )
}
