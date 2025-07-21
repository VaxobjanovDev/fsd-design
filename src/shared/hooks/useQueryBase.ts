import { useQuery, useQueryClient, QueryOptions } from '@tanstack/react-query'
import { pathOr, propOr } from 'ramda'
import { useSnackbar, ALTER_ERROR } from 'app/context/snackbar'
import { Options } from '../api'

interface UseQueryBaseProps<TData = unknown, TVariables = Options> {
  api: (options?: TVariables) => Promise<TData>
  queryKey: string | string[]
  options?: TVariables
  queryOptions?: Omit<QueryOptions<TData>, 'queryKey' | 'queryFn'>
  enabled?: boolean
  showError?: boolean
}

export const useQueryBase = <TData = unknown, TVariables = Options>({
  api,
  queryKey,
  options,
  queryOptions,
  enabled = true,
  showError = true
}: UseQueryBaseProps<TData, TVariables>) => {
  const queryClient = useQueryClient()
  const snackbar = useSnackbar()

  const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey]

  const { data, isLoading, error, refetch, isSuccess, isFetching } = useQuery<TData>({
    queryKey: normalizedQueryKey,
    queryFn: async () => {
      try {
        return await api(options)
      } catch (err) {
        handleError(err)
        throw err
      }
    },
    enabled,
    ...queryOptions
  })

  const handleError = (error: any) => {
    if (!showError) return

    const dataError = pathOr('Oops, Something went wrong', ['data', 'error'], error)
    const userMsg =
      typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

    snackbar({ message: userMsg, type: ALTER_ERROR })
  }

  return {
    data: data as TData,
    loading: isLoading,
    refetch,
    error,
    isSuccess,
    isFetching
  }
}
