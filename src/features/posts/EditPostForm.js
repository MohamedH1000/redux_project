import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from './postsSlice';
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../users/usersSlice";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import './addPostForm.css';

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState('idle');

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (error) {
                console.error('failed to save the post', error)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <MenuItem key={user.id} value={user.id}>
            {user.name}
        </MenuItem>
    ))

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (error) {
            console.error('Failed to delete the post', error)
        } finally {
            setRequestStatus('idle')
        }
    }
    return (
        <section style={{
            marginTop: '100px'
        }}>
            <h2>Edit Post</h2>
            <form className="form-structure">
            <label htmlFor="postTitle" >Post Title:</label>
            <input 
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}
                style={{
                    width:'350px',
                    margin: '5px',
                    height:'30px',
                    padding:'10px'
                }}
            />
            <FormControl fullWidth style={{
                marginTop:'20px'
            }}>
                <InputLabel id="postAuthor" style={{color:'black', fontFamily:'Georgia'}}>Author:</InputLabel>
                <Select
                    labelId="postAuthor"
                    id="postAuthor"
                    value={userId}
                    label="Author:"
                    onChange={onAuthorChanged}
                    style={{
                        width:'350px',
                        margin:'5px',
                        color:'black',
                        backgroundColor:'white',
                        fontFamily:'Georgia'
                    }}
                    >
                    <MenuItem value=""></MenuItem>
                    {usersOptions}
                </Select>
            </FormControl>
            <label htmlFor="postContent">Content:</label>
            <textarea 
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
                style={{
                    width:'350px',
                    margin:'5px',
                    padding:'10px',
                    height:'150px'
                }}
            />
            <Button 
                type="button"
                onClick={onSavePostClicked}
                variant="contained"
                style={{margin:'10px 0 15px 0', 
                        fontFamily:'Georgia', 
                        textTransform:'none',
                        width:'350px',
                    }}
                disabled={!canSave}
                >Save Post</Button>
            <Button 
            type="button"
            onClick={onDeletePostClicked}
            variant="contained"
            color="error"
            style={{margin:'0 0 0 0', 
                    fontFamily:'Georgia', 
                    textTransform:'none',
                    width:'350px',
                }}
            disabled={!canSave}
            >Delete Post</Button>
        </form>
        </section>
    )
}

export default EditPostForm;