const {test, expect} = require ("@playwright/test")

test("Verity that user gets <ITEM NOT FOUND> message when navigating to non existing product id item", async ({page}) => {
 //Login
    await page.goto("https://www.saucedemo.com/")

    await page.getByPlaceholder("Username").fill("standard_user")

    await page.getByPlaceholder("Password").fill("secret_sauce")

    await page.locator('input[type="submit"]').click()

    await page.waitForTimeout(1000)

    await page.goto("https://www.saucedemo.com/inventory-item.html?id=9");

    await page.waitForTimeout(3000)

    const errorMessage = page.getByText("ITEM NOT FOUND");

    await page.waitForTimeout(2000)
    
    await expect(errorMessage).toBeVisible();
    
})