// React core imports and hooks
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  ChangeEvent,
  useRef,
  useEffect
} from "react";

// Predefined broadcast images
import EventImage1 from "../assets/Eventimage1.webp";
import EventImage2 from "../assets/Hindu-Holi-Festival-Mathura-Uttar-Pradesh-India.webp";

// Custom components
import TextInput from "../components/TextInput";
import FileUpload from "../components/FileUpload";
import Carousel from "../components/Carousel";
import TextArea from "../components/TextArea";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";

// Type definitions for the broadcast form
export interface BroadcastFormData {
  id?: number;
  title: string;
  description: string;
  createdBy: string;
  eventType: string;
  status: string;
  attachments: string[];
  mediaTheme: string;
  phoneOrVideo: string;
  important: boolean;
  email: string;
  url: string;
  shareMessage: string;
  displayedImage: string | null;
}

// Interface for external form control via ref
export interface BroadcastFormHandle {
  getPayload: () => BroadcastFormData | null;
  resetForm: () => void;
}

// Props accepted by the form component
interface BroadcastFormProps {
  initialData?: Partial<BroadcastFormData>;
  onSubmit?: (data: BroadcastFormData) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

// Hardcoded theme image options
const predefinedImages = [
  { id: 1, src: EventImage1, name: "event1.jpg" },
  { id: 2, src: EventImage2, name: "event2.jpg" },
];

// Main component definition with forwardRef for external access
const BroadcastForm = forwardRef<BroadcastFormHandle, BroadcastFormProps>(
  ({ initialData, onSubmit }, ref) => {

    // State variables for form fields
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [createdBy, setCreatedBy] = useState(initialData?.createdBy || "");
    const [eventType, setEventType] = useState(initialData?.eventType || "Fitout");
    const [status, setStatus] = useState(initialData?.status || "Active");
    const [attachments, setAttachments] = useState<string[]>(initialData?.attachments || []);
    const [mediaTheme, setMediaTheme] = useState(initialData?.mediaTheme || "");
    const [phoneOrVideo, setPhoneOrVideo] = useState(initialData?.phoneOrVideo || "");
    const [important, setImportant] = useState(initialData?.important || false);
    const [email, setEmail] = useState(initialData?.email || "");
    const [url, setUrl] = useState(initialData?.url || "");
    const [shareMessage, setShareMessage] = useState(initialData?.shareMessage || "");
    const [displayedImage, setDisplayedImage] = useState<string | null>(initialData?.displayedImage || null);
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
    const displayedImageInputRef = useRef<HTMLInputElement>(null);

    // If editing existing data, preload the displayed image
    useEffect(() => {
      if (initialData?.displayedImage) {
        setDisplayedImage(initialData.displayedImage);
        const matchedImage = predefinedImages.find(img => img.name === initialData.displayedImage);
        if (matchedImage) {
          setSelectedImageId(matchedImage.id);
        }
      }
    }, [initialData]);

    // Expose form methods (getPayload, resetForm) via ref
    useImperativeHandle(ref, () => ({
      getPayload: () => {
        if (!title.trim()) {
          alert("Title is required");
          return null;
        }
        return {
          title: title.trim(),
          description,
          createdBy,
          eventType,
          status,
          attachments,
          mediaTheme,
          phoneOrVideo,
          important,
          email,
          url,
          shareMessage,
          displayedImage
        };
      },
      resetForm: () => {
        setTitle("");
        setDescription("");
        setCreatedBy("");
        setEventType("Fitout");
        setStatus("Active");
        setAttachments([]);
        setMediaTheme("");
        setPhoneOrVideo("");
        setImportant(false);
        setEmail("");
        setUrl("");
        setShareMessage("");
        setDisplayedImage(null);
        setSelectedImageId(null);
      },
    }));

    // Generic handler for simple input updates
    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setter(e.target.value);
      };

    // Handle file attachments
    const handleAttachmentsChange = (files: FileList | null) => {
      if (files) {
        const fileNames = Array.from(files).map(file => file.name);
        setAttachments(prev => [...prev, ...fileNames]);
      }
    };

    // When selecting a predefined image
    const handlePredefinedImageClick = (imageSrc: string) => {
      const matchedImage = predefinedImages.find(img => img.src === imageSrc);
      if (matchedImage) {
        setSelectedImageId(matchedImage.id);
        setDisplayedImage(matchedImage.name);
        if (displayedImageInputRef.current) {
          displayedImageInputRef.current.value = "";
        }
      }
    };

    // Handle final form submit
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (ref && "current" in ref && ref.current) {
        const payload = ref.current.getPayload();
        if (payload && onSubmit) {
          onSubmit(payload);
        }
      }
    };

