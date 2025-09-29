import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogReducer'
import styled from 'styled-components'

// --- Styled Components --- //
const Container = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-top: 1rem;
`

const Title = styled.h2`
  margin-bottom: 0.5rem;
  color: #222;
`

const Link = styled.a`
  color: #1976d2;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Likes = styled.p`
  margin: 0.5rem 0;
  font-size: 0.95rem;
`

const Button = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background: #1565c0;
  }
`

const Author = styled.p`
  font-style: italic;
  margin-top: 0.5rem;
  color: #444;
`

const CommentForm = styled.form`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`

const Input = styled.input`
  flex: 1;
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const CommentsSection = styled.div`
  margin-top: 1.5rem;
`

const CommentList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 0.5rem;
`

const CommentItem = styled.li`
  background: #f6f6f6;
  margin-bottom: 0.4rem;
  padding: 0.5rem;
  border-radius: 4px;
`

// --- Component --- //
const BlogView = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const blog = useSelector(state => state.blogs.find(b => b.id === id))

  if (!blog) {
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
    <Container>
      <Title>{blog.title} by {blog.author}</Title>

      <p>
        <Link href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </Link>
      </p>

      <Likes>
        {blog.likes} likes
        <Button onClick={handleLike}>like</Button>
      </Likes>

      <Author>added by {blog.user?.name || 'unknown'}</Author>

      <CommentForm onSubmit={handleSubmit}>
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
        />
        <Button type="submit">add comment</Button>
      </CommentForm>

      <CommentsSection>
        <h3>Comments</h3>
        {blog.comments && blog.comments.length > 0 ? (
          <CommentList>
            {blog.comments.map((c, i) => (
              <CommentItem key={i}>{c}</CommentItem>
            ))}
          </CommentList>
        ) : (
          <p>No comments yet</p>
        )}
      </CommentsSection>
    </Container>
  )
}

export default BlogView
