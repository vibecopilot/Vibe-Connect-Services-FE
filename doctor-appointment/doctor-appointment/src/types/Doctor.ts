export interface Doctor {
  id: string
  firstName: string
  lastName: string
  email: string
  contactNumber: string
  password: string
  speciality: string
  licenseNumber: string
  yearsOfExperience: string
  gender: string
  languagesSpoken: string
  modeOfAppointment: string
  availability: string
  affiliatedOrganization: string
  branch: string
  profilePicture?: string
  status: "active" | "inactive"
}
