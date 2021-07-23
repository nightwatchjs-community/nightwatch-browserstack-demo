describe('Nightwatch homepage example', function() {
  test('open homepage', function (browser) {
    browser.url('https://nightwatchjs.org').waitForElementVisible('body').end();
  });
})