/* global YourApp */
'use strict';

// for node CommonJS
// import foo from '../dist/cmj/foo';
// import  * as assert from 'power-assert';

import foo from '../src/foo';

describe('test', function() {
  it('foo?',function(){
    assert(YourApp != null);
  });
  it('foo!',function(){
    assert(foo() == 'bar!');
  });
});
