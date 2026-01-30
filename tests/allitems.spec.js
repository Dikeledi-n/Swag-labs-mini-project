const {test, expect} = require ("@playwright/test")
const LoginPage = require("../pages/loginpage")
const CheckoutPage = require("../pages/checkoutpage")

test(" Verify that all items in <Your Cart> page list matches all items in <Checkout: Overview> page list.", async ({page}) => {
    //Login and add items to cart
    await page.goto("https://www.saucedemo.com/")
    const loginPage = new LoginPage(page)
    await loginPage.loginToApplication()
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/inventory.html/)
    await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('button[name="add-to-cart-sauce-labs-fleece-jacket"]').click();

    //Cart and checkout
    await page.goto("https://www.saucedemo.com/cart.html")
    await page.waitForTimeout(2000)
    await page.locator('button[name="checkout"]').click();
    await page.goto("https://www.saucedemo.com/checkout-step-one.html")
    const checkoutpage = new CheckoutPage(page)
    await checkoutpage.checkoutFromApplication()
    await expect(page).toHaveURL(/checkout-step-two.html/);
    
    //Loop to check if cart items and checkout items match
    const cartItems = await page.locator('.inventory_item_name').allTextContents();
    const checkoutItems = page.locator('.inventory_item_name');

    for (const itemName of cartItems) {
        await expect(checkoutItems.filter({ hasText: itemName })).toBeVisible();
        console.log(`Verified: ${itemName} is present in checkout.`);
    }
})