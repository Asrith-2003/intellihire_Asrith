import { useEffect, useRef } from 'react';

interface SpeechRecognitionProps {
  isActive: boolean;
  onResult: (transcript: string) => void;
  onError: (error: any) => void;
}

export function SpeechRecognition({ isActive, onResult, onError }: SpeechRecognitionProps) {
  const recognitionRef = useRef<any>(null);
  const interimTranscriptRef = useRef<string>('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      onError('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        onResult(interimTranscriptRef.current + finalTranscript);
        interimTranscriptRef.current = '';
      } else {
        interimTranscriptRef.current = interimTranscript;
        onResult(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      onError(event.error);
    };

    recognition.onend = () => {
      if (isActive) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onResult, onError]);

  useEffect(() => {
    if (recognitionRef.current) {
      if (isActive) {
        interimTranscriptRef.current = '';
        recognitionRef.current.start();
      } else {
        recognitionRef.current.stop();
      }
    }
  }, [isActive]);

  return null;
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}