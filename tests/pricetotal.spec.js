const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginpage");
const CheckoutPage = require("../pages/checkoutpage");
const TestDataGenerator = require("../utility/testdatagenerator");

test("Verify <Total> is calculated correctly with tax inclusive", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // We define the data at the top so all steps can access it
    const testUser = TestDataGenerator.getCheckoutData();

    await test.step("Login and navigate to Overview", async () => {
        await loginPage.openApp();
        await loginPage.loginToApplication();
        
        // Add items
        await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('button[name="add-to-cart-sauce-labs-fleece-jacket"]').click();
        
        // Go to Cart -> Checkout
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();
        
        // IMPORTANT: Fill the info to reach the Summary page
        await checkoutPage.fillInformation(
            testUser.firstName, 
            testUser.lastName, 
            testUser.zipCode
        );
        
        await expect(page).toHaveURL(/checkout-step-two.html/);
    });

    await test.step("Validate Pricing Mathematics", async () => {
        // These locators are only visible on 'checkout-step-two.html'
        const itemSum = await checkoutPage.calculateItemsSum();
        const subtotal = await checkoutPage.getSubtotal();
        const tax = await checkoutPage.getTax();
        const total = await checkoutPage.getTotal();

        // Verify Subtotal matches sum of individual items
        expect(itemSum).toBe(subtotal);

        // Verify Total = Subtotal + Tax
        const expectedTotal = subtotal + tax;
        expect(total).toBeCloseTo(expectedTotal, 2);

        console.log(`Verified for ${testUser.firstName}: ${subtotal} + ${tax} = ${total}`);
    });
});