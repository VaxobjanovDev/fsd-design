import { useGetList } from 'shared/hooks'
import { getPosts } from 'entities/posts/api'

export const usePosts = () => {
  const {
    data: posts,
    loading,
    error,
    refetch,
    isSuccess,
    isFetching
  } = useGetList({
    api: getPosts,
    queryKey: ['posts']
  })

  return {
    posts,
    loading,
    error,
    refetch,
    isSuccess,
    isFetching
  }
}
