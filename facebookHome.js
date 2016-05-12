module.exports = {
    'Facebook Home Page Test': function (client) {
        //Navigate to Facebook home page
        var homePage = client.page.facebookHomePage();
        homePage.navigate();
        homePage.waitForElementVisible('@signUpButton', 10000);
        
        //Verify the title of the page is Facebook - Log In or Sign Up
        client.verify.title('Facebook - Log In or Sign Up');

        //Verify the text box to the email ID is displayed
        homePage.verify.visible('@email');
        
        //Verify the login button is displayed
        homePage.verify.visible('@loginButton');
        
        //Click the sign up button
        homePage.clickSignUp();
        
        //Verify an exlamation mark is displayed
        client.pause(2000);
        homePage.verify.visible('@exclamationMark');
        
        client.end();
    }
};
