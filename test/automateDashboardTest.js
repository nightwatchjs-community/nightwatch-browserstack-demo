const path = require('path');

describe('Automate UI Dashboard Test', function() {

  before(browser => {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('#home-page')
      .loginIfNeeded();
  });

  it('check if test in list', function (browser) {
    browser
      .assert.visible('body')
      .runNightwatchTest([
        path.join(__dirname, '../lib/example/homepageTest.js'), '--env', 'browserstack.chrome'
      ], {
        // enable this to have output from the child process displayed in the main stdout
        live_output: false
      })

      // asserting that the nightwatch build is first element in the list of builds
      .assert.containsText('.sidebar__list ul li:first-child', 'nightwatch-test-build')
      .click('.sidebar__list ul li:first-child')

      // asserting that the example homepageText is first element in sessions list
      .waitForElementVisible('.sessions-table ul li')
      .assert.containsText('.sessions-table ul li', 'Nightwatch homepage example')
  });

  after(browser => browser.end());
});
