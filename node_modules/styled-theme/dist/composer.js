'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Revert the palette
 * @example
 * reversePalette({ primary: ['red', 'yellow', 'green'] })
 * // { primary: ['green', 'yellow', 'red'] }
 */
var reversePalette = exports.reversePalette = function reversePalette(palette) {
  return Object.keys(palette).reduce(function (newPalette, key) {
    return _extends({}, newPalette, _defineProperty({}, key, [].concat(_toConsumableArray(palette[key])).reverse()));
  }, {});
};