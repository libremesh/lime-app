import { useState } from 'preact/hooks';
import { useInterval } from 'react-use';

let synth = window.speechSynthesis;
let voices = synth.getVoices();

const speech = (text, lang) => {
	let utterThis = new SpeechSynthesisUtterance(text);
	utterThis.pitch = 0.9;
	utterThis.rate = 1.2;
	utterThis.voice = voices.filter(x => x.lang === lang)[0];
	synth.cancel();
	synth.speak(utterThis);
};


export const SignalSpeech = ({ signal, className, initialMuted=true }) => {
	const [ lastSpeech, setLastSpeech ] = useState(0);
	const [ abbreviatedTimes, setAbbreviatedTimes ] = useState(0);
	const [ muted, setMuted ] = useState(initialMuted);

	useInterval(() => {
		const value = signal * -1;
		const doNotAbbreviate = (
			Math.floor(lastSpeech/10) !== Math.floor(value/10) ||
			Number(value.toString()[value.toString().length -1 ]) === 0 ||
			abbreviatedTimes === 5
		);
	
		if (doNotAbbreviate) {
			speech(value, 'es');
			setAbbreviatedTimes(0);
		}
		else {
			const lastDigit = value.toString()[value.toString().length - 1];
			speech(lastDigit, 'es');
			setAbbreviatedTimes(times => times + 1);
		}
		setLastSpeech(() => value);
	}, muted ? null : 2000);

	function toogleMuted() {
		setMuted(prev => !prev)
	}

	return (
		<div class={className} onClick={toogleMuted}>
			{!muted && <span>🔊</span>}
			{muted && <span>🔇</span>}
		</div>
	);
};
