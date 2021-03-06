'use strict';
var util	= require('util');
var path	= require('path');
var yeoman	= require('yeoman-generator');
var chalk	= require('chalk');
var yosay	= require('yosay');
var git		= require('simple-git');

// let's create and export our generator first this will save time later down the road
var creativekoen = module.exports = function creativekoen(args, options){ // {{{
    yeoman.generators.Base.apply(this, arguments);
    this.welcome;
};

// With this line we can create prototype functions
// and we dont have to var "generator name" = module.export = function "generator name"()
// everytime
util.inherits(creativekoen, yeoman.generators.Base);
// }}}

// let greet our users with a nice message
creativekoen.prototype.welcome = function welcome(){ //{{{
	// you can skip the welcome message with --skip-welcome-message
    if (!this.options['skip-welcome-message']){
        this.log(yosay('Welcome to CreativeKoen\'s workflow generator!'));
    };
};
// }}}

// lets ask the user what the client/project name is
creativekoen.prototype.askForClient = function askForClient() { //{{{
    var done = this.async();
    this.prompt([{
		name: 'appName',
		message: 'what is the name of your client name ?',
		default: 'best-project-ever'
    }], function(answers){

        this.appname = answers.appName;

        done();
    }.bind(this));
};
//}}}

// lets ask the user what kind of server to use
creativekoen.prototype.askForServer = function askForServer() { //{{{
    var done = this.async();

    var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What kind of server do you want to use?',
        choices: [{
                name: 'localhost (local.< project name >)',
                value: 'localhost',
                checked: false
            },{
                name: 'php server',
                value: 'phpserver',
                checked: false
            },{
                name: 'just static html',
                value: 'static',
                checked: true
            }
            ]
        }];

    this.prompt(prompts, function(answers){
        var features = answers.features;
        function hasFeature(feat){
            return features && features.indexOf(feat) !== -1;
        }

        this.localhost	= hasFeature('localhost');
        this.phpserver	= hasFeature('phpserver');
        this.statichtml	= hasFeature('static');

        done();
    }.bind(this));
};
//}}}

// lets also aks the user what kind of css preprocessor they want to use
creativekoen.prototype.askForCss = function askForCss() { // {{{
    var done = this.async();
    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'Would you like Sass or Stylus?',
      choices: [{
		name: 'Stylus',
		value: 'includeStylus',
		checked: true
    },{
		name: 'Sass',
		value: 'includeSass',
		checked: false
    }]
    },
    //ask for sass deps
    {
        when: function (answers) {
        return answers && answers.features &&
			answers.features.indexOf('includeSass') !== -1;
        },
        type: 'confirm',
        name: 'SassStack',
        value: 'includeSassStack',
        message: 'Would you like to use Bourbon,breakpoint and Jeet?',
        default: false
    },
    //ask for stylus deps
    {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeStylus') !== -1;
        },
        type: 'confirm',
        name: 'StylusStack',
        value: 'includeStylusStack',
        message: 'Would you like to use Nib, Rupture and Jeet?',
        default: true
    }
    ];

    this.prompt(prompts, function (answers) {
        var features = answers.features;

        function hasFeature(feat) {
            return features && features.indexOf(feat) !== -1;
        }

        this.includeSass = hasFeature('includeSass');
        this.includeStylus = hasFeature('includeStylus');

        this.includeStylusStack = hasFeature('includeStylusStack');
        this.includeSassStack = hasFeature('includeSassStack');

        done();
    }.bind(this));
};
// }}}

// that also goes for html/php/jade
creativekoen.prototype.askForHtml = function askForHtml() { //{{{
    var done = this.async();

    var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What kind to html templating engine do you want use?',
        choices: [{
                name: 'Html',
                value: 'includeHtml',
                checked: false
            },{
                name: 'Html (in jade)',
                value: 'includeHtmlJade',
                checked: false
            },{
                name: 'Php',
                value: 'includePhp',
                checked: false
            },{
                name: 'Php (in jade)',
                value: 'includePhpJade',
                checked: false
            }
            ]
        }];

    this.prompt(prompts, function(answers){
        var features = answers.features;
        function hasFeature(feat){
            return features && features.indexOf(feat) !== -1;
        }

        this.includeHtml		= hasFeature('includeHtml');
        this.includeHtmlJade	= hasFeature('includeHtmlJade');
        this.includePhp			= hasFeature('includePhp');
        this.includePhpJade		= hasFeature('includePhpJade');

        done();
    }.bind(this));
};
// }}}

// Do you enjoy your coffee? lets also ask for that
creativekoen.prototype.askForCoffee = function askForCoffee() { //{{{
    var done = this.async();
    this.prompt([{
		type: 'confirm',
		name: 'includeCoffee',
		message: 'Do you want to use Coffee Script?',
		default: false
    }], function(answers){

        this.includeCoffee = answers.includeCoffee;

        done();
    }.bind(this));
}; // }}}

