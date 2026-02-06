class Utils {
    /**
     * Extracts a number from a currency string (e.g., "$49.99" -> 49.99)
     * @param {string} text 
     */
    static parseCurrency(text) {
        if (!text) return 0;
        return parseFloat(text.replace(/[^\d.]/g, ''));
    }

    /**
     * Sums an array of currency strings
     * @param {string[]} priceArray 
     */
    static sumPrices(priceArray) {
        return priceArray.reduce((total, price) => {
            return total + this.parseCurrency(price);
        }, 0);
    }

    /**
     * Generates random user data for checkout forms
     */
    static generateRandomUser() {
        const id = Math.floor(Math.random() * 1000);
        return {
            firstName: `User${id}`,
            lastName: `Test${id}`,
            zip: `${10000 + id}`
        };
    }
}
module.exports = Utils;