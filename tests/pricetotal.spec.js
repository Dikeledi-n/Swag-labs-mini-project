const {test, expect} = require ("@playwright/test")
const LoginPage = require("../pages/loginpage")
const CheckoutPage = require("../pages/checkoutpage")

test("Verify <Price Total> in <Checkout: Overview> are calculated correctly", async ({page}) => {
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

    //Loop to verify pricing
    const priceElements = await page.locator('.inventory_item_price').allTextContents();
    let calculatedSum = 0;
    for (const priceText of priceElements) {
        const priceValue = parseFloat(priceText.replace('$', ''));
        calculatedSum += priceValue;
    }
    const subtotalText = await page.locator('.summary_subtotal_label').textContent();
    const displayedSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));
    expect(calculatedSum).toBe(displayedSubtotal);
    console.log(`Manual Sum: $${calculatedSum} | Displayed Subtotal: $${displayedSubtotal}`);

})