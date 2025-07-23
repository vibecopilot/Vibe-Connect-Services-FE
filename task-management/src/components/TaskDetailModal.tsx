
import type React from "react"

import { useState } from "react"
import Modal from "./Modal"
import TextArea from "./TextArea"
import Checkbox from "./Checkbox"
import FileUpload from "./FileUpload"
import Badge from "./Badge"
import { Bell, FileText, Hash } from "lucide-react"

interface SubTask {
  id: string
  title: string
  completed: boolean
}

interface Task {
  id: string
  title: string
  completed: boolean
  notes?: string
  subTasks?: SubTask[]
}

interface TaskDetailModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onSave: (task: Task) => void
}

const TaskDetailModal = ({ isOpen, onClose, task, onSave }: TaskDetailModalProps) => {
  const [editedTask, setEditedTask] = useState<Task | null>(task)
  const [newSubtask, setNewSubtask] = useState("")

  if (!editedTask) return null

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTask({
      ...editedTask,
      notes: e.target.value,
    })
  }

  const handleSubtaskToggle = (subtaskId: string, checked: boolean) => {
    if (editedTask && editedTask.subTasks) {
      setEditedTask({
        ...editedTask,
        subTasks: editedTask.subTasks.map((subtask) =>
          subtask.id === subtaskId ? { ...subtask, completed: checked } : subtask,
        ),
      })
    }
  }

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return

    const newSubtaskObj: SubTask = {
      id: `sub-${Date.now()}`,
      title: newSubtask,
      completed: false,
    }

    setEditedTask({
      ...editedTask,
      subTasks: [...(editedTask.subTasks || []), newSubtaskObj],
    })

    setNewSubtask("")
  }

  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask)
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editedTask.title}
      content={
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Badge
              content="Remind Me"
              icon={<Bell size={16} />}
              variant="subtle"
              color="bg-red-100"
              className="text-red-600"
            />
            <Badge
              content="Personal"
              icon={<FileText size={16} />}
              variant="subtle"
              color="bg-amber-100"
              className="text-amber-600"
            />
            <Badge
              content="Tags"
              icon={<Hash size={16} />}
              variant="subtle"
              color="bg-blue-100"
              className="text-blue-600"
            />
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-medium mb-2">Notes</h3>
            <TextArea
              label=""
              name="notes"
              value={editedTask.notes || ""}
              onChange={handleNotesChange}
              placeholder="Text......."
            />
          </div>

          {/* Sub Tasks */}
          <div>
            <h3 className="text-sm font-medium mb-2">Sub Tasks</h3>
            <div className="space-y-2">
              {editedTask.subTasks?.map((subtask) => (
                <div key={subtask.id} className="flex items-center">
                  <Checkbox
                    label={subtask.title}
                    checked={subtask.completed}
                    onChange={(e) => handleSubtaskToggle(subtask.id, e.target.value)}
                    name={`subtask-${subtask.id}`}
                  />
                </div>
              ))}
              <div className="flex items-center">
                <Checkbox label="Add a new subtask" checked={false} onChange={() => {}} name="new-subtask" />
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <h3 className="text-sm font-medium mb-2">Attachments</h3>
            <FileUpload onChange={() => {}} />
          </div>
        </div>
      }
      confirmText="Save"
      cancelText="Cancel"
      onConfirm={handleSave}
      onCancel={onClose}
    />
  )
}

export default TaskDetailModal
