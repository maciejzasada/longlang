#!/usr/bin/env node

var path = require('path'),
    fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2)),
    longlang = require('./lib/longlang.js'),
    cwd = process.cwd();

function usage () {
    console.log('Usage:', process.argv[0], process.argv[1], 'input.json [--scale=2] [--output=file.json]');
}

if (argv._.length !== 1) {
    return usage();
}

longlang(path.resolve(cwd, argv._[0]), argv, function (result) {
    var outputPath = path.resolve(cwd, argv.output || 'longlang.json');
    fs.writeFile(outputPath, JSON.stringify(result, null, 4), function (error) {
        if (error) {
            return console.log(error);
        }
        console.log('Output saved to', outputPath);
    });
});
