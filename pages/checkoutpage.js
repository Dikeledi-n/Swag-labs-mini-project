const BasePage = require("../pages/basepage");
const Utils = require("../utility/utils")

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        // Step 1: Information
        this.priceElements = page.locator('.inventory_item_price');
        this.subtotalLabel = page.locator('.summary_subtotal_label');
        this.taxLabel = page.locator('.summary_tax_label');
        this.totalLabel = page.locator('.summary_total_label');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
       
        // Step 2: Overview
        this.inventoryItemNames = page.locator('.inventory_item_name');
    }

    async fillInformation(fName = "John", lName = "Doe", zip = "12345") {
        await this.firstName.fill(fName);
        await this.lastName.fill(lName);
        await this.postalCode.fill(zip);
        await this.continueBtn.click();
    }

    async getItemNames() {
        return await this.inventoryItemNames.allTextContents();
    }

    async calculateItemsSum() {
        const priceTexts = await this.priceElements.allTextContents();
        return priceTexts.reduce((sum, text) => {
            return sum + parseFloat(text.replace('$', ''));
        }, 0);
    }

    async getDisplayedSubtotal() {
        const text = await this.subtotalLabel.textContent();
        // Uses regex to pull only the numeric part (e.g., 49.98)
        return parseFloat(text.replace(/[^\d.]/g, ''));
    }

    // ADD THESE METHODS BELOW:
    async getSubtotal() {
        const text = await this.subtotalLabel.textContent();
        return Utils.parseCurrency(text);
    }

    async getTax() {
        const text = await this.taxLabel.textContent();
        return Utils.parseCurrency(text);
    }

    async getTotal() {
        const text = await this.totalLabel.textContent();
        return Utils.parseCurrency(text);
    }

    async getFinancialSummary() {
        const subtotal = await this.subtotalLabel.textContent();
        const tax = await this.taxLabel.textContent();
        const total = await this.totalLabel.textContent();

        return {
            subtotal: Utils.parseCurrency(subtotal),
            tax: Utils.parseCurrency(tax),
            total: Utils.parseCurrency(total)
        };
    }
}
module.exports = CheckoutPage;