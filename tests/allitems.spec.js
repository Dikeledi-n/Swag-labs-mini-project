const {test, expect} = require ("@playwright/test")

test(" Verify that all items in <Your Cart> page list matches all items in <Checkout: Overview> page list.", async ({page}) => {
    //Login and add items to cart
    await page.goto("https://www.saucedemo.com/")

    await page.getByPlaceholder("Username").fill("standard_user")

    await page.getByPlaceholder("Password").fill("secret_sauce")

    await page.locator('input[type="submit"]').click()

    await page.waitForTimeout(1000)

    await expect(page).toHaveURL(/inventory.html/)

    await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('button[name="add-to-cart-sauce-labs-fleece-jacket"]').click();

    //Cart and checkout
    await page.goto("https://www.saucedemo.com/cart.html")

    await page.waitForTimeout(2000)

    await page.locator('button[name="checkout"]').click();

    await page.goto("https://www.saucedemo.com/checkout-step-one.html")

    await page.getByPlaceholder("First Name").fill("Dikeledi")

    await page.getByPlaceholder("Last Name").fill("Ntjobs")

    await page.getByPlaceholder("Zip/Postal Code").fill("2191")

    await page.locator('input[type="submit"]').click()

    await expect(page).toHaveURL(/checkout-step-two.html/);
    
    //Loop to check if cart items and checkout items match
    const cartItems = await page.locator('.inventory_item_name').allTextContents();
    const checkoutItems = page.locator('.inventory_item_name');

    for (const itemName of cartItems) {
        await expect(checkoutItems.filter({ hasText: itemName })).toBeVisible();
        console.log(`Verified: ${itemName} is present in checkout.`);
    }
})