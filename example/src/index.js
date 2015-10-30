var helpers = require('./template-helpers.js');
var data = {list:[{time : 1446175992278},{time : 1446176021568}]};
document.getElementById('app').innerHTML = require('./a/a.tpl')(data);



