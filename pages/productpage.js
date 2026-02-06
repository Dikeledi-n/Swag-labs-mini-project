// pages/ProductsPage.js
const BasePage = require("../pages/basepage");

class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.addBackpackBtn = page.locator('button[name="add-to-cart-sauce-labs-backpack"]');
        this.removeBackpackBtn = page.locator('button[name="remove-sauce-labs-backpack"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    
    async addBackpackToCart() { 
        await this.addBackpackBtn.click();
    }

    async removeBackpackFromCart() {
        await this.removeBackpackBtn.click();
    }
}
module.exports = ProductsPage;