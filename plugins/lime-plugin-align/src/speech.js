let synth = window.speechSynthesis;
let voices = synth.getVoices();

export const speech = (text, lang) => {
	let utterThis = new SpeechSynthesisUtterance(text);
	utterThis.pitch = 0.9;
	utterThis.rate = 1.2;
	utterThis.voice = voices.filter(x => x.lang === lang)[0];
	synth.cancel();
	synth.speak(utterThis);
};
