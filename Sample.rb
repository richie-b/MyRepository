
# File: tc_web_form_test.rb
require 'selenium-webdriver'
require "test/unit"


class Sample < Test::Unit::TestCase
 
# Open Firefox driver at beginning of each run
  def setup
    
    #Creates a Firefox Browser.
    @driver = Selenium::WebDriver.for(:firefox)
    
    #Navigates to form page.
    @driver.navigate.to "https://docs.google.com/forms/d/1emhA5uhsgx2lWJYk2o_jnSnG88_weQ_TV9aAA7M2t6Q/viewform?pli=1&edit_requested=true"
    
  end
  
  
=begin
  This is the positive test. Since this is the positive test, it involves
  submitting the required information so that the form will submit. Next,
  5 assertions are performed. Each assertion checks an indicator of a successful
  submission.  
=end   
  def test_positive_case
     
     #Enters name in form
     @driver.find_element(:id, 'entry_1041466219').send_keys "First Last"
     
     #Click yes check box
     @driver.find_element(:id, 'group_310473641_1').click
    
     #Click submit
     @driver.find_element(:id, 'ss-submit').click   
     
     #Check for indicators of a successful submission
     
      #Check page title  
      assert_equal("Thanks!", @driver.title )
     
      #Check heading
      assert_equal("Basic Web Form", @driver.find_element(:class, 'ss-confirmation').text)
     
      #Check Message
      assert_equal("Your response has been recorded.", @driver.find_element(:class, 'ss-resp-message').text)
     
      #Check Other Responses Link
      assert_equal("See previous responses", @driver.find_element(:class, 'ss-bottom-link').text)
     
      #Check Submit Another Response Link
      assert_equal("Submit another response", @driver.find_element(:link, 'Submit another response').text)
      
  end
  

  
=begin
    This is the negative test. Since it is the negative it involves leaving out the required 
    information and checking that the form does not submit.
    
    First I check if any error message exists on loading the page. Assuming there should be no errors,
    I check that the error message is displayed if everything is left blank. There should be 2 error messages.
    Next I check that the error message is displayed if the check box alone is clicked. There should be 1 error message.
    Next I check that the error message is displayed if the edit box alone has a value. There should be 1 error message.
  
    I found while testing this that I need to click back on the form after it has been submitted for Ruby to pick up that
    the error message was displayed. If the requirement spec stated that the user should not have to click back on the 
    form to see the highlighted fields, then this most likely is a bug.  
    
=end
  def test_negative_case

    #Check Name or Question Error Message is not enabled 
     assert_equal(false, @driver.find_element(:class, 'required-message').displayed?, "REQUIRED MESSAGE CLASS DISPLAYED BEFORE FORM HAS BEEN SUBMITTED")
     assert_equal('', @driver.find_element(:class, 'required-message').text, "ERROR MESSAGE DISPLAYED BEFORE FORM HAS BEEN SUBMITTED")
    
    #Click submit
     @driver.find_element(:id, 'ss-submit').click 
     sleep(1)
     #Click back on form
     @driver.find_element(:class, 'ss-form-entry').click 
     
    #Check Name or Question Error Message Appeared
     assert(@driver.find_element(:class, 'required-message').displayed?, "REQUIRED MESSAGE CLASS DID NOT DISPLAY WHEN NOTHING WAS ENTERED")
     assert_equal('This is a required question', @driver.find_element(:class, 'required-message').text, "ERROR MESSAGE DID NOT DISPLAY WHEN NOTHING WAS ENTERED")
      
    #Click 'No' Check Box
     @driver.find_element(:id, 'group_310473641_2').click
     
    #Click submit
     @driver.find_element(:id, 'ss-submit').click
     sleep(1)
    #Click back on form
     @driver.find_element(:class, 'ss-form-entry').click 
    
    #Check Name or Question Error Message Appeared
     assert(@driver.find_element(:class, 'required-message').displayed?, "REQUIRED MESSAGE CLASS DID NOT DISPLAY WHEN CHECK BOX ALONE WAS CLICKED")
     assert_equal('This is a required question', @driver.find_element(:class, 'required-message').text, "ERROR MESSAGE DID NOT DISPLAY WHEN CHECK BOX ALONE WAS CLICKED")
    
    #Click Off 'No' Check Box
     @driver.find_element(:id, 'group_310473641_2').click 
    #Enters name in form
     @driver.find_element(:id, 'entry_1041466219').send_keys "First Last"
    
    #Click submit
     @driver.find_element(:id, 'ss-submit').click
     sleep(2)
    #Click back on form
     @driver.find_element(:class, 'ss-form-entry').click
    
    #Check Name or Question Error Message Appeared
      assert(@driver.find_element(:class, 'required-message').displayed?, "REQUIRED MESSAGE CLASS DID NOT DISPLAY WHEN NAME ALONE WAS ENTERED")
      assert_equal('This is a required question', @driver.find_element(:class, 'required-message').text, "ERROR MESSAGE DID NOT DISPLAY WHEN NAME ALONE WAS ENTERED")
         
  end

 #Close driver at end of each run
  def teardown
    
    #Close the browser
    @driver.quit
    
  end
  
end
