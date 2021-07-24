// Autogenerated by Nightwatch
// Refer to the online docs for more details: https://nightwatchjs.org/gettingstarted/configuration/
const Services = {}; loadServices();

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['test'],
  //page_objects_path : 'lib/pages',
  custom_commands_path : 'lib/custom-commands',
  //custom_assertions_path : 'lib/custom-assertions',
  globals_path : 'lib/globals.js',

  webdriver: {},

  test_settings: {
    default: {
      persist_globals: true,
      disable_error_log: false,
      launch_url: 'https://www.browserstack.com',

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities : {
        browserName : 'chrome',
        chromeOptions: {
        }
      },

      webdriver: {
        start_process: true,
        port: 9515,
        server_path: (Services.chromedriver ? Services.chromedriver.path : ''),
        cli_args: [
          // --verbose
        ]
      }
    },

    safari: {
      desiredCapabilities : {
        browserName : 'safari',
        alwaysMatch: {
          acceptInsecureCerts: false
        }
      },
      webdriver: {
        port: 4445,
        start_process: true,
        server_path: '/usr/bin/safaridriver'
      }
    },

    firefox: {
      desiredCapabilities : {
        browserName : 'firefox',
        alwaysMatch: {
          // Enable this if you encounter unexpected SSL certificate errors in Firefox
          // acceptInsecureCerts: true,
          'moz:firefoxOptions': {
            args: [
              // '-devtools'
              // '-headless',
              // '-verbose'
            ],
            prefs: {
              'devtools.whatsnew.enabled': false,
              'devtools.webconsole.sidebarToggle': true,
              'devtools.application.enabled': true,
              'devtools.debugger.pause-on-exceptions': false
            }
          }
        }
      },
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: (Services.geckodriver ? Services.geckodriver.path : ''),
        cli_args: [
          // very verbose geckodriver logs
          // '-vv'
        ]
      }
    },

    browserstack: {
      selenium: {
        host: 'hub-cloud.browserstack.com'
      },
      // More info on configuring capabilities can be found on:
      // https://www.browserstack.com/automate/capabilities?tag=selenium-4
      desiredCapabilities: {
        'bstack:options' : {
          local: 'false',
          userName: '${BROWSERSTACK_USER}',
          accessKey: '${BROWSERSTACK_KEY}',
        },
      },

      webdriver: {
        port: 443,
        keep_alive: true,
        start_process: false
      }
    },

    'browserstack.chrome': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions : {
          // This tells Chromedriver to run using the legacy JSONWire protocol
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          w3c: false
        }
      }
    }
  }
};

function loadServices() {
  try {
    Services.chromedriver = require('chromedriver');
  } catch (err) {}

  try {
    Services.geckodriver = require('geckodriver');
  } catch (err) {}
}
