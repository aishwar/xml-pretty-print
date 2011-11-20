var prettify = require('./xml-prettify').prettify,
    fs = require('fs'),
    assert = require('assert'),
    output = null,
    expected = null;

// Change indentation style
prettify.TAB = '  ';
prettify.WARN = true;

try
{
  // Single line
  output = prettify('<a>This is a sample</a>');
  expected = '<a>\n  This is a sample\n</a>';
  assert.equal(output, expected);

  // A whole file
  output = prettify(fs.readFileSync('sample.xml').toString())
  fs.writeFileSync('sample.pretty.xml', output);
  expected = fs.readFileSync('sample.pretty.expected').toString();
  assert.equal(output, expected);

  // A whole file
  output = prettify(fs.readFileSync('sample2.xml').toString())
  fs.writeFileSync('sample2.pretty.xml', output);
  expected = fs.readFileSync('sample2.pretty.expected').toString();
  assert.equal(output, expected);


  // Invalid XML file. Should print a warning to the console after conversion.
  output = prettify(fs.readFileSync('sample3.xml').toString())
  fs.writeFileSync('sample3.pretty.xml', output);
  expected = fs.readFileSync('sample3.pretty.expected').toString();
  assert.equal(output, expected);

  console.log('STATUS: All Tests passed');
}
catch (e)
{
  console.log('STATUS: Test failed!');
}
