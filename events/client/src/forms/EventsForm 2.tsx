import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  ChangeEvent,
  useRef,
  useEffect
} from "react";
import EventImage1 from "../assets/Eventimage1.webp";
import EventImage2 from "../assets/Hindu-Holi-Festival-Mathura-Uttar-Pradesh-India.webp";
import TextInput from "../components/TextInput";
import FileUpload from "../components/FileUpload";
import Carousel from "../components/Carousel";
import TextArea from "../components/TextArea";
import RadioButton from "../components/RadioButton";
import DatePicker from "../components/DatePicker";
import Checkbox from "../components/Checkbox";

export interface EventsFormData {
  id?: number;
  title: string;
  venue: string;
  description: string;
  createdBy: string;
  startDate: string;
  endDate: string;
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

export interface EventsFormHandle {
  getPayload: () => EventsFormData | null;
  resetForm: () => void;
}

interface EventsFormProps {
  initialData?: Partial<EventsFormData>;
  onSubmit?: (data: EventsFormData) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const predefinedImages = [
  { id: 1, src: EventImage1, name: "event1.jpg" },
  { id: 2, src: EventImage2, name: "event2.jpg" },
];

const EventsForm = forwardRef<EventsFormHandle, EventsFormProps>(
  ({ initialData, onSubmit, onCancel, onDelete }, ref) => {
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
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
    const [rsvp, setRsvp] = useState<string>("");

    const displayedImageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (initialData?.displayedImage) {
        setDisplayedImage(initialData.displayedImage);
        const matchedImage = predefinedImages.find(
          img => img.name === initialData.displayedImage
        );
        if (matchedImage) {
          setSelectedImageId(matchedImage.id);
        }
      }
    }, [initialData]);

    useImperativeHandle(ref, () => ({
      getPayload: () => {
        if (!title.trim()) {
          return null;
        }
        if (!venue.trim()) {
          return null;
        }
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

    const handleChange =
      (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setter(e.target.value);
      };

    const handleAttachmentsChange = (files: FileList | null) => {
      if (files) {
        const fileNames = Array.from(files).map(file => file.name);
        setAttachments(prev => [...prev, ...fileNames]);
      }
    };

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
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <div className="pb-4">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-black-200">
              <h2 className="text-lg font-bold">Event Info</h2>
              <button 
                type="button"
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
              >
                Add Template
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Events photo or video</label>
              <div className="bg-gray-100 p-10 rounded-lg border border-gray-200 mx-60">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-gray-700" 
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
                    <h3 className="text-lg font-bold">Choose a Theme</h3>
                  </div>
                  <button
                    type="button"
                    className="flex items-center px-3 py-1 text-gray-700"
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
                
                <p className="text-sm text-gray-600 mb-4">Recommended Themes</p>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Title *"
                name="title"
                value={title}
                onChange={handleChange(setTitle)}
                required
              />
              <TextInput
                label="Venue *"
                name="venue"
                value={venue}
                onChange={handleChange(setVenue)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <DatePicker
                label="Start Date"
                name="startDate"
                value={startDate}
                onChange={handleChange(setStartDate)}
              />
              <DatePicker
                label="End Date"
                name="endDate"
                value={endDate}
                onChange={handleChange(setEndDate)}
              />
            </div>
            
            <div className="mt-4">
              <label className="block mb-1 font-semibold">Description</label>
              <TextArea
                name="description"
                value={description}
                onChange={handleChange(setDescription)}
                rows={3}
              />
              
              <div className="flex flex-wrap items-center gap-6 mt-4">
                <Checkbox
                  label="Mark As Important"
                  checked={important}
                  onChange={() => setImportant(!important)}
                />
                
                <div className="flex items-center">
                  <Checkbox
                    label="Send Email"
                    checked={!!email}
                    onChange={e => setEmail(e.target.checked ? "yes" : "")}
                  />
                  <button
                    type="button"
                    className="flex items-center border border-black rounded-md px-10 py-1 ml-7 mb-4"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" 
                      />
                    </svg>
                    Add URL
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pb-4">
            <h2 className="text-lg font-bold mb-2">Share With</h2>
            <div className="border-b border-gray-300 mb-4"></div> {/* Added horizontal line */}
            <div className="flex gap-4">
              {['All', 'Individuals', 'Groups'].map(option => (
                <button
                  key={option}
                  type="button"
                  className={`px-10 py-2 rounded-4xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7991BB] ${
                    shareMessage === option 
                    ? 'bg-blue-900 text-white' 
                    : 'bg-white text-gray-700'
                  }`}
                  onClick={() => setShareMessage(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold mb-4">RSVP</h2>
            <div className="border-t border-gray-300 pt-4">
              <RadioButton
                name="rsvp"
                options={["Yes", "No"]}
                value={rsvp}
                onChange={(e) => setRsvp(e.target.value)}
                layout="horizontal"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold mb-4">Attachments</h2>
            <div className="mb-6">
              <FileUpload
                label="Upload Attachments"
                multiple={true}
                onChange={handleAttachmentsChange}
                fileSize="10 MB"
                accept="*"
              />
              {attachments.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Attachments:</h3>
                  <ul className="list-disc pl-5">
                    {attachments.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">{file}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#7991BB] text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
);

export default EventsForm;