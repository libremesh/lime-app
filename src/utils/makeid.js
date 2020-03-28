export default function makeid(length) {
	let text = '';
	let possible = 'qwertyupasdfghjklzxvbnm23456789';
	for (let i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}
