import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { showNotification } from './reducers/notificationReducer'
import { loadUserFromStorage } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

// --- Styled Components --- //
const PageContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #222;
`

const Header = styled.h2`
  margin-bottom: 1rem;
  color: #1976d2;
`

const Section = styled.div`
  margin-top: 1.5rem;
`

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
`

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const LoginTitle = styled.h2`
  margin-bottom: 1rem;
  color: #1976d2;
`

// --- Component --- //
const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
        <LoginContainer>
          <LoginTitle>Log in to application</LoginTitle>
          <Notification />
          <LoginForm />
        </LoginContainer>
      ) : (
        <PageContainer>
          <Header>Blog App</Header>
          <Notification />

          <Navigation user={user} />

          <Routes>
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route path="/users/:id" element={<User />} />
            <Route
              path="/"
              element={
                <Section>
                  <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                  </Togglable>

                  <BlogList>
                    {blogs
                      .slice()
                      .sort((a, b) => b.likes - a.likes)
                      .map((blog) => (
                        <Blog key={blog.id} blog={blog} user={user} />
                      ))}
                  </BlogList>
                </Section>
              }
            />
            <Route path="/users" element={<Users />} />
          </Routes>
        </PageContainer>
      )}
    </Router>
  )
}

export default App
