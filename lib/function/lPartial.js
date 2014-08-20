import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { arity } from '../function/arity';
import { isFunction } from '../object/isFunction';

export let lPartial = function lPartial(fn, ...partialArgs) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  if (!partialArgs.length) {
    return fn;
  }

  return arity(Math.max(fn.length - partialArgs.length, 0), function(...args) {
    return fn.apply(this, partialArgs.concat(args));
  });
};