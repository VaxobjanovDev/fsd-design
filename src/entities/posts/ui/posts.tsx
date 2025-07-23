import { usePosts } from '../models/usePosts'
import { PostCard } from 'entities/posts/ui/post-card'

export const Posts = () => {
  const { posts } = usePosts()

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {posts?.map((post) => {
        return <PostCard key={post.id} post={post} />
      })}
    </div>
  )
}
