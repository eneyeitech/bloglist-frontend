const { test, expect, describe, beforeEach } = require('@playwright/test')

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
            await page.getByRole('textbox', { name: 'username' }).fill('mluukkai')
            await page.getByRole('textbox', { name: 'password' }).fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('textbox', { name: 'username' }).fill('mluukkai')
            await page.getByRole('textbox', { name: 'password' }).fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Wrong credentials')).toBeVisible()
            await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('textbox', { name: 'username' }).fill('mluukkai')
            await page.getByRole('textbox', { name: 'password' }).fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByPlaceholder('enter title').fill('Test Blog Tester')
            await page.getByPlaceholder('enter author').fill('Tester')
            await page.getByPlaceholder('enter url').fill('http://example.com')
            await page.getByRole('button', { name: 'create' }).click()

            await expect(page.locator('.blog')).toContainText('Test Blog Tester')
            //await expect(page.getByText('Test Blog Tester')).toBeVisible()
        })
    })

})

