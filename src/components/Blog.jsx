import { useState } from "react";
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs, blogs }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: user.id // send just the ID
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
  }

  /*const deleteBlog = async (blog) => {
    console.log('deleting', blog)
    const response = await blogService.remove(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }*/

  const deleteBlog = async (blog) => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!ok) return

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (err) {
      console.error('Error deleting blog:', err)
      alert('Failed to delete blog')
    }
  }




  return (
    <div style={blogStyle}>
      {blog.title} <i>{blog.author}</i>
      <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      <br />
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></p>
          <p>{blog.user?.username || 'not added by user'}</p>

          {blog.user?.username === user.username && (
            <button onClick={() => deleteBlog(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog