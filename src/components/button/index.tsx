import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className='min-w-fit border border-gray-300 text-sm rounded py-1 px-2'
      style={{
        cursor: rest.disabled ? 'default' : 'pointer',
        backgroundColor: rest.disabled
          ? 'rgb(249 250 251)'
          : 'rgb(229 231 235)',
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
