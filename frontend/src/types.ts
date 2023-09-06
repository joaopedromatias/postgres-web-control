import type { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom'
import type { Socket } from 'socket.io-client'

export type RouteLoader = (
  socket: Socket,
  loaderArgs: LoaderFunctionArgs
) => ReturnType<LoaderFunction>
