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
  var match = true;
  var matched = "";
  
  var _el = /([\s\S]*?)(<(\S+)(\s+[\s\S]*?)*>)([\s\S]*?)<\/\3>|([\s\S]*?)(<(\S+)[\s\S]*?\/>)/gm;
  
  while (match)
  {
    match = _el.exec(content);
    
    if (match)
    {
      var wholeStr = match[0],
          preContent = match[1] || match[6],
          startTag = match[2] || match[7],
          endTag = match[3] ? ("</" + match[3] + ">") : null,
          elContent = match[5];
        
        matched += wholeStr;
        addResult(results, indent, preContent);
        addResult(results, indent, startTag);
        elContent && parse(results, elContent, indent + 1);
        endTag && addResult(results, indent, endTag);
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
