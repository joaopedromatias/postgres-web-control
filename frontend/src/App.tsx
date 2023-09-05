import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import * as root from './routes/root'
import { Layout } from './components/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    shouldRevalidate: () => false,
    children: [
      {
        index: true,
        element: <root.Index />,
        loader: root.loader
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
