/*jslint browser: true*/
/*global window*/

var PasswordHint = {};

(function (window) {
    'use strict';

    PasswordHint.defaultOptions = {
        blob: '\u25CF',
        delay: 1000
    };

    PasswordHint.keyCodes = {
        enter: 13,
        delete: 46,
        backspace: 8,
        capslock: 20
    };

    PasswordHint.options = {};

    PasswordHint.replaceCharacters = function (string, index, length, replacement) {
        if (index < 0) {
            throw new Error('Index less than zero');
        }
        return string.slice(0, index) + replacement + string.slice(index + length);
    };

    PasswordHint.deletePreviousCharacter = function (string, index) {
        return (index === 0)
            ? string
            : PasswordHint.replaceCharacters(string, index - 1, 1, '');
    };

    PasswordHint.deleteNextCharacter = function (string, place) {
        return PasswordHint.replaceCharacters(string, place, 1, '');
    };

    PasswordHint.deleteSelection = function (string, place, length) {
        return PasswordHint.replaceCharacters(string, place, length, '');
    };

    PasswordHint.generateObscuredPassword = function (string, blob) {
        return Array(string.length + 1).join(blob);
    };

    PasswordHint.islibSupported = function (field) {
        return typeof window.matchMedia === 'function' && typeof field.setSelectionRange === 'function';
    };

    PasswordHint.isMobileDevice = function () {
        return window.matchMedia('only screen and (max-width: 760px)').matches;
    };

    PasswordHint.ignoreCharacter = function (event) {
        return event.which === 0 || event.which === PasswordHint.keyCodes.enter
          || event.ctrlKey || event.altKey || event.which === PasswordHint.keyCodes.backspace;
    };

    PasswordHint.getOption = function (options, property, defaultOption) {
        return options && options.hasOwnProperty(property)
            ? options[property]
            : defaultOption;
    };

    PasswordHint.hidePassword = function (passwordField, hiddenPassword, blob) {
        var start = passwordField.selectionStart,
            end = passwordField.selectionEnd;

        passwordField.value = PasswordHint.generateObscuredPassword(hiddenPassword.value, blob);
        passwordField.setSelectionRange(start, end);
    };

    PasswordHint.isCapslockOn = function (keypress) {
        var character = String.fromCharCode(keypress.which);

        if (character.toUpperCase() === character && character.toLowerCase() !== character && !keypress.shiftKey) {
            return true;
        }
        if (character.toLowerCase() === character && character.toUpperCase() !== character && keypress.shiftKey) {
            return true;
        }

        return false;
    };

    PasswordHint.handleKeypress = function (keypress) {
        if (PasswordHint.ignoreCharacter(keypress)) {
            return;
        }

        var passwordField = keypress.target,
            hiddenPassword = document.getElementById(passwordField.id + '_secret'),
            caretPosition = passwordField.selectionStart,
            selectionSize = passwordField.selectionEnd - passwordField.selectionStart,
            character = String.fromCharCode(keypress.which);

        keypress.preventDefault();
        clearTimeout(PasswordHint.options[passwordField.id].intervalId);

        hiddenPassword.value = PasswordHint.replaceCharacters(
            hiddenPassword.value,
            caretPosition,
            selectionSize,
            character
        );
        passwordField.value = PasswordHint.replaceCharacters(
            PasswordHint.generateObscuredPassword(hiddenPassword.value, PasswordHint.options[passwordField.id].blob),
            caretPosition,
            1,
            character
        );
        passwordField.setSelectionRange(caretPosition + 1, caretPosition + 1);

        PasswordHint.options[passwordField.id].intervalId = setTimeout(
            PasswordHint.hidePassword.bind(
                {},
                passwordField,
                hiddenPassword,
                PasswordHint.options[passwordField.id].blob
            ),
            PasswordHint.options[passwordField.id].delay
        );
    };

    PasswordHint.handleKeydown = function (keydown) {
        if (keydown.which === PasswordHint.keyCodes.backspace || keydown.which === PasswordHint.keyCodes.delete) {
            var passwordField = keydown.target,
                hiddenPassword = document.getElementById(passwordField.id + '_secret'),
                caretPosition = passwordField.selectionStart,
                selectionSize = passwordField.selectionEnd - passwordField.selectionStart;

            keydown.preventDefault();
            clearTimeout(PasswordHint.options[passwordField.id].intervalId);

            // Delete highlighted or single character
            if (selectionSize !== 0) {
                hiddenPassword.value = PasswordHint.deleteSelection(hiddenPassword.value, caretPosition, selectionSize);
            } else if (keydown.which === PasswordHint.keyCodes.delete) {
                hiddenPassword.value = PasswordHint.deleteNextCharacter(hiddenPassword.value, caretPosition);
            } else {
                hiddenPassword.value = PasswordHint.deletePreviousCharacter(hiddenPassword.value, caretPosition);
                caretPosition = caretPosition - 1;
            }
            passwordField.value = PasswordHint.generateObscuredPassword(
                hiddenPassword.value,
                PasswordHint.options[passwordField.id].blob
            );
            passwordField.setSelectionRange(caretPosition, caretPosition);
        }
    };

    PasswordHint.startHinting = function (passwordField, options) {
        if (!PasswordHint.islibSupported(passwordField) || PasswordHint.isMobileDevice()) {
            return;
        }

        if (PasswordHint.options.hasOwnProperty(passwordField.id)) {
            return;
        }

        var hiddenPassword = passwordField.cloneNode(true);

        PasswordHint.options[passwordField.id] = {
            intervalId: null,
            blob: PasswordHint.getOption(options, 'blob', PasswordHint.defaultOptions.blob),
            delay: PasswordHint.getOption(options, 'delay', PasswordHint.defaultOptions.delay)
        };

        hiddenPassword.id = passwordField.id + '_secret';
        hiddenPassword.style.display = 'none';
        passwordField.type = 'text';

        passwordField.parentNode.appendChild(hiddenPassword);

        passwordField.onkeypress = PasswordHint.handleKeypress;
        passwordField.onkeydown = PasswordHint.handleKeydown;
    };

    PasswordHint.capsLockWarning = function (message) {
        window.onkeypress = function (keypress) {
            message.style.display = PasswordHint.isCapslockOn(keypress)
                ? ''
                : 'none';
        };
    };

}(window || {}));
