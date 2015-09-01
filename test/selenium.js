var webdriver = require('selenium-webdriver');
var By = webdriver.By, Key = webdriver.Key, until = webdriver.until;

var timeout = 10 * 1000; // 10s

var driver = new webdriver.Builder()
  // .forBrowser('firefox') /* /Application/Firefox.app */
  .forBrowser('chrome') /* [chromedriver](http://chromedriver.storage.googleapis.com/) into PATH */
  .build();

driver.get('https://github.com/');

var elem = driver.findElement(By.name('q'));
elem.sendKeys('npm');
elem.sendKeys(Key.ENTER);
driver.wait(until.titleIs('Search · npm · GitHub'), timeout);

driver.quit();
