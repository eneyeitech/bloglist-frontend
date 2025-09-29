import { useDispatch } from 'react-redux'
import { likeBlog, removeBlogFromStore } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

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


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>

      {visible && (
        <div className="blogDetails">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={handleLike} className="likeButton">
              like
            </button>
          </div>
          <div>{blog.user?.name}</div>
          {user.username === blog.user?.username && (
            <button onClick={handleDelete} className="removeButton">
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
