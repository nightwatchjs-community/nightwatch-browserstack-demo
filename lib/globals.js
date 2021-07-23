module.exports = {
  asyncHookTimeout: 20000,

  before(cb) {
    //console.log('[global before hook]');
    cb();
  },

  beforeEach(browser, cb) {
    cb();
  },

  after(cb) {
    cb();
  },

  afterEach(browser, cb) {
    cb();
  }
};
