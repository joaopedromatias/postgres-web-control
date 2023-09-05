import io from 'socket.io-client'

export const loader = () => {
  io()
  console.log('root loader running')
  return true
}

export const Index = () => {
  return <div>root index here!!!!</div>
}
