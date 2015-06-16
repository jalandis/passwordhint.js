module.exports = {
  tags: ['delete', 'password'],
  'Delete pressed at end of string has no effect' : function (browser) {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('#password', 1000)
      .sendKeys('#password', 'Password1')
      .sendKeys('#password', browser.Keys.DELETE)
      .assert.value('#password', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .assert.value('#password_secret', 'Password1')
      .end();
  },
  'Delete pressed at start of string removes a single character' : function (browser) {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('#password', 1000)
      .sendKeys('#password', 'Password1')
      .sendKeys(
        '#password',
        browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW +
        browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW +
        browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW
      )
      .sendKeys('#password', browser.Keys.DELETE)
      .assert.value('#password', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .assert.value('#password_secret', 'assword1')
      .end();
  },
  'Delete pressed in middle of string removes a single character' : function (browser) {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('#password', 1000)
      .sendKeys('#password', 'Password1')
      .sendKeys(
        '#password',
        browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW
      )
      .sendKeys('#password', browser.Keys.DELETE)
      .assert.value('#password', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .assert.value('#password_secret', 'Passwod1')
      .end();
  },
  'Delete pressed while selecting a number of characters will remove selected characters' : function (browser) {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('#password', 1000)
      .sendKeys('#password', 'Password1')
      .sendKeys(
        '#password',
        browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW +
        browser.Keys.SHIFT +
        browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW
      )
      .sendKeys('#password', browser.Keys.DELETE)
      .assert.value('#password', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .assert.value('#password_secret', 'Pasrd1')
      .end();
  }
};
