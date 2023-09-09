import { Suspense } from 'react'
import { Await } from 'react-router-dom'
import { Loading } from './Loading'

interface Props {
  promise: Promise<object[]>
}

export const TablesInterface = ({ promise }: Props) => {
  return (
    <div className="basis-1/3 m-auto px-5">
      <Suspense fallback={<Loading />}>
        <Await resolve={promise}>
          {(tables) => {
            console.log(tables)
            return <div>tables promise resolved</div>
          }}
        </Await>
      </Suspense>
    </div>
  )
}
