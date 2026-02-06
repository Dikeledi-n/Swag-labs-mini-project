// pages/LoginPage.js
const BasePage = require("../pages/basepage");

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = page.locator("//input[@placeholder='Username']");
        this.passwordInput = page.locator("//input[@placeholder='Password']");
        this.loginButton = page.locator("//input[@id='login-button']");
    }

    async loginToApplication(user = "standard_user", pass = "secret_sauce") {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }
}
module.exports = LoginPage;