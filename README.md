# Webpack for React

## Contents

  - Prerequisite: [Webpack for Plain JS](https://github.com/mjcampagna/webpack-for-plain-js)
  - Prerequisite: [Webpack for Plain JS + CSS](https://github.com/mjcampagna/webpack-for-plain-js-css)

  - [Introduction](#introduction)
  - [Adding React](#adding-react)
  - [Final Code](#final-code)

## Introduction

This walkthrough builds on my [Webpack for Plain JS + CSS](https://github.com/mjcampagna/webpack-for-plain-js-css) configuration, and assumes familiarity with that repo and it's prerequisite, essentially making this Part III in a three-part series. Use the "prerequiste" links above to access previous parts.

## Adding React

Let's add React, React DOM and Babel's React preset to our existing configuration. From the command-line, run:

```sh
npm install --save-dev react react-dom babel-preset-react
```

Our base configuration is already accounting for both `.js` and `.jsx` files, using the regular expression `/.jsx?$/`. All we have to do then is add 'react' to our list of presets, allowing Babel to transpile our React code.

**webpack.config.js**  
```js
  module: {
    rules: [

      { 
        test: /\.jsx?$/, 
        loader: 'babel-loader',
        include: /src/,
        options: {
          presets: ['env', 'react']
        }
      },
...
```

Then we'll import React into Webpack's entry file.

**index.js**  
```js
import css from './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
```

## Final Code

From the command line, set up with:

```sh
npm init
npm install --save-dev webpack webpack-cli del-cli html-webpack-plugin babel-core babel-loader babel-preset-env style-loader css-loader file-loader url-loader mini-css-extract-plugin react react-dom babel-preset-react
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

Edit your `index.js` file to include: 

**index.js**  
```js
import css from './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
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
          presets: ['env', 'react']
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
