export const isValidHostname = (text = '', length = false) => {
	const reg = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
	if (length) {
		return reg.test(text) && text.length > 2;
	}
	return reg.test(text);
};


// slugify maintains case, so Fóø -> Foo
export const slugify = (string, end, domain) => {
	let a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    a += a.toUpperCase();
	let b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrssssttuuuuuuuuuwxyyzzz------';
    b += b.toUpperCase();

	const p = new RegExp(a.split('').join('|'), 'g');
	
	string = string
		.toString()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
		.replace(/&/g, '-and-') // Replace & with 'and'
		.replace(/[^-a-zA-Z0-9.]+/g, '') // Remove all non-word characters except - and .
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/^\.+/, ''); // Trim . from start of text

	if (!domain) {
		string = string.replace('.', '-'); // Trim . from the text
	}
	if (end) {
		string = string.replace(/-+$/, ''); // Trim - from end of text
		string = string.replace(/\.+$/, ''); // Trim . from end of text
	}

	return string;
};
