import PostAuthor from './PostAuthor';
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons"; 
import './postList.css';
import { Link } from 'react-router-dom';
 
const PostsExcerpts = ({ post }) => {
  return (
    <article className="post_structure">
            <h3 style={{marginBottom:'10px'}}>{post.title}</h3>
            <p className='excerpt'>{post.body.substring(0, 75)}...</p>
            <p style={{
              position: 'relative',
              top:'auto',
              fontSize:'20px',
              margin:'10px',
              display:'flex',
              flexWrap:'wrap',
              gap:'10px'
            }}>
              <Link to={`post/${post.id}`} style={{
                textDecoration:'none',
                color:'white',
                fontWeight:'bold',
                marginRight:'15px',
                fontFamily:'Georgia',
                zIndex:'1'
              }}>View Post</Link>
              <PostAuthor userId={post.userId}/>
              <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButtons post={post} />
    </article>
  )
}

export default PostsExcerpts