import { useState } from 'react'

interface Props {
  onClick?: () => void
  size: number
  isFixedColor: boolean
  highlightColor: string
}

export function Upload({ onClick, size, isFixedColor, highlightColor }: Props) {
  const initialColor = isFixedColor ? highlightColor : '#ddd'
  const [color, setColor] = useState(initialColor)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      onClick={onClick}
      onMouseOver={isFixedColor ? undefined : () => setColor(highlightColor)}
      onMouseLeave={isFixedColor ? undefined : () => setColor(initialColor)}
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="152 32 152 88 208 88"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="104 144 128 120 152 144"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="128"
        y1="184"
        x2="128"
        y2="120"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  )
}
