import { FormEvent, useState } from 'react'

interface Props {
  name: string
  placeholder: string
  type: string
  validValues?: string[]
}

export const Input = ({ name, placeholder, type, validValues }: Props) => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleInput = (e: FormEvent) => {
    const value = (e.target as HTMLInputElement).value
    if (validValues && !validValues?.includes(value)) {
      setErrorMessage(`The values must be one of the following: ${validValues.join(', ')}`)
    } else {
      setErrorMessage('')
    }
    setTimeout(() => {
      document.forms[0].dispatchEvent(new Event('input'))
    }, 0)
  }

  return (
    <>
      <input
        aria-invalid={!!errorMessage}
        aria-errormessage={errorMessage}
        onInput={handleInput}
        required
        className="border-2 rounded pl-1 text-sm"
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {errorMessage && (
        <span className="text-left text-red-500 text-sm leading-3" role="alert">
          {errorMessage}
        </span>
      )}
    </>
  )
}
