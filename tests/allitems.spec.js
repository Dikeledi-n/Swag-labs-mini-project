const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginpage");
const CheckoutPage = require("../pages/checkoutpage");
const TestDataGenerator = require("../utility/testdatagenerator"); 

test("Verify Checkout with random test data", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Generate the data once for this test
    const randomUser = TestDataGenerator.getCheckoutData();

    await test.step("Login and Add Items", async () => {
        await loginPage.openApp();
        await loginPage.loginToApplication();
        await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();
    });

    await test.step("Fill Information with Random Data", async () => {
        // Use the generated data
        await checkoutPage.fillInformation(
            randomUser.firstName, 
            randomUser.lastName, 
            randomUser.zipCode
        );
        
        console.log(`Testing with: ${randomUser.firstName} ${randomUser.lastName}`);
        await expect(page).toHaveURL(/checkout-step-two.html/);
    });
});