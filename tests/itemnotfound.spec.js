const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginpage");
const ProductDetailsPage = require("../pages/productdetailspage");

test("Verify that user gets <ITEM NOT FOUND> message for non-existing product", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const detailsPage = new ProductDetailsPage(page);

    await test.step("Login to SauceDemo", async () => {
        await loginPage.openApp();
        await loginPage.loginToApplication();
 
        await expect(page).toHaveURL(/inventory.html/);
    });

    await test.step("Navigate to Invalid Product ID", async () => {
        await detailsPage.navigateToInvalidItem("9");
    });

    await test.step("Verify Error Message is Displayed", async () => {
        await expect(detailsPage.notFoundMessage).toBeVisible();
        
        await expect(detailsPage.backToProductsBtn).toBeVisible();
    });
});