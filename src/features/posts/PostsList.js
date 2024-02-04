import { selectAllPosts, getPostError, getPostStatus, fetchPosts } from "./postsSlice";
import { useSelector, useDispatch } from "react-redux";
import './postList.css';
import { useEffect } from "react";
import PostsExcerpts from "./PostsExcerpts";

const PostsList = () => {
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(getPostStatus)
    const error = useSelector(getPostError)

    useEffect(() => {
        if (postStatus === 'idle') {
          dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

      let content;
      if (postStatus === 'loading') {
        content = <p>"Loading ..."</p>
      } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.data.localeCompare(a.data))
        content = orderedPosts.map(post => <PostsExcerpts key={post.id} post={post} />)
      } else if (postStatus === 'failed') {
          content = <p>{error}</p>
      }

  return (
    <section className="posts-container">
        <h2 style={{margin: '20px'}}>Posts</h2>
        {content}
    </section>
  )
}

export default PostsList