export const listenToPronunciation = (message) => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const msg = new SpeechSynthesisUtterance(message);
  msg.voice = voices[2];
  synth.speak(msg);
};
