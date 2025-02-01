import  { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';

const AudioRecorder = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  const handleStopRecording = async () => {
    setIsProcessing(true);
    stopRecording();

    // Wait for the recording to finalize
    setTimeout(async () => {
      if (!mediaBlobUrl) {
        alert('No recording available');
        setIsProcessing(false);
        return;
      }
      const blob = await fetch(mediaBlobUrl).then((r) => r.blob());
      const formData = new FormData();
      formData.append('file', blob, 'recording.wav');

      try {
        // Replace 'YOUR_BACKEND_ENDPOINT' with your actual backend URL
        await axios.post('http://172.16.44.59:5000', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file');
      } finally {
        setIsProcessing(false);
        clearBlobUrl();
      }
    }, 1000); // Adjust timeout as needed to ensure the blob is available
  };

  return (
    <div className="text-center">
      <p>{status}</p>
      <button
        onClick={startRecording}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Start Recording
      </button>
      <button
        onClick={handleStopRecording}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors ml-4"
        disabled={isProcessing}
      >
        Stop Recording
      </button>
      {mediaBlobUrl && (
        <div className="mt-4">
          <audio src={mediaBlobUrl} controls />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
