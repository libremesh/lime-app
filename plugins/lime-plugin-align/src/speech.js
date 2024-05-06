const synth = window.speechSynthesis;

export const speech = (text, lang) => {
    if (synth !== undefined) {
        let voices = synth.getVoices();
        let utterThis = new SpeechSynthesisUtterance(text);
        utterThis.pitch = 0.9;
        utterThis.rate = 1.2;
        utterThis.voice = voices.filter((x) => x.lang === lang)[0];
        synth.cancel();
        synth.speak(utterThis);
    }
};
