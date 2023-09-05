import io from 'socket.io-client'
import { Layout } from '../components/Layout'
import { Outlet, useLoaderData } from 'react-router-dom'

export const loader = () => {
  io()
  console.log('root loader running')
  return true
}

export const Index = () => {
  const loaderData = useLoaderData()
  console.log('loader data:', loaderData)
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
