var PasswordHint = function(field, options) {
  this.passwordField = field;
  this.hiddenPassword = field.cloneNode(true);
  this.intervalId = null;

  this.obscureCharacter = options && options.hasOwnProperty('obscureCharacter') ? options.obscureCharacter : '\u25CF';
  this.delay = options && options.hasOwnProperty('delay') ? options.delay : 1000;
};

PasswordHint.prototype.replaceCharacters = function (string, place, length, replacement) {
  return string.slice(0, place) + replacement + string.slice(place + length);
};

PasswordHint.prototype.deletePreviousCharacter = function (string, place) {
  return (place == 0) ? string : this.replaceCharacters(string, place - 1, 1, '');
};

PasswordHint.prototype.deleteNextCharacter = function (string, place) {
  return this.replaceCharacters(string, place, 1, '');
};

PasswordHint.prototype.deleteSelection = function (string, place, length) {
  return this.replaceCharacters(string, place, length, '');
};

PasswordHint.prototype.generateStars = function (string) {
  return Array(string.length + 1).join(this.obscureCharacter);
};

PasswordHint.prototype.islibSupported = function () {
  return typeof window.matchMedia === 'function' && typeof this.passwordField.setSelectionRange === 'function';
};

PasswordHint.prototype.isMobileDevice = function () {
  return window.matchMedia('only screen and (max-width: 760px)').matches;
};

PasswordHint.prototype.hidePassword = function() {
  var start = this.passwordField.selectionStart,
      end = this.passwordField.selectionEnd;

  this.passwordField.value = this.generateStars(this.hiddenPassword.value);
  this.passwordField.setSelectionRange(start, end);
  this.intervalId = null;
};

PasswordHint.prototype.ignoreCharacter = function(charCode) {
  return charCode == 0;
};

PasswordHint.prototype.handleKeypress = function (keypress) {

  if (keypress.which == 0) {
    return;
  }

  keypress.preventDefault();
  if (this.intervalId) {
    clearTimeout(this.intervalId);
  }

  var caretPosition = this.passwordField.selectionStart,
      selectionSize = this.passwordField.selectionEnd - this.passwordField.selectionStart,
      character = String.fromCharCode(keypress.which);

  this.hiddenPassword.value = this.replaceCharacters(this.hiddenPassword.value, caretPosition, selectionSize, character);
  this.passwordField.value = this.replaceCharacters(this.generateStars(this.hiddenPassword.value), caretPosition, 1, character);
  this.passwordField.setSelectionRange(caretPosition + 1, caretPosition + 1);

  this.intervalId = setTimeout(this.hidePassword.bind(this), this.delay);
};

PasswordHint.prototype.handleKeydown = function (keydown) {

  if (keydown.which == 8 || keydown.which == 46) {
    keydown.preventDefault();
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }

    var selectionSize = this.passwordField.selectionEnd - this.passwordField.selectionStart,
        caretPosition = this.passwordField.selectionStart;

    // Delete highlighted or single character
    if (selectionSize != 0) {
      this.hiddenPassword.value = this.deleteSelection(this.hiddenPassword.value, caretPosition, selectionSize);
    } else if (keydown.which == 46) {
      this.hiddenPassword.value = this.deleteNextCharacter(this.hiddenPassword.value, caretPosition);
    } else {
      this.hiddenPassword.value = this.deletePreviousCharacter(this.hiddenPassword.value, caretPosition);
      caretPosition--;
    }
    this.passwordField.value = this.generateStars(this.hiddenPassword.value);
    this.passwordField.setSelectionRange(caretPosition, caretPosition);
  }
};

PasswordHint.prototype.startHinting = function () {
  if (!this.islibSupported() || this.isMobileDevice()) {
      return;
  }

  this.hiddenPassword.id = this.passwordField.id + '_secret';
  this.hiddenPassword.className += ' hide';
  this.passwordField.type = 'text';

  this.passwordField.parentNode.appendChild(this.hiddenPassword);

  this.passwordField.onkeypress = this.handleKeypress.bind(this);;
  this.passwordField.onkeydown = this.handleKeydown.bind(this);;
};
