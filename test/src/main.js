var helpers = require('./template-helpers.js');
var data = {list:[{title : "a"},{title : "b"}]};
document.getElementById('app').innerHTML = require('./a/a.tpl')(data);



