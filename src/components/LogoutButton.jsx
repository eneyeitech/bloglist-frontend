import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    const loggedOutUser = dispatch(logoutUser())
    if (loggedOutUser) {
      dispatch(showNotification(`User ${loggedOutUser.username} logged out`, 5))
    }
  }

  return <button onClick={handleLogout}>logout</button>
}

export default LogoutButton
