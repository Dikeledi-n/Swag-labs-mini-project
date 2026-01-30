const {test, expect} = require ("@playwright/test")
const LoginPage = require("../pages/loginpage")

test("Verify that <Reset App State> button clears all the products items in cart.", async ({page}) => {
   
    //Login
    await page.goto("https://www.saucedemo.com/");
    const loginPage = new LoginPage(page)
    await loginPage.loginToApplication()

    //Add items to cart and verify badge exists
    await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('button[name="add-to-cart-sauce-labs-bike-light"]').click();
    
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');

    //Open the Side Menu
    await page.getByRole('button', { name: 'Open Menu' }).click();

    //Click Reset App State
    await page.getByRole('link', { name: 'Reset App State' }).click();

    //Verify the cart badge is gone
    await expect(cartBadge).not.toBeVisible();
    
    //Go to cart page and double check it is empty
    await page.goto("https://www.saucedemo.com/cart.html");
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(0);

})