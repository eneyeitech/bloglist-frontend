import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationSuccess from './components/NotificationSuccess'
import NotificationFailure from './components/NotificationFailure'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [failureMessage, setFailureMessage] = useState(null)
  const blogFormRef = useRef()

  // Helper function to display failure messages
  const displayFailureMessage = (message) => {
    setFailureMessage(message)
    setTimeout(() => {
      setFailureMessage(null)
    }, 5000)
  }

  // Helper function to display success messages
  const displaySuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        displaySuccessMessage(
          `Blog '${returnedBlog.title}' was added`
        )
      })
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setUsername('')
      setPassword('')
      displayFailureMessage('Wrong credentials')
    }
  }

  const handleLogout = async event => {
    event.preventDefault()

    try {

      window.localStorage.removeItem(
        'loggedBlogappUser'
      )
      displaySuccessMessage(`User ${user.username} logged out`)
      setUser(null)
    } catch {
      displayFailureMessage('Error occured')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const logoutForm = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const blogList = () => (
    blogs
      .slice() // create a shallow copy so you don't mutate state directly
      .sort((a, b) => b.likes - a.likes) // sort descending by likes
      .map(blog => (
        <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs} blogs={blogs} />
      ))
  )


  return (
    <div>


      {!user && (
        <>
          <h2>Log in to application</h2>
          <NotificationSuccess message={successMessage} />
          <NotificationFailure message={failureMessage} />
          {loginForm()}
        </>
      )}

      {user && (
        <div>

          <h2>blogs</h2>
          <NotificationSuccess message={successMessage} />
          <NotificationFailure message={failureMessage} />
          <p>{user.name} logged in {logoutForm()}</p>
          {blogForm()}
          {blogList()}
        </div>
      )}

    </div>
  )
}

export default App