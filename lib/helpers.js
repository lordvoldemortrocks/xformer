'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSomething = exports.isNothing = exports.logger = exports.getFirstMatch = exports.reduceIndexed = exports.mapIndexed = exports.zipValueWithStep = exports.sumList = exports.sum = exports.typeMatches = exports.bePositive = exports.defaultToZero = exports.isJunk = undefined;

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @param  {number} input
 * @returns {number}
 */
const isJunk = exports.isJunk = R.pipe(parseFloat, R.anyPass([R.equals(NaN), R.equals(Infinity), R.equals(-Infinity)]));
/**
 * @param  {number} input
 * @returns {number}
 */
/*
  This file contains the smaller utilities and helpers that are used in the xFormer command pallete functions and parser.
*/

const defaultToZero = exports.defaultToZero = R.ifElse(isJunk, R.always(0), parseFloat);

/**
 * @param  {number} input
 * @returns {number}
 */
const bePositive = exports.bePositive = R.pipe(defaultToZero, Math.abs);

// /**
//  * @param  {Object} input
//  * @returns {Object}
//  */
// export const xFormerForChart = R.evolve({
//   x: parseInt,
//   y: R.pipe(
//     defaultToZero,
//     bePositive
//   )
// });

/**
 * @param  {string} typeToBe
 * @param  {any} input
 * @returns {boolean}
 */
const typeMatches = exports.typeMatches = R.curry((typeToBe, input) => R.pipe(R.type, R.toLower, R.equals(R.toLower(typeToBe)))(input));

/**
 * @param  {number} left
 * @param  {number} right
 * @returns {Object}
 */
const sum = exports.sum = R.curry((left, right) => R.add(defaultToZero(left), defaultToZero(right)));

/**
 * @param  {Array<number>} data
 * @returns {number}
 */
const _sumList = R.reduce(sum, 0);

/**
 * @param  {Array<number> | Object} data
 * @returns {number}
 */
const sumList = exports.sumList = R.cond([[typeMatches('object'), R.pipe(R.values, _sumList)], [typeMatches('array'), _sumList], [typeMatches('number'), R.identity], [typeMatches('string'), defaultToZero], [R.T, R.always(0)]]);

/**
 * @param  {string} step
 * @param  {any} data
 * @returns {Object}
 */
const zipValueWithStep = exports.zipValueWithStep = R.curry((step, data) => ({
  [step]: data
}));

/**
 * @param  {Function} fn(value, index)
 * @param  {Array<any>} data
 * @returns {Array<any>}
 */
const mapIndexed = exports.mapIndexed = R.addIndex(R.map);

/**
 * @param  {Function} fn
 * @param  {Array<any>} data
 * @returns {Array<any>}
 */
const reduceIndexed = exports.reduceIndexed = R.addIndex(R.reduce);

/**
 * @param  {string} regex
 * @param  {string} input
 * @returns {string}
 */
const getFirstMatch = exports.getFirstMatch = R.curry((regex, input) => R.pipe(R.match(new RegExp(regex)), R.pathOr('', [0]))(input));

/**
 * @param  {string} lbl
 * @param  {any} data
 * @returns {any}
 */
const logger = exports.logger = R.curry((lbl, data) => R.tap(x => console.log(`${lbl}:`, x), data));

/**
 * @param  {any} input
 * @returns {boolean}
 */
const isNothing = exports.isNothing = R.either(R.isEmpty, R.isNil);

/**
 * @param  {any} input
 * @returns {boolean}
 */
const isSomething = exports.isSomething = R.complement(isNothing);