(function () {

exports.prettify = prettify

function parse(xmlStr)
{
  var stdOp = /<(\w+)[^>]*?>/m,
      stdCl = /<\/[^>]*>/m,
      sngEl = /<[^>]*\/>/m;
  
  var indent = 0,
      tags = [],
      processing = "",
      currIdx = 0,
      output = [];
  
  while (currIdx < xmlStr.length)
  {
    processing += xmlStr[currIdx];
    
    // The 2nd check prevents singularElements from passing as standardOpening elements.
    // The check for '/' would not have been necessary with a negative lookbehind expression
    // but Javascript does not support it, and this feels like the easiest way of doing this
    // check.
    if (stdOp.test(processing) && processing[processing.length - 2] != '/')
    {
      var matches = stdOp.exec(processing);
      var match = matches[0];
      var tag = matches[1];
      var offset = processing.length - match.length;
      var preContent = processing.substring(0, offset);
      
      addLine(output, preContent, indent);
      addLine(output, match, indent);
      
      tags.push(tag);
      indent += 1;
      processing = "";
    }
    else if (stdCl.test(processing))
    {
      var matches = stdCl.exec(processing);
      var match = matches[0];
      var tag = matches[1];
      var offset = processing.length - match.length;
      var preContent = processing.substring(0, offset);
      
      addLine(output, preContent, indent);
      
      if (tags[tags.length] == tag)
      {
        tags.pop();
        indent -= 1;
      }
      
      addLine(output, match, indent);
      processing = "";
    }
    else if (sngEl.test(processing))
    {
      var matches = sngEl.exec(processing);
      var match = matches[0];
      var tag = matches[1];
      var offset = processing.length - match.length;
      var preContent = processing.substring(0, offset);
      
      addLine(output, preContent, indent);
      addLine(output, match, indent);
      processing = "";
    }
    
    currIdx += 1;
  }
  
  if (tags.length)
  {
    console.log('WARNING: xmlFile may be malformed. Not all opening tags were closed. Following tags were left open:');
    console.log(tags);
  }
  
  return output;
}

function trim(str)
{
  return str.replace(/^\s+|\s+$/,"");
}

function addLine(output, content, indent)
{
  var result = "";
  content = trim(content);
  
  if (content)
  {
    while (indent--)
    {
      result += prettify.TAB;
    }
    
    result += content;
    output.push(result);
  }
  
  return result;
}

function prettify(xmlStr)
{
  prettify.TAB = prettify.TAB || '\t';
  return parse(xmlStr).join('\n');
}

}())
