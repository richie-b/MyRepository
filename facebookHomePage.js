//******Navigation********/

/**Clicks the sign up button**/
var clickSignUpButton = {
    clickSignUp: function () {
        this.waitForElementVisible('@signUpButton', 10000)
      .click('@signUpButton')
      .api.pause(1000);
        return this; // Return page object for chaining
    }
};


//**Page Object Map**/
module.exports = {
    url: 'https://www.facebook.com',
    commands: [clickSignUpButton],
    elements: {
        email: { selector: 'input[id=email]' },
        pass: { selector: 'input[id=pass]' },
        loginButton: { selector: 'input[id="u_0_y"]' },
        signUpButton: { selector: 'button[name=websubmit]' },
        exclamationMark: { selector: 'input[aria-haspopup=true]' }
    }
};
