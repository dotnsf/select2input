# select 2 input


## Overview

Sample for &lt;select&gt; field, which would be changed to &lt;input&gt; field when double-clicked.


## How to use

### introduction

0. Download this repository, and place **select2input.js** somewhere in your project( or CORS free CDN ).

1. Load jQuery and select2input.js in your HTML.

2. Call **selectinput()** method for class-specified &lt;select&gt; element.

3. Select item, or edit item after double-cliked.

4. Call **getValue()** method for id-specified &lt;select&gt; element to get current value.

### sample

```
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="./select2input.js"></script>
```

```
<script>
$(function(){
  $('.select2input').selectinput();
});
</script>
```

```
<select id="mySelect" class="select2input" style="width: 150px;">
  <option value="12345">12345</option>
  <option value="23456">23456</option>
  <option value="34567">34567</option>
  <option value="45678">45678</option>
  <option value="56789">56789</option>
</select>
```

```
<input type="button" class="btn btn-primary" value="Value" onClick="alert($('#mySelect').getValue());"/>
```


## Licensing

This code is licensed under MIT.


## Copyright

2020 [K.Kimura @ Juge.Me](https://github.com/dotnsf) all rights reserved.
