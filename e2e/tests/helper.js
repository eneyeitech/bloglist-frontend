const loginWith = async (page, username, password) => {
  await page.getByRole('textbox', { name: 'username' }).fill(username)
  await page.getByRole('textbox', { name: 'password' }).fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByPlaceholder('enter title').fill(title)
  await page.getByPlaceholder('enter author').fill(author)
  await page.getByPlaceholder('enter url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }
