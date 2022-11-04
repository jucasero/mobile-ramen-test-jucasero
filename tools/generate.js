const templates = require('@ramenx/ionic-template-generator')

module.exports = (plop) => {
	// Loads the npmInstall action type
	plop.load('plop-pack-npm-install-packages');
	plop.setGenerator('templates', templates.boilerplate)
	plop.setGenerator('modules', templates.module)
}