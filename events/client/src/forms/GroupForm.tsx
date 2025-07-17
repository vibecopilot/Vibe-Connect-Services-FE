import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  ChangeEvent,
} from "react";
// Importing custom form components
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import ToggleSwitch from "../components/ToggleSwitch";
import Stepper from "../components/Stepper";
import Modal from "../components/Modal";

// Icons for stepper components
import GroupInfoIcon from '../assets/proflieSquare.png';
import AddMembersIcon from '../assets/profile.png';
import PrivacySettingsIcon from '../assets/group.png';
import Web from '../assets/web.png';

// Interface defining the structure of group form data
export interface GroupFormData {
  id?: number;                   // Optional group ID
  groupName: string;             // Name of the group (required)
  description: string;           // Group description
  profilePicture: string | null; // URL or path to profile image
  members: {                     // Array of group members
    name: string;
    email: string;
    role: string;
  }[];
  privacySettings: {             // Privacy configuration
    search: string;              // Who can search for the group
    join: string;                // Who can join the group
  };
  groupDetails: string;          // Additional group information
  fontStyle: string;             // Text formatting options
  fontSize: string;
  fontWeight: string;
  textColor: string;
  lineSpacing: string;
  bullets: string;               // Bullet point style
  dropCap: boolean;              // Drop cap feature toggle
  directlyAddMembers: boolean;   // Auto-add members without invitation
  groupEmail: string;            // Group contact email
}

// Interface for methods exposed via component ref
export interface GroupFormHandle {
  getPayload: () => GroupFormData | null;  // Returns validated form data
  resetForm: () => void;                   // Resets form to initial state
}

// Component props definition
interface GroupFormProps {
  initialData?: Partial<GroupFormData>;  // Prefill data for editing
  onSubmit?: (data: GroupFormData) => void; // Submit callback
  onCancel?: () => void;                   // Cancel callback
}

