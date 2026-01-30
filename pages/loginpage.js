class LoginPage
{

    constructor(page)
    {
        this.page=page
        this.username="//input[@placeholder='Username']"
        this.password="//input[@placeholder='Password']"
        this.loginbutton="//input[@id='login-button']"
    }

    async loginToApplication()
    {
        await this.page.fill(this.username,"standard_user")
        await this.page.fill(this.password,"secret_sauce")
        await this.page.click(this.loginbutton)
    }
}
module.exports=LoginPage;