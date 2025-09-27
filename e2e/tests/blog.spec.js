const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('Wrong credentials')).toBeVisible()
      await expect(
        page.getByText('Matti Luukkainen logged in'),
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test blog tester', 'tester', 'http://example.com')
      //await expect(page.locator('.blog')).toContainText('Test Blog Tester')
      await expect(page.getByText('test blog tester tester')).toBeVisible()
      //await expect(page.getByText('Test Blog Tester')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'test blog tester', 'tester', 'http://example.com')

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by creator', async ({ page }) => {
      await createBlog(page, 'test blog tester', 'tester', 'http://example.com')

      await page.getByRole('button', { name: 'view' }).click()

      // Handle confirm dialog
      page.once('dialog', (dialog) => dialog.accept())

      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('test blog tester')).not.toBeVisible()
    })

    test('only creator sees the delete button', async ({ page, request }) => {
      await createBlog(page, 'test blog tester', 'tester', 'http://example.com')

      // Create another user
      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'other',
          name: 'Other User',
          password: 'password',
        },
      })

      // logout first user
      await page.getByRole('button', { name: 'logout' }).click()

      // login as other user
      await page.getByRole('textbox', { name: 'username' }).fill('other')
      await page.getByRole('textbox', { name: 'password' }).fill('password')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(
        page.getByRole('button', { name: 'remove' }),
      ).not.toBeVisible()
    })

    test.only('blogs are ordered according to likes', async ({ page }) => {
      // create blogs
      const blogs = [
        { title: 'First', author: 'A', url: 'a.com' },
        { title: 'Second', author: 'B', url: 'b.com' },
        { title: 'Third', author: 'C', url: 'c.com' },
      ]

      for (let blog of blogs) {
        await createBlog(page, blog.title, blog.author, blog.url)
      }

      // like "Second" twice
      await page
        .getByText('Second B')
        .getByRole('button', { name: 'view' })
        .click()
      await page
        .getByText('Second B')
        .getByRole('button', { name: 'like' })
        .click()
      await page
        .getByText('Second B')
        .getByRole('button', { name: 'like' })
        .click()

      // like "First" once
      await page
        .getByText('First A')
        .getByRole('button', { name: 'view' })
        .click()
      await page
        .getByText('First A')
        .getByRole('button', { name: 'like' })
        .click()

      // Verify order
      const blogElements = await page.locator('.blog').allTextContents()
      expect(blogElements[0]).toContain('Second B')
      expect(blogElements[1]).toContain('First A')
      expect(blogElements[2]).toContain('Third C')
    })
  })

  /*describe('Like', () => {
        beforeEach(async ({ page }) => {
           await loginWith(page, 'mluukkai', 'salainen')
           await createBlog(page, 'test blog tester', 'tester', 'http://example.com')
        })

        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('a blog can be deleted by creator', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click()

            // Handle confirm dialog
            page.once('dialog', dialog => dialog.accept())

            await page.getByRole('button', { name: 'remove' }).click()
            await expect(page.getByText('Test Blog Tester')).not.toBeVisible()
        })

    })*/
})
