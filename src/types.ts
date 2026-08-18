export interface Director {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  expertise: string[];
  imageUrl: string;
  quote?: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  iconName: string;
  isFeatured?: boolean;
  features: string[];
  deliverables: string[];
}

export interface BrandModule {
  id: string;
  moduleNumber: string;
  title: string;
  category: 'identity' | 'digital' | 'performance';
  categoryLabel: string;
  shortDesc: string;
  bullets: string[];
  iconName: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'Branding' | 'Recruitment' | 'Events' | 'Taxation' | 'Strategy';
  impact: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
  rating: number;
  serviceCategory: string;
}

export interface EstimatorItem {
  id: string;
  name: string;
  baseCost: number;
  category: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  model?: string;
}

export interface CompanyContactInfo {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  whatsappUrl: string;
  email: string;
  location: string;
  locationNote?: string;
  tiktokHandle: string;
  tiktokUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookHandle: string;
  facebookUrl: string;
  socialNote: string;
}
