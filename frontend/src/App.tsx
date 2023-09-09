import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Error } from './components/Error'
import { Loading } from './components/Loading'
import { io, Socket } from 'socket.io-client'
import * as login from './routes/login'
import * as root from './routes/root'
import * as app from './routes/app'

const wrapRouter = (socket: Socket) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <root.default />,
      loader: (loaderArgs) => root.loader(socket, loaderArgs),
      shouldRevalidate: () => false,
      errorElement: <Error />,
      children: [
        {
          path: '/login',
          element: <login.default />
        },
        {
          path: '/app',
          loader: (loaderArgs) => app.loader(socket, loaderArgs),
          element: <app.default />
        }
      ]
    }
  ])
}

function App() {
  const [socket, setSocket] = useState({} as Socket)
  useEffect(() => {
    const s = io()
    setSocket(s)
  }, [])
  if (!socket) {
    return <Loading />
  }
  return <RouterProvider router={wrapRouter(socket)} />
}

export default App
