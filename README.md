# Webpack

I've read a lot of articles about Webpack. The best of them are dated, now irrelevant. The rest of them are simply insane.

I am recently come to Webpack, and it frustrated me at first. In most reading, the author steers one into brambles, then gives band-aids to dress the wounds. There's a thing called tech debt, and the answer to most problems is not to install still more npm modules; better to avoid the pitfalls in the first place.

And that's the point of this. Herein, I do not endeavor to be comprehensive. Rather, I will plot a sane introduction to Webpack, building a base configuration that leans heavily on resources from Webpack's own website.

First and foremost, I write this for myself, a living document that I will update as my needs and my understanding continue to evolve. If others benefit from it as well, then all the better. 

If you're coming along, then strap on your Webpack and let's start walking.

----

At time of writing, Webpack 4.12.0 is current. This article assumes some familiarity with [Node.js](https://nodejs.org/) and npm, and with setting up a new project folder or repository.

If you're here for the first time, I strongly advise reading the entire article. Repeat visitors might like to jump to the final code.

----

## First Steps

Initialize the project folder with:

```sh
$ npm init
```

Install Webpack and its command-line interface as development dependencies with:

```sh
$ npm install --save-dev webpack webpack-cli 
```

Within the project folder, create a `src` folder, containing two files, `index.html`, `index.js` and `style.css`. At this point, your folder should look like this:

```sh
node_modules
src
  index.html
  index.js
  style.css
package-lock.json
package.json
```

Create a `.gitignore` file, and let's ignore both `node_modules` and `dist`, a folder which will be created later.

**.gitignore**  
```sh
.DS_Store
dist
node_modules
```

By default, Webpack will create the `dist` folder when it runs, and dump its output there. But we might like to clean up the existing `dist` when building anew, so let's set that up.

```sh
$ npm install --save-dev del-cli
```

This allows the deletion of files and directories, and is useful in build scripts. del-cli is fully separate from Webpack, so we can use it without cluttering the configuration file that we'll be building shortly.

Open the `package.json` file, and edit the "scripts" section to match the following.

**package.json**
```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "prebuild": "del-cli dist -f",
    "dev": "webpack --mode=development --watch",
    "build": "npm run prebuild -s && webpack --mode=production -s"
  },
```

The `prebuild` script will remove the existing `dist` folder; the `build` script will run `prebuild`, then build a new copy of your app. During development, run `dev` so that Webpack will watch your files for changes, and re-build them as you work. That's:

```sh
$ npm run dev
```

----

## Creating the Configuration File

Webpack 4 boldly claims to run with zero configuration. While that's not untrue, zero configuration won't get you very far. To get Webpack doing more of the things we want, we definitely want a configuration file. We might think about the configuration file as our map, a record of where we've been, and a guide for where we next expect to go.

In the project root, create a new file, `webpack.config.js`, with these contents:

**webpack.config.js**  
```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
};
```

As written, this essentially mimics Webpack's default behavior. We'll sketch in more of the terrain as we travel forward. For details on what's here, see Webpack documentation for [Entry](https://webpack.js.org/concepts/#entry) and [Output](https://webpack.js.org/concepts/#output). These are core concepts you'll want to understand.

----

## HTML + JS

Our configuration is coming along, so let's revisit the empty `index.html` file we created above. Open it up and paste in the following.

**src/index.html**  
```html
<!doctype html>
<html dir="ltr" lang="en">
  <head>

    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <title><%= htmlWebpackPlugin.options.title %></title>

  </head>
  <body>

    <script src="./main.js"></script>
  </body>
</html>
```

Note the strange enclosure in the HTML `<title>` element. We'll be adding the `HtmlWebpackPlugin` to our configuration file momentarily, and this allows us to set the title via Webpack.

To install the `HtmlWebpackPlugin`, run:

```sh
$ npm install --save-dev html-webpack-plugin
```

In our configuration file, we must require it at the top, then add the `plugins` configuration.

**webpack.config.js**  
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  
  plugins: [

    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/index.html',
      inject: false
    })

  ] // plugins

};
```

Again, note the `title` option in configuring `HtmlWebpackPlugin`; here we set the title that will show up in our HTML file.

And now the JavaScript. Because it's 2018 and the newer ECMAScript is all the rage, you probably want to include Babel, helpful for teaching the new slang to fogey browsers.

Install the following with npm.

```sh
$ npm install --save-dev babel-core babel-loader babel-preset-env
```

To use these, we'll need to grow our configuration file to include `modules` configuration.

**webpack.config.js**  
```js
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
  }, // module

  plugins: [

    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/index.html',
      inject: false
    })

  ] // plugins

};
```

The regular expression used above, `/.jsx?$/`, will match both `.js` and `.jsx`, just in case you want to use React in your app. React is beyond the scope of this document, however, and will be addressed separately.

----

## CSS

To here, we've cut a fairly direct path. As we come to CSS, though, the terrain becomes somewhat swampy.

Webpack's documentation recommends pairing `css-loader` and `style-loader`. Install them with:

```sh
$ npm install --save-dev style-loader css-loader
```

Then update the rules in our module config.

```js
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
      }

    ] // rules
  }, // module
```

As Webpack invokes loaders from right-to-left, the sequence above -- `'style-loader', 'css-loader'` -- is important. Don't swap them.

Open and edit the blank `src/style.css` file created previously. Put something inside of it; anything will do. Here's something, if you need it.

```css
html {
  background: #ffffff;
  color: #333333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  height: 100%;
  text-rendering: optimizelegibility;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
}
```

Finally, because Webpack can have only a single entry point, and that's our `index.js` file, we must reference our new CSS file within it. At the very top:

**src/index.js**  
```js
import css from './style.css';
```

On build, your CSS will be bundled into the `main.js` file. Honestly, packing the CSS into my JavaScript isn't my favorite thing, but in the interests of holding to resources from Webpack's own website, we'll run with it for now.

----

## CSS Referenced Assets

We're on our way through the swamp, but not out of the muck just yet. The work we've just done will handle our CSS code, but _will not_ handle any of the assets referenced in our CSS, including image files, fonts, etc. If we'd like to pack these items along, there's more yet to do.

Create an `images` folder inside of `src`. This is where you'll drop image files.

```sh
src
  images
```

And we'll need two Webpack loaders, `file-loader` and `url-loader`.

```sh
$ npm install --save-dev file-loader url-loader
```

In your configuration file, update your module rules to include the below rule for images files, following the existing CSS rule.

**webpack.config.js**  
```js
...
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
```

The loader `url-loader` will inline images smaller than the set limit as base64 strings; images larger than the limit will fall back to `file-loader` by default, and will be moved to `dist` folder in accordance with the 'name' option. As written above, we keep the existing file name, and drop the images into `dist/images`.

----

## Final Code

```sh
npm init
npm install --save-dev webpack webpack-cli del-cli html-webpack-plugin babel-core babel-loader babel-preset-env style-loader css-loader file-loader url-loader
```

```sh
node_modules
src
  index.html
  index.js
  style.css
package-lock.json
package.json
```

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

**webpack.config.js**  
```js
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
```
