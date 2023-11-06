import { Context, useContext } from 'react'

export const genError = (displayName?: string) => {
  return new Error(
    `Components that require this context must be children of ${
      displayName ?? 'the appropriate provider'
    }.`,
  )
}

export const useContextFallback = <T>(value: Context<T | undefined>) => {
  const context = useContext<T | undefined>(value)

  if (context === undefined) {
    throw genError(value.displayName)
  }

  return context
}
