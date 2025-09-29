import { useDispatch } from 'react-redux'
import { likeBlog, removeBlogFromStore } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import styled from 'styled-components'

// Styled components
const BlogContainer = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

const BlogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.span`
  font-weight: bold;
  color: #333;
`

const Button = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background: #1565c0;
  }
`

const Details = styled.div`
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  color: #444;
`

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
    dispatch(showNotification(`You liked '${blog.title}'`, 5))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlogFromStore(blog.id))
      dispatch(showNotification(`Blog '${blog.title}' deleted`, 5))
    }
  }

  return (
    <BlogContainer>
      <BlogHeader>
        <Title>
          {blog.title} {blog.author}
        </Title>
        <Button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </Button>
      </BlogHeader>

      {visible && (
        <Details>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <Button onClick={handleLike}>like</Button>
          </div>
          <div>{blog.user?.name}</div>
          {user.username === blog.user?.username && (
            <Button onClick={handleDelete}>remove</Button>
          )}
        </Details>
      )}
    </BlogContainer>
  )
}

export default Blog
