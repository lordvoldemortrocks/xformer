/*
  This file contains the smaller utilities and helpers that are used in the xFormer command pallete functions and parser.
*/

import * as R from 'ramda';

/**
 * @param  {number} input
 * @returns {number}
 */
export const isJunk = R.pipe(
  parseFloat,
  R.anyPass([R.equals(NaN), R.equals(Infinity), R.equals(-Infinity)])
);
/**
 * @param  {number} input
 * @returns {number}
 */
export const defaultToZero = R.ifElse(isJunk, R.always(0), parseFloat);

/**
 * @param  {number} input
 * @returns {number}
 */
export const bePositive = R.pipe(
  defaultToZero,
  Math.abs
);

// /**
//  * @param  {Object} input
//  * @returns {Object}
//  */
// export const xformForChart = R.evolve({
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
export const typeMatches = R.curry((typeToBe, input) =>
  R.pipe(
    R.type,
    R.toLower,
    R.equals(R.toLower(typeToBe))
  )(input)
);

/**
 * @param  {number} left
 * @param  {number} right
 * @returns {Object}
 */
export const sum = R.curry((left, right) => R.add(defaultToZero(left), defaultToZero(right)));

/**
 * @param  {Array<number>} data
 * @returns {number}
 */
const _sumList = R.reduce(sum, 0);

/**
 * @param  {Array<number> | Object} data
 * @returns {number}
 */
export const sumList = R.cond([
  [
    typeMatches('object'),
    R.pipe(
      R.values,
      _sumList
    )
  ],
  [typeMatches('array'), _sumList],
  [typeMatches('number'), R.identity],
  [typeMatches('string'), defaultToZero],
  [R.T, R.always(0)]
]);

/**
 * @param  {string} step
 * @param  {any} data
 * @returns {Object}
 */
export const zipValueWithStep = (step, data) => ({
  [step]: data
});

/**
 * @param  {Function} fn(value, index)
 * @param  {Array<any>} data
 * @returns {Array<any>}
 */
export const mapIndexed = R.addIndex(R.map);

/**
 * @param  {Function} fn
 * @param  {Array<any>} data
 * @returns {Array<any>}
 */
export const reduceIndexed = R.addIndex(R.reduce);

/**
 * @param  {string} regex
 * @param  {string} input
 * @returns {string}
 */
export const getFirstMatch = R.curry((regex, input) =>
  R.pipe(
    R.match(new RegExp(regex)),
    R.pathOr('', [0])
  )(input)
);

/**
 * @param  {string} lbl
 * @param  {any} data
 * @returns {any}
 */
export const logger = R.curry((lbl, data) => R.tap(x => console.log(`${lbl}:`, x), data));

/**
 * @param  {any} input
 * @returns {boolean}
 */
export const isNothing = R.either(R.isEmpty, R.isNil);

/**
 * @param  {any} input
 * @returns {boolean}
 */
export const isSomething = R.complement(isNothing);