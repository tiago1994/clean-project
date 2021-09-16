import { AccessDeniedError } from '@/domain/errors'
import { useLogout } from '@/presentation/hooks'

type CallBackType = (error: Error) => void

export const useErrorHandler = (callback: CallBackType): CallBackType => {
  const logout = useLogout()

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout()
    } else {
      callback(error)
    }
  }
}
