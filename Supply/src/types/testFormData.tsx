
export interface FormData {
  name: string;
  description: string;
  startDate: string;
  date: Date | null;
  companyName: string;
  phone: string;
  accepted: boolean;
  gender: string;
}

export interface FormErrors {
  name: string;
  description: string;
  startDate: string;
  date: string;
  companyName: string;
  phone: string;
  accepted: string;
  gender: string;
}