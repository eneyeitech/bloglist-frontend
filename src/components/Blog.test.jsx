import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
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

    test('shows url and likes when the view button is clicked', async () => {
  const blog = {
    title: 'Testing React components',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 10,
  }

  const userObj = {
    username: 'eneye'
  }

  render(<Blog blog={blog} user={userObj} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  // url and likes should now appear
  expect(screen.getByText(blog.url)).toBeInTheDocument()
  expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument()
})
})
