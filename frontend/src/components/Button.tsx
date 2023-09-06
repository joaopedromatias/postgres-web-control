import { useState } from 'react'

export const Button = () => {
  const [isHovered, setIsHovered] = useState(false)
  // const [isDisabled, setIsDisabled] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  return (
    <button
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // disabled={isLoading || isDisabled}
      style={{
        cursor: 'pointer',
        transform: isHovered ? 'translate(-3px, -3px)' : 'none',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: isHovered ? 'solid 8px #222' : 'none',
        borderBottom: isHovered ? 'solid 8px #222' : 'none',
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
