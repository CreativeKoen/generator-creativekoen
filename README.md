# generator-creativekoen [![Build Status](https://secure.travis-ci.org/CreativeKoen/generator-creativekoen.png?branch=master)](https://travis-ci.org/CreativeKoen/generator-creativekoen)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo gulpjs/gulp-cli#4.0 bower (grunt)
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-creativekoen from npm, run:

```bash
npm install -g generator-creativekoen
```
To install generator-creativekoen from a local copy, run:

```bash
npm link
```

Finally, initiate the generator:

```bash
yo creativekoen
```

### flags

`--git` will init and commit the fresh scaffold and will checkout to a develop branch

`--skip-welcome-message` no explaination nessery

'--skip-install' explains ifself, it will skip the install of bower and npm

`--run-gulp` let Yeoman start the gulp script

### gulp commands

##### building
`gulp build` will run the code DRY and wont make anything
`gulp build --build` will make a build dir with non minified code
`gulp build --dist` will make a dist dir with minified code

##### serving
`gulp serve` again wont do anything
`gulp serve --build` will build, and spin up a local server with BrowserSync and open a browser, It will also open your editor.
By default it will open 'gvim' because thats the best editor out there

`gulp serve --dist` will do the same as with the build flag but now it will serve up minified code

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com), [Gulp](http://gulpjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
