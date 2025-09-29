import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

// --- Styled Components --- //
const Container = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-top: 1rem;
`

const Title = styled.h2`
  margin-bottom: 0.5rem;
  color: #222;
`

const SubTitle = styled.h3`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
`

const Message = styled.p`
  color: #666;
  font-style: italic;
`

const BlogList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`

const BlogItem = styled.li`
  background: #f9f9f9;
  margin-bottom: 0.5rem;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1976d2;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

// --- Component --- //
const User = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.users.find((u) => u.id === id))

  if (!user) {
    return <Message>Loading user data…</Message>
  }

  return (
    <Container>
      <Title>{user.name}</Title>

      {user.blogs.length === 0 ? (
        <Message>This user has not added any blogs yet.</Message>
      ) : (
        <>
          <SubTitle>Added blogs</SubTitle>
          <BlogList>
            {user.blogs.map((blog) => (
              <BlogItem key={blog.id}>
                <StyledLink to={`/blogs/${blog.id}`}>
                  {blog.title} — {blog.author}
                </StyledLink>
              </BlogItem>
            ))}
          </BlogList>
        </>
      )}
    </Container>
  )
}

export default User