// Main form component with forwardRef for parent access
const GroupForm = forwardRef<GroupFormHandle, GroupFormProps>(
  ({ initialData, onSubmit, onCancel }, ref) => {
    // State management for all form fields
    const [groupName, setGroupName] = useState(initialData?.groupName || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [groupMembers, setGroupMembers] = useState(""); // Selected members
    const [invitationMessage, setInvitationMessage] = useState(""); // Custom invitation
    const [directlyAddMembers, setDirectlyAddMembers] = useState(initialData?.directlyAddMembers || false);
    const [privacySettings, setPrivacySettings] = useState({
      search: initialData?.privacySettings?.search || "Group members",
      join: initialData?.privacySettings?.join || "Only invited members"
    });
    const [groupDetails, setGroupDetails] = useState(initialData?.groupDetails || "");
    // Text formatting states
    const [fontStyle, setFontStyle] = useState(initialData?.fontStyle || "Times New Roman");
    const [fontSize, setFontSize] = useState(initialData?.fontSize || "14");
    const [fontWeight, setFontWeight] = useState(initialData?.fontWeight || "normal");
    const [textColor, setTextColor] = useState(initialData?.textColor || "#000000");
    const [lineSpacing, setLineSpacing] = useState(initialData?.lineSpacing || "1.0");
    const [bullets, setBullets] = useState(initialData?.bullets || "none");
    const [dropCap, setDropCap] = useState(initialData?.dropCap || false);
    const [groupEmail, setGroupEmail] = useState(initialData?.groupEmail || "");
    
    // State for template management
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [editingTemplateIndex, setEditingTemplateIndex] = useState<number | null>(null);
    const [editedTemplate, setEditedTemplate] = useState("");

    // Stepper configuration for privacy settings
    const formSteps = [
      { id: 1, title: 'Group Owners', icon: <img src={GroupInfoIcon} alt="Group Info" className="w-6 h-6" /> },
      { id: 2, title: 'Group Managers', icon: <img src={AddMembersIcon} alt="Add Members" className="w-6 h-6" /> },
      { id: 3, title: 'Group Members', icon: <img src={PrivacySettingsIcon} alt="Privacy Settings" className="w-6 h-6" /> },
      { id: 4, icon: <img src={Web} alt="web" className="w-6 h-6" />, title: 'Anyone on the Web' },
    ];

    // State for stepper selections
    const [viewConversationsSteps, setViewConversationsSteps] = useState<number[]>([]);
    const [postSteps, setPostSteps] = useState<number[]>([]);
    const [viewMembersSteps, setViewMembersSteps] = useState<number[]>([]);

    // Predefined invitation templates
    const templates = [
      { content: `Hi [Name],\n\nYou’ve been invited to join the group “Name”.\nThis group has been created to coordinate planning, updates, and discussions related to the upcoming product launch. Joining will ensure you're looped into key communications.\n\nClick below to accept the invitation and become a member:\n[Join Group]\n\nIf you weren’t expecting this invite, you can safely ignore it.\n\nBest regards,\nName` },
      { content: `Hi [Name],\n\nYou’ve been invited to join the group “Name” for team collaboration.\n\nClick below to accept the invitation:\n[Join Group]\n\nIf you have any questions, let us know.\n\nBest regards,\n[Your Name]` },
      { content: `Hey [Name],\n\nWe'd love for you to join our group "Name"! It's a place to connect and share.\n\n[Join Group]\n\nLet us know if you're interested!\n\nCheers,\n[Your Name]` }
    ];

    // Expose form methods to parent via ref
    useImperativeHandle(ref, () => ({
      // Validates and returns form data
      getPayload: () => {
        // Basic validation - group name is required
        if (!groupName.trim()) return null;
        return {
          groupName: groupName.trim(),
          description,
          members: [], // Currently empty - would be populated in real implementation
          privacySettings,
          groupDetails,
          fontStyle,
          fontSize,
          fontWeight,
          textColor,
          lineSpacing,
          bullets,
          dropCap,
          directlyAddMembers,
          profilePicture: null, // Currently null - would handle images in real implementation
          groupEmail
        };
      },
      // Resets all form fields to initial state
      resetForm: () => {
        setGroupName("");
        setDescription("");
        setGroupMembers("");
        setInvitationMessage("");
        setDirectlyAddMembers(false);
        setPrivacySettings({
          search: "Group members",
          join: "Only invited members"
        });
        setGroupDetails("");
        setFontStyle("Times New Roman");
        setFontSize("14");
        setFontWeight("normal");
        setTextColor("#000000");
        setLineSpacing("1.0");
        setBullets("none");
        setDropCap(false);
        setGroupEmail("");
      },
    }));

    // Generic input change handler
    const handleChange =
      (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setter(e.target.value);
      };

    // Handler for privacy setting changes
    const handlePrivacySettingChange = (setting: string, value: string) => {
      setPrivacySettings(prev => ({ ...prev, [setting]: value }));
    };

    // Form submission handler
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const payload = ref?.current?.getPayload();
      if (payload && onSubmit) onSubmit(payload);
    };

    // Template selection handler
    const handleTemplateSelect = (template: string) => {
      setInvitationMessage(template);
      setShowTemplateModal(false);
    };

    // Template editing handler
    const handleEditTemplate = (index: number, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent triggering template selection
      setEditingTemplateIndex(index);
      setEditedTemplate(templates[index].content);
    };

    // Save edited template
    const saveEditedTemplate = () => {
      if (editingTemplateIndex !== null) {
        // In a real app, this would update the template storage
        setEditingTemplateIndex(null);
        setEditedTemplate("");
      }
    };

    // Template modal content
    const templateModalContent = (
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template, index) => (
          <div 
            key={index} 
            className="border border-gray-300 p-4 rounded cursor-pointer relative group hover:shadow-md transition-shadow"
            onClick={() => handleTemplateSelect(template.content)}
          >
            {/* Edit button appears on hover */}
            <div 
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-200"
              onClick={(e) => handleEditTemplate(index, e)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                />
              </svg>
            </div>
            
            <h4 className="font-bold text-gray-800 mb-2">Template {index + 1}</h4>
            <p className="text-gray-600 whitespace-pre-wrap text-sm">{template.content}</p>
          </div>
        ))}
      </div>
    );

    return (
      <>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Form Header */}
          <div className="text-xl text-[#5E5E5E] text-center"><h3>Create Group</h3></div>
          <div className="border-b border-gray-300 mb-6"></div>

          {/* Group Information Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl text-[#5E5E5E]">Enter Group Info</h2>
              {/* Profile picture upload placeholder */}
              <div className="flex items-center">
                <div className="border border-gray-300 w-5 h-8 rounded flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-[#5E5E5E]">Add group profile picture</p>
              </div>
            </div>

            <div className="border-b border-gray-300 mb-6"></div>
            {/* Group name and email fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#5E5E5E]">
              <TextInput label="Group Name" name="groupName" value={groupName} onChange={handleChange(setGroupName)} required />
              <TextInput label="Group Email" name="groupEmail" value={groupEmail} onChange={e => setGroupEmail(e.target.value)} type="email" />
              <TextArea label="Group Description" name="description" value={description} onChange={handleChange(setDescription)} rows={3} />
            </div>
          </div>

          {/* Member Management Section */}
          <div className="text-[#5E5E5E] pb-6">
            <h2 className="text-xl text-[#5E5E5E] mb-6">Add members</h2>
            <div className="mb-4">
              {/* Member selection dropdown */}
              <div className="mb-5 w-1/3">
              <Select
                label="Group Members"
                name="groupMembers"
                value={groupMembers}
                onChange={(e) => setGroupMembers(e.target.value)}
                options={[
                  "Add Group members",
                  "Ravindra Sahani",
                  "Sejal Meher",
                  "Mohit Pasi ",
                  "Anurag Sharma",
                  "Aniket Parkar"
                ]}
              />
              </div>
              
              {/* Invitation message with template selection */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="invitationMessage" className="block text-sm font-medium text-gray-700">
                    Invitation Message
                  </label>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-[#5E5E5E]"
                    onClick={() => setShowTemplateModal(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#5E5E5E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Select Template
                  </button>
                </div>
                <TextArea
                  name="invitationMessage"
                  value={invitationMessage}
                  onChange={e => setInvitationMessage(e.target.value)}
                  rows={3}
                  className="text-[#5E5E5E]"
                />
              </div>
              
              {/* Direct add members toggle */}
              <div className="flex items-center gap-3 mt-4">
                <ToggleSwitch isOn={directlyAddMembers} handleToggle={() => setDirectlyAddMembers(!directlyAddMembers)} />
                <span className="font-medium text-[#5E5E5E]">Directly add members</span>
              </div>
              <div className="text-sm text-gray-500 ml-17">Send invitations to join the group</div>
            </div>
          </div>

          {/* Privacy Settings Section */}
          <div className="pb-6 text-[#5E5E5E]">
            <h2 className="text-xl text-[#5E5E5E] mb-6">Choose privacy settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Privacy dropdowns */}
              <Select
                label="Who can search for the group"
                name="search"
                value={privacySettings.search}
                onChange={(e) => handlePrivacySettingChange('search', e.target.value)}
                options={[
                  "Group members",
                  "Only invited users",
                  "Anyone can ask",
                  "Anyone from the organisation"
                ]}
              />
              <Select
                label="Who can join the group"
                name="join"
                value={privacySettings.join}
                onChange={(e) => handlePrivacySettingChange('join', e.target.value)}
                options={[
                  "Only invited users",
                  "Group members",
                  "Anyone from the organisation"
                ]}
              />
            </div>
            
            {/* Stepper-based permission controls */}
            <div className="mt-12">
              <div className="text-[#5E5E5E]">Who can view conversations</div>
              <Stepper steps={formSteps} activeSteps={viewConversationsSteps} onStepClick={setViewConversationsSteps} color="#3b82f6" />
              
              <div className="text-[#5E5E5E]">Who can post</div>
              <Stepper steps={formSteps} activeSteps={postSteps} onStepClick={setPostSteps} color="#3b82f6" />
              
              <div className="text-[#5E5E5E]">Who can view members</div>
              <Stepper steps={formSteps} activeSteps={viewMembersSteps} onStepClick={setViewMembersSteps} color="#3b82f6" />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={onCancel} className="px-6 py-2 text-[#5E5E5E] rounded ">Cancel</button>
            <button type="submit" className="px-6 py-2 text-[#7991BB] rounded">Create Group</button>
          </div>
        </form>

        {/* Template Selection Modal */}
        <Modal
          isOpen={showTemplateModal}
          onClose={() => setShowTemplateModal(false)}
          title={<div className="text-left w-full">Select Template</div>}
          content={templateModalContent}
          showFooter={false}
          width="max-w-4xl"
          showDivider={false}
          hideCloseIcon={true}
          width="w-auto"
        />

        {/* Template Editing Modal */}
        <Modal
          isOpen={editingTemplateIndex !== null}
          onClose={() => setEditingTemplateIndex(null)}
          hideCloseIcon={true}
          showDivider={false}
          title=" "
          content={
            <div className="w-full text-[#5E5E5E]">
              <TextArea
                value={editedTemplate}
                onChange={(e) => setEditedTemplate(e.target.value)}
                rows={8}
                className="w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-[#5E5E5E] rounded"
                  onClick={() => setEditingTemplateIndex(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#7991BB] text-white rounded "
                  onClick={saveEditedTemplate}
                >
                  Save
                </button>
              </div>
            </div>
          }
          width="w-auto"
          hideConfirmButton={true}
        />
      </>
    );
  }
);

export default GroupForm;