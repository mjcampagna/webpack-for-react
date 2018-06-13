const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  
  module: {
    rules: [

      { 
        test: /\.jsx?$/, 
        loader: 'babel-loader',
        include: /src/,
        options: {
          presets: ['env']
        }
      },

    ] // rules
  } // module

  plugins: [

    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/index.html',
      inject: false
    })

  ] // plugins

};
