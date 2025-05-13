import { useMutation } from '@tanstack/react-query'
import { pathOr } from 'ramda'
import { useSnackbar, ALTER_ERROR } from 'app/context/snackbar'

import { Options } from '../api'

interface UsePutOptions {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  options?: Options
}

export const usePut = (
  api: (options?: Options) => Promise<any>,
  { onSuccess, onError, options }: UsePutOptions = {}
) => {
  const snackbar = useSnackbar()

  const mutation = useMutation({
    mutationFn: (putOptions?: Options) => {
      return api({ ...options, ...putOptions })
    },
    onSuccess: (data) => {
      onSuccess?.(data)
    },
    onError: (error: any) => {
      const userMsg = pathOr('Oops, Something went wrong', ['data', 'error', 'user_msg'], error)
      snackbar({ message: userMsg, type: ALTER_ERROR })
      onError?.(error)
    }
  })

  return {
    putData: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess
  }
}
