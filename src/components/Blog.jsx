import { useState } from "react";

const Blog = ({ blog, user }) => {
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


  return (
    <div style={blogStyle}>
      {blog.title} <i>{blog.author}</i>
      <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      <br/>
      {showDetails && (
        <>
        <p>{blog.url}</p>
        <p>likes {blog.likes}</p>
        <p>{user.name}</p>
        </>
      )}
    </div>
  )
}

export default Blog