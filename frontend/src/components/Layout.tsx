import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="font-bold">
      root component here
      <div>
        <Outlet />
      </div>
    </div>
  )
}
