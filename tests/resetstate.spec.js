const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const ProductPage = require("../pages/productpage");
const CartPage = require("../pages/cartpage");

test("Verify that <Reset App State> button clears all items", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step("Login and Add Items", async () => {
        await loginPage.openApp();
        await loginPage.loginToApplication();
        
        await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('button[name="add-to-cart-sauce-labs-bike-light"]').click();
        
        await expect(productPage.cartBadge).toHaveText('2');
    });

    await test.step("Reset App State via Menu", async () => {
        // Method inherited from BasePage
        await productPage.resetApplicationState();
    });

    await test.step("Verify Cart is Cleared", async () => {
        //  Check badge disappears on current page
        await expect(productPage.cartBadge).toBeHidden();
        
        //  Check Cart Page specifically
        await cartPage.navigateTo();
        await expect(cartPage.cartItems).toHaveCount(0);
    });
});