// moving the scaffold files to the new project dir
creativekoen.prototype.moveFiles = function moveFiles(){ // {{{
	// lets set the project name to the folder name
	var root = this.appname;
	// and lets make this name available for other files
	var projectname = {
		projectname:		this.appname,
		includeHtmlJade:	this.includeHtmlJade,
		includeHtml:		this.includeHtml,
		includePhp:			this.includePhp,
		includePhpJade:		this.includePhpJade,
		includeSass:		this.includeSass,
		includeStylus:		this.includeStylus,
		includeSassStack:	this.includeSassStack,
		includeStylusStack: this.includeStylusStack,
		includeCoffee:		this.includeCoffee,
		phpserver:			this.phpserver,
		localhost:			this.localhost,
		statichtml:			this.statichtml
	};

	// moving root files
	this.template('gulpfile.js',	root+'/Gulpfile.js', projectname);
	this.template('package.json',	root+'/package.json', projectname);
	this.template('bower.json',		root+'/bower.json', projectname);
	this.template('README.md',		root+'/README.md', projectname);
	this.template('.editorconfig',	root+'/.editorconfig');
	this.template('.gitignore',		root+'/.gitignore');

	// source coffee
	if (this.includeCoffee) {
		this.template('source/coffee/main.coffee',		root+'/source/coffee/main.coffee');
		this.template('source/coffee/plugins.coffee',	root+'/source/coffee/plugins.coffee');
	}

	// source JS
	if (!this.includeCoffee) {
	this.template('source/js/main.js',		root+'/source/js/main.js');
	this.template('source/js/plugins.js',	root+'/source/js/plugins.js');
	}

	// boy boilerplate html5 from https://github.com/corysimmons/boy
	this.template('source/js/vendor/calc.min.js',				root+'/source/js/vendor/calc.min.js');
	this.template('source/js/vendor/respond-1.4.2.min.js',		root+'/source/js/vendor/respond-1.4.2.min.js');
	this.template('source/js/vendor/selectivizr-1.0.3b.min.js', root+'/source/js/vendor/selectivizr-1.0.3b.min.js');


	// source SCSS
	if (this.includeSass === true){ // {{{
		this.template('source/scss/main.scss',			root+'/source/scss/main.scss');
		this.template('source/scss/vars/_base.scss',	root+'/source/scss/vars/_base.scss');
		this.template('source/scss/vars/_layout.scss',	root+'/source/scss/vars/_layout.scss');
		this.template('source/scss/vars/_module.scss',	root+'/source/scss/vars/_module.scss');
		this.template('source/scss/vars/_state.scss',	root+'/source/scss/vars/_state.scss');
		this.template('source/scss/vars/_theme.scss',	root+'/source/scss/vars/_theme.scss');
		this.template('source/scss/vars/_vars.scss',	root+'/source/scss/vars/_vars.scss');
	}
    // }}}

	if (this.includeStylus === true){ //{{{
		this.template('source/stylus/main.styl',			root+'/source/stylus/main.styl');
		this.template('source/stylus/vars/_base.styl',		root+'/source/stylus/vars/_base.styl');
		this.template('source/stylus/vars/_layout.styl',	root+'/source/stylus/vars/_layout.styl');
		this.template('source/stylus/vars/_module.styl',	root+'/source/stylus/vars/_module.styl');
		this.template('source/stylus/vars/_state.styl',		root+'/source/stylus/vars/_state.styl');
		this.template('source/stylus/vars/_theme.styl',		root+'/source/stylus/vars/_theme.styl');
		this.template('source/stylus/vars/_vars.styl',		root+'/source/stylus/vars/_vars.styl');
	}
    //}}}

	if (this.includeHtml) {
		this.template('source/index.html', root+'/source/index.html', projectname);
	}
	if (this.includeHtmlJade) {
		this.template('source/index.jade', root+'/source/index.jade', projectname);
	}
	if (this.includePhp) {
		this.template('source/index.php', root+'/source/index.php', projectname);
	}
	if (this.includePhpJade) {
		this.template('source/index.jade', root+'/source/index.jade', projectname);
	}

};// }}}

// let Yeoman install the dependencies
creativekoen.prototype.installDeps = function installDeps() { // {{{
	// this function will only by called when the rest of the function are done
	this.on('end', function(){

		var done = this.async();

		// change the current working directory to the new one
		var npmdir = path.join(process.cwd(), this.appname+"\\");
		process.chdir(npmdir);

		this.installDependencies({
			skipInstall: this.options['skip-install'],
			callback: function() {
				// --skip-install will skip the install of bower and npm
				if (!this.options['skip-install']) {
					this.spawnCommand('gulp', ['build','--build']);
					this.spawnCommand('gulp', ['vendor','--build']);
					if (this.includeSassStack) {
						this.spawnCommand('gulp', ['breakpoint','--build']);
					}
				}

				// if you pass a cli argument like --run-gulp than yeoman will start gulp
				// but not when you have selected for the php server option
				if (this.options['run-gulp'] && !this.phpserver && this.localhost) {
					this.spawnCommand('gulp', ['serve','--build']);
				}

				// print intructions for the php server
				if (this.phpserver === true) { //{{{
					this.log(
						'run '+
						chalk.yellow('gulp phpserver')+
						' in one terminal window and run '+
						chalk.yellow('gulp serve --build')+
						' in the an other terminal window\n'
					)

				} //}}}

				// init a git repo with yeoman when you add a --git argument
				if (this.options['git']){ //{{{
					git(npmdir)
						.init()
						.add('./*')
						.commit('init a new project with CreativeKoen\'s Generator')
						// .checkoutLocalBranch('feature')
						.checkoutLocalBranch('develop');
				} // }}}

			}.bind(this)
		})

		done();
	});
};
// }}}
