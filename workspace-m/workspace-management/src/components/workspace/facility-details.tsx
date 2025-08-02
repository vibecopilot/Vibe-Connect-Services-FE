
import type React from "react"
import { useState, useEffect } from "react"
import { Clock, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import TextInput from "../TextInput"
import Select from "../Select"
import ToggleSwitch from "../ToggleSwitch"
import Checkbox from "../Checkbox"
import FileUpload from "../FileUpload"
import TextArea from "../TextArea"
import DatePicker from "../DatePicker"
import Breadcrumb from "../Breadcrumb"
import TimePickerModal from "../TimePickerModal"
import { useFacilityContext } from "../../contexts/FacilityContext"

const breadcrumbItems = [
  { label: "Workspace Management", href: "/workspace-management" },
  { label: "Facility", href: "/workspace-management/facility" },
  { label: "Facility Details", href: "/workspace-management/facility/details" },
]

export default function FacilityDetailsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  // Use the facility context
  const { addFacility, updateFacility, getFacilityById } = useFacilityContext()

  // Determine if the page is in view mode based on the URL
  const isViewMode = location.pathname.includes("/view")
  const isEditMode = location.pathname.includes("/edit")
  const isNewMode = id === "new" || location.pathname.includes("/new")

  // State for facility details
  const [facilityDetails, setFacilityDetails] = useState({
    facilityName: "",
    active: "Select",
    shareable: "Select",
    linkToBuilding: "Select",
    subFacility: false,
  })

  // State for fee setup checkboxes
  const [feeSetupCheckboxes, setFeeSetupCheckboxes] = useState({
    adultMember: false,
    childMember: false,
    adultNonMember: false,
    childNonMember: false,
    adultGuest: false,
    childGuest: false,
    adultTenant: false,
    childTenant: false,
  })

  // State for fee setup values
  const [feeSetupValues, setFeeSetupValues] = useState({
    adultMember: "",
    childMember: "",
    adultNonMember: "",
    childNonMember: "",
    adultGuest: "",
    childGuest: "",
    adultTenant: "",
    childTenant: "",
  })

  // State for payment options
  const [paymentOptions, setPaymentOptions] = useState({
    memberPostpaid: false,
    memberPrepaid: false,
    memberPayOnFacility: false,
    memberComplimentary: false,
    nonMemberPostpaid: false,
    nonMemberPrepaid: false,
    nonMemberPayOnFacility: false,
    nonMemberComplimentary: false,
    guestPostpaid: false,
    guestPrepaid: false,
    guestPayOnFacility: false,
    guestComplimentary: false,
    tenantPostpaid: false,
    tenantPrepaid: false,
    tenantPayOnFacility: false,
    tenantComplimentary: false,
  })

  // State for capacity
  const [capacity, setCapacity] = useState({
    minPersons: "",
    maxPersons: "",
    gst: "",
    consecutiveSlots: false,
  })

  // State for booking rules
  const [bookingRules, setBookingRules] = useState({
    bookingAllowedBefore: { days: "0", hours: "0", minutes: "0" },
    advanceBooking: { days: "", hours: "", minutes: "" },
    canCancelBefore: { days: "", hours: "", minutes: "" },
  })

  // State for booking rule items
  const [bookingRuleItems, setBookingRuleItems] = useState([
    { id: 1, checked: false, times: "", by: "Select" },
    { id: 2, checked: false, times: "", by: "Select" },
  ])

  // State for description
  const [description, setDescription] = useState("")

  // State for slot configuration
  const [slotConfig, setSlotConfig] = useState({
    startTime: "",
    breakTimeStart: "",
    breakTimeEnd: "",
    endTime: "",
    concurrentSlots: "Concurrent Slots",
    slotsBy: "",
    wrapTime: "",
  })

  // State for terms and policies
  const [termsAndPolicies, setTermsAndPolicies] = useState({
    termsAndConditions: "",
    cancellationPolicy: "",
  })

  // State for cancellation rules
  const [cancellationRules, setCancellationRules] = useState([
    { id: 1, time: "00:00", deduction: "0" },
    { id: 2, time: "00:00", deduction: "0" },
    { id: 3, time: "00:00", deduction: "0" },
  ])

  // State for block days
  const [blockDays, setBlockDays] = useState({
    date: "",
    entireDay: "Entire Day",
    blockReason: "",
  })

  // State for facility type
  const [facilityType, setFacilityType] = useState("bookable")

  // Add state for time picker modals
  const [timePickerOpen, setTimePickerOpen] = useState<string | null>(null)

  // Add state for concurrent slots
  const [concurrentSlots, setConcurrentSlots] = useState(1)

  // Add this useEffect to load facility data when in view/edit mode
  useEffect(() => {
    if (id && id !== "new") {
      const facilityId = Number.parseInt(id)
      const facility = getFacilityById(facilityId)
      if (facility) {
        setFacilityDetails({
          facilityName: facility.name,
          active: facility.active ? "Yes" : "No",
          shareable: "Yes", // Default value since not in context data
          linkToBuilding: "Building A", // Default value since not in context data
          subFacility: false,
        })
        setFacilityType(facility.bookingType === "Bookable" ? "bookable" : "request")
      }
    }
  }, [id, getFacilityById])

  // Handle input change for facility details
  const handleFacilityDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFacilityDetails((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change for facility details
  const handleFacilityDetailsSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFacilityDetails((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox change for sub facility
  const handleSubFacilityChange = (e: { target: { name: string; value: boolean } }) => {
    setFacilityDetails((prev) => ({ ...prev, subFacility: e.target.value }))
  }

  // Handle fee setup checkbox change
  const handleFeeSetupCheckboxChange = (name: string, checked: boolean) => {
    setFeeSetupCheckboxes((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle fee setup value change
  const handleFeeSetupValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFeeSetupValues((prev) => ({ ...prev, [name]: value }))
  }

  // Handle payment option change
  const handlePaymentOptionChange = (name: string, checked: boolean) => {
    setPaymentOptions((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle capacity change
  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCapacity((prev) => ({ ...prev, [name]: value }))
  }

  // Handle consecutive slots toggle
  const handleConsecutiveSlotsToggle = (checked: boolean) => {
    setCapacity((prev) => ({ ...prev, consecutiveSlots: checked }))
  }

  // Handle booking rules change
  const handleBookingRulesChange = (e: React.ChangeEvent<HTMLInputElement>, section: string, field: string) => {
    const { value } = e.target
    setBookingRules((prev) => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value },
    }))
  }

  // Handle booking rule item change
  const handleBookingRuleItemChange = (id: number, field: string, value: string | boolean) => {
    setBookingRuleItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  // Handle delete booking rule item
  const handleDeleteBookingRuleItem = (id: number) => {
    setBookingRuleItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Handle description change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  // Handle slot config change
  const handleSlotConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSlotConfig((prev) => ({ ...prev, [name]: value }))
  }

  // Handle terms and policies change
  const handleTermsAndPoliciesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTermsAndPolicies((prev) => ({ ...prev, [name]: value }))
  }

  // Handle cancellation rule change
  const handleCancellationRuleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => {
    const { value } = e.target
    setCancellationRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, [field]: value } : rule)))
  }

  // Handle deduction increment/decrement
  const handleDeductionChange = (id: number, increment: boolean) => {
    setCancellationRules((prev) =>
      prev.map((rule) => {
        if (rule.id === id) {
          const currentValue = Number.parseInt(rule.deduction) || 0
          const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1)
          return { ...rule, deduction: newValue.toString() }
        }
        return rule
      }),
    )
  }

  // Handle block days change
  const handleBlockDaysChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBlockDays((prev) => ({ ...prev, [name]: value }))
  }

  // Handle facility type change
  const handleFacilityTypeChange = (type: string) => {
    setFacilityType(type)
  }

  // Handle file upload
  const handleFileUpload = (files: FileList | null) => {
    console.log("Files uploaded:", files)
  }

  // Handle add rule - This will save/update the facility
  const handleAddRule = () => {
    // Validate required fields
    if (!facilityDetails.facilityName.trim()) {
      alert("Please enter a facility name")
      return
    }

    if (isNewMode) {
      // Add new facility using context
      const newFacility = {
        name: facilityDetails.facilityName,
        active: facilityDetails.active === "Yes",
        bookingType: facilityType === "bookable" ? "Bookable" : "Request",
        createdOn: new Date().toISOString().split("T")[0],
      }

      console.log("Adding new facility:", newFacility)
      addFacility(newFacility)

      // Show success message
      alert("Facility added successfully!")

      // Navigate back to facility management
      navigate("/workspace-management/facility")
    } else if (isEditMode && id) {
      // Update existing facility using context
      const facilityId = Number.parseInt(id)
      const updatedData = {
        name: facilityDetails.facilityName,
        active: facilityDetails.active === "Yes",
        bookingType: facilityType === "bookable" ? "Bookable" : "Request",
      }

      console.log("Updating facility:", facilityId, updatedData)
      updateFacility(facilityId, updatedData)

      // Show success message
      alert("Facility updated successfully!")

      // Navigate back to facility management
      navigate("/workspace-management/facility")
    }
  }

  // Handle delete cancellation rule
  const handleDeleteCancellationRule = (id: number) => {
    setCancellationRules((prev) => prev.filter((rule) => rule.id !== id))
  }

  // Add handlers
  const handleConcurrentSlotsChange = (increment: boolean) => {
    setConcurrentSlots((prev) => (increment ? prev + 1 : Math.max(1, prev - 1)))
  }

  // Add time picker handlers
  const handleTimeClick = (field: string) => {
    setTimePickerOpen(field)
  }

  const handleTimeConfirm = (time: string) => {
    if (timePickerOpen) {
      setSlotConfig((prev) => ({ ...prev, [timePickerOpen]: time }))
    }
    setTimePickerOpen(null)
  }

  return (
    <div className="bg-white min-h-screen font-['PT_Sans']">
      {/* Navigation section */}
      <div className="p-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Facility Type Selection */}
      <div className="flex items-center p-2 border-b">
        <div className="flex items-center mr-4">
          <input
            type="radio"
            id="bookable"
            name="facilityType"
            checked={facilityType === "bookable"}
            onChange={() => handleFacilityTypeChange("bookable")}
            className="mr-1"
            disabled={isViewMode}
          />
          <label htmlFor="bookable" className="text-sm">
            Bookable
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="request"
            name="facilityType"
            checked={facilityType === "request"}
            onChange={() => handleFacilityTypeChange("request")}
            className="mr-1"
            disabled={isViewMode}
          />
          <label htmlFor="request" className="text-sm">
            Request
          </label>
        </div>
      </div>

      <div className="p-4">
        {/* Facility Details Section */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Facility Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TextInput
              label="Facility Name"
              name="facilityName"
              placeholder="Facility Name"
              value={facilityDetails.facilityName}
              onChange={handleFacilityDetailsChange}
              required
              disabled={isViewMode}
            />
            <Select
              label="Active"
              name="active"
              value={facilityDetails.active}
              onChange={handleFacilityDetailsSelectChange}
              options={["Yes", "No"]}
              placeholder="Select"
              disabled={isViewMode}
            />
            <Select
              label="Shareable"
              name="shareable"
              value={facilityDetails.shareable}
              onChange={handleFacilityDetailsSelectChange}
              options={["Yes", "No"]}
              placeholder="Select"
              disabled={isViewMode}
            />
            <Select
              label="Link to Building"
              name="linkToBuilding"
              value={facilityDetails.linkToBuilding}
              onChange={handleFacilityDetailsSelectChange}
              options={["Building A", "Building B"]}
              placeholder="Select"
              disabled={isViewMode}
            />
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm mr-3">Sub Facility</span>
            <Checkbox
              label=""
              name="subFacility"
              checked={facilityDetails.subFacility}
              onChange={handleSubFacilityChange}
              disabled={isViewMode}
            />
          </div>
        </div>

        {/* Gray line separator */}
        <div className="border-b border-gray-300 mb-6"></div>

        {/* Fee Setup Section */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">Fee Setup</h2>
          <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="col-span-1">
                <h3 className="text-sm font-medium">Member Type</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="text-sm font-medium">Adult</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="text-sm font-medium">Child</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="text-sm font-medium">Configure Payment</h3>
              </div>
            </div>

            {/* Member Row */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="col-span-1 flex items-center">
                <span className="text-sm">Member</span>
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <Checkbox
                    label=""
                    name="adultMember"
                    checked={feeSetupCheckboxes.adultMember}
                    onChange={(e) => handleFeeSetupCheckboxChange("adultMember", e.target.value)}
                    disabled={isViewMode}
                  />
                  <TextInput
                    label=""
                    name="adultMember"
                    value={feeSetupValues.adultMember}
                    onChange={handleFeeSetupValueChange}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <Checkbox
                    label=""
                    name="childMember"
                    checked={feeSetupCheckboxes.childMember}
                    onChange={(e) => handleFeeSetupCheckboxChange("childMember", e.target.value)}
                    disabled={isViewMode}
                  />
                  <TextInput
                    label=""
                    name="childMember"
                    value={feeSetupValues.childMember}
                    onChange={handleFeeSetupValueChange}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Checkbox
                      label="Postpaid"
                      name="memberPostpaid"
                      checked={paymentOptions.memberPostpaid}
                      onChange={(e) => handlePaymentOptionChange("memberPostpaid", e.target.value)}
                      disabled={isViewMode}
                    />
                    <Checkbox
                      label="Prepaid"
                      name="memberPrepaid"
                      checked={paymentOptions.memberPrepaid}
                      onChange={(e) => handlePaymentOptionChange("memberPrepaid", e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <Checkbox
                      label="Pay on Facility"
                      name="memberPayOnFacility"
                      checked={paymentOptions.memberPayOnFacility}
                      onChange={(e) => handlePaymentOptionChange("memberPayOnFacility", e.target.value)}
                      disabled={isViewMode}
                    />
                    <Checkbox
                      label="Complimentary"
                      name="memberComplimentary"
                      checked={paymentOptions.memberComplimentary}
                      onChange={(e) => handlePaymentOptionChange("memberComplimentary", e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Non-Member Row */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="col-span-1 flex items-center">
                <span className="text-sm">Non-Member</span>
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <Checkbox
                    label=""
                    name="adultNonMember"
                    checked={feeSetupCheckboxes.adultNonMember}
                    onChange={(e) => handleFeeSetupCheckboxChange("adultNonMember", e.target.value)}
                    disabled={isViewMode}
                  />
                  <TextInput
                    label=""
                    name="adultNonMember"
                    value={feeSetupValues.adultNonMember}
                    onChange={handleFeeSetupValueChange}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <Checkbox
                    label=""
                    name="childNonMember"
                    checked={feeSetupCheckboxes.childNonMember}
                    onChange={(e) => handleFeeSetupCheckboxChange("childNonMember", e.target.value)}
                    disabled={isViewMode}
                  />
                  <TextInput
                    label=""
                    name="childNonMember"
                    value={feeSetupValues.childNonMember}
                    onChange={handleFeeSetupValueChange}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Checkbox
                      label="Postpaid"
                      name="nonMemberPostpaid"
                      checked={paymentOptions.nonMemberPostpaid}
                      onChange={(e) => handlePaymentOptionChange("nonMemberPostpaid", e.target.value)}
                      disabled={isViewMode}
                    />
                    <Checkbox
                      label="Prepaid"
                      name="nonMemberPrepaid"
                      checked={paymentOptions.nonMemberPrepaid}
                      onChange={(e) => handlePaymentOptionChange("nonMemberPrepaid", e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <Checkbox
                      label="Pay on Facility"
                      name="nonMemberPayOnFacility"
                      checked={paymentOptions.nonMemberPayOnFacility}
                      onChange={(e) => handlePaymentOptionChange("nonMemberPayOnFacility", e.target.value)}
                      disabled={isViewMode}
                    />
                    <Checkbox
                      label="Complimentary"
                      name="nonMemberComplimentary"
                      checked={paymentOptions.nonMemberComplimentary}
                      onChange={(e) => handlePaymentOptionChange("nonMemberComplimentary", e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Row */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="col-span-1 flex items-center">
                <span className="text-sm">Guest</span>
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <Checkbox
                    label=""
                    name="adultGuest"
                    checked={feeSetupCheckboxes.adultGuest}
                    onChange={(e) => handleFeeSetupCheckboxChange("adultGuest", e.target.value)}
                    disabled={isViewMode}
                  />
                  <TextInput
                    label=""
                    name="adultGuest"
                    value={feeSetupValues.adultGuest}
                    onChange={handleFeeSetupValueChange}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <Checkbox
                    label=""
                    name="childGuest"
                    checked={feeSetupCheckboxes.childGuest}
                    onChange={(e) => handleFeeSetupCheckboxChange("childGuest", e.target.value)}
                    disabled={isViewMode}
                  />
                  <TextInput
                    label=""
                    name="childGuest"
                    value={feeSetupValues.childGuest}
                    onChange={handleFeeSetupValueChange}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Checkbox
                      label="Postpaid"
                      name="guestPostpaid"
                      checked={paymentOptions.guestPostpaid}
                      onChange={(e) => handlePaymentOptionChange("guestPostpaid", e.target.value)}
                      disabled={isViewMode}
                    />
                    <Checkbox
                      label="Prepaid"
                      name="guestPrepaid"
                      checked={paymentOptions.guestPrepaid}
                      onChange={(e) => handlePaymentOptionChange("guestPrepaid", e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <Checkbox
                      label="Pay on Facility"
                      name="guestPayOnFacility"
                      checked={paymentOptions.guestPayOnFacility}
                      onChange={(e) => handlePaymentOptionChange("guestPayOnFacility", e.target.value)}
                      disabled={isViewMode}
                    />
                    <Checkbox
                      label="Complimentary"
                      name="guestComplimentary"
                      checked={paymentOptions.guestComplimentary}
                      onChange={(e) => handlePaymentOptionChange("guestComplimentary", e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tenant Row */}
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 flex items-center">
                <span className="text-sm">Tenant</span>
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <Checkbox
                    label=""
                    name="adultTenant"
                    checked={feeSetupCheckboxes.adultTenant}
                    onChange={(e) => handleFeeSetupCheckboxChange("adultTenant", e.target.value)}
                    disabled={isViewMode}
                  />
                  <TextInput
                    label=""
                    name="adultTenant"
                    value={feeSetupValues.adultTenant}
                    onChange={handleFeeSetupValueChange}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <Checkbox
                    label=""
                    name="childTenant"
                    checked={feeSetupCheckboxes.childTenant}
                    onChange={(e) => handleFeeSetupCheckboxChange("childTenant", e.target.value)}
                    disabled={isViewMode}
                  />
                  <TextInput
                    label=""
                    name="childTenant"
                    value={feeSetupValues.childTenant}
                    onChange={handleFeeSetupValueChange}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Checkbox
                      label="Postpaid"
                      name="tenantPostpaid"
                      checked={paymentOptions.tenantPostpaid}
                      onChange={(e) => handlePaymentOptionChange("tenantPostpaid", e.target.value)}
                      disabled={isViewMode}
                    />
                    <Checkbox
                      label="Prepaid"
                      name="tenantPrepaid"
                      checked={paymentOptions.tenantPrepaid}
                      onChange={(e) => handlePaymentOptionChange("tenantPrepaid", e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <Checkbox
                      label="Pay on Facility"
                      name="tenantPayOnFacility"
                      checked={paymentOptions.tenantPayOnFacility}
                      onChange={(e) => handlePaymentOptionChange("tenantPayOnFacility", e.target.value)}
                      disabled={isViewMode}
                    />
                    <Checkbox
                      label="Complimentary"
                      name="tenantComplimentary"
                      checked={paymentOptions.tenantComplimentary}
                      onChange={(e) => handlePaymentOptionChange("tenantComplimentary", e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gray line after tenant row */}
            <div className="border-b border-gray-300 my-4"></div>

            {/* Capacity Section - moved inside Fee Setup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <TextInput
                label="Minimum Person Allowed"
                name="minPersons"
                value={capacity.minPersons}
                onChange={handleCapacityChange}
                disabled={isViewMode}
              />
              <TextInput
                label="Maximum Person Allowed"
                name="maxPersons"
                value={capacity.maxPersons}
                onChange={handleCapacityChange}
                disabled={isViewMode}
              />
              <TextInput
                label="GST"
                name="gst"
                value={capacity.gst}
                onChange={handleCapacityChange}
                disabled={isViewMode}
              />
            </div>

            <div className="flex items-center">
              <label className="text-sm mr-3">Consecutive Slots Allowed</label>
              <ToggleSwitch
                checked={capacity.consecutiveSlots}
                onChange={handleConsecutiveSlotsToggle}
                disabled={isViewMode}
              />
            </div>
          </div>
        </div>

        {/* Booking Rules Section */}
        <div className="mb-6">
          <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Booking Allowed Before</label>
                <div className="flex space-x-2">
                  <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Days</label>
                    <TextInput
                      label=""
                      name="bookingAllowedBeforeDays"
                      value={bookingRules.bookingAllowedBefore.days}
                      onChange={(e) => handleBookingRulesChange(e, "bookingAllowedBefore", "days")}
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Hours</label>
                    <TextInput
                      label=""
                      name="bookingAllowedBeforeHours"
                      value={bookingRules.bookingAllowedBefore.hours}
                      onChange={(e) => handleBookingRulesChange(e, "bookingAllowedBefore", "hours")}
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                    <TextInput
                      label=""
                      name="bookingAllowedBeforeMinutes"
                      value={bookingRules.bookingAllowedBefore.minutes}
                      onChange={(e) => handleBookingRulesChange(e, "bookingAllowedBefore", "minutes")}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-300"></div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Advance Booking</label>
                <div className="flex space-x-2">
                  <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Days</label>
                    <TextInput
                      label=""
                      name="advanceBookingDays"
                      value={bookingRules.advanceBooking.days}
                      onChange={(e) => handleBookingRulesChange(e, "advanceBooking", "days")}
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Hours</label>
                    <TextInput
                      label=""
                      name="advanceBookingHours"
                      value={bookingRules.advanceBooking.hours}
                      onChange={(e) => handleBookingRulesChange(e, "advanceBooking", "hours")}
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                    <TextInput
                      label=""
                      name="advanceBookingMinutes"
                      value={bookingRules.advanceBooking.minutes}
                      onChange={(e) => handleBookingRulesChange(e, "advanceBooking", "minutes")}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-300"></div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Can Cancel Before Schedule</label>
                <div className="flex space-x-2">
                  <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Days</label>
                    <TextInput
                      label=""
                      name="canCancelBeforeDays"
                      value={bookingRules.canCancelBefore.days}
                      onChange={(e) => handleBookingRulesChange(e, "canCancelBefore", "days")}
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Hours</label>
                    <TextInput
                      label=""
                      name="canCancelBeforeHours"
                      value={bookingRules.canCancelBefore.hours}
                      onChange={(e) => handleBookingRulesChange(e, "canCancelBefore", "hours")}
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                    <TextInput
                      label=""
                      name="canCancelBeforeMinutes"
                      value={bookingRules.canCancelBefore.minutes}
                      onChange={(e) => handleBookingRulesChange(e, "canCancelBefore", "minutes")}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Rule Section */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Booking Rule</h2>
          {bookingRuleItems.map((item) => (
            <div key={item.id} className="flex items-center mb-2 space-x-2">
              <Checkbox
                label=""
                name={`bookingRule${item.id}`}
                checked={item.checked}
                onChange={(e) => handleBookingRuleItemChange(item.id, "checked", e.target.value)}
                disabled={isViewMode}
              />
              <span className="text-sm whitespace-nowrap">Facility can be Booked</span>
              <TextInput
                label=""
                name={`bookingRuleTimes${item.id}`}
                value={item.times}
                onChange={(e) => handleBookingRuleItemChange(item.id, "times", e.target.value)}
                disabled={isViewMode}
              />
              <span className="text-sm whitespace-nowrap">times per day by</span>
              <Select
                label=""
                name={`bookingRuleBy${item.id}`}
                value={item.by}
                onChange={(e) => handleBookingRuleItemChange(item.id, "by", e.target.value)}
                options={["Member", "Guest"]}
                placeholder="Select"
                disabled={isViewMode}
              />
              <button
                onClick={() => handleDeleteBookingRuleItem(item.id)}
                className="text-red-500 hover:text-red-700"
                disabled={isViewMode}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {!isViewMode && (
            <button className="bg-[#7991BB] text-white px-4 py-1 rounded text-sm" onClick={handleAddRule}>
              Add Rule
            </button>
          )}
        </div>

        {/* Cover Images and Attachments Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-base font-medium mb-2">Cover Images</h2>
            <FileUpload
              onChange={handleFileUpload}
              accept="image/*"
              label="Upload Cover Images"
              disabled={isViewMode}
            />
          </div>
          <div>
            <h2 className="text-base font-medium mb-2">Attachments</h2>
            <FileUpload onChange={handleFileUpload} accept="*" label="Upload Attachments" disabled={isViewMode} />
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <TextArea
            label="Description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
            disabled={isViewMode}
          />
        </div>

        {/* Configure Slot Section */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Configure Slot</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-end">
            <div>
              <label className="block text-xs mb-1">Start time</label>
              <div className="relative">
                <input
                  type="text"
                  value={slotConfig.startTime}
                  onClick={() => handleTimeClick("startTime")}
                  readOnly
                  className="w-full px-3 py-2 border rounded cursor-pointer"
                  placeholder="Select time"
                  disabled={isViewMode}
                />
                <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1">Break time (start)</label>
              <div className="relative">
                <input
                  type="text"
                  value={slotConfig.breakTimeStart}
                  onClick={() => handleTimeClick("breakTimeStart")}
                  readOnly
                  className="w-full px-3 py-2 border rounded cursor-pointer"
                  placeholder="Select time"
                  disabled={isViewMode}
                />
                <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1">Break time (end)</label>
              <div className="relative">
                <input
                  type="text"
                  value={slotConfig.breakTimeEnd}
                  onClick={() => handleTimeClick("breakTimeEnd")}
                  readOnly
                  className="w-full px-3 py-2 border rounded cursor-pointer"
                  placeholder="Select time"
                  disabled={isViewMode}
                />
                <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1">End Time</label>
              <div className="relative">
                <input
                  type="text"
                  value={slotConfig.endTime}
                  onClick={() => handleTimeClick("endTime")}
                  readOnly
                  className="w-full px-3 py-2 border rounded cursor-pointer"
                  placeholder="Select time"
                  disabled={isViewMode}
                />
                <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1">Concurrent Slots</label>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => handleConcurrentSlotsChange(false)}
                  className="px-2 py-1 hover:bg-gray-100"
                  disabled={isViewMode}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={concurrentSlots}
                  readOnly
                  className="flex-1 text-center py-1 border-0 focus:outline-none"
                  disabled={isViewMode}
                />
                <button
                  onClick={() => handleConcurrentSlotsChange(true)}
                  className="px-2 py-1 hover:bg-gray-100"
                  disabled={isViewMode}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <TextInput
                label="Slots By"
                name="slotsBy"
                value={slotConfig.slotsBy}
                onChange={handleSlotConfigChange}
                disabled={isViewMode}
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Wrap Time</label>
              <div className="flex items-center space-x-2">
                <TextInput
                  label=""
                  name="wrapTime"
                  value={slotConfig.wrapTime}
                  onChange={handleSlotConfigChange}
                  disabled={isViewMode}
                />
                <button className="text-red-500 hover:text-red-700" disabled={isViewMode}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          {!isViewMode && (
            <button className="bg-[#7991BB] text-white px-4 py-1 rounded text-sm mt-2" onClick={handleAddRule}>
              Add Rule
            </button>
          )}
        </div>

        {/* Gray line separator */}
        <div className="border-b border-gray-300 mb-6"></div>

        {/* Terms & Conditions and Cancellation Policy Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <TextArea
              label="Terms & Conditions"
              name="termsAndConditions"
              value={termsAndPolicies.termsAndConditions}
              onChange={handleTermsAndPoliciesChange}
              rows={4}
              disabled={isViewMode}
            />
          </div>
          <div>
            <TextArea
              label="Cancellation Policy"
              name="cancellationPolicy"
              value={termsAndPolicies.cancellationPolicy}
              onChange={handleTermsAndPoliciesChange}
              rows={4}
              disabled={isViewMode}
            />
          </div>
        </div>

        {/* Rules Description Section */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4 mb-2 pb-2 border-b border-gray-300">
            <div>
              <h2 className="text-base font-medium">Rules Description</h2>
            </div>
            <div className="text-center">
              <h2 className="text-base font-medium">Time</h2>
            </div>
            <div className="text-center">
              <h2 className="text-base font-medium">Deduction</h2>
            </div>
          </div>

          {cancellationRules.map((rule) => (
            <div key={rule.id} className="grid grid-cols-3 gap-4 mb-4 items-center">
              <div>
                <p className="text-sm text-gray-600">
                  If user cancels the booking selected hours/days prior to schedule, the given percentage of amount will
                  be deducted
                </p>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    value={rule.time}
                    onClick={() => handleTimeClick(`cancellationTime${rule.id}`)}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm cursor-pointer"
                    placeholder="00:00"
                    disabled={isViewMode}
                  />
                  <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => handleDeductionChange(rule.id, false)}
                    className="px-2 py-1 hover:bg-gray-100"
                    disabled={isViewMode}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={rule.deduction}
                    readOnly
                    className="w-16 text-center py-1 border-0 focus:outline-none"
                    disabled={isViewMode}
                  />
                  <button
                    onClick={() => handleDeductionChange(rule.id, true)}
                    className="px-2 py-1 hover:bg-gray-100"
                    disabled={isViewMode}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-400">%</span>
                <button
                  onClick={() => handleDeleteCancellationRule(rule.id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={isViewMode}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="border-b border-gray-300 mb-4"></div>
        </div>

        {/* Block Days Section */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Block Days</h2>
          <div className="grid grid-cols-3 gap-4">
            <DatePicker
              label="Select Date"
              name="date"
              value={blockDays.date}
              onChange={handleBlockDaysChange}
              disabled={isViewMode}
            />
            <Select
              label="Entire Day"
              name="entireDay"
              value={blockDays.entireDay}
              onChange={handleBlockDaysChange}
              options={["Morning", "Afternoon", "Evening"]}
              placeholder="Entire Day"
              disabled={isViewMode}
            />
            <TextInput
              label="Block Reason"
              name="blockReason"
              value={blockDays.blockReason}
              onChange={handleBlockDaysChange}
              disabled={isViewMode}
            />
          </div>
          {!isViewMode && (
            <div className="flex justify-center mt-4">
              <button className="bg-[#7991BB] text-white px-4 py-1 rounded text-sm" onClick={handleAddRule}>
                Add Rule
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Time Picker Modal */}
      <TimePickerModal
        isOpen={timePickerOpen !== null}
        onClose={() => setTimePickerOpen(null)}
        onConfirm={handleTimeConfirm}
      />
    </div>
  )
}
