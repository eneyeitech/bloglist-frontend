import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

const userObj = {
  username: 'eneye',
}

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

    const details =
      screen.queryByRole('region', { name: 'blog-details' }) ||
      screen.queryByText(blog.url)

    expect(details).toBeNull()
  })

  test('shows url and likes when the view button is clicked', async () => {
    const blog = {
      title: 'Testing React components',
      author: 'John Doe',
      url: 'http://example.com',
      likes: 10,
    }

    render(<Blog blog={blog} user={userObj} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    // url and likes should now appear
    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument()
  })

  test('like button is clicked twice, event handler is called twice', async () => {
    const blog = {
      id: '123',
      title: 'Testing React components',
      author: 'John Doe',
      url: 'http://example.com',
      likes: 10,
      user: { id: 'u1', username: 'eneye' },
    }

    const userObj = { id: 'u1', username: 'eneye' }
    const setBlogs = vi.fn()
    const blogs = [blog]

    // mock the backend update call
    blogService.update.mockResolvedValue({ ...blog, likes: blog.likes + 1 })

    render(
      <Blog blog={blog} user={userObj} blogs={blogs} setBlogs={setBlogs} />,
    )

    const user = userEvent.setup()

    // reveal details
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    // expect update called twice
    expect(blogService.update).toHaveBeenCalledTimes(2)
  })
})
