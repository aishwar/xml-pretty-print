(function () {

(exports || window || this).prettify = prettify

function prettify(xmlStr)
{
  prettify.TAB = prettify.TAB || "\t";
  var results = [],
      outputStr = "";
  parse(results, xmlStr, 0);
  
  for (var i = 0, n = results.length; i < n; i++)
  {
    for (var tabs = 0, total = results[i].indent; tabs < total; tabs++)
    {
      outputStr += prettify.TAB;
    }
    outputStr += results[i].content + "\n";
  }
  
  return outputStr;
}

function parse(results, content, indent)
{
  if (!content) { return; }
  
  var match = true;
  var matched = "";
  var _el = /([\s\S]*?)(<([^>\s]+)[^>]*?)(>([\s\S]*?)<\/\3>|\/>)/gm;
  
  while (match)
  {
    match = _el.exec(content);
    
    if (match)
    {
      var wholeStr = match[0],
          preContent = match[1],
          startTag = match[2],
          tagName = match[3],
          elContent = match[5],
          endTag = null;
        
        startTag += (elContent) ? '>' : '/>'
        endTag = (elContent) ? ('</' + tagName + '>') : ''
        
        matched += wholeStr;
        addResult(results, indent, preContent);
        addResult(results, indent, startTag);
        parse(results, elContent, indent + 1);
        addResult(results, indent, endTag);
    }
    else
    {
      // The non-matched portion is non-xml content
      content = content.substring(matched.length);
      
      addResult(results, indent, content);
    }
  }
}

function addResult(results, indent, content)
{
  // trim the string
  if (content && (content = content.replace(/^\s+|\s+$/gm,""))) {
    results.push({ indent:indent, content:content });
  }
}
}())
