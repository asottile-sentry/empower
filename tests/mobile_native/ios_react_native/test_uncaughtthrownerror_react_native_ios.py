def test_uncaughtthrownerror_react_native_ios(ios_react_native_sim_driver):
    btn = ios_react_native_sim_driver.find_element_by_accessibility_id("Uncaught Thrown Error")
    btn.click()
