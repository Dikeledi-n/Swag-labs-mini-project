const BasePage = require("../pages/basepage");

class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
    }

    async navigateTo() {
        await this.page.goto("https://www.saucedemo.com/cart.html");
    }
}
module.exports = CartPage;