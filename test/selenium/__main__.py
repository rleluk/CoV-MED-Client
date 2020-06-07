import unittest
from selenium import webdriver
import selenium
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
        self.driver.find_element_by_name("email").send_keys("ClientSeleniumTestAccount@mail.com")
        self.driver.find_element_by_name("password").send_keys("ClientseleniumTestPassword")
        sign_in_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[3]/form/button/span[1]")
        sign_in_button.click()
        time.sleep(3)
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/client/homepage")

        doctors_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[2]/a")
        doctors_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/doctors")

        examinations_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[3]/a")
        examinations_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/examinations")

        patient_panel_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[4]/a")
        patient_panel_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/client/homepage")

        examinations_history_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[5]/a")
        examinations_history_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/client/examination-history")

        patient_panel_button_2 = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/a/button/span[1]")
        patient_panel_button_2.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/client/homepage")

        examinations_results_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[6]/a")
        examinations_results_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/client/examination-results")

        patient_panel_button_2 = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/a/button/span[1]")
        patient_panel_button_2.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/client/homepage")

        arrange_examination_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[7]/a")
        arrange_examination_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/client/new-appointment")

        time.sleep(1)

        select_city = Select(self.driver.find_element_by_xpath('//*[@id="select-city"]'))
        select_city.select_by_index(2)

        time.sleep(1)

        select_street = Select(self.driver.find_element_by_xpath('//*[@id="select-street"]'))
        select_street.select_by_index(1)        

        time.sleep(1)

        select_service = Select(self.driver.find_element_by_xpath('//*[@id="select-service"]'))
        select_service.select_by_index(5)

        time.sleep(1)

        select_doctor = Select(self.driver.find_element_by_xpath('//*[@id="select-doctor"]'))
        select_doctor.select_by_index(1)
        
        date_picker = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[3]/form/div[5]/input")
        date_picker.clear()

        current_year = time.strftime("%Y")

        self.driver.execute_script('document.getElementsByName("date").value = "2021-10-10"')

        time.sleep(4)

        time_picker = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[3]/form/div[6]/select")
        time_picker.send_keys("8:00")
        # time_picker.send_keys("8:00").select_by_index(1)

        time.sleep(2)

        submit_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[3]/form/button")
        submit_button.click()

        patient_panel_button_2 = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/a/button/span[1]")
        patient_panel_button_2.click()

        examinations_history_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[5]/a")
        examinations_history_button.click()

        time.sleep(3)

        log_out = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/button/span[1]")
        log_out.click()

        time.sleep(3)

    def test_doctor(self):
        self.driver.get("http://cov-med.herokuapp.com/signin")
        self.driver.find_element_by_name("email").send_keys("DoctorSeleniumTestAccount@mail.com")
        self.driver.find_element_by_name("password").send_keys("DoctorseleniumTestPassword")
        sign_in_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[3]/form/button/span[1]")
        sign_in_button.click()
        time.sleep(3)

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/doctor/homepage")

        doctors_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[2]/a")
        doctors_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/doctors")

        examinations_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[3]/a")
        examinations_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/examinations")

        doctor_panel_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[4]/a")
        doctor_panel_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/doctor/homepage")

        appintments_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[5]/a")
        appintments_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/doctor/appointments")

        doctor_panel_button_2 = self.driver.find_element_by_xpath("  /html/body/div[1]/div/div[1]/div/a/button/span[1]")
        doctor_panel_button_2.click()

        patients_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[6]/a")
        patients_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/doctor/patients")

        doctor_panel_button_2 = self.driver.find_element_by_xpath("  /html/body/div[1]/div/div[1]/div/a/button/span[1]")
        doctor_panel_button_2.click()

        log_out_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/button/span[1]")
        log_out_button.click()


    def test_receptionist(self):
        self.driver.get("http://cov-med.herokuapp.com/signin")
        self.driver.find_element_by_name("email").send_keys("ReceptionistSeleniumTestAccount@mail.com")
        self.driver.find_element_by_name("password").send_keys("ReceptionistleniumTestPassword")
        sign_in_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[3]/form/button/span[1]")
        sign_in_button.click()
        time.sleep(3)
        
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/receptionist/homepage")

        doctors_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[2]/a")
        doctors_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/doctors")

        examinations_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[3]/a")
        examinations_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/examinations")

        receptionist_panel_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[4]/a")
        receptionist_panel_button.click()
    
        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/receptionist/homepage")

        appointments_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[5]/a")
        appointments_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/receptionist/appointments")

        time.sleep(2)

        rearange_appointments_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[2]/table/tbody/tr[2]/td[4]/a/button/span[1]")
        rearange_appointments_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/receptionist/postpone-appointment")

        submit_rearange_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/form/button")
        submit_rearange_button.click()

        receptionist_panel_button_2 = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/a/button/span[1]")
        receptionist_panel_button_2.click()

        appointments_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[5]/a")
        appointments_button.click()

        time.sleep(2)

        cancel_appointment = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[2]/table/tbody/tr[3]/td[5]/button/span[1]")
        cancel_appointment.click()

        time.sleep(1)

        deny_cancelation = self.driver.find_element_by_xpath("/html/body/div[3]/div/div/div/div/button[2]")
        deny_cancelation.click()

        receptionist_panel_button_2 = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/a/button/span[1]")
        receptionist_panel_button_2.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/receptionist/homepage")

        patients_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[1]/ul/li[6]/a")
        patients_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/receptionist/patients")

        time.sleep(1)

        deactivate_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[2]/table/tbody/tr[2]/td[3]/button/span[1]")
        deactivate_button.click()

        time.sleep(1)

        deny_deactivation = self.driver.find_element_by_xpath("/html/body/div[3]/div/div/div/div/button[2]")
        deny_deactivation.click()

        log_out_button = self.driver.find_element_by_xpath("/html/body/div[1]/div/div[1]/div/button/span[1]")
        log_out_button.click()

        self.assertEqual(self.driver.current_url, "http://cov-med.herokuapp.com/")


    @classmethod
    def tearDownClass(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
    PythonOrgSearch.close()
