import { FormEvent, useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(true)

  const handleFormInput = () => {
    const formElements = document.forms[0].elements
    const inputFormElements = [...formElements].filter((element) => element.tagName === 'INPUT')
    const inputFormElementsLen = inputFormElements.length

    let countHasValueAndIsValid = 0
    inputFormElements.forEach((element) => {
      const elementValue = (element as HTMLInputElement).value
      const isValid = element.getAttribute('aria-invalid') === 'false'
      if (elementValue && isValid) countHasValueAndIsValid++
    })

    if (countHasValueAndIsValid === inputFormElementsLen) {
      return setIsDisabled(false)
    }
    setIsDisabled(true)
  }

  const handleFormSubmit = (e: FormEvent) => {
    const formElements = (e.target as HTMLFormElement).elements
    const inputFormElements = [...formElements].filter((element) => element.tagName === 'INPUT')
    inputFormElements.forEach((element) => {
      const elementValue = (element as HTMLInputElement).value
      const elementName = element.getAttribute('name')
      if (elementName && elementValue) {
        window.sessionStorage.setItem(elementName, elementValue)
      }
    })
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
      className="p-[20px] rounded-md border border-slate-300 flex flex-col gap-3 justify-center w-[25vw]"
    >
      <span className="text-lg text-slate-800">Login to your database</span>
      <Input
        name="dialect"
        placeholder="database engine..."
        type="text"
        validValues={[
          'postgres',
          'sqlite',
          'snowflake',
          'oracle',
          'mysql',
          'mssql',
          'db2',
          'mariadb'
        ]}
      />
      <Input name="database" placeholder="database name..." type="text" />
      <Input name="username" placeholder="username..." type="text" />
      <Input name="password" placeholder="password..." type="password" />
      <Input name="port" placeholder="port..." type="number" />
      <Button type="submit" isDisabled={isDisabled} text={'Login'} />
    </form>
  )
}

export default Login
