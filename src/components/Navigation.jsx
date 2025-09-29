import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LogoutButton from './LogoutButton'

// --- Styled Components --- //
const NavBar = styled.nav`
  padding: 0.75rem 1.25rem;
  background-color: #1976d2;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  color: white;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

const UserInfo = styled.div`
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

// --- Component --- //
const Navigation = ({ user }) => {
  return (
    <NavBar>
      <NavLinks>
        <StyledLink to="/">blogs</StyledLink>
        <StyledLink to="/users">users</StyledLink>
      </NavLinks>
      <UserInfo>
        {user.name} logged in <LogoutButton />
      </UserInfo>
    </NavBar>
  )
}

export default Navigation
