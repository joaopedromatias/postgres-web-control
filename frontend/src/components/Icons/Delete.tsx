import { useState } from 'react'

interface Props {
  onClick: () => void
}

export function Delete({ onClick }: Props) {
  const initialColor = '#ddd'
  const [color, setColor] = useState(initialColor)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#000000"
      viewBox="0 0 256 256"
      className="hover:cursor-pointer"
      onClick={onClick}
      onMouseOver={() => setColor('darkred')}
      onMouseLeave={() => setColor(initialColor)}
    >
      <rect width="256" height="256" fill="none"></rect>
      <line
        x1="216"
        y1="56"
        x2="40"
        y2="56"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="104"
        y1="104"
        x2="104"
        y2="168"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="152"
        y1="104"
        x2="152"
        y2="168"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <path
        d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
      <path
        d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
    </svg>
  )
}
