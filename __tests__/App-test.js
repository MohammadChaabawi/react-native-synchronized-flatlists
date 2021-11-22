/**
 * @format
 */

import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
function sum(a, b) {
  return a + b;
}
module.exports = sum;
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
