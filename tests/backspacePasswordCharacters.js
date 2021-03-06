module.exports = {
  tags: ['backspace', 'password'],
  'Backspace pressed at end of string removes a single character' : function (browser) {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('#password', 1000)
      .sendKeys('#password', 'Password1')
      .sendKeys('#password', browser.Keys.BACK_SPACE)
      .assert.value('#password_secret', 'Password')
      .assert.value('#password', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .end();

  },
  'Backspace pressed at start of string has no effect' : function (browser) {
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
      .sendKeys('#password', browser.Keys.BACK_SPACE)
      .assert.value('#password', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .assert.value('#password_secret', 'Password1')
      .end();
  },
  'Backspace pressed in middle of string removes a single character' : function (browser) {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('#password', 1000)
      .sendKeys('#password', 'Password1')
      .sendKeys(
        '#password',
        browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW + browser.Keys.LEFT_ARROW
      )
      .sendKeys('#password', browser.Keys.BACK_SPACE)
      .assert.value('#password_secret', 'Passwrd1')
      .assert.value('#password', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .end();
  },
  'Backspace pressed while selecting a number of characters will remove selected characters' : function (browser) {
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
      .sendKeys('#password', browser.Keys.BACK_SPACE)
      .assert.value('#password_secret', 'Pasrd1')
      .assert.value('#password', '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF')
      .end();
  }
};
