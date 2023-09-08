import { useState } from 'react'

interface Props {
  name: string
  placeholder: string
  type: string
  validValues?: string[]
}

export const Input = ({ name, placeholder, type, validValues }: Props) => {
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <>
      <input
        aria-invalid={!!errorMessage}
        aria-errormessage={errorMessage}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value
          if (validValues && !validValues?.includes(value)) {
            setErrorMessage(`The values must be one of the following: ${validValues.join(', ')}`)
          } else {
            setErrorMessage('')
          }
          setTimeout(() => {
            document.forms[0].dispatchEvent(new Event('input'))
          }, 0)
        }}
        required
        className="border-2 rounded pl-1 text-sm"
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {errorMessage && (
        <span
          style={{ textAlign: 'left', color: 'red', fontSize: '0.85rem', lineHeight: '0.8rem' }}
          role="alert"
        >
          {errorMessage}
        </span>
      )}
    </>
  )
}
