import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from './ReactionButtons';
import './postList.css';

import { Link, useParams } from 'react-router-dom';

const SinglePostPage = () => {
    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section style={{
                marginTop:'50px'
            }}>
                <h2>Post Not Found</h2>
            </section>
        )
    }
    
    return (
            <div style={{
                height: '100vh',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                }}>
                <article className="post_structure">
                    <h2 style={{marginBottom:'10px'}}>{post.title}</h2>
                    <p className='excerpt'>{post.body}</p>
                    <p style={{
                      position: 'relative',
                      top:'auto',
                      fontSize:'20px',
                      margin:'10px',
                      display:'flex',
                      flexWrap:'wrap',
                      gap:'10px'
                    }}>
                        <Link to={`/post/edit/${post.id}`} style={{
                            textDecoration:'none',
                            color:'white',
                            fontWeight:'bold'
                        }}>Edit Post</Link>
                        <PostAuthor userId={post.userId}/>
                        <TimeAgo timestamp={post.date}/>
                    </p>
                    <ReactionButtons post={post}/>
                </article>
            </div>
    )
}

export default SinglePostPage