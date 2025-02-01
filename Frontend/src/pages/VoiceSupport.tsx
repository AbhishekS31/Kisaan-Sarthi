"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Mic, MessageSquare, Play, Volume2, Square } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: <Mic className="h-8 w-8 text-green-600" />,
    title: "Ask a Question",
    description: "Speak your farming query",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-green-600" />,
    title: "AI Processing",
    description: "AI analyzes your question",
  },
  {
    icon: <Play className="h-8 w-8 text-green-600" />,
    title: "Get Answer",
    description: "Receive voice guidance",
  },
]

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [serverResponse, setServerResponse] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      }
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const startRecording = () => {
    if (isPlaying) {
      stopSpeaking()
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream)
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data)
        }
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
          const audioUrl = URL.createObjectURL(audioBlob)
          setAudioUrl(audioUrl)
          audioChunksRef.current = []
          sendAudioToBackend(audioBlob)
        }
        mediaRecorderRef.current.start()
        setIsRecording(true)
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err)
      })
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
  }

  const sendAudioToBackend = (audioBlob: Blob) => {
    setIsProcessing(true)

    const formData = new FormData()
    formData.append("audio", audioBlob, "recording.wav")

    fetch("http://172.16.44.59:5000/upload_audio", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data)
        setServerResponse(data.message)
      })
      .catch((error) => {
        console.error("Error sending audio to backend:", error)
        setServerResponse("Error sending audio to server")
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  const speakResponse = () => {
    if (serverResponse && 'speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(serverResponse);
      const voices = window.speechSynthesis.getVoices();

      const hindiVoice = voices.find(voice => voice.lang === 'hi-IN');
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      } else {
        console.warn('Hindi voice not available, using default voice.');
      }
      const marathiVoice = voices.find(voice => voice.lang === 'mr-IN');
      if (marathiVoice) {
        utterance.voice = marathiVoice;
      } else {
        console.warn('Marathi voice not available, using default voice.');
      }
      utterance.onend = () => setIsPlaying(false);
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-900 text-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1591628001888-76cc02e0c276?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-8">Talk to Your AI Farming Assistant</h2>
        <p className="text-xl text-center mb-12">Get instant voice-based answers to all your farming questions</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-full p-4 inline-block mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg text-gray-800"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Ask Your Question</h3>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRecordClick}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${
                isRecording ? "bg-red-500 animate-pulse" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <Mic className="h-8 w-8 text-white" />
            </motion.button>

            <p className="mt-4 text-gray-600">
              {isRecording
                ? "Recording... Tap to stop"
                : isProcessing
                  ? "Processing your question..."
                  : "Tap to start recording"}
            </p>

            {isProcessing && (
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            )}
          </div>

          {audioUrl && (
            <div className="mt-6 text-center">
              <audio src={audioUrl} controls className="mx-auto" />
            </div>
          )}

          {serverResponse && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold mb-2">Server Response:</h4>
              <p>{serverResponse}</p>
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  onClick={speakResponse}
                  disabled={isPlaying}
                  className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${
                    isPlaying ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Volume2 className="mr-2 h-5 w-5" />
                  {isPlaying ? "Playing..." : "Listen to Response"}
                </button>
                {isPlaying && (
                  <button
                    onClick={stopSpeaking}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Square className="mr-2 h-5 w-5" />
                    Stop
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Sample Questions */}
          <div className="mt-12">
            <h4 className="text-lg font-semibold mb-4">Sample Questions:</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <Play className="h-4 w-4 mr-2 text-green-600" />
                "When should I plant wheat in Punjab?"
              </li>
              <li className="flex items-center">
                <Play className="h-4 w-4 mr-2 text-green-600" />
                "How to control pests in cotton?"
              </li>
              <li className="flex items-center">
                <Play className="h-4 w-4 mr-2 text-green-600" />
                "What fertilizer is best for tomatoes?"
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AudioRecorder

