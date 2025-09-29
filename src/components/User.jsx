import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const { id } = useParams()

  // Get the list of users from the store
  const user = useSelector((state) => state.users.find((u) => u.id === id))

  // ✅ Conditional rendering: avoid "Cannot read property ..." errors
  if (!user) {
    return <p>Loading user data…</p>
  }

  return (
    <div>
      <h2>{user.name}</h2>

      {user.blogs.length === 0 ? (
        <p>This user has not added any blogs yet.</p>
      ) : (
        <>
          <h3>Added blogs</h3>
          <ul>
            {user.blogs.map((blog) => (
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} — {blog.author}
              </Link>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default User
