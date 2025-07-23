
import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import TextInput from "../components/TextInput"
import Select from "../components/Select"
import DatePicker from "../components/DatePicker"
import TextArea from "../components/TextArea"
import FileUpload from "../components/FileUpload"
import Avatar from "../components/Avatar"
import Badge from "../components/Badge"
import IconButton from "../components/IconButton"
import ProgressBar from "../components/ProgressBar"
import { taskStore, type Task } from "../utils/taskStore"
import { Search, MoreVertical, Mic, Send, Play, Pause, Trash2 } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "other"
  content: string
  timestamp: string
  type: "text" | "audio"
  audioUrl?: string
  audioDuration?: string
}

const ViewTask = () => {
  const navigate = useNavigate()
  const { taskId } = useParams()
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "other",
      content: "Hi...",
      timestamp: "10:30 AM",
      type: "text",
    },
  ])

  const [taskData, setTaskData] = useState<Task | null>(null)

  // Voice to text functionality
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    // Initialize speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = "en-US"

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = ""
        for (let i = event.results.length - 1; i >= 0; i--) {
          if (event.results[i].isFinal) {
            finalTranscript = event.results[i][0].transcript + finalTranscript
          }
        }
        if (finalTranscript) {
          setCurrentMessage((prev) => prev + finalTranscript)
        }
      }

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  // Load task data
  useEffect(() => {
    if (taskId) {
      const task = taskStore.getTaskById(taskId)
      if (task) {
        setTaskData(task)
      } else {
        // Task not found, redirect to list
        navigate("/taskmanagement/list")
      }
    }
  }, [taskId, navigate])

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Task Management", href: "/taskmanagement" },
    { label: "View", href: "" },
  ]

  const priorityOptions = ["High", "Medium", "Low"]
  const statusOptions = ["Pending", "In Progress", "Completed"]
  const assigneeOptions = ["Aniket Parkar", "John Doe", "Jane Smith", "Test1", "Test2", "Test3"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // In view mode, inputs are disabled, so this function should not be called.
    // Keeping it here for type compatibility, but it won't have an effect.
    console.log("Attempted to change input in view-only mode.")
  }

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: currentMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      setMessages((prev) => [...prev, newMessage])
      setCurrentMessage("")
    }
  }

  const handleVoiceToText = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser")
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!taskData) {
    return (
      <div className="min-h-screen" style={{ fontFamily: "'PT Sans', sans-serif", color: "#5E5E5E" }}>
        <div className="p-6">
          <div className="text-center">
            <p>Loading task...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'PT Sans', sans-serif", color: "#5E5E5E" }}>
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbItems} onClick={(item) => item.href && navigate(item.href)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Task Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#5E5E5E" }}>
              Task Information: {taskData.name}
            </h3>

            <div className="space-y-4">
              <TextInput label="Task Name:" name="name" value={taskData.name} onChange={handleInputChange} disabled />

              <Select
                label="Assign to:"
                name="assignee"
                value={taskData.assignee}
                onChange={handleInputChange}
                options={assigneeOptions}
                disabled
              />

              <Select
                label="Priority Level:"
                name="priority"
                value={taskData.priority}
                onChange={handleInputChange}
                options={priorityOptions}
                disabled
              />

              <DatePicker
                label="Due Date:"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleInputChange}
                disabled
              />

              <Select
                label="Status:"
                name="status"
                value={taskData.status}
                onChange={handleInputChange}
                options={statusOptions}
                disabled
              />

              <TextArea
                label="Comments:"
                name="comments"
                value={taskData.comments}
                onChange={handleInputChange}
                rows={3}
                disabled
              />

              <TextArea
                label="Notes:"
                name="notes"
                value={taskData.notes || ""}
                onChange={handleInputChange}
                rows={3}
                disabled
              />

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#5E5E5E" }}>
                  Attachments:
                </label>
                <FileUpload
                  onChange={(files) => {
                    // This function will not be called if disabled, but kept for type compatibility
                    console.log("Attempted to upload file in view-only mode.")
                  }}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  multiple
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Chat Interface - Increased Height */}
          <div className="bg-white rounded-lg shadow flex flex-col h-[800px]">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar src="/placeholder.svg?height=40&width=40" name="Anurag Sharma" size="md" />
                <div>
                  <h4 className="font-medium" style={{ color: "#5E5E5E" }}>
                    Anurag Sharma
                  </h4>
                  <Badge content="Active" color="bg-green-500" size="sm" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <IconButton tooltip="Search">
                  <Search size={20} />
                </IconButton>
                <IconButton tooltip="More options">
                  <MoreVertical size={20} />
                </IconButton>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start space-x-2 max-w-xs">
                    {message.sender === "other" && (
                      <Avatar src="/placeholder.svg?height=32&width=32" name="Anurag Sharma" size="sm" />
                    )}
                    <div
                      className={`rounded-lg p-3 ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                      style={message.sender === "other" ? { color: "#5E5E5E" } : {}}
                    >
                      {message.type === "text" ? (
                        <p className="text-sm">{message.content}</p>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button onClick={handlePlayAudio} className="text-red-500">
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                          </button>
                          <div className="flex-1">
                            <ProgressBar value={30} showLabel={false} color="red" />
                          </div>
                          <span className="text-xs">{message.audioDuration}</span>
                          <IconButton tooltip="Delete">
                            <Trash2 size={14} />
                          </IconButton>
                        </div>
                      )}
                    </div>
                    {message.sender === "user" && (
                      <Avatar src="/placeholder.svg?height=32&width=32" name="You" size="sm" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={handleMessageInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ color: "#5E5E5E" }}
                  />
                </div>
                {/* Only one mic button for voice to text */}
                <button
                  onClick={handleVoiceToText}
                  className={`p-2 rounded-full ${
                    isListening ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
                  } hover:bg-opacity-80`}
                  title="Voice to Text"
                >
                  <Mic size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTask
