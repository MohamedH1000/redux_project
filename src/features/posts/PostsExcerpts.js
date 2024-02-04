import PostAuthor from './PostAuthor';
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons"; 
import './postList.css';
 
const PostsExcerpts = ({ post }) => {
  return (
    <article className="post_structure">
            <h3 style={{marginBottom:'10px'}}>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p style={{
              position: 'relative',
              top:'auto',
              fontSize:'20px',
              margin:'10px'
            }}>
              <PostAuthor userId={post.userId} />
              <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButtons post={post} />
    </article>
  )
}

export default PostsExcerpts