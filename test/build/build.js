/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var helpers = __webpack_require__(1);
	var data = {list:[{title : "a"},{title : "b"}]};
	document.getElementById('app').innerHTML = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./a/a.tpl\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))(data);





/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var template = __webpack_require__(2);

	/** 
	 * 对日期进行格式化， 
	 * @param date 要格式化的日期 
	 * @param format 进行格式化的模式字符串
	 *     支持的模式字母有： 
	 *     y:年, 
	 *     M:年中的月份(1-12), 
	 *     d:月份中的天(1-31), 
	 *     h:小时(0-23), 
	 *     m:分(0-59), 
	 *     s:秒(0-59), 
	 *     S:毫秒(0-999),
	 *     q:季度(1-4)
	 * @return String
	 * @author yanis.wang
	 * @see	http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
	 */
	template.helper('dateFormat', function (date, format) {

	    date = new Date(date);

	    var map = {
	        "M": date.getMonth() + 1, //月份 
	        "d": date.getDate(), //日 
	        "h": date.getHours(), //小时 
	        "m": date.getMinutes(), //分 
	        "s": date.getSeconds(), //秒 
	        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
	        "S": date.getMilliseconds() //毫秒 
	    };
	    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
	        var v = map[t];
	        if(v !== undefined){
	            if(all.length > 1){
	                v = '0' + v;
	                v = v.substr(v.length-2);
	            }
	            return v;
	        }
	        else if(t === 'y'){
	            return (date.getFullYear() + '').substr(4 - all.length);
	        }
	        return all;
	    });
	    return format;
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*TMODJS:{}*/
	!function() {
	    function template(filename, content) {
	        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
	    }
	    function toString(value, type) {
	        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
	        value;
	    }
	    function escapeFn(s) {
	        return escapeMap[s];
	    }
	    function escapeHTML(content) {
	        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
	    }
	    function each(data, callback) {
	        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
	    }
	    function resolve(from, to) {
	        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
	        for (filename = filename.replace(/\/\.\//g, "/"); 
	        filename.match(DOUBLE_DOT_RE); ) 
	        filename = filename.replace(DOUBLE_DOT_RE, "/");
	        return filename;
	    }
	    function renderFile(filename, data) {
	        var fn = template.get(filename) || showDebugInfo({
	            filename: filename,
	            name: "Render Error",
	            message: "Template not found"
	        });
	        return data ? fn(data) : fn;
	    }
	    function compile(filename, fn) {
	        if ("string" == typeof fn) {
	            var string = fn;
	            fn = function() {
	                return new String(string);
	            };
	        }
	        var render = cache[filename] = function(data) {
	            try {
	                return new fn(data, filename) + "";
	            } catch (e) {
	                return showDebugInfo(e)();
	            }
	        };
	        return render.prototype = fn.prototype = utils, render.toString = function() {
	            return fn + "";
	        }, render;
	    }
	    function showDebugInfo(e) {
	        var type = "{Template Error}", message = e.stack || "";
	        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
	        return function() {
	            return "object" == typeof console && console.error(type + "\n\n" + message), type;
	        };
	    }
	    var cache = template.cache = {}, String = this.String, escapeMap = {
	        "<": "&#60;",
	        ">": "&#62;",
	        '"': "&#34;",
	        "'": "&#39;",
	        "&": "&#38;"
	    }, isArray = Array.isArray || function(obj) {
	        return "[object Array]" === {}.toString.call(obj);
	    }, utils = template.utils = {
	        $helpers: {},
	        $include: function(filename, data, from) {
	            return filename = resolve(from, filename), renderFile(filename, data);
	        },
	        $string: toString,
	        $escape: escapeHTML,
	        $each: each
	    }, helpers = template.helpers = utils.$helpers;
	    template.get = function(filename) {
	        return cache[filename.replace(/^\.\//, "")];
	    }, template.helper = function(name, helper) {
	        helpers[name] = helper;
	    }, module.exports = template;
	}();

/***/ }
/******/ ]);