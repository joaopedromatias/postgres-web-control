import { FormEvent, useEffect, useState } from 'react'
import { Input } from '../components/shared/Input'
import { Button } from '../components/shared/Button'

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(true)

  const handleFormInput = () => {
    const formElements = document.forms[0].elements
    const inputFormElements = [...formElements].filter((element) => element.tagName === 'INPUT')
    const inputFormElementsLen = inputFormElements.length

    let counterHasValueAndIsValid = 0
    inputFormElements.forEach((element) => {
      const elementValue = (element as HTMLInputElement).value
      const isValid = element.getAttribute('aria-invalid') === 'false'
      if (elementValue && isValid) counterHasValueAndIsValid++
    })

    if (counterHasValueAndIsValid === inputFormElementsLen) {
      return setIsDisabled(false)
    }
    setIsDisabled(true)
  }

  const handleFormSubmit = (e: FormEvent) => {
    const formData = new FormData(e.target as HTMLFormElement)
    for (const entry of formData.entries()) {
      const key = entry[0]
      const value = String(entry[1]) || ''
      window.sessionStorage.setItem(key, value)
    }
  }

  useEffect(() => {
    const form = document.forms[0]
    if (form) {
      form.addEventListener('input', handleFormInput)
    }
    return () => {
      if (form) {
        form.removeEventListener('input', handleFormInput)
      }
    }
  }, [])

  return (
    <form
      method="get"
      action="/"
      onSubmit={handleFormSubmit}
      className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/3 p-[20px] rounded-md border border-slate-300 flex flex-col gap-3 justify-center w-[25vw]"
    >
      <span className="text-lg text-slate-800">Login to your database</span>
      <Input name="database" placeholder="database name..." type="text" />
      <Input name="username" placeholder="username..." type="text" />
      <Input name="password" placeholder="password..." type="password" />
      <Input name="port" placeholder="port..." type="text" />
      <Button type="submit" isDisabled={isDisabled} text={'Login'} />
    </form>
  )
}

export default Login