    // Main render
    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Form Header */}
          <div className="pb-4">
            <div className="mb-2 pb-4 text-center Vibe Marketing team">
              <h2 className="text-2xl text-[#5E5E5E]">Create Broadcast</h2>
            </div>
            <div className="border-b border-gray-300 mb-4"></div>

            {/* Media Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-[#5E5E5E]">Broadcasts Info</label>
                <button type="button" className="px-3 py-1 bg-gray-200 text-[#5E5E5E] rounded hover:bg-gray-300 text-sm">
                  Add Template
                </button>
              </div>
              <div className="border-b border-gray-300 mb-4"></div>

              {/* Displayed Media Input */}
              <label className="block text-[#5E5E5E]">Broadcasts  photo or video</label>
              <div className="bg-gray-100 p-10 rounded-lg border border-gray-200 mx-60">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#5E5E5E]">Choose a Theme</h3>
                  <button
                    type="button"
                    className="flex items-center px-3 py-1 text-[#5E5E5E]"
                    onClick={() => displayedImageInputRef.current?.click()}
                  >
                    Add Photo or Video
                  </button>
                  <input
                    type="file"
                    ref={displayedImageInputRef}
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setSelectedImageId(null);
                        setDisplayedImage(file.name);
                      }
                    }}
                  />
                </div>

                {/* Image carousel */}
                <div className="border-b border-gray-300 mb-4"></div>
                <p className="text-sm text-[#5E5E5E] mb-4">Recommended Themes</p>
                <Carousel
                  items={predefinedImages.map(img => img.src)}
                  autoPlay={false}
                  interval={3000}
                  showArrows
                  showIndicators
                  loop
                  className="w-full max-w-md mx-auto h-64"
                >
                  {(item, index) => {
                    const matchedImage = predefinedImages.find(img => img.src === item);
                    const isSelected = matchedImage && selectedImageId === matchedImage.id;
                    return (
                      <div
                        className={`relative w-full h-full cursor-pointer ${isSelected
                          ? 'border-4 border-blue-500 ring-2 ring-blue-300'
                          : 'border-2 text-[#5E5E5E]'} rounded-lg overflow-hidden`}
                        onClick={() => handlePredefinedImageClick(item)}
                      >
                        <img src={item} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                      </div>
                    );
                  }}
                </Carousel>
              </div>
            </div>

            {/* Basic Fields */}
            <TextInput label="Title" name="title" value={title} onChange={handleChange(setTitle)} required />
            <div className="mt-4">
              <label className="block mb-1 text-[#5E5E5E]">Description</label>
              <TextArea name="description" value={description} onChange={handleChange(setDescription)} rows={3} />

              {/* Important + Email + Add URL */}
              <div className="flex flex-wrap items-center gap-6 mt-4">
                <Checkbox label="Mark As Important" checked={important} onChange={() => setImportant(!important)} />
                <div className="flex items-center">
                  <Checkbox
                    label="Send Email"
                    checked={!!email}
                    onChange={(e) => setEmail(e.target.checked ? "yes" : "")}
                  />
                  <button
                    type="button"
                    className="flex items-center border border-[#5E5E5E] text-[#5E5E5E] rounded-md px-10 py-1 ml-7 mb-4"
                    onClick={() => {
                      const enteredUrl = prompt("Enter a URL:");
                      if (enteredUrl) setUrl(enteredUrl);
                    }}
                  >
                    {/* Link Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Add URL
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Share With Section */}
          <div className="pb-4">
            <h2 className="text-[#5E5E5E] mb-4">Share With</h2>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex gap-4 items-center">
              {/* All Button */}
              <button
                type="button"
                className={`px-7 py-2 rounded-4xl border border-[#7991BB] focus:outline-none focus:ring-2 focus:ring-[#7991BB] ${
                  shareMessage === "All" ? "bg-[#7991BB] text-white" : "bg-white text-[#7991BB]"
                }`}
                onClick={() => setShareMessage("All")}
              >
                All
              </button>

              {/* Individuals Dropdown */}
              <Select
                name="individuals"
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                options={[
                  { label: "Individuals", value: "Individuals" },
                  { label: "Abhishek", value: "Abhishek" },
                  { label: "Raghav", value: "Raghav" },
                  { label: "Neha", value: "Neha" },
                ]}
                className={`mt-4 text-sm px-5 py-2 rounded-4xl border border-[#7991BB] focus:outline-none focus:ring-2 focus:ring-[#7991BB] ${
                  shareMessage === "All" ? "text-[#7991BB]" : "bg-white text-[#7991BB]"
                }`}
              />

              {/* Groups Dropdown */}
              <Select
                name="groups"
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                options={[
                  { label: "Groups", value: "Groups" },
                  { label: "Sports Group", value: "Sports Group" },
                  { label: "Operations Debt", value: "Operations Debt" },
                  { label: "Marketing Debt", value: "Marketing Debt" },
                ]}
                className={`mt-4 text-center text-sm px-1 py-2 rounded-4xl border border-[#7991BB] focus:outline-none focus:ring-2 focus:ring-[#7991BB] ${
                  shareMessage === "All" ? "text-[#7991BB]" : "bg-white text-[#7991BB]"
                }`}
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div>
            <h2 className="text-[#5E5E5E] mb-7">Upload Attachments</h2>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="mb-6">
              <FileUpload label=" " multiple onChange={handleAttachmentsChange} fileSize="10 MB" accept="*" />
              {attachments.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Attachments:</h3>
                  <ul className="list-disc pl-5">
                    {attachments.map((file, index) => (
                      <li key={index} className="text-sm text-[#5E5E5E]">{file}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button type="submit" className="px-6 py-2 bg-[#7991BB] text-white rounded">
            Submit
          </button>
        </div>
      </form>
    );
  }
);

export default BroadcastForm;
