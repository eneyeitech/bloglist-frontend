//import  React from 'react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { addComment } from '../reducers/blogReducer'

const BlogView = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const blog = useSelector(state =>
    state.blogs.find(b => b.id === id)
  )

  if (!blog) {
    // Prevents "Cannot read property ..." if you refresh the page
    return <p>Loading blog…</p>
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

   const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.trim() === '') return
    dispatch(addComment(blog.id, comment))
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>

      <p>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </p>

      <p>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </p>

      <p>added by {blog.user?.name || 'unknown'}</p>
      <form onSubmit={handleSubmit}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
        />
        <button type="submit">add comment</button>
      </form>
      {blog.comments && blog.comments.length > 0 && (
        <>
          <h3>Comments</h3>
          <ul>
            {blog.comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default BlogView
