module.exports = {
  tags: ['special', 'password'],
  beforeEach : function (browser) {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('#password', 1000);
  },
  'Ctrl x key combination is ignored' : function (browser) {
    browser
      .sendKeys('#password', 'Password1')
      .sendKeys('#password', browser.Keys.CONTROL + 'a')

      // Wait for setTimeout for resetting password
      .pause(1000)
      .assert.attributeEquals('#password_secret', 'value', 'Password1')
      .assert.attributeEquals('#password', 'value', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .end();
  },
  'Alt x key combination is ignored' : function (browser) {
    browser
      .sendKeys('#password', 'Password1')
      .sendKeys('#password', browser.Keys.ALT + 'a')

      // Wait for setTimeout for resetting password
      .pause(1000)
      .assert.attributeEquals('#password_secret', 'value', 'Password1')
      .assert.attributeEquals('#password', 'value', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .end();
  }
};
