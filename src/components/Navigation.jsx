import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Navigation = ({ user }) => {
  const navStyle = {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const linkStyle = {
    padding: 5,
    textDecoration: 'none',
    color: 'blue'
  }

  return (
    <div style={navStyle}>
      <div>
        <Link to="/" style={linkStyle}>blogs</Link>
        <Link to="/users" style={linkStyle}>users</Link>
      </div>
      <div>
        {user.name} logged in <LogoutButton/>
      </div>
    </div>
  )
}

export default Navigation
