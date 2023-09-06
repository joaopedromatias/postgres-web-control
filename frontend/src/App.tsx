import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import * as root from './routes/root'
import * as login from './components/Login'

const wrapRouter = (socket: Socket) =>
  createBrowserRouter([
    {
      path: '/',
      element: <root.Index />,
      loader: (loaderArgs) => root.loader(socket, loaderArgs),
      shouldRevalidate: () => false,
      children: [
        {
          index: true,
          element: <login.default />,
          loader: (loaderArgs) => login.loader(socket, loaderArgs),
          shouldRevalidate: () => false
        }
      ]
    }
  ])

function App() {
  console.log('running app component')
  const socket = io()
  return <RouterProvider router={wrapRouter(socket)} />
}

export default App
