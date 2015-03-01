ES6 project template for Browser and Node
====================

[![Licence](http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square)](https://npmjs.org/package/es6-kameita)
[![Version](http://img.shields.io/npm/v/es6-kameita.svg?style=flat-square)](https://npmjs.org/package/es6-kameita)

亀板 ( _Kameita_ ) は陶芸、ろくろの道具です。粘土をのせたりします。

## Getting Started

```
git clone https://github.com/ahomu/es6-Kameita.git ./your-project
cd ./your-project
rm -rf .git
npm install
```

## ES6 Compatibility

This template is dependent on [babel/babel](https://github.com/babel/babel). Please see [babel's document site](https://babeljs.io/). 

### Transpile the es6 files into es5 compat files, and browserifying

```
npm run build
```

### Bump version in package.json

```
npm run patch
npm run minor
npm run major
```

### Start watching src files & launch static `localhost:3000`

```
npm run watch
```

### Run tests by testem (auto re-run when file changed)

```
npm run testem
```

### Run tests for ci

```
npm test
# or npm run test
```

### for Node modules

Initial setting is for browser, please following steps if you want to use in the Node module.

1. Remove the comment in Gulpfile.js, to set for node setting.
2. `testem.node.json` rename to `testem.json`
3. Add `import assert from 'power-assert';` into test code.

## Using libraries

- [babel/babel](https://github.com/babel/babel)
- [substack/node-browserify](https://github.com/substack/node-browserify)
- [gulpjs/gulp](https://github.com/gulpjs/gulp/)
- [airportyh/testem](https://github.com/airportyh/testem)
- [mochajs/mocha](https://github.com/mochajs/mocha)
- [twada/power-assert](https://github.com/twada/power-assert)
- [cjohansen/Sinon.JS](https://github.com/cjohansen/Sinon.JS)

## ToDo

- register [Gemnasium](https://gemnasium.com/)
- add CI service configuration (Travis, Circle, etc)
