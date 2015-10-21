'use strict';

var AOTcompile = require('./AOTcompile.js');
var defaults = require('./defaults.js');
var path = require('./path.js');
var fs = require('fs');

var log = function (message) {
    console.log(message);
};

var Tmod = function (base, options) {


    // 模板项目路径
    this.base = path.resolve(base);


    // 项目配置选项
    this.options = options = this.getConfig(options);

    // 初始化模板引擎
    this._initEngine();

};


// 默认配置
Tmod.defaults = defaults;


Tmod.prototype = {


    // 路径转换为模板 ID
    // base: /Users/tangbin/Documents/web/tpl
    // file: /Users/tangbin/Documents/web/tpl/index/main.html
    // >>>>> index/main
    _toId: function (file) {
        var extname = path.extname(file);
        var id = file.replace(this.base + '/', '').replace(extname, '');
        return id;
    },
    // 修正配置-版本兼容
    _fixConfig: function (options, inputConfig) {

        var cwd = process.cwd();
        var base = this.base;

        // 忽略大小写
        options.type = options.type.toLowerCase();


        // 模板合并规则
        // 兼容 0.0.3-rc3 之前的配置
        if (Array.isArray(options.combo) && !options.combo.length) {
            options.combo = false;
        } else {
            options.combo = !!options.combo;
        }


        // 兼容 0.1.0 之前的配置
        if (options.type === 'templatejs') {
            options.type = 'default';
        }


        // 根据生成模块的类型删除不支持的配置字段
        if (options.type === 'default' || options.type === 'global') {
            delete options.alias;
        } else {
            delete options.combo;
        }


        // 处理外部输入：转换成相对于 base 的路径

        if (inputConfig.output) {
            options.output = path.relative(base, path.resolve(cwd, inputConfig.output));
        }

        if (inputConfig.syntax && /\.js$/.test(inputConfig.syntax)) {// 值可能为内置名称：native || simple
            options.syntax = path.relative(base, path.resolve(cwd, inputConfig.syntax));
        }

        if (inputConfig.helpers) {
            options.helpers = path.relative(base, path.resolve(cwd, inputConfig.helpers));
        }


        return options;
    },

    // 获取用户配置
    getConfig: function () {

        var options = arguments[0];

        if (!options) {
            return this.options;
        }


        var defaults = Tmod.defaults;
        var name = null;
        var config = {};



        // 来自 Tmod.defaults
        for (name in defaults) {
            config[name] = defaults[name];
        }

        // 来自 Tmod(base, options) 的配置
        for (name in options) {
            if (options[name] !== undefined) {
                config[name] = options[name];
            }
        }


        config = this._fixConfig(config, options);

        return config;
    },

    // 编译单个模板
    // file: /Users/tangbin/Documents/web/tpl/index/main.html
    compile: function (file) {


        // 模板字符串
        var source = '';
        var readError = null;
        var compileError = null;

        var modObject = {};

        try {
            source = fs.readFileSync(file, this.options.charset);
        } catch (e) {
            readError = e;
        }

        // 获取模板 ID
        var id = this._toId(file);


        if (readError) {
            throw new Error(compileError);
            return;
        }


        try {
            // 编译模板
            modObject = this.template.AOTcompile(source, {
                filename: id,
                alias: this.options.alias,
                type: this.options.type,
                compress: this.options.compress,
                escape: this.options.escape,
                runtime: this.options.runtime,
                suffix: this.options.suffix
            });
        } catch (e) {
            compileError = e;
        }

        if (compileError) {
            throw new Error(compileError);
            return;
        }

        return modObject.code;
    },

    // 初始化模板引擎
    _initEngine: function () {
        var options = this.options;
        var template;

        switch (String(options.syntax)) {
            case 'native':
                template = require('art-template/dist/template-native-debug.js');
                break;

            case 'simple':
                template = require('art-template/dist/template-debug.js');
                break;

            // 不再推荐使用动态加载自定义语法   
            // 为了兼容 < v1.0 的功能   
            default:

                var syntaxFile = path.resolve(this.base, options.syntax);

                if (fs.existsSync(syntaxFile)) {

                    template = require('art-template/dist/template-native-debug.js');

                    var syntaxCode = fs.readFileSync(syntaxFile, 'utf-8');

                    vm.runInNewContext(syntaxCode, {
                        console: console,
                        template: template
                    });

                } else {

                    this.log('[red]Not found: ' + syntaxFile + '[/red]');
                    process.exit(1);

                }
        }


        // 配置模板引擎：辅助方法
        if (options.helpers) {

            var helpersFile = path.resolve(this.base, options.helpers);

            if (fs.existsSync(helpersFile)) {

                this._helpersCode = fs.readFileSync(helpersFile, 'utf-8');
                vm.runInNewContext(this._helpersCode, {
                    console: console,
                    template: template
                });

            } else {

                this.log('[red]Not found: ' + helpersFile + '[/red]');
                process.exit(1);

            }
        }

        this.template = AOTcompile(template);

    }

};

module.exports = Tmod;