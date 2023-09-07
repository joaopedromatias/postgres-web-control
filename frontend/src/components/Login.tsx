import { useEffect, useState } from 'react'
import { RouteLoader } from '../types'
import { Button } from './Button'
import { Input } from './Input'
import { Form } from 'react-router-dom'

export const loader: RouteLoader = () => {
  console.log('login loader')
  return true
}

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const handleFormInput = () => {
    const formElements = document.forms[0].elements
    const inputFormElements = [...formElements].filter((element) => element.tagName === 'INPUT')
    const inputFormElementsLen = inputFormElements.length
    let countHasValue = 0
    for (let i = 0; i < inputFormElementsLen; i++) {
      const elementValue = (formElements[i] as HTMLInputElement).value
      if (elementValue) countHasValue++
    }
    if (countHasValue === inputFormElementsLen) {
      return setIsDisabled(false)
    }
    setIsDisabled(true)
  }
  useEffect(() => {
    document.forms[0].addEventListener('input', handleFormInput)
    return () => {
      document.forms[0].removeEventListener('input', handleFormInput)
    }
  }, [])
  return (
    <Form className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/3 p-[20px] rounded-md border border-slate-300">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          justifyContent: 'center'
        }}
      >
        <span className="font-mono text-lg text-slate-800">Login to your database</span>
        <Input name="database" placeholder="database name..." type="text" />
        <Input name="username" placeholder="username..." type="text" />
        <Input name="password" placeholder="password..." type="password" />
        <Button type="submit" isDisabled={isDisabled} />
      </div>
    </Form>
  )
}

export default Login
