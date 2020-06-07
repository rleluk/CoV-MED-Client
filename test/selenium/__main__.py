import unittest
from selenium import webdriver
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

class PythonOrgSearch(unittest.TestCase):

    @classmethod
    def setUpClass(self):
        self.driver = webdriver.Firefox()
        self.driver.set_page_load_timeout("10")
        self.driver.get("http://cov-med.herokuapp.com/")
        self.driver.maximize_window()

    def test_main_page_title(self):
        self.assertEqual(self.driver.title, "CoV-MED")

    def test_main_page_logo(self):
        self.driver.get("http://cov-med.herokuapp.com/")
        image = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/img")
        image_source = image.get_attribute('src') 
        self.assertIn("data:image/png;base64", image_source)
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/")

    def test_main_page_title_text(self):
        title_text = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/h1")
        self.assertEqual("inline-block", title_text.value_of_css_property("display"))
        self.assertEqual("55px", title_text.value_of_css_property("font-size"))
        self.assertEqual("rgb(63, 81, 181)", title_text.value_of_css_property("color"))
        self.assertEqual("verdana, sans-serif", title_text.value_of_css_property("font-family"))

    def test_doctors_subpage_button(self):
        doctors_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[2]/a")
        doctors_button.send_keys(Keys.ENTER)
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/doctors")

    def test_main_subpage_button(self):
        main_page_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[1]/a")
        main_page_button.send_keys(Keys.ENTER)
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/")

    def test_examinations_button(self):
        examinations_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[3]/a")
        examinations_button.send_keys(Keys.ENTER)
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/examinations")

    def test_registration_back_and_forth_button_and_sign_up_button(self):
        self.driver.get("http://cov-med.herokuapp.com/")
        time.sleep(3)
        sign_up_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/a[1]/button/span[1]")
        sign_up_button.click()
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/signup")

        sign_up_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[3]/form/button/span[1]")
        self.assertEqual("flex", sign_up_button.value_of_css_property("display"))
        self.assertEqual("center", sign_up_button.value_of_css_property("align-items"))
        self.assertEqual("center", sign_up_button.value_of_css_property("justify-content"))
        self.assertEqual("500", sign_up_button.value_of_css_property("font-weight"))
        self.assertEqual("uppercase", sign_up_button.value_of_css_property("text-transform"))

        main_page_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[1]/a")
        main_page_button.click()
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/")

    def test_login_back_and_forth_button(self):
        self.driver.get("http://cov-med.herokuapp.com/")
        time.sleep(3)
        login_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/a[2]/button/span[1]")
        login_button.click()
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/signin")
        main_page_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[1]/a")
        main_page_button.click()
        print("after2 = {}".format(self.driver.current_url))
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/")

    def test_client(self):
        self.driver.get("http://cov-med.herokuapp.com/signin")
        print("before = {}".format(self.driver.current_url))
        self.driver.find_element_by_name("email").send_keys("ClientSeleniumTestAccount@mail.com")
        self.driver.find_element_by_name("password").send_keys("ClientseleniumTestPassword")
        sign_in_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[3]/form/button/span[1]")
        sign_in_button.click()
        print("after = {}".format(self.driver.current_url))
        time.sleep(3)
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/client/homepage")

        doctors_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[2]/a")
        doctors_button.click()

        examinations_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[3]/a")
        examinations_button.click()

        patient_panel_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[4]/a")
        patient_panel_button.click()

        examinations_history_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[5]/a")
        examinations_history_button.click()

        patient_panel_button_2 = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/a/button/span[1]")
        patient_panel_button_2.click()

        examinations_results_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[6]/a")
        examinations_results_button.click()

        patient_panel_button_2 = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/a/button/span[1]")
        patient_panel_button_2.click()

        arrange_examination_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[7]/a")
        arrange_examination_button.click()

        time.sleep(2)

        select_city = Select(self.driver.find_element_by_xpath('//*[@id="select-city"]'))
        select_city.select_by_index(2)

        time.sleep(2)

        select_street = Select(self.driver.find_element_by_xpath('//*[@id="select-street"]'))
        select_street.select_by_index(1)        

        time.sleep(2)

        select_service = Select(self.driver.find_element_by_xpath('//*[@id="select-service"]'))
        select_service.select_by_index(5)
        
        patient_panel_button_2 = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/a/button/span[1]")
        patient_panel_button_2.click()

        log_out = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/button/span[1]")
        log_out.click()

        time.sleep(3)


    @classmethod
    def tearDownCadss(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
    PythonOrgSearch.close()
