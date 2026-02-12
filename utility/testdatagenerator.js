const { faker } = require('@faker-js/faker');

class TestDataGenerator {
    static getCheckoutData() {
        return {
            // Generates a real-looking name like "Lerato Smith" or "Alex Johnson"
            firstName: faker.person.firstName(), 
            lastName: faker.person.lastName(),
            // Generates a real 5-digit zip code
            zipCode: faker.location.zipCode('#####') 
        };
    }
}
module.exports = TestDataGenerator;