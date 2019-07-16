'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.palette = exports.size = exports.font = exports.key = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _styledTools = require('styled-tools');

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the value of `props.theme[path]` or `styledTheme[path]`
 * @example
 * const Button = styled.button`
 *  font-family: ${key('fonts.primary')};
 *  color: ${key(['colors', 'primary', 0])};
 * `
 */
var key = exports.key = function key(path, defaultValue) {
  return function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _styledTools.prop)(path, (0, _styledTools.prop)(path, defaultValue)(_theme2.default))(props.theme);
  };
};

/**
 * Shorthand to `key(['fonts', path])`
 * @example
 * const Button = styled.button`
 *  font-family: ${font('primary')};
 * `
 */
var font = exports.font = function font(path, defaultValue) {
  return key(['fonts', path], defaultValue);
};

/**
 * Shorthand to `key(['sizes', path])`
 * @example
 * const Button = styled.button`
 *  padding: ${size('padding')};
 * `
 */
var size = exports.size = function size(path, defaultValue) {
  return key(['sizes', path], defaultValue);
};

/**
 * Returns the value of `props.theme[palette || reversePalette][path][index]` or
 * `styledTheme[palette || reversePalette][path][index]` (default theme)
 *
 * The arguments can be passed in any order, as long as types are kept.
 * @param {number} index The index of tone in theme palette tones array
 * @param {string} [path=props.palette] The key of the tones in theme palette object
 * @param {Object} [exceptions] An object with path as key and index as value
 * @param {boolean} [reverse] Flag to return tone from `reversePalette` or `palette`
 * @param {string} [defaultValue] Default value
 * @example
 * // index = 1
 * // exception = { grayscale: 0 }
 * // reverse = true
 * const Button = styled.button`
 *  background-color: ${palette({ grayscale: 0 }, 1, true)};
 * `
 *
 * // renders props.theme.reversePalette.grayscale[0]
 * <Button palette="grayscale" />
 *
 * // renders props.theme.palette.danger[1] (nullify reverse)
 * <Button palette="danger" reverse />
 * @returns {Tones}
 */
// eslint-disable-next-line flowtype-errors/show-errors
var palette = exports.palette = function palette() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var exceptions = args.find(function (arg) {
      return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object';
    }) || {};
    var path = args.find(function (arg) {
      return typeof arg === 'string';
    }) || props.palette;
    var defaultValue = [].concat(args).reverse().find(function (arg) {
      return typeof arg === 'string';
    });
    var index = args.find(function (arg) {
      return typeof arg === 'number';
    });
    var reverse = args.find(function (arg) {
      return typeof arg === 'boolean';
    });
    reverse = reverse ? !props.reverse : props.reverse;

    if (typeof index === 'undefined') {
      throw new Error('[palette] You must pass index');
    }
    if (typeof path === 'undefined') {
      throw new Error('[palette] You must pass palette path');
    }

    if (Object.keys(exceptions).indexOf(path) >= 0) {
      index = exceptions[path];
    }

    var palettePath = reverse ? 'reversePalette' : 'palette';
    return key([palettePath, path, index], defaultValue !== path && defaultValue)(props);
  };
};