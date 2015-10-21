# tmod-loader
由 [`tmodjs`](https://github.com/aui/tmodjs) 改造的 [`artTemplate`](https://github.com/aui/artTemplate) loader，用于webpack 。


## webpack 配置

```javascript
{
  ...
  module: {
    loaders: [
      {
          test: /\.tpl$/,
          loader: "tmod",
          query: {
              // 编译输出目录设置
              output: "./build",

              // 设置输出的运行时路径
              runtime: "src/template.js",

              // 定义模板采用哪种语法，内置可选：
              // simple: 默认语法，易于读写。可参看语法文档
              // native: 功能丰富，灵活多变。语法类似微型模板引擎 tmpl
              syntax: "simple",

              // 模板文件后缀
              suffix: '.tpl'
          } 
      }
    ]
  }
}
```

## 模板

模板语法参考[`artTemplate`](https://github.com/aui/artTemplate)