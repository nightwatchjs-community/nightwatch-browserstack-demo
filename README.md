# Nightwatch Browserstack Demo

This project runs a demo end-to-end which verifies if a Nightwatch test appears in the Browserstack dashboard. The test is ran also from Nightwatch.

## Setup

You need to create an account with Browserstack. You can create one with a free plan, which includes 100 minutes. Only login with email and password is supported.

After you create the account, you need to configure the following environment variables:

```sh
# your email address and password which you used for creating the account
export BROWSERSTACK_LOGIN=""
export BROWSERSTACK_PASSWORD=""

# your username and access key which you can find in your Automate Dashboard on the Browserstack website, after you log in
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
