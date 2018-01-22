require('fs').readdirSync(__dirname + '/translations/').forEach((file) => {
	if (file.match(/\.json$/) !== null) {
		let name = file.replace('.json', '');
		exports[name] = require('./translations/' + file);
	}
});
