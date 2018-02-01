"use strict";

var replacePlugin = require('../');
var fs = require('fs');
var path = require('path');
var es = require('event-stream');
var should = require('should');
var gutil = require('gulp-util');
var capture = require('capture-stream');
require('mocha');

var replaceThisString = [
    ['world','person'],
    ['old','weird'],
    ['new','funky'],
    ['kind','lovely'],
    ['cruel','amazing']
];

var replaceThisRegexp = [
    [/world/g,'person'],
    [/old/g,'weird'],
    [/new/g,'funky'],
    [/kind/g,'lovely'],
    [/cruel/g,'amazing']
];

var replaceThisAltRegexp = [
    [new RegExp('world', 'g'), 'person'],
    [new RegExp('old', 'g'), 'weird'],
    [new RegExp('new', 'g'), 'funky'],
    [new RegExp('kind', 'g'), 'lovely'],
    [new RegExp('cruel', 'g'), 'amazing']
];

var replaceThisMixed = [
    [/world/g,'person'],
    ['old','weird'],
    [/new/g,'funky'],
    ['kind','lovely'],
    [/cruel/g,'amazing']
];

var makeFile = function(contents) {
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
            var file = new gutil.File({
                path: 'test/fixtures/helloworld.txt',
                cwd: 'test/',
                base: 'test/fixtures',
                contents: fs.createReadStream('test/fixtures/helloworld.txt')
            });

            var stream = replacePlugin(replaceThisString);
            stream.on('data', function(newFile) {
                should.exist(newFile);
                should.exist(newFile.contents);

                var restore = capture(process.stdout);

                newFile.contents.pipe(es.wait(function(err, data) {
                    should.not.exist(err);
                    var output = restore();
                    output.length.should.be.within(replaceThisString.length, output.length);
                    String(data).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
                    done();
                }));
            });

            stream.write(file);
            stream.end();
        });

        it('should replace regex with string on a stream', function(done) {
            var file = new gutil.File({
                path: 'test/fixtures/helloworld.txt',
                cwd: 'test/',
                base: 'test/fixtures',
                contents: fs.createReadStream('test/fixtures/helloworld.txt')
            });

            var stream = replacePlugin(replaceThisRegexp);
            stream.on('data', function(newFile) {
                should.exist(newFile);
                should.exist(newFile.contents);

                var restore = capture(process.stdout);

                newFile.contents.pipe(es.wait(function(err, data) {
                    should.not.exist(err);
                    var output = restore();
                    output.length.should.be.within(replaceThisString.length, output.length);
                    String(data).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
                    done();
                }));
            });

            stream.write(file);
            stream.end();
        });

        it('should replace alt-regex with string on a stream', function(done) {
            var file = new gutil.File({
                path: 'test/fixtures/helloworld.txt',
                cwd: 'test/',
                base: 'test/fixtures',
                contents: fs.createReadStream('test/fixtures/helloworld.txt')
            });

            var stream = replacePlugin(replaceThisAltRegexp);
            stream.on('data', function(newFile) {
                should.exist(newFile);
                should.exist(newFile.contents);

                var restore = capture(process.stdout);

                newFile.contents.pipe(es.wait(function(err, data) {
                    should.not.exist(err);
                    var output = restore();
                    output.length.should.be.within(replaceThisString.length, output.length);
                    String(data).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
                    done();
                }));
            });

            stream.write(file);
            stream.end();
        });

        it('should replace string with string on a buffer', function(done) {
            var file = new gutil.File({
                path: 'test/fixtures/helloworld.txt',
                cwd: 'test/',
                base: 'test/fixtures',
                contents: fs.readFileSync('test/fixtures/helloworld.txt')
            });

            var stream = replacePlugin(replaceThisString);
            var restore = capture(process.stdout);

            stream.on('data', function(newFile) {
                should.exist(newFile);
                should.exist(newFile.contents);

                var output = restore();
                output.length.should.be.within(replaceThisString.length, output.length);

                String(newFile.contents).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
                done();
            });

            stream.write(file);
            stream.end();
        });

        it('should replace regex with string on a buffer', function(done) {
            var file = new gutil.File({
                path: 'test/fixtures/helloworld.txt',
                cwd: 'test/',
                base: 'test/fixtures',
                contents: fs.readFileSync('test/fixtures/helloworld.txt')
            });

            var stream = replacePlugin(replaceThisRegexp);
            var restore = capture(process.stdout);

            stream.on('data', function(newFile) {
                should.exist(newFile);
                should.exist(newFile.contents);

                var output = restore();
                output.length.should.be.within(replaceThisString.length, output.length);

                String(newFile.contents).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
                done();
            });

            stream.write(file);
            stream.end();
        });

        it('should replace mixed search types on a buffer', function(done) {
            var file = new gutil.File({
                path: 'test/fixtures/helloworld.txt',
                cwd: 'test/',
                base: 'test/fixtures',
                contents: fs.readFileSync('test/fixtures/helloworld.txt')
            });

            var stream = replacePlugin(replaceThisMixed);
            var restore = capture(process.stdout);

            stream.on('data', function(newFile) {
                should.exist(newFile);
                should.exist(newFile.contents);

                var output = restore();
                output.length.should.be.within(replaceThisString.length, output.length);

                String(newFile.contents).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
                done();
            });

            stream.write(file);
            stream.end();
        });

        it('should replace mixed search types on a stream', function(done) {
            var file = new gutil.File({
                path: 'test/fixtures/helloworld.txt',
                cwd: 'test/',
                base: 'test/fixtures',
                contents: fs.createReadStream('test/fixtures/helloworld.txt')
            });

            var stream = replacePlugin(replaceThisMixed);
            stream.on('data', function(newFile) {
                should.exist(newFile);
                should.exist(newFile.contents);

                var restore = capture(process.stdout);

                newFile.contents.pipe(es.wait(function(err, data) {
                    should.not.exist(err);
                    var output = restore();
                    output.length.should.be.within(replaceThisString.length, output.length);
                    String(data).should.equal(fs.readFileSync('test/expected/helloworld.txt', 'utf8'));
                    done();
                }));
            });

            stream.write(file);
            stream.end();
        });

    });
});