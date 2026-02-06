const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginpage");
const CheckoutPage = require("../pages/checkoutpage");
const TestDataGenerator = require("../utility/testdatagenerator");

test("Verify <Total> is calculated correctly with tax inclusive", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // 1. Define the variable here so ALL steps can see it
    let testUser; 

    await test.step("Login and navigate to Overview", async () => {
        await loginPage.openApp();
        await loginPage.loginToApplication();
        
        await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('button[name="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();
        
        // 2. Assign the random data to the variable
        testUser = TestDataGenerator.getCheckoutData();

        // 3. DON'T FORGET: You must actually fill the form!
        await checkoutPage.fillInformation(
            testUser.firstName, 
            testUser.lastName, 
            testUser.zipCode
        );
        
        await expect(page).toHaveURL(/checkout-step-two.html/);
    });

    await test.step("Validate Pricing Mathematics", async () => {
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