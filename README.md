ES6 project skeleton
====================

亀板 ( _Kameita_ ) は陶芸の道具です。粘土をのせたり回ったりします。

## Getting Started

```
git clone https://github.com/ahomu/es6-Kameita.git ./your-project
cd ./your-project
npm install
```

If you have not yet installed a `gulp` globally, please run `npm install -g gulp`.

### Convert the es6 files into es5 compat files, and browserifying

```
npm run build
```

### Run tests for development (auto re-run when file changed)

```
npm run devel
```

### Run tests for ci

```
npm test
# or npm run test
```

### for Node modules

Initial setting is for browser, please following steps if you want to use in the Node module.

1. Remove the comment escape in Gulpfile.js, to set for node setting. 
2. `testem.node.json` rename to `testem.json`
3. import your files from `../dist/cmj/*.js` in the test code.

## Using libraries

- [6to5/6to5](https://github.com/6to5/6to5)
- [substack/node-browserify](https://github.com/substack/node-browserify)
- [airportyh/testem](https://github.com/airportyh/testem)
- [mochajs/mocha](https://github.com/mochajs/mocha)
- [twada/power-assert](https://github.com/twada/power-assert)
- [cjohansen/Sinon.JS](https://github.com/cjohansen/Sinon.JS)

## ToDo

- add CI service configuration (Travis, Circle, etc)
