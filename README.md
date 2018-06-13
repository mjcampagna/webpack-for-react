# Webpack

I've read a lot of articles about Webpack. The best of them are dated, now irrelevant. The rest of them are simply insane. Meanwhile, Webpack 4 claims to run with zero configuration! And while that's not untrue, zero configuration won't get you very far.

I am recently come to Webpack, and it frustrated me at first. In most reading, the author steers one into brambles, then gives band-aids to dress the wounds. There's a thing called tech debt, and the answer to most problems is not to install still more npm modules; better to avoid the pitfalls in the first place.

And that's the point of this. Herein, I do not endeavor to be comprehensive. Rather, I will plot a sane introduction to Webpack, building a base configuration that leans heavily on first-party resources. As little bloat as I can manage, nothing nonessential, and reaching only for third-parties when I absolutely must.

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

Within the project folder, create a `src` folder, containing two files, `index.html`, `index.js` and `styling.css`. At this point, your folder should look like this:

```sh
node_modules
src
  index.html
  index.js
  styling.css
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

## Final Code

```sh
npm init
npm install --save-dev webpack webpack-cli del-cli
```

```sh
node_modules
src
  index.html
  index.js
package-lock.json
package.json
```

**package.json**
```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "prebuild": "del-cli dist -f",
    "dev": "webpack --mode=development --watch",
    "build": "npm run prebuild -s && webpack --mode=production -s"
  },
```
