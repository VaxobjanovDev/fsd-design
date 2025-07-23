import { Post } from '../models/types'

interface PostCard {
  readonly post: Post
}

export const PostCard = ({ post }: PostCard) => {
  return (
    <div className="flex h-[200px] w-[200px] flex-col rounded-lg bg-blue-500">
      <h4 className="text-xl">{post.title}</h4>
      <p className="text-xs">{post.body}</p>
    </div>
  )
}
