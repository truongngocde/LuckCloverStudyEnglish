import { useEffect, useState } from "react";
let recognition = null;

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

} else {
    console.log("Speech recognition not supported in this browser.");
}



const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [ isListening, setIsListening ] = useState(false);

    useEffect(() => {
        if(!recognition) return;

        recognition.onresult = (event) => {
            console.log("onresult event: ", event);
            setText(event.results[0][0].transcript)
            recognition.stop();
            setIsListening(false);
        };
    }, [])

    const startListening = () => {
        setText('');
        setIsListening(true);
        recognition.start();
    }

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    }
    return {
        text, 
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition
    }
}

export default useSpeechRecognition;