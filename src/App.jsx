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
    <div>
      {!user ? (
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in <LogoutButton />
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
