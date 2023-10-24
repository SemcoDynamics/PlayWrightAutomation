class mixLogin{
    constructor({page}){

        this.userNameMix = page.locator('[dmx-validate="userName"]');
        this.passWordMix = page.locator('[dmx-validate="password"]');
        this.submit = page.locator('button[text="Sign In"]');
    }
    async login(){
        
    }
}
module.exports = {mixLogin};