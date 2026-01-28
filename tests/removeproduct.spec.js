const {test, expect} = require ("@playwright/test")

test("Verify user is able to remove product from cart", async ({page}) => {
    //Login
    await page.goto("https://www.saucedemo.com/")

    await page.getByPlaceholder("Username").fill("standard_user")

    await page.getByPlaceholder("Password").fill("secret_sauce")

    await page.locator('input[type="submit"]').click()

    await page.waitForTimeout(1000)

    //Add cart item then remove from cart
    await expect(page).toHaveURL(/inventory.html/)

    await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();

    await page.waitForTimeout (2000)

    await page.locator('button[name="remove-sauce-labs-backpack"]').click();
})