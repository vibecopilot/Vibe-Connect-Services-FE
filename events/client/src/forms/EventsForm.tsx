import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  ChangeEvent,
  useRef,
  useEffect
} from "react";
// Importing image assets for carousel
import EventImage1 from "../assets/Eventimage1.webp";
import EventImage2 from "../assets/Hindu-Holi-Festival-Mathura-Uttar-Pradesh-India.webp";
// Importing custom form components
import TextInput from "../components/TextInput";
import FileUpload from "../components/FileUpload";
import Carousel from "../components/Carousel";
import TextArea from "../components/TextArea";
import RadioButton from "../components/RadioButton";
import DatePicker from "../components/DatePicker";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";

// Interface defining the structure of event form data
export interface EventsFormData {
  id?: number;                   // Optional unique identifier
  title: string;                 // Event title (required)
  venue: string;                 // Event location (required)
  description: string;           // Detailed description
  createdBy: string;             // Creator of the event
  startDate: string;             // Event start date
  endDate: string;               // Event end date
  eventType: string;             // Type of event (default: Fitout)
  status: string;                // Current status (default: Active)
  attachments: string[];         // List of attachment filenames
  mediaTheme: string;            // Selected media theme
  phoneOrVideo: string;          // Media type preference
  important: boolean;            // Importance flag
  email: string;                 // Contact email
  url: string;                   // Related URL
  shareMessage: string;          // Custom share message
  displayedImage: string | null; // Filename of displayed image
}

// Interface for methods exposed via component ref
export interface EventsFormHandle {
  getPayload: () => EventsFormData | null;  // Validates and returns form data
  resetForm: () => void;                   // Resets form to initial state
}

// Component props definition
interface EventsFormProps {
  initialData?: Partial<EventsFormData>;  // Initial data for editing
  onSubmit?: (data: EventsFormData) => void; // Submit callback
  onCancel?: () => void;                   // Cancel callback
  onDelete?: () => void;                   // Delete callback
}

// Predefined theme images for carousel
const predefinedImages = [
  { id: 1, src: EventImage1, name: "event1.jpg" },
  { id: 2, src: EventImage2, name: "event2.jpg" },
];

