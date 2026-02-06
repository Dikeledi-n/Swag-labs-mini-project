class TestDataGenerator {
    /**
     * Returns an object with random strings for checkout
     */
    static getCheckoutData() {
        const timestamp = Date.now();
        return {
            firstName: `User${timestamp}`,
            lastName: `Tester${Math.floor(Math.random() * 100)}`,
            zipCode: `${Math.floor(10000 + Math.random() * 90000)}` // Random 5-digit zip
        };
    }

    /**
     * Useful if you want to test invalid login attempts
     */
    static getRandomCredentials() {
        return {
            user: `wrong_user_${Math.random().toString(36).substring(7)}`,
            pass: `wrong_pass_${Math.random().toString(36).substring(7)}`
        };
    }
}
module.exports = TestDataGenerator;