const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginpage");
const ProductPage = require("../pages/productpage");

test("Verify user is able to remove product from cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page); 

    await test.step("Login", async () => {
        await loginPage.openApp();
        await loginPage.loginToApplication();
    });

    await test.step("Add and then Remove Backpack", async () => {
        await productPage.addBackpackToCart(); 
        await productPage.removeBackpackFromCart();
    });
});