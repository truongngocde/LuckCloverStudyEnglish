import { useEffect, useState, useRef } from "react";

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
    const [isListening, setIsListening] = useState(false);
    const timeoutIdRef = useRef(null);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            console.log("onresult event: ", event);
            setText(event.results[0][0].transcript);
            clearTimeout(timeoutIdRef.current);  // Clear the timeout since we got a result
            recognition.stop();
            setIsListening(false);
        };

        recognition.onspeechend = () => {
            console.log("Speech has ended.");
            clearTimeout(timeoutIdRef.current);
            recognition.stop();
            setIsListening(false);
        };

        recognition.onend = () => {
            if (isListening) {
                recognition.start();  // Restart recognition if it stopped automatically
            }
        };

    }, [isListening]);

    const startListening = () => {
        setText('');
        setIsListening(true);
        recognition.start();

        // Set a timeout to stop listening after 5 seconds if no speech
        timeoutIdRef.current = setTimeout(() => {
            if (isListening) {
                recognition.stop();
                setIsListening(false);
            }
        }, 5000);
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
        clearTimeout(timeoutIdRef.current);  // Clear the timeout if stopped manually
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition
    };
}

export default useSpeechRecognition;
