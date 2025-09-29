import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { showNotification } from './reducers/notificationReducer'
import { loadUserFromStorage } from './reducers/userReducer'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  // initialize blogs and user
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUserFromStorage())
  }, [dispatch])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(showNotification(`Blog '${blogObject.title}' was added`, 5))
  }

  return (
    <Router>
      {!user ? (
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </>
      ) : (
        <div>
          <h2>Blog App</h2>
          <Notification />

          <p>
            {user.name} logged in <LogoutButton />
          </p>

          {/* Navigation bar */}
          <nav style={{ marginBottom: '1rem' }}>
            <Link to="/">blogs</Link> | <Link to="/users">users</Link>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                  </Togglable>
                  {blogs
                    .slice()
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <Blog key={blog.id} blog={blog} user={user} />
                    ))}
                </>
              }
            />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      )}
    </Router>
  )
}

export default App
