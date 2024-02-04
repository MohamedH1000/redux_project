import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import './addPostForm.css';
import Button from '@mui/material/Button';
import { selectAllUsers } from "../users/usersSlice";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


const AddPostForm = () => {
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [title, setTitle] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);


    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId})).nowrap()

                setTitle('');
                setContent('');
                setUserId('');
            } catch (error) {
                console.error('Failed to save the post')
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const usersOptions = users.map(user => (
        <MenuItem key={user.id} value={user.id}>
            {user.name}
        </MenuItem>
    ))

  return (
    <section className="form-container">
        <h2 style={{margin:'10px'}}>Add a new Post</h2>
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
                    padding:'10px'
                }}
            />
            <Button 
                type="button"
                onClick={onSavePostClicked}
                variant="contained"
                style={{margin:'10px 0 20px 0', 
                        fontFamily:'Georgia', 
                        textTransform:'none',
                        width:'350px',
                    }}
                disabled={!canSave}
                >Save Post</Button>
        </form>
    </section>
  )
}

export default AddPostForm