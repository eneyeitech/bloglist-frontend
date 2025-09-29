import { useState } from 'react'
import styled from 'styled-components'

// --- Styled Components --- //
const FormContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
`

const FormTitle = styled.h2`
  margin-bottom: 1rem;
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
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #125aa3;
  }
`

// --- Component --- //
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <FormContainer>
      <FormTitle>Create new</FormTitle>
      <StyledForm onSubmit={addBlog}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Enter title"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Enter author"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Enter URL"
          />
        </FormGroup>

        <Button type="submit">Create</Button>
      </StyledForm>
    </FormContainer>
  )
}

export default BlogForm
