import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { showNotification } from './reducers/notificationReducer'
import { loadUserFromStorage } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  // initialize blogs and user
 useEffect(() => {
  dispatch(initializeBlogs())
  dispatch(initializeUsers())   // <-- add this
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

          <Navigation user={user} />

          <Routes>
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route path="/users/:id" element={<User />} />
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
