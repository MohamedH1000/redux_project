import { selectAllPosts, getPostError, getPostStatus } from "./postsSlice";
import { useSelector } from "react-redux";
import './postList.css';
import PostsExcerpts from "./PostsExcerpts";
import CircularProgress from '@mui/material/CircularProgress';

const PostsList = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(getPostStatus)
    const error = useSelector(getPostError)

      let content;
      if (postStatus === 'loading') {
        content = <><CircularProgress style={{marginBottom:'20px'}}/><p>"Loading ..."</p></>
      } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpts key={post.id} post={post} />)
      } else if (postStatus === 'failed') {
          content = <p>{error}</p>
      }

  return (
    <section className="posts-container" style={{marginTop:'50px'}}>
        <h2 style={{margin: '20px'}}>Posts</h2>
        {content}
    </section>
  )
}

export default PostsList