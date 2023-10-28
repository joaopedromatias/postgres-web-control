// eslint-disable-next-line node/no-unpublished-import
import { test, expect } from '@playwright/test'
import path from 'path'

test('perform login and create table', async ({ page }) => {
  await page.goto('http://localhost:8080')
  await expect(page).toHaveTitle(/Postgres Web Control/)

  const dbName = page.getByRole('textbox', { name: /database name.../i })
  await dbName.fill('postgres')

  const userName = page.getByRole('textbox', { name: /username.../i })
  await userName.fill('postgres')

  const password = page.getByRole('textbox', { name: /password.../i })
  await password.fill('pass')

  const port = page.getByRole('textbox', { name: /port.../i })
  await port.fill('5432')

  const loginBtn = page.getByRole('button', { name: /login/i })

  await loginBtn.click()

  await sleep(2)

  const query = page.getByRole('textbox', { name: /query here!/i })

  await query.fill('CREATE TABLE houses (id int PRIMARY KEY, name text, color text);')

  const runQueryBtn = page.getByRole('button', { name: /run/i })

  await runQueryBtn.click()

  const tableInformation = page.getByText('name: houses')

  await expect(tableInformation).toBeVisible()

  const uploadDataIcon = page.getByRole('button', { name: /upload data to table houses/i })

  await uploadDataIcon.click()

  const dataInputFile = await page.$('input[type=file]')

  expect(dataInputFile).not.toBeNull()

  await dataInputFile!.setInputFiles(
    process.env.CI
      ? path.join(process.env.GITHUB_WORKSPACE || '', 'csv-samples', 'houses.csv')
      : path.join(process.cwd(), 'csv-samples', 'houses.csv')
  )

  const uploadDataBtn = page.getByRole('button', { name: /upload$/i })

  await uploadDataBtn.click()

  await query.fill(`SELECT * FROM "houses"`)

  await runQueryBtn.click()

  await sleep(2)

  const houseName = page.getByText('gryffindor')

  await expect(houseName).toBeVisible()
})

async function sleep(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}
