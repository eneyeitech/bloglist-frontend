import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationSuccess from "./components/NotificationSuccess";
import NotificationFailure from "./components/NotificationFailure";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

 // Helper function to display failure messages
  const displayFailureMessage = (message) => {
    setFailureMessage(message);
    setTimeout(() => {
      setFailureMessage(null);
    }, 5000);
  };

  // Helper function to display success messages
  const displaySuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

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

  const addBlog = event => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')

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
    <form onSubmit={addBlog}>
      <div>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  const blogList = () => (
    blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
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