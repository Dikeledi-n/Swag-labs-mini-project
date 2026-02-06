// pages/ProductDetailsPage.js
const BasePage = require("../pages/basepage");

class ProductDetailsPage extends BasePage {
    constructor(page) {
        super(page);
        this.notFoundMessage = page.getByText("ITEM NOT FOUND");
        this.backToProductsBtn = page.locator('[data-test="back-to-products"]');
    }

    async navigateToInvalidItem(id = "9") {
        await this.page.goto(`https://www.saucedemo.com/inventory-item.html?id=${id}`);
    }
}
module.exports = ProductDetailsPage;