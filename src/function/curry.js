import arity from './arity';
import isFunction from '../object/isFunction';
import isNumber from '../object/isNumber';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * TODO
 *
 * @name wrapCurry
 * @api private
 * @param fn
 * @param remainingArity
 * @param previousArgs
 * @return {undefined}
 */
let wrapCurry = function wrapCurry(fn, remainingArity, previousArgs) {
  let wrapped = arity(remainingArity, function(...newArgs) {
    let newArity = remainingArity - newArgs.length;
    let args = previousArgs.concat(newArgs);

    if (newArity > 0) {
      return wrapCurry(fn, newArity, args);
    }

    return fn.apply(this, args);
  });

  // Add a flag to the returned function indicating that this function is curried
  return Object.defineProperty(wrapped, '_curried', { value: true });
};

/**
 * Accepts a function `fn` and returns a new function that, when invoked, will repeatedly return a
 * new wrapper function until all expected arguments have been provided.
 *
 * @name curry
 * @api public
 * @category Function
 * @param {Function} fn The function to wrap.
 * @param {number} [fnArity=fn.length] The optional desired arity of the return function.
 * @return {Function} A curried function that, when invoked, will return either a new curried
 * function (if not all expected arguments have been provided), or the result of calling `fn`.
 * @example
 * var addThreeItems = function(a, b, c) { return a + b + c; };
 * var curriedAddThreeItems = curry(addThreeItems);
 * curriedAddThreeItems(2)(3)(4);
 * //=> 9
 *
 * var curriedReduce = curry(reduce);
 * var add = function(a, b) { return a + b; };
 * var sumArray = curriedReduce(add, 0);
 * sumArray([1, 2, 3]);
 * //=> 6
 */
let curry = function curry(fn, fnArity) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  fnArity = isNumber(fnArity) ? fnArity : fn.length;

  return wrapCurry(fn, fnArity, []);
};

export default curry;
