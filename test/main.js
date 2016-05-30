"use strict";

let replacePlugin = require('../');
let fs = require('fs');
let path = require('path');
let es = require('event-stream');
let should = require('should');
let gutil = require('gulp-util');
require('mocha');

let replaceThisString = [
  ['world','person'],
  ['old','weird'],
  ['new','funky'],
  ['kind','lovely'],
  ['cruel','amazing']
];

let replaceThisRegexp = [
  [/world/g,'person'],
  [/old/g,'weird'],
  [/new/g,'funky'],
  [/kind/g,'lovely'],
  [/cruel/g,'amazing']
];

let replaceThisAltRegexp = [
  [new RegExp('world', 'g'), 'person'],
  [new RegExp('old', 'g'), 'weird'],
  [new RegExp('new', 'g'), 'funky'],
  [new RegExp('kind', 'g'), 'lovely'],
  [new RegExp('cruel', 'g'), 'amazing']
]

let replaceThisMixed = [
  [/world/g,'person'],
  ['old','weird'],
  [/new/g,'funky'],
  ['kind','lovely'],
  [/cruel/g,'amazing']
];

let makeFile = function(contents) {
  return new gutil.File({
    path: 'test/file.txt',
    cwd: 'test/',
    base: 'test/',
    contents: contents
  });
};

describe('gulp-batch-replace', function() {
  describe('replacePlugin()', function() {
    it('should replace string with string on a stream', function(done) {
      let file = new gutil.File({
        path: 'test/fixtures/helloworld.txt',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.createReadStream('test/fixtures/helloworld.txt')
      });

      let stream = replacePlugin(replaceThisString);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        newFile.contents.pipe(es.wait(function(err, data) {
          should.not.exist(err);
          String(data).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
          done();
        }));
      });

      stream.write(file);
      stream.end();
    });

    it('should replace regex with string on a stream', function(done) {
      let file = new gutil.File({
        path: 'test/fixtures/helloworld.txt',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.createReadStream('test/fixtures/helloworld.txt')
      });

      let stream = replacePlugin(replaceThisRegexp);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        newFile.contents.pipe(es.wait(function(err, data) {
          should.not.exist(err);
          String(data).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
          done();
        }));
      });

      stream.write(file);
      stream.end();
    });

    it('should replace alt-regex with string on a stream', function(done) {
      let file = new gutil.File({
        path: 'test/fixtures/helloworld.txt',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.createReadStream('test/fixtures/helloworld.txt')
      });

      let stream = replacePlugin(replaceThisAltRegexp);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        newFile.contents.pipe(es.wait(function(err, data) {
          should.not.exist(err);
          String(data).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
          done();
        }));
      });

      stream.write(file);
      stream.end();
    });

    it('should replace string with string on a buffer', function(done) {
      let file = new gutil.File({
        path: 'test/fixtures/helloworld.txt',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.readFileSync('test/fixtures/helloworld.txt')
      });

      let stream = replacePlugin(replaceThisString);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
        done();
      });

      stream.write(file);
      stream.end();
    });

    it('should replace regex with string on a buffer', function(done) {
      let file = new gutil.File({
        path: 'test/fixtures/helloworld.txt',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.readFileSync('test/fixtures/helloworld.txt')
      });

      let stream = replacePlugin(replaceThisRegexp);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
        done();
      });

      stream.write(file);
      stream.end();
    });

    it('should replace mixed search types on a buffer', function(done) {
      let file = new gutil.File({
        path: 'test/fixtures/helloworld.txt',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.readFileSync('test/fixtures/helloworld.txt')
      });

      let stream = replacePlugin(replaceThisMixed);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        console.log(String(newFile.contents));

        String(newFile.contents).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
        done();
      });

      stream.write(file);
      stream.end();
    });

    it('should replace mixed search types on a stream', function(done) {
      let file = new gutil.File({
        path: 'test/fixtures/helloworld.txt',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.createReadStream('test/fixtures/helloworld.txt')
      });

      let stream = replacePlugin(replaceThisMixed);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        newFile.contents.pipe(es.wait(function(err, data) {
          should.not.exist(err);
          String(data).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
          done();
        }));
      });

      stream.write(file);
      stream.end();
    });

  });
});
