package frontPage;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.AfterMethod;

public class LoginTest {
	public WebDriver driver;
	public String baseUrl;
	
	@BeforeTest
	public void beforeMethod() {
        driver = new FirefoxDriver();
        baseUrl = "http://localhost:8080/teamrtts/";
	}

	@Test(priority = 0)
	public void verifyLogin() {
        String expectedTitle = "TeamRTTS";
        String actualTitle = "";
        
      //launch Firefox and direct it to the Base URL
        driver.get(baseUrl);
 
      //get the actual value of the title
        actualTitle = driver.getTitle();
 
        /*
         * compare the actual title of the page with the expected one and print
         * the result as "Passed" or "Failed"
         */
        
        Assert.assertEquals(actualTitle, expectedTitle, "Title Failed");
        
	}
	
	@Test(priority = 1)
	public void loginUser(){
		driver.get(baseUrl);
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		driver.findElement(By.id("username")).sendKeys("admin@admin.com");
		driver.findElement(By.name("password")).sendKeys("admin");
		driver.findElement(By.id("loginBtn")).click();
		
		WebElement welcomeText = driver.findElement(By.className(("x-tab-strip-text ")));
		Assert.assertEquals(welcomeText.getText(), "Welcome, admin!");
		
	}


	@AfterTest
	public void afterMethod() {
		
        //close Firefox
        driver.quit();
                
        // exit the program explicitly
        System.exit(0);
	}

}

