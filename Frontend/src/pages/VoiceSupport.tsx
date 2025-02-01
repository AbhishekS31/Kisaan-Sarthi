import  { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
          audioChunksRef.current = [];
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
      })
      .catch((err) => {
        console.error('Error accessing microphone:', err);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const sendAudioToBackend = () => {
    if (!audioUrl) return;

    const formData = new FormData();
    fetch(audioUrl)
      .then(res => res.blob())
      .then(blob => {
        formData.append('audio', blob, 'recording.wav');
        return fetch('http://172.16.44.59:5000/upload_audio', {
          method: 'POST',
          body: formData,
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server response:', data);
      })
      .catch((error) => {
        console.error('Error sending audio to backend:', error);
      });

  
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioUrl && (
        <div>
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <button onClick={sendAudioToBackend}>Send to Backend</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
