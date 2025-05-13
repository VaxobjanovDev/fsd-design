import { useCallback, useState } from 'react'
import { ALTER_ERROR, useSnackbar } from 'app/context/snackbar'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { pathOr, prop, propOr } from 'ramda'

import { GetListResponse, Options } from '../api'
import useAllSearchParams from './useSearchAllParams'

export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE_NUMBER = 0

export const useGetList = <T>(
  api: (options?: Options) => Promise<GetListResponse<T>>,
  queryKey: string | Array<unknown>,
  listOptions?: Options,
  paramPrefix = ''
) => {
  const searchParams = useAllSearchParams()
  const snackbar = useSnackbar()
  const queryClient = useQueryClient()

  // Create a normalized query key that can be an array
  const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey]

  // Helper function to extract the list data from response
  const extractList = (response: GetListResponse<T>): T[] => {
    if (prop('list', response)) {
      return response.list
    }
    if (prop('content', response)) {
      return response.content
    }
    if (Array.isArray(response)) {
      return response
    }
    return []
  }

  // Helper function to build query params
  const buildQueryParams = (options?: Options) => {
    const limit = paramPrefix ? propOr(DEFAULT_PAGE_SIZE, 'limit', searchParams) : DEFAULT_PAGE_SIZE
    const start = paramPrefix ? propOr(DEFAULT_PAGE_NUMBER, 'start', searchParams) : DEFAULT_PAGE_NUMBER

    return {
      query: {
        start: Number(start),
        limit: Number(limit),
        ...listOptions?.query,
        ...options?.query
      }
    }
  }

  // Error handling helper function
  const handleError = (error: any) => {
    const dataError = pathOr('Oops, Something went wrong', ['data', 'error'], error)
    const userMsg =
      typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

    snackbar({ message: userMsg, type: ALTER_ERROR })
  }

  // Query state to store the current query parameters
  const [queryState, setQueryState] = useState(buildQueryParams().query)

  // Main query for fetching data
  const {
    data: result = {} as GetListResponse<T>,
    isLoading: loading,
    refetch
  } = useQuery({
    queryKey: [...normalizedQueryKey, searchParams, queryState],
    enabled: false, // Don't fetch automatically on mount
    queryFn: async () => {
      try {
        const defaultGetQuery = buildQueryParams()
        return await api({ ...listOptions, ...defaultGetQuery })
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })

  // Extract list from result
  const list = extractList(result)

  // Mutation for manually fetching data with options
  const { mutateAsync: getList } = useMutation({
    mutationFn: async (options?: Options) => {
      const defaultGetQuery = buildQueryParams(options)

      try {
        const response = await api({ ...listOptions, ...options, ...defaultGetQuery })
        setQueryState(defaultGetQuery.query)
        return response
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (data, options) => {
      // Update the query cache with new data
      queryClient.setQueryData([...normalizedQueryKey, searchParams, queryState], data)
    }
  })

  // Reset function to clear the list data
  const reset = useCallback(() => {
    queryClient.setQueryData([...normalizedQueryKey, searchParams, queryState], (prevData) => ({
      ...(prevData as GetListResponse<T>),
      list: [],
      content: []
    }))
  }, [queryClient, normalizedQueryKey, searchParams, queryState])

  return {
    getList,
    result,
    loading,
    list,
    query: queryState,
    reset,
    paramPrefix,
    refetch
  }
}
