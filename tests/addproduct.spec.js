const {test, expect, selectors} = require ("@playwright/test")
const LoginPage = require("../pages/loginpage")

test("Verify user is able to add product to cart", async ({page}) => {
//Login and add to cart
    await page.goto("https://www.saucedemo.com/")
    const loginPage = new LoginPage(page)
    await loginPage.loginToApplication()
    await page.waitForTimeout(3000)
    await expect(page).toHaveURL(/inventory.html/)
    await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();

})