import {
  and as andImpl,
  or as orImpl,
  not as notImpl,
} from './impl';

function generateLogicalOp(fn) {
  function logicalOp(rules) {
    return fn.bind(null, rules);
  }

  return logicalOp;
}

const or = generateLogicalOp(orImpl);
const and = generateLogicalOp(andImpl);
const not = generateLogicalOp(notImpl);

export {
  or,
  and,
  not,
};
