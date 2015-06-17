module.exports = {
  tags: ['special', 'password'],
  before : function (browser) {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('#password', 1000)
      .logEvents('password');
  },
  'Ctrl x key combination is ignored' : function (browser) {
    browser
      .setValue('#password', 'Password1')
      .setValue('#password', browser.Keys.CONTROL + 'a')
      .dumpLog('password')
      .assert.containsText('#password_secret', 'Password1')
      .assert.containsText('#password', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .end();
  },
  'Alt x key combination is ignored' : function (browser) {
    browser
      .setValue('#password', 'Password1')
      .setValue('#password', browser.Keys.ALT + 'a')
      .assert.value('#password_secret', 'Password1')
      .assert.value('#password', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .end();
  }
};
