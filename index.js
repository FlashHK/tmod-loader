'use strict';

var Tmod = require('./src/tmod');

module.exports = function (content) {

    this.cacheable && this.cacheable();

    var options = this.query ? JSON.parse(this.query.replace(/\?/g, "")) : {};

    var tmod = new Tmod('./', options)
    var path = this.resourcePath.replace(/\\/g, "/");
    var output = tmod.compile(path);

    if (!output) throw new Error(output); ;
    return output;
}