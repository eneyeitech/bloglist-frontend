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
  console.log(user)
  const likeBlog = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: user.id // send just the ID
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
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
          <p>{user.name}</p>
        </>
      )}
    </div>
  )
}

export default Blog