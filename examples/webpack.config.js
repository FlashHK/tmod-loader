module.exports = {
  entry: "./src/main.js",
  output: {
    path: "./build",
    publicPath: "/build/",
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.html/, loader: "html" },
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