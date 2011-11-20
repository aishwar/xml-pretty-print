var prettify = require('./xml-prettify').prettify,
    fs = require('fs'),
    output = null;

// Change indentation style
prettify.TAB = '  ';

// Single line
output = prettify('<a>This is a sample</a>');
console.log(output);

// A whole file
output = prettify(fs.readFileSync('sample.xml').toString())
fs.writeFileSync('sample.pretty.xml', output);

// A whole file
output = prettify(fs.readFileSync('sample2.xml').toString())
fs.writeFileSync('sample2.pretty.xml', output);


// Invalid XML file. Should print a warning to the console after conversion.
output = prettify(fs.readFileSync('sample3.xml').toString())
fs.writeFileSync('sample3.pretty.xml', output);


