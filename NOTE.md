This sucks...I just realized, the downside to my approach:

<div id=a>
<div id=b>
</div>
</div>

will be formatted to:

<div id=a>
  <div id=b>
</div>
</div>

This happens because line 1 is matched with line 3. Line 3 has the same end tag that is expected. With regex, I can neither be greedy, nor lazy ... both will have this issue.
