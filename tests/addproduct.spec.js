const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginpage");
const ProductPage = require("../pages/productpage");

test("Verify user is able to add product to cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await test.step("Login to SauceDemo", async () => {
        await loginPage.openApp(); // Inherited from BasePage
        await loginPage.loginToApplication();
        await expect(page).toHaveURL(/inventory.html/);
    });

    await test.step("Add Backpack to Cart", async () => {
        await productPage.addBackpackToCart();
        
        // Assert that the cart icon now shows 1 item
        await expect(productPage.cartBadge).toHaveText("1");
    });
});