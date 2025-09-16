import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls event handler with right details when a new blog is created', async () => {
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const user = userEvent.setup()

  // get input fields
  const titleInput = screen.getByPlaceholderText('enter title')
  const authorInput = screen.getByPlaceholderText('enter author')
  const urlInput = screen.getByPlaceholderText('enter url')
  const createButton = screen.getByText('create')

  // simulate user typing
  await user.type(titleInput, 'Testing Blog Form')
  await user.type(authorInput, 'Jane Doe')
  await user.type(urlInput, 'http://example.com')

  // submit form
  await user.click(createButton)

  // expect createBlog called once
  expect(createBlog.mock.calls).toHaveLength(1)

  // check the arguments passed to handler
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing Blog Form',
    author: 'Jane Doe',
    url: 'http://example.com',
  })
})
