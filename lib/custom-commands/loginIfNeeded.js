const path = require('path');
const fs = require('fs-extra');

module.exports.command = async function (done = function() {}) {
  const user = process.env.BROWSERSTACK_LOGIN;
  const password = process.env.BROWSERSTACK_PASSWORD;

  if (!user || !password) {
    console.error('Please set BROWSERSTACK_USER and BROWSERSTACK_PASSWORD env variables.');
    done();
    return;
  }

  const filePath = path.resolve('cookies.json');
  const exists = await fs.pathExists(filePath);

  if (exists) {
    // if there is cookie data already saved, load it and set the cookie for the request
    const cookieData = require(filePath);
    const filteredCookies = cookieData.filter(item => [
      'bs_logging_id',
      '_session'
    ].includes(item.name));

    if (filteredCookies.length) {
      await this.deleteCookies();
      await Promise.all(filteredCookies.map(cookie => this.setCookie(cookie)));

      await this
        .pause(500)
        .url(this.launch_url);
    }
  }

  await this.acceptCookies('#accept-cookie-notification');
  await this.url(this.launch_url + '/users/sign_in');

  // If the user is already logged in, this will be a redirect to the Dashboard page
  const elements = await this.findElements({
    selector: '#new',
    suppressNotFoundErrors: true
  });

  if (Array.isArray(elements) && elements.length > 0) {
    // if we are on the login page, sign in
    await this
      .click('#user_email_login')
      .setValue('#user_email_login', user)
      .pause(500)
      .click('#user_password')
      .pause(500)
      .setValue('#user_password', password)
      .click('#user_submit')
  }

  await this.waitForElementVisible('#bd-dashboard');

  const guideElement = await this.findElements({
    selector: 'span.skip-guide',
    suppressNotFoundErrors: true,
    timeout: 1000
  });

  if (Array.isArray(guideElement) && guideElement.length > 0) {
    await this.elementIdClick(guideElement[0].getId());
  }
  //
  const cookies = await this.getCookies();
  await fs.outputJson('cookies.json', cookies.value);

  // wait a little, for good measure
  this.pause(500, done);
};
