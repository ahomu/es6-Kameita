'use strict';

/**
 * if you want to using `to5Runtime`
 * @see https://6to5.org/optional-runtime.html
 */
require('6to5/runtime'); // Using the "require" to avoid call "to5Runtime.interopRequire()"

/**
 * if using a feature that requires a browser-polyfill
 * @see https://6to5.org/polyfill.html
 */
import polyfill from '6to5/browser-polyfill';

// your project module...
import foo from './src/foo';
