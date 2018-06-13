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

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path]/[name].[ext]'
            }
          }
        ]
      }

] // rules
  }, // module

  plugins: [

    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/index.html',
      inject: false
    })

  ] // plugins

};
