// src/components/Users.js
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import userService from '../services/users'

// --- Styled Components --- //
const Container = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
`

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #1976d2;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
  }

  th {
    background: #f4f6f8;
    font-weight: 600;
    color: #333;
  }

  tr:nth-child(even) {
    background: #f9f9f9;
  }

  tr:hover {
    background: #eef6ff;
  }
`

const UserLink = styled(Link)`
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

// --- Component --- //
const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])

  return (
    <Container>
      <Title>Users</Title>
      <StyledTable>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <UserLink to={`/users/${user.id}`}>{user.name}</UserLink>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  )
}

export default Users
