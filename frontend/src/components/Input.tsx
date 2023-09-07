interface Props {
  name: string
  placeholder: string
  type: string
}

export const Input = ({ name, placeholder, type }: Props) => {
  return (
    <input
      onInput={() => {
        document.forms[0].dispatchEvent(new Event('input'))
      }}
      required
      className="border-2 rounded pl-1 text-sm"
      type={type}
      name={name}
      placeholder={placeholder}
    />
  )
}
