import { Layout } from '../components/Layout'
import { Outlet, useLoaderData } from 'react-router-dom'
import { RouteLoader } from '../types'

export const loader: RouteLoader = (socket, _) => {
  console.log('root loader')
  return socket
}

export const Index = () => {
  const socket = useLoaderData() as ReturnType<typeof loader>
  return (
    <Layout>
      <Outlet context={socket} />
    </Layout>
  )
}
