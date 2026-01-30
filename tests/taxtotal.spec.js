const {test, expect} = require ("@playwright/test")
const LoginPage = require("../pages/loginpage")
const CheckoutPage = require("../pages/checkoutpage")

test ("Verify <Total> is calculated correctly with tax inclusive", async ({page}) => {

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

    //Loop to get total with tax
    const priceElements = await page.locator('.inventory_item_price').allTextContents();
    let calculatedSubtotal = 0;
    for (const priceText of priceElements) {
        calculatedSubtotal += parseFloat(priceText.replace('$', ''));
    }
    const subtotalText = await page.locator('.summary_subtotal_label').textContent();
    const taxText = await page.locator('.summary_tax_label').textContent();
    const totalText = await page.locator('.summary_total_label').textContent();

    const displayedSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));
    const displayedTax = parseFloat(taxText.replace('Tax: $', ''));
    const displayedTotal = parseFloat(totalText.replace('Total: $', ''));

    // Check if the sum of items matches the subtotal
    expect(calculatedSubtotal).toBe(displayedSubtotal);
    const expectedFinalTotal = displayedSubtotal + displayedTax;
    expect(displayedTotal).toBeCloseTo(expectedFinalTotal, 2);
    console.log(`Summary: Subtotal(${displayedSubtotal}) + Tax(${displayedTax}) = Total(${displayedTotal})`);

})