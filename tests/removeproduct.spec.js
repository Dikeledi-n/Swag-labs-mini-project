const {test, expect} = require ("@playwright/test")
const LoginPage = require("../pages/loginpage")

test("Verify user is able to remove product from cart", async ({page}) => {
    //Login
    await page.goto("https://www.saucedemo.com/")
    const loginPage = new LoginPage(page)
    await loginPage.loginToApplication()
    await page.waitForTimeout(1000)

    //Add cart item then remove from cart
    await expect(page).toHaveURL(/inventory.html/)
    await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();
    await page.waitForTimeout (2000)
    await page.locator('button[name="remove-sauce-labs-backpack"]').click();
})