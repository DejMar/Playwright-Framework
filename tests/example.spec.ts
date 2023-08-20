import { test, expect } from '@playwright/test';
import { loadHomePage, assertTitle } from './helpers';

// Define global variables for URLs
const URL1 = 'https://www.example.com';
const URL2 = 'http://zero.webappsecurity.com/';

test('Simple basic test', async ({ page }) => {
  await page.goto(URL1);
  const pageTitle = page.locator('h1');

  // Expect a title "to contain" a substring.
  await expect(pageTitle).toContainText("Example Domain");
});

test('Clicking on Element', async ({ page }) => {
  await page.goto(URL2);
  await page.click("#signin_button");
  await page.click("text=Sign in");

  const errorMessage = await page.locator('.alert-error');
  await expect(errorMessage).toContainText("Login and/or password are wrong.");
});

test.skip("Selectors",async ({page}) => {
  //Text
  await page.click("text=some text");
  //Css Selectors
  await page.click("button");
  await page.click("#id");
  await page.click(".class");

  await page.click(".submit-button:visible");
  await page.click("#username .first");
  //XPath
  await page.click("//button");
})

test.describe("My First Test Suite", ()=> {
  test("Working with inputs",async ({page}) => {
    await page.goto(URL2);
    await page.click("#signin_button");
  
    await page.type("#user_login", "Some Username");  
    await page.type("#user_password", "SomePassword");
    await page.click("text=Sign in");
  
    const errorMessage = await page.locator('.alert-error');
    await expect(errorMessage).toContainText("Login and/or password are wrong.");
  })
  
  test("Working with assertion",async ({page}) => {
    await page.goto(URL1);
    await expect(page).toHaveURL(URL1);
    await expect(page).toHaveTitle("Example Domain");
  
    const element = await page.locator("h1");
    await expect(element).toBeVisible();
    await expect(element).toHaveText("Example Domain");
    await expect(element).toHaveCount(1);
  
    const nonExistingElement = await page.locator("h5");
    await expect(nonExistingElement).not.toBeVisible();
  })
})

test.describe.parallel("Hooks", () =>{
  test.beforeEach(async({page}) =>{
    await page.goto(URL1);
  })
  test("Working with Screenshoots",async ({page}) => {
    await page.screenshot({path: 'screenshoot.png', fullPage: true});
  })
  
  test("Working with Single element Screenshoots",async ({page}) => {
    const element = await page.$("h1");
    //await element.screenshot({path: 'single_element_screenshoot.png'});
  })
})

test("Working with Custom helpers",async ({page}) => {
  await loadHomePage(page);
  await assertTitle(page);
})

test.only("New page",async ({page}) => {
  await page.goto("https://aweui.aspnetawesome.com/");
  await page.pause();
  await page.click("#mealOdd-awed");
  await page.pause();
})

