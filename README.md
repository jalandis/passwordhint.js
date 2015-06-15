# passwordhint.js

Mobile style password hints.

## Features
 - Type characters displayed for n seconds before being obscured
 - Backspace destroys previous character
 - Delete destroys next character
 - Backspace and delete both destroy any highlighted selection
 - Tab moves off field
 - Left, Right, Up, Down arrows => Left one character, right one character, start of string, end of string
 - alt/ctrl keys are ignored

## Build
Local gulp build tool.

```node_modules/gulp/bin/gulp.js ```

Gulp Tasks:
 * nightwatch:firefox
 * watch
 * compress


## TODO
 - Automated Testing (nightwatch)
   - Separate DOM manipulation
 - Mobile Testing
   - Chrome
   - IPhone
 - Browser Testing
   - Current Chrome
   - Current FF
   - IE9, IE10, IE11
   - Edge
   - Safari
 - Allow use of browser saved credentials

## Testing
This library has been inadequately tested.  All scenarios have been run manually on whatever resources were available during development.

```node_modules/gulp/bin/gulp.js nightwatch --browser [chrome|firefox]```
