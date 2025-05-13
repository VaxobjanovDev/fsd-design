import { useMutation } from '@tanstack/react-query'
import { pathOr, propOr } from 'ramda'
import { useSnackbar, ALTER_ERROR } from 'app/context/snackbar'

import { Options } from '../api'

interface UsePostOptions {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  options?: Options
}

export const usePost = (
  api: (options?: Options) => Promise<any>,
  { onSuccess, onError, options }: UsePostOptions = {}
) => {
  const snackbar = useSnackbar()

  const mutation = useMutation({
    mutationFn: (postOptions?: Options) => {
      return api({ ...options, ...postOptions })
    },
    onSuccess: (data) => {
      onSuccess?.(data)
    },
    onError: (error: any) => {
      const isHasNotError = error?.data?.error?.error_code === 999999
      const dataError = pathOr('Oops, Something went wrong', ['data', 'error'], error)
      const userMsg =
        typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

      if (!isHasNotError) {
        snackbar({ message: userMsg, type: ALTER_ERROR })
      }

      onError?.(error)
    }
  })

  return {
    postData: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess
  }
}
