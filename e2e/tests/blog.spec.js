const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')

        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'mluukkai',
                name: 'Matti Luukkainen',
                password: 'salainen'
            }
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
            await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
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

        test.only('a blog can be deleted by creator', async ({ page }) => {
            await createBlog(page, 'test blog tester', 'tester', 'http://example.com')

            await page.getByRole('button', { name: 'view' }).click()

            // Handle confirm dialog
            page.once('dialog', dialog => dialog.accept())

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
                    password: 'password'
                }
            })

            // logout first user
            await page.getByRole('button', { name: 'logout' }).click()

            // login as other user
            await page.getByRole('textbox', { name: 'username' }).fill('other')
            await page.getByRole('textbox', { name: 'password' }).fill('password')
            await page.getByRole('button', { name: 'login' }).click()

            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
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

