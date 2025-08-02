// Simple QR code data generator (in a real app, you'd use a proper QR library)
export const generateQRData = (userData: any): string => {
  const qrData = {
    name: userData.name,
    company: userData.companyName,
    position: userData.position,
    phone: "+91 9764035729", // Using static phone for demo
    email: "john@gmail.com", // Using static email for demo
    website: userData.websiteUrl || "website.com",
    linkedin: userData.linkedinUrl,
    timestamp: Date.now(),
  }

  // In a real app, this would generate actual QR code data
  return `data:${JSON.stringify(qrData)}`
}

export const getInitials = (name: string): string => {
  if (!name) return "U"

  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}
