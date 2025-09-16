import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Testing React components',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 10,
  }

  render(<Blog blog={blog} />)

  // Title and author are shown
  const title = screen.getByText('Testing React components')
  const author = screen.getByText('John Doe')
  expect(title).toBeInTheDocument()
  expect(author).toBeInTheDocument()

  const url = screen.queryByText('http://example.com')
  const likes = screen.queryByText('likes 10')

  // Url and likes are NOT shown
  expect(url).toBeNull()
  expect(likes).toBeNull()

  const details = screen.queryByRole('region', { name: 'blog-details' }) 
    || screen.queryByText(blog.url) 

  expect(details).toBeNull()
})
