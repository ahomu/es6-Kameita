'use strict';

import assert from 'power-assert';
import sinon from 'sinon';

import foo from '../src/foo';

describe('test', function() {
  it('foo?', function() {
    assert(es6kameita != null);
  });
  it('foo!', function() {
    assert(foo() == 'bar!');
  });
});
