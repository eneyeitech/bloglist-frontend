import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

// async action for login
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      throw error // let component handle wrong creds
    }
  }
}

// async action for checking localStorage
export const loadUserFromStorage = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

// async action for logout
export const logoutUser = () => {
  return (dispatch, getState) => {
    const user = getState().user
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
    return user
  }
}

export default userSlice.reducer
