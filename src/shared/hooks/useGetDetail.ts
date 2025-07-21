import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { pathOr, propOr } from 'ramda'
import { ALTER_ERROR, useSnackbar } from 'app/context/snackbar'

import { GetListResponse, Options } from '../api'

export const useGetDetail = <T>(
  api: (options?: Options) => Promise<GetListResponse<T>>,
  queryKey: string | Array<unknown>,
  options?: Options
) => {
  const snackbar = useSnackbar()
  const queryClient = useQueryClient()

  // Create a normalized query key that can be an array
  const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey]

  // Main query for fetching data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [...normalizedQueryKey],
    queryFn: async () => {
      try {
        return await api(options)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })

  // Mutation for manually fetching data with options
  const { mutateAsync: getDetail } = useMutation({
    mutationFn: async (callOptions?: Options) => {
      try {
        return await api({ ...options, ...callOptions })
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (data, callOptions) => {
      // Update the query cache with new data
      queryClient.setQueryData([...normalizedQueryKey], data)
    }
  })

  // Error handling helper function
  const handleError = (error: any) => {
    const dataError = pathOr('Oops, Something went wrong', ['data', 'error'], error)
    const userMsg =
      typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

    snackbar({ message: userMsg, type: ALTER_ERROR })
  }

  return {
    getDetail, // Function to manually fetch data
    result: (data as GetListResponse<T>) || ({} as GetListResponse<T>),
    loading: isLoading,
    refetch, // Expose refetch function from useQuery,
    error
  }
}
