import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { LoaderFunctionArgs, Outlet, defer, useLoaderData, useNavigate } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { Socket } from 'socket.io-client'

export const loader = (socket: Socket, { request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const formData = Object.fromEntries(url.searchParams)

  let dbParameters = {} as Record<string, string | null>
  const requiredParameters = ['username', 'password', 'database', 'port']
  const nbOfRequiredParameters = requiredParameters.length

  const formDataKeys = Object.keys(formData)
  const formDataHasTheRightLength = formDataKeys.length === nbOfRequiredParameters
  const formDataHasTheRightKeys = formDataKeys.every(
    (key) => requiredParameters.includes(key) && formData[key]
  )

  if (formDataHasTheRightLength && formDataHasTheRightKeys) {
    dbParameters = { ...formData }
  } else {
    requiredParameters.forEach((parameter) => {
      const parameterValue = window.sessionStorage.getItem(parameter)
      if (parameterValue) dbParameters[parameter] = parameterValue
    })
  }

  const shouldTryConnection = Object.keys(dbParameters).length === nbOfRequiredParameters
  let isConnectedToDbPromise = {} as Promise<boolean>

  if (shouldTryConnection) {
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
    isConnectedToDbPromise
      .then((isConnectedToDb: boolean) => {
        if (isConnectedToDb) return navigate('/app')
        navigate('/login')
      })
      .catch((err) => {
        throw err
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return <Layout>{isLoading ? <Loading /> : <Outlet context={socket} />}</Layout>
}

export default Index
