// reducers/notificationReducer.js
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null, // { message: '', type: '' } or null
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

// thunk: show notification for X seconds
export const showNotification = (message, time = 5, type = 'success') => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
