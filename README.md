# Nightwatch.js Browserstack Demo

This project runs an end-to-end test which runs another demo test using the [Browserstack](https://browserstack.com) cloud testing service. It then verifies if the second test appears in the Browserstack dashboard. Both the main test and the test-within-the-test are run using [Nightwatch.js](https://nightwatchjs.org).

## Overview
The test performs a login against the browserstack.com service, saves the cookies needed to maintain the session state for subsequent test runs, starts the second Nightwatch test inside a child process, and then simply asserts if the second test was found in the list, in  the Browserstack dashboard.

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

You can also run the main test on Browserstack:

```sh
npx nightwatch --env browserstack.chrome
```

### Persisting login information
The [loginIfNeeded](https://github.com/nightwatchjs/nightwatch-browserstack-demo/blob/main/lib/custom-commands/loginIfNeeded.js) custom command grabs the session cookies after a succesful login and saves them in a local file called `cookies.json` which contents will use for subsequent logins.

Enjoy!
