Xml Pretty Print
================

This is quick and dirty Xml Pretty Printer

Description:
------------

    <a>This is a sample</a><b>This is a second element</b>

will get converted to

    <a>
      This is a sample
    </a>
    <b>
      This is a second element
    </b>

Usage
-----

    var prettify = require('./xml-prettify').prettify;
    
    // Single line
    var output = prettify('<a>This is a sample</a>');
    console.log(output);
    
    // A whole file
    var output = prettify(require('fs').readFileSync('sample.xml'))
    require('fs').writeFileSync('sample.pretty.xml', output);


Options:
--------

prettify.TAB: the string equivalent of a single indent

To set tabs for indentation:
    
    var prettify = require('./xml-prettify').prettify
    prettify.TAB = '\t'
    prettify('<a>This is a sample</a>')

To set 2 spaces for indentation:
    
    var prettify = require('./xml-prettify').prettify
    prettify.TAB = '  '
    prettify('<a>This is a sample</a>')

prettify.WARN: should a warning message be printed to the console if xml input is malformed


