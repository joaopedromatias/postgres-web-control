import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import * as root from './routes/root'
import { Login } from './components/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <root.Index />,
    loader: root.loader,
    shouldRevalidate: () => false,
    children: [
      {
        index: true,
        element: <Login />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
