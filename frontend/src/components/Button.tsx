import { useState } from 'react'

interface Props {
  isDisabled: boolean
  type: 'button' | 'submit'
}

export const Button = ({ isDisabled, type }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <button
      type={type}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isDisabled}
      style={{
        cursor: 'pointer',
        transform: isHovered ? 'translate(-2px, -2px)' : 'none',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: isHovered ? 'solid 5px #222' : 'none',
        borderBottom: isHovered ? 'solid 5px #222' : 'none',
        height: 40,
        transition: 'all .1s ease-in-out',
        letterSpacing: 1,
        width: 'max-content',
        display: 'block',
        margin: 'auto',
        padding: '8px 12px',
        backgroundColor: '#347de3',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        fontFamily: 'monospace'
      }}
    >
      Login
    </button>
  )
}
