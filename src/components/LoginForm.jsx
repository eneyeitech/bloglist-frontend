import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginUser } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'

// --- Styled Components --- //
const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
`

const FormTitle = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  color: #1976d2;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: #333;
`

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  }
`

const Button = styled.button`
  padding: 0.6rem 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #125aa3;
  }
`

// --- Component --- //
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(showNotification(`Welcome ${username}`, 5))
    } catch {
      setUsername('')
      setPassword('')
      dispatch(showNotification('Wrong credentials', 5, 'error'))
    }
  }

  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
      <StyledForm onSubmit={handleLogin}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </FormGroup>

        <Button type="submit">Login</Button>
      </StyledForm>
    </FormContainer>
  )
}

export default LoginForm
