import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import * as login from './routes/login'
import * as root from './routes/root'
import * as $404 from './routes/404'
import * as app from './routes/app'
import { Error } from './components/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <root.default />,
    loader: root.loader,
    shouldRevalidate: () => false,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <login.default />
      },
      {
        path: '/app',
        element: <app.default />
      },
      {
        path: '*',
        element: <$404.default />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
