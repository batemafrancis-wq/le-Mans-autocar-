export type Service = {
  id: number;
  name: string;
  category: string;
  description: string;
  priceFrom: number;
  durationMinutes: number;
  icon: string;
};

export type Mechanic = {
  id: number;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  photoUrl: string;
  yearsExperience: number;
  active: boolean;
};

export type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string | Date;
};

export type Booking = {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  serviceId: number | null;
  mechanicId: number | null;
  vehicleInfo: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: string;
  createdAt: string | Date;
};

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string | Date;
};
