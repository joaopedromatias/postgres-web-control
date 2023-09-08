interface Props {
  isDisabled: boolean
  type: 'button' | 'submit'
  text: string
  onClick?: () => void
}

export const Button = ({ isDisabled, type, text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className="hover:-translate-x-1 hover:-translate-y-1 hover:cursor-pointer h-[40px] hover:border-solid hover:border-r-4 hover:border-b-4 hover:border-slate-900 transition-all ease-in-out duration-100 tracking-wider w-max block m-auto py-[8px] px-[12px] text-lg font-bold"
      style={{
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        backgroundColor: isDisabled ? 'lightgray' : '#347de3'
      }}
    >
      {text}
    </button>
  )
}
