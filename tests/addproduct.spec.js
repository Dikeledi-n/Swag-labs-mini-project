const {test, expect} = require ("@playwright/test")

test("Verify user is able to add product to cart", async ({page}) => {
//Login and add to cart
    await page.goto("https://www.saucedemo.com/")

    await page.getByPlaceholder("Username").fill("standard_user")

    await page.getByPlaceholder("Password").fill("secret_sauce")

    await page.locator('input[type="submit"]').click()

    await page.waitForTimeout(3000)

    await expect(page).toHaveURL(/inventory.html/)

    await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();

})