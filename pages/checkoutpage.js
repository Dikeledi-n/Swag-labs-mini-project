class CheckoutPage
{
    constructor(page)
    {
        this.page=page
        this.firstname="//input[@placeholder='First Name']"
        this.lastname="//input[@placeholder='Last Name']"
        this.postalcode="//input[@placeholder='Zip/Postal Code']"
        this.continuebutton="//input[@id='continue']"
    }

    async checkoutFromApplication()
    {
        await this.page.fill(this.firstname,"Dikeledi")
        await this.page.fill(this.lastname,"Ntjobs")
        await this.page.fill(this.postalcode, "2191")
        await this.page.click(this.continuebutton)
    }
}
module.exports=CheckoutPage;