const {test, expect} = require ("@playwright/test")

test("Verify <Price Total> in <Checkout: Overview> are calculated correctly", async ({page}) => {
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