# Nightwatch Browserstack Demo

This project runs an end-to-end test which runs another demo test using the [Browserstack](https://browserstack.com) cloud testing service. It then verifies if the second test appears in the Browserstack dashboard. Both the main test and the test-within-the-test are run using [Nightwatch.js](https://nightwatchjs.org).

## Setup

You need to create an account with Browserstack. You can create one with a free plan, which includes 100 minutes. Only login with email and password is supported.

After you create the account, you need to configure the following environment variables:

```sh
# your email address and password which you used for creating the account
export BROWSERSTACK_LOGIN=""
export BROWSERSTACK_PASSWORD=""

# your username and access key which you can find in your Automate Dashboard on the Browserstack website
export BROWSERSTACK_KEY=""
export BROWSERSTACK_USER=""
```

## Run
This will run a test within a test. By default the runner uses chrome, but firefox is also configured. On Browserstack, chrome is used, but you can use other browsers as well, you just need to extend the `nightwatch.conf.js` config file with additional configuration.

```sh
# first, install all dependencies
npm install

# run tests with default config (chrome)
npm test

# run tests in firefox
npm test -- --env fireofx

#or
npx nightwatch --env firefox
```

Enjoy!
