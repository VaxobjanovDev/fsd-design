import { useMutation } from '@tanstack/react-query'
import { pathOr, propOr } from 'ramda'
import { ALTER_ERROR, useSnackbar } from 'app/context/snackbar'

import { Options } from '../api'

interface UseDeleteOptions {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  options?: Options
}

export const useDelete = (
  api: (options?: Options) => Promise<any>,
  { onSuccess, onError, options }: UseDeleteOptions = {}
) => {
  const snackbar = useSnackbar()

  const mutation = useMutation({
    mutationFn: (deleteOptions?: Options) => {
      return api({ ...options, ...deleteOptions })
    },
    onSuccess: (data) => {
      onSuccess?.(data)
    },
    onError: (error: any) => {
      const dataError = pathOr('Oops, Something went wrong', ['data', 'error'], error)
      const userMsg =
        typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

      snackbar({ message: userMsg, type: ALTER_ERROR })
      onError?.(error)
    }
  })

  return {
    deleteData: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess
  }
}