// Main form component with forwardRef for parent access
const EventsForm = forwardRef<EventsFormHandle, EventsFormProps>(
  ({ initialData, onSubmit, onCancel, onDelete }, ref) => {
    // State management for all form fields
    const [title, setTitle] = useState(initialData?.title || "");
    const [venue, setVenue] = useState(initialData?.venue || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [createdBy, setCreatedBy] = useState(initialData?.createdBy || "");
    const [startDate, setStartDate] = useState(initialData?.startDate || "");
    const [endDate, setEndDate] = useState(initialData?.endDate || "");
    const [eventType, setEventType] = useState(initialData?.eventType || "Fitout");
    const [status, setStatus] = useState(initialData?.status || "Active");
    const [attachments, setAttachments] = useState<string[]>(initialData?.attachments || []);
    const [mediaTheme, setMediaTheme] = useState(initialData?.mediaTheme || "");
    const [phoneOrVideo, setPhoneOrVideo] = useState(initialData?.phoneOrVideo || "");
    const [important, setImportant] = useState(initialData?.important || false);
    const [email, setEmail] = useState(initialData?.email || "");
    const [url, setUrl] = useState(initialData?.url || "");
    const [shareMessage, setShareMessage] = useState(initialData?.shareMessage || "");
    const [displayedImage, setDisplayedImage] = useState<string | null>(null);
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null); // For carousel selection
    const [rsvp, setRsvp] = useState<string>(""); // RSVP selection state

    // Ref for hidden file input element for image upload
    const displayedImageInputRef = useRef<HTMLInputElement>(null);

    // Initialize displayed image from initialData
    useEffect(() => {
      if (initialData?.displayedImage) {
        setDisplayedImage(initialData.displayedImage);
        // Match initial image with predefined images
        const matchedImage = predefinedImages.find(
          img => img.name === initialData.displayedImage
        );
        if (matchedImage) {
          setSelectedImageId(matchedImage.id);
        }
      }
    }, [initialData]);

    // Expose form methods to parent via ref
    useImperativeHandle(ref, () => ({
      // Validates and returns form data
      getPayload: () => {
        // Basic validation for required fields
        if (!title.trim() || !venue.trim()) return null;
        return {
          title: title.trim(),
          venue: venue.trim(),
          description,
          createdBy,
          startDate,
          endDate,
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
      // Resets all form fields to initial state
      resetForm: () => {
        setTitle("");
        setVenue("");
        setDescription("");
        setCreatedBy("");
        setStartDate("");
        setEndDate("");
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
        setRsvp("");
      },
    }));

    // Generic input change handler
    const handleChange =
      (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setter(e.target.value);
      };

    // Handle file attachment changes
    const handleAttachmentsChange = (files: FileList | null) => {
      if (files) {
        // Store only filenames
        const fileNames = Array.from(files).map(file => file.name);
        setAttachments(prev => [...prev, ...fileNames]);
      }
    };

    // Handle theme image selection from carousel
    const handlePredefinedImageClick = (imageSrc: string) => {
      const matchedImage = predefinedImages.find(img => img.src === imageSrc);
      if (matchedImage) {
        setSelectedImageId(matchedImage.id);
        setDisplayedImage(matchedImage.name);
        // Reset file input if image is selected from carousel
        if (displayedImageInputRef.current) {
          displayedImageInputRef.current.value = "";
        }
      }
    };

    // Form submission handler
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Use ref to get validated data
      if (ref && "current" in ref && ref.current) {
        const payload = ref.current.getPayload();
        if (payload && onSubmit) {
          onSubmit(payload);
        }
      }
    };

    // JSX rendering starts here
    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="pb-4">
            {/* Form header */}
            <div className="text-center mb-4 text-2xl text-[#5E5E5E]">
              <h1>Create Event</h1>
            </div>
            <div className="border-b border-gray-300 mb-4"></div>
            
            {/* Event Info Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[#5E5E5E]">Events Info</label>
                {/* Template button */}
                <button 
                  type="button"
                  className="px-3 py-1 bg-gray-200 text-[#5E5E5E] rounded hover:bg-gray-300 text-sm"
                >
                  Add Template
                </button>
              </div>
              <div className="border-b border-gray-300 mb-4"></div>
              
              {/* Media Theme Selection */}
              <label className="text-[#5E5E5E]">Events photo or video</label>
              <div className="bg-gray-100 p-10 rounded-lg border border-gray-200 mx-60">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    {/* Theme icon */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-[#5E5E5E]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <h3 className="">Choose a Theme</h3>
                  </div>
                  {/* Custom image upload button */}
                  <button
                    type="button"
                    className="flex items-center px-3 py-1 text-[#5E5E5E]"
                    onClick={() => displayedImageInputRef.current?.click()}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1" 
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
                    Add Photo or Video
                  </button>
                  {/* Hidden file input */}
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
                <div className="border-b border-gray-300 mb-4"></div>
                <p className="text-sm text-[#5E5E5E] mb-4">Recommended Themes</p>
                
                {/* Theme Carousel */}
                <div className="mb-4">
                  <Carousel
                    items={predefinedImages.map(img => img.src)}
                    autoPlay={false}
                    interval={3000}
                    showArrows={true}
                    showIndicators={true}
                    loop={true}
                    className="w-full max-w-md mx-auto h-64"
                  >
                    {(item, index) => {
                      const matchedImage = predefinedImages.find(img => img.src === item);
                      const isSelected = matchedImage && selectedImageId === matchedImage.id;
                      return (
                        <div 
                          className={`relative w-full h-full cursor-pointer ${
                            isSelected 
                              ? 'border-4 border-blue-500 ring-2 ring-blue-300' 
                              : 'border-2 border-gray-200'
                          } rounded-lg overflow-hidden`}
                          onClick={() => handlePredefinedImageClick(item)}
                        >
                          <img
                            src={item}
                            alt={`Slide ${index}`}
                            className="w-full h-full object-cover"
                          />
                          {/* Selection indicator */}
                          {isSelected && (
                            <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                              <div className="bg-white p-1 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }}
                  </Carousel>
                </div>
              </div>
            </div>

            {/* Title and Venue Fields */}
            <div className="text-[#5E5E5E] grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Title *" name="title" value={title} onChange={handleChange(setTitle)} required />
              <TextInput label="Venue *" name="venue" value={venue} onChange={handleChange(setVenue)} required />
            </div>

            {/* Date Fields */}
            <div className="text-[#5E5E5E] grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <DatePicker label="Start Date" name="startDate" value={startDate} onChange={handleChange(setStartDate)} />
              <DatePicker label="End Date" name="endDate" value={endDate} onChange={handleChange(setEndDate)} />
            </div>

            {/* Description and Options */}
            <div className="mt-4 text-[#5E5E5E]">
              <label className="block mb-1 text-[#5E5E5E]">Description</label>
              <TextArea name="description" value={description} onChange={handleChange(setDescription)} rows={3} />
              <div className="flex flex-wrap items-center gap-6 mt-4">
                {/* Importance checkbox */}
                <Checkbox label="Mark As Important" checked={important} onChange={() => setImportant(!important)} />
                <div className="flex items-center">
                  {/* Email checkbox with URL button */}
                  <Checkbox label="Send Email" checked={!!email} onChange={e => setEmail(e.target.checked ? "yes" : "")} />
                  <button type="button" className="flex items-center border border-[#5E5E5E] rounded-md px-10 py-1 ml-7 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Add URL
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sharing Section */}
          <div className="pb-4">
            <h2 className="text-[#5E5E5E] mb-4">Share With</h2>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex gap-4 items-center">
              {/* "All" sharing option */}
              <button
                type="button"
                className={`px-7 py-2 rounded-4xl border border-[#7991BB] focus:outline-none focus:ring-2 focus:ring-[#7991BB] ${
                  shareMessage === "All" ? "bg-[#7991BB] text-white" : "bg-white text-[#7991BB]"
                }`}
                onClick={() => setShareMessage("All")}
              >
                All
              </button>
              
              {/* Individual sharing dropdown */}
              <Select
                name="individuals"
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                options={[
                  { label: "Individuals", value: "Individuals" },
                  { label: "Abhishek", value: "Abhishek" },
                  { label: "Raghav", value: "Raghav" },
                  { label: "Neha", value: "Neha" },
                  { label: "Shweta", value: "Shweta" },
                  { label: "Riya", value: "Riya" },
                ]}
                className={`mt-4 text-sm px-5 py-2 rounded-4xl border border-[#7991BB] focus:outline-none focus:ring-2 focus:ring-[#7991BB] ${
                  shareMessage === "All" ? "text-white" : "bg-white text-[#7991BB]"
                }`}
              />
              
              {/* Group sharing dropdown */}
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
                  shareMessage === "All" ? "text-white" : "bg-white text-[#7991BB]"
                }`}
              />
            </div>
          </div>

          {/* RSVP Section */}
          <div className="mb-10">
            <h2 className="text-lg mb-4 text-[#5E5E5E]">RSVP</h2>
            <div className="border-t border-gray-300 pt-4">
              <RadioButton name="rsvp" options={["Yes", "No"]} value={rsvp} onChange={(e) => setRsvp(e.target.value)} layout="horizontal" />
            </div>
          </div>

          {/* File Attachment Section */}
          <div>
            <h2 className="text-lg text-[#5E5E5E] mb-2">Upload Attachments</h2>
            <div className="border-t border-gray-300 pt-4"></div>
            <div className="mb-6">
              {/* File upload component */}
              <FileUpload
                label=" "
                multiple={true}
                onChange={handleAttachmentsChange}
                fileSize="10 MB"
                accept="*"
              />
              {/* Attachment list */}
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
          <button type="submit" className="px-6 py-2 bg-[#7991BB] text-white rounded">Submit</button>
        </div>
      </form>
    );
  }
);

export default EventsForm;