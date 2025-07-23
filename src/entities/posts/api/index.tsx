import { getRequest, Options, POST_LIST } from 'shared/api'
import { Post } from 'entities/posts/models/types'

export const getPosts = (options?: Options) => {
  return getRequest<Post[]>(POST_LIST, options)
}
