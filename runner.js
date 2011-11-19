var prettify = require('./xml-prettify').prettify,
    fs = require('fs'),
    output = null;

// Change indentation style
prettify.TAB = '  ';

// Single line
output = prettify('<a>This is a sample</a>');
console.log(output);

// A whole file
output = prettify(fs.readFileSync('sample2.xml').toString())
fs.writeFileSync('sample2.pretty.xml', output);


