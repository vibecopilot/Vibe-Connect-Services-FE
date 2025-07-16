// GroupForm.tsx
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  ChangeEvent,
} from "react";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import ToggleSwitch from "../components/ToggleSwitch";
import Stepper from "../components/Stepper";

// Import your icons
import GroupInfoIcon from '../assets/proflieSquare.png';
import AddMembersIcon from '../assets/profile.png';
import PrivacySettingsIcon from '../assets/group.png';
import Web from '../assets/web.png';

export interface GroupFormData {
  id?: number;
  groupName: string;
  description: string;
  profilePicture: string | null;
  members: {
    name: string;
    email: string;
    role: string;
  }[];
  privacySettings: {
    search: string;
    join: string;
  };
  groupDetails: string;
  fontStyle: string;
  fontSize: string;
  fontWeight: string;
  textColor: string;
  lineSpacing: string;
  bullets: string;
  dropCap: boolean;
  directlyAddMembers: boolean;
  groupEmail: string;
}

export interface GroupFormHandle {
  getPayload: () => GroupFormData | null;
  resetForm: () => void;
}

interface GroupFormProps {
  initialData?: Partial<GroupFormData>;
  onSubmit?: (data: GroupFormData) => void;
  onCancel?: () => void;
}

const GroupForm = forwardRef<GroupFormHandle, GroupFormProps>(
  ({ initialData, onSubmit, onCancel }, ref) => {
    const [groupName, setGroupName] = useState(initialData?.groupName || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [groupMembers, setGroupMembers] = useState("");
    const [invitationMessage, setInvitationMessage] = useState("");
    const [directlyAddMembers, setDirectlyAddMembers] = useState(initialData?.directlyAddMembers || false);
    const [privacySettings, setPrivacySettings] = useState({
      search: initialData?.privacySettings?.search || "Group members",
      join: initialData?.privacySettings?.join || "Only invited members"
    });
    const [groupDetails, setGroupDetails] = useState(initialData?.groupDetails || "");
    const [fontStyle, setFontStyle] = useState(initialData?.fontStyle || "Times New Roman");
    const [fontSize, setFontSize] = useState(initialData?.fontSize || "14");
    const [fontWeight, setFontWeight] = useState(initialData?.fontWeight || "normal");
    const [textColor, setTextColor] = useState(initialData?.textColor || "#000000");
    const [lineSpacing, setLineSpacing] = useState(initialData?.lineSpacing || "1.0");
    const [bullets, setBullets] = useState(initialData?.bullets || "none");
    const [dropCap, setDropCap] = useState(initialData?.dropCap || false);
    const [groupEmail, setGroupEmail] = useState(initialData?.groupEmail || "");

    // Stepper configuration with icons
    const formSteps = [
      { id: 1, title: 'Group Owners', icon: <img src={GroupInfoIcon} alt="Group Info" className="w-6 h-6" /> },
      { id: 2, title: 'Group Managers', icon: <img src={AddMembersIcon} alt="Add Members" className="w-6 h-6" /> },
      { id: 3, title: 'Group Memebers', icon: <img src={PrivacySettingsIcon} alt="Privacy Settings" className="w-6 h-6" /> },
      { id: 4, icon: <img src={Web} alt="web" className="w-6 h-6" /> , title: 'Anyone on the Web', },
    ];
    const [currentStep, setCurrentStep] = useState(2); // Start at last step
    const [viewConversationsStep, setViewConversationsStep] = useState(0);
    const [postStep, setPostStep] = useState(0);
    const [viewMembersStep, setViewMembersStep] = useState(0);

    useImperativeHandle(ref, () => ({
      getPayload: () => {
        if (!groupName.trim()) {
          return null;
        }
        return {
          groupName: groupName.trim(),
          description,
          members: [],
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
          profilePicture: null,
          groupEmail
        };
      },
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

    const handleChange =
      (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setter(e.target.value);
      };

    const handlePrivacySettingChange = (setting: string, value: string) => {
      setPrivacySettings(prev => ({
        ...prev,
        [setting]: value
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (ref && "current" in ref && ref.current) {
        const payload = ref.current.getPayload();
        if (payload && onSubmit) {
          onSubmit(payload);
        }
      }
    };

    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          {/* Group Info Section */}
          <div className="border-b pb-6">
            {/* Combined headers in one line */}
            <div className="flex justify-between items-center mb-6">
              {/* Group Info heading */}
              <h2 className="text-xl font-bold">Enter Group Info</h2>
              {/* Add group profile picture section */}
              <div className="flex items-center">
                <div className="border border-gray-300 w-5 h-8 rounded flex items-center justify-center mr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-gray-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 4v16m8-8H4" 
                    />
                  </svg>
                </div>
                <p>Add group profile picture</p>
              </div>
            </div>
            
            {/* Added horizontal divider line */}
            <div className="border-b border-gray-300 mb-6"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="Group Name *"
                name="groupName"
                value={groupName}
                onChange={handleChange(setGroupName)}
                required
              />
              <TextInput
                label="Group Email"
                name="groupEmail"
                value={groupEmail}
                onChange={e => setGroupEmail(e.target.value)}
                type="email"
              />
              <TextArea
                label="Group Description"
                name="description"
                value={description}
                onChange={handleChange(setDescription)}
                rows={3}
              />
            </div>
          </div>
          
          {/* Add Members Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold mb-6">Add members</h2>
            <div className="mb-4">
              <TextInput
                label="Group Members"
                name="groupMembers"
                value={groupMembers}
                onChange={e => setGroupMembers(e.target.value)}
              />
              <TextArea
                label="Invitation Message"
                name="invitationMessage"
                value={invitationMessage}
                onChange={e => setInvitationMessage(e.target.value)}
                rows={3}
              />
              <div className="flex items-center gap-3 mt-4">
                <ToggleSwitch 
                  isOn={directlyAddMembers} 
                  handleToggle={() => setDirectlyAddMembers(!directlyAddMembers)} 
                />
                <span className="font-medium">Directly add members</span>
              </div>
              <div className="text-sm text-gray-500 ml-17">Send invitations to join the group</div>
            </div>
          </div>
          
          {/* Privacy Settings Section - REMOVED BORDER-B */}
          <div className="pb-6"> {/* Changed from border-b pb-6 to just pb-6 */}
            <h2 className="text-xl font-bold mb-6">Choose privacy settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Who can search for the group"
                name="search"
                value={privacySettings.search}
                onChange={(e) => handlePrivacySettingChange('search', e.target.value)}
                options={[
                  { value: "Group members", label: "Group members" },
                  { value: "Anyone on the web", label: "Anyone on the web" }
                ]}
              />
              <Select
                label="Who can join the group"
                name="join"
                value={privacySettings.join}
                onChange={(e) => handlePrivacySettingChange('join', e.target.value)}
                options={[
                  { value: "Only invited members", label: "Only invited members" },
                  { value: "Anyone can ask", label: "Anyone can ask" },
                  { value: "Anyone can join", label: "Anyone can join" }
                ]}
              />
            </div>
            <div className="mt-10">
              <div className="mb-2 font-semibold">Who can view conversations</div>
              <Stepper 
                steps={formSteps}
                activeStep={viewConversationsStep}
                onStepClick={setViewConversationsStep}
                color="#3b82f6"
                className="mb-6"
              />
              <div className="mb-2 font-semibold">Who can post</div>
              <Stepper 
                steps={formSteps}
                activeStep={postStep}
                onStepClick={setPostStep}
                color="#3b82f6"
                className="mb-6"
              />
              <div className="mb-2 font-semibold">Who can view members</div>
              <Stepper 
                steps={formSteps}
                activeStep={viewMembersStep}
                onStepClick={setViewMembersStep}
                color="#3b82f6"
                className="mb-6"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-blue-600 rounded"
          >
            Create Group
          </button>
        </div>
      </form>
    );
  }
);

export default GroupForm;