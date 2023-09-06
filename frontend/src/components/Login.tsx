import { RouteLoader } from '../types'
import { Button } from './Button'

export const loader: RouteLoader = () => {
  console.log('login loader')
  return true
}

const Login = () => {
  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/3 p-[20px] rounded-md border border-slate-300">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          justifyContent: 'center'
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: '#333' }}>
          Login to your database
        </span>
        <input type="text" name="database name" placeholder="database..." />
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password..." />
        <Button />
      </div>
    </div>
  )
}

export default Login
