# Webpack for Plain JS + CSS

## Contents

  - [Webpack for Plain JS](https://github.com/mjcampagna/webpack-for-plain-js)

  - [Introduction](#introduction)
  - [Mini CSS Extract Plugin](#mini-css-extract-plugin)

## Introduction

This walkthrough builds on my [Webpack for Plain JS](https://github.com/mjcampagna/webpack-for-plain-js) configuration, and assumes familiarity with that repo.

Here, I'll be adding the Mini CSS Extract Plugin to that base, because I think it's lame to have my CSS inlined into JavaScript files.

The reason this is a separate repo is that I want to preserve [Webpack for Plain JS](https://github.com/mjcampagna/webpack-for-plain-js) as a configuration using purely first-party loaders, plugins, etc. from Webpack's own website.

## Mini CSS Extract Plugin

By using the [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin), we ensure that our CSS is built into a standalone `style.css` file, and not inlined into our JavaScript bundle. I call that a win!

Install it from the command line:

```sh
npm install --save-dev mini-css-extract-plugin
```

We then need to add three snippets to our `webpack.config.js` file to put it to work for us.

Require the plugin at the top:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

Inside of `module` => `rules`, update our existing test for CSS to use the plugin:

```js
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      },
```

And inside of `plugins`, instantiate it:

```js
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
```

These things done, running your build process will now yield you a `dist/style.css` file containing your CSS.

## Final Code

From the command line, set up with:

```sh
npm init
npm install --save-dev webpack webpack-cli del-cli html-webpack-plugin babel-core babel-loader babel-preset-env style-loader css-loader file-loader url-loader
```

Build your file/folder structure as:

**folders & files**  
```sh
node_modules/
src/
  fonts/
  images/
  .gitignore
  index.html
  index.js
  style.css
package-lock.json
package.json
```

Edit your `.gitignore` file to include: 

**.gitignore**  
```sh
.DS_Store
dist
node_modules
```

Replace the "scripts" section of your `package.json` file with:

**package.json**
```js
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "prebuild": "del-cli dist -f",
    "dev": "webpack --mode=development --watch",
    "build": "npm run prebuild -s && webpack --mode=production -s"
  },
...
```

Create a file `webpack.config.js` with these contents:

**webpack.config.js**  
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      },

      {
        test: /\.(gif|jpeg|jpg|png|svg|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path]/[name].[ext]',
              include: [/images/]
            }
          }
        ]
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path]/[name].[ext]',
              include: [/fonts/]
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
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css'
    })

] // plugins

};
```

For now, minimizing the CSS is outside the scope of this article. For information on minimizing your code, see [Mini CSS Extract Plugin, Minimizing for Production](https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production).
