import React from 'react'
import './index.css';
import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';

const App = () => {
  return (
    <main className='main-app'>
      <AddPostForm />
      <PostsList />
    </main>
  )
}

export default App