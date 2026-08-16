export type VehicleType = 'sedan' | 'suv';
export type BookingServiceType = 'standard' | 'maintenance';

export interface ServicePackage {
  id: string;
  name: string;
  tag: string;
  isPopular?: boolean;
  sedanPrice: number;
  suvPrice: number;
  description: string;
  features: string[];
}

export interface AddOnService {
  id: string;
  name: string;
  priceText: string;
  basePrice: number;
  iconName: string;
  description: string;
  images?: string[];
  beforeImage?: string;
  afterImage?: string;
}

export interface MaintenanceTier {
  id: string;
  frequency: string;
  subtitle: string;
  sedanPrice: number;
  suvPrice: number;
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  text: string;
  rating: number;
  timeAgo?: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceType: BookingServiceType;
  vehicleType: VehicleType;
  vehicleMakeModel: string;
  selectedPackageId: string;
  selectedMaintenanceId?: string;
  maintenanceInitialPackageId?: string;
  hasHadInitialDetail?: boolean;
  selectedAddOnIds: string[];
  preferredDate: string;
  preferredTime: string;
  austinAddress: string;
  notes: string;
  policyAgreed: boolean;
}
