import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { LoaderFunctionArgs, Outlet, defer, useLoaderData, useNavigate } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { io } from 'socket.io-client'
import { Socket } from 'socket.io'

export const loader = ({ request }: LoaderFunctionArgs) => {
  const socket = io()
  const url = new URL(request.url)
  const formData = Object.fromEntries(url.searchParams)

  let dbParameters = {} as Record<string, string | null>
  const nbOfRequiredParameters = 5

  if (Object.keys(formData).length >= nbOfRequiredParameters) {
    dbParameters = formData
  } else {
    dbParameters = {
      database: window.sessionStorage.getItem('database'),
      username: window.sessionStorage.getItem('username'),
      password: window.sessionStorage.getItem('password'),
      port: window.sessionStorage.getItem('port'),
      dialect: window.sessionStorage.getItem('dialect')
    }
  }

  let countValues = 0
  Object.keys(dbParameters).forEach((key) => {
    if (dbParameters[key]) {
      countValues++
    }
  })

  let isConnectedToDbPromise = {} as Promise<boolean>

  if (countValues >= nbOfRequiredParameters) {
    socket.emit('connectClientToDb', { ...dbParameters })
    isConnectedToDbPromise = new Promise((res, rej) => {
      try {
        socket.on('isConnectedToDb', (isConnectedToDb: boolean) => {
          res(isConnectedToDb)
        })
      } catch (err) {
        rej(err)
      }
    })
  } else {
    isConnectedToDbPromise = Promise.resolve(false)
  }

  return defer({ isConnectedToDbPromise, socket })
}

const Index = () => {
  const { isConnectedToDbPromise, socket } = useLoaderData() as {
    isConnectedToDbPromise: Promise<boolean>
    socket: Socket
  }
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    isConnectedToDbPromise.then((isConnectedToDb: boolean) => {
      setIsLoading(false)
      console.log('isConnectedToDb:', isConnectedToDb)
      if (isConnectedToDb) {
        navigate('/app')
      } else {
        navigate('/login')
      }
    })
  }, [])

  return <Layout>{isLoading ? <Loading /> : <Outlet context={socket} />}</Layout>
}

export default Index
