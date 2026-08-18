import { ServicePillar, BrandModule, CaseStudy, Testimonial, EstimatorItem, Director, CompanyContactInfo } from '../types';

import heroOfficeImg from '../assets/images/hero_ugandan_office_1786641496658.jpg';
import officialLogoImg from '../assets/images/pimpliq_official_logo_1786455272779.jpg';
import brandStudioImg from '../assets/images/ugandan_brand_studio_1786641516587.jpg';
import teamMeetingImg from '../assets/images/ugandan_team_meeting_1786641505809.jpg';

export const PIMPLIQ_IMAGES = {
  heroOffice: heroOfficeImg,
  officialLogo: officialLogoImg,
  nabasaMoreen: '/nabasa_moreen.jpg',
  sarahNakate: '/sarah_nakate.jpg',
  brandStudio: brandStudioImg,
  teamMeeting: teamMeetingImg,
};

export const DIRECTORS: Director[] = [
  {
    id: 'dir-2',
    name: 'Sarah Nakate',
    role: 'Director & Managing Partner',
    title: 'Executive Advisory & Talent Sourcing',
    bio: 'Oversees executive search, organizational advisory, statutory compliance, and corporate event management. Committed to unlocking human potential and corporate operational excellence.',
    expertise: ['Executive Recruitment', 'Corporate Advisory', 'Statutory Compliance & Tax', 'High-Profile Event Activation'],
    imageUrl: '/sarah_nakate.jpg',
    quote: 'Sustainable corporate growth begins with the right leaders, clear structures, and flawless execution.'
  },
  {
    id: 'dir-1',
    name: 'Nabasa Moreen',
    role: 'Director & Managing Partner',
    title: 'Brand Strategy & Strategic Development',
    bio: 'Leads Pimpliq’s strategic branding, corporate repositioning, and client growth practices. Dedicated to building enduring institutional brand equity for enterprises across East Africa.',
    expertise: ['360° Brand Strategy', 'Corporate Identity', 'Market Positioning', 'PR & Executive Communications'],
    imageUrl: '/nabasa_moreen.jpg',
    quote: 'We don’t just manage brands—we build powerful brand experiences that connect, influence, and drive long-term business success.'
  }
];

export const CORE_PILLARS: ServicePillar[] = [
  {
    id: 'brand-management',
    title: '1. Brand Management Practice',
    subtitle: 'Strategy, Identity & Market Positioning',
    category: 'Brand Management',
    description: 'Holistic 8-module branding solutions that build enduring market authority, distinctive identity, and customer loyalty.',
    iconName: 'Bullhorn',
    isFeatured: true,
    features: [
      'Brand Strategy & Market Positioning',
      'Visual Identity & Style Manuals',
      'Go-to-Market Launch Campaigns',
      'Digital & Social Media Branding'
    ],
    deliverables: [
      '360° Brand Strategy Framework & Messaging Matrix',
      'Comprehensive Brand Style Manuals (Logos, Typography, Color Schemes)',
      'Digital & Multi-Channel Marketing Playbooks',
      'Quarterly Brand Equity Monitoring Reports'
    ]
  },
  {
    id: 'recruitment-talent',
    title: '2. Recruitment & Talent Sourcing',
    subtitle: 'Executive Search & Strategic Staffing',
    category: 'Recruitment',
    description: 'Connecting forward-thinking organizations with vetted executive leaders and specialized professionals.',
    iconName: 'UserCheck',
    isFeatured: false,
    features: [
      'Executive Search & Headhunting',
      'Competency & Background Audits',
      'Strategic Workforce Onboarding'
    ],
    deliverables: [
      'Vetted Candidate Shortlists with Competency Assessments',
      'Compensation Benchmarking Reports',
      'Seamless Onboarding & Retention Guidelines'
    ]
  },
  {
    id: 'event-management',
    title: '3. Event Management & Activation',
    subtitle: 'Corporate Launches & Experiential Events',
    category: 'Events',
    description: 'End-to-end planning and production for memorable corporate galas, launches, and brand activations.',
    iconName: 'CalendarHeart',
    isFeatured: false,
    features: [
      'Product Launches & Gala Events',
      'Brand Activations & Conferences',
      'Turnkey AV, Stage & Media Production'
    ],
    deliverables: [
      'Turnkey Event Architecture & Spatial Design',
      'Full Technical Run-of-Show & Media Coverage',
      'Post-Event ROI & Media Reach Analytics'
    ]
  },
  {
    id: 'taxation-compliance',
    title: '4. Taxation & Regulatory Compliance',
    subtitle: 'Corporate Tax, Audits & URA Governance',
    category: 'Taxation',
    description: 'Dependable tax advisory and compliance frameworks that safeguard enterprise assets and maintain audit readiness.',
    iconName: 'FileCheck2',
    isFeatured: false,
    features: [
      'Corporate Tax Planning & Filings',
      'Tax Audit Preparation & Representation',
      'Statutory & Regulatory Reviews'
    ],
    deliverables: [
      'Corporate Tax Optimization Strategy',
      'Timely VAT, Income Tax & WHT Filings',
      'Audit-Ready Documentation Health Checks'
    ]
  },
  {
    id: 'business-consultancy',
    title: '5. Strategic Business Consultancy',
    subtitle: 'Operations, Scaling & Performance',
    category: 'Consultancy',
    description: 'Strategic advisory to streamline operations, drive profitability, and unlock market expansion.',
    iconName: 'TrendingUp',
    isFeatured: false,
    features: [
      'Enterprise Growth & Scaling Strategy',
      'Operational Process Optimization',
      'Market Entry & Feasibility Studies'
    ],
    deliverables: [
      '5-Year Strategic Corporate Growth Blueprint',
      'Process Bottleneck Elimination Roadmap',
      'Market Entry Intelligence Reports'
    ]
  }
];

export const BRAND_MODULES: BrandModule[] = [
  {
    id: 'bm-1',
    moduleNumber: '01',
    title: 'Brand Strategy Development',
    category: 'identity',
    categoryLabel: 'Strategy & Identity',
    shortDesc: 'Foundational strategy and positioning aligned with business goals.',
    bullets: [
      'Market & competitive analysis',
      'Target persona & audience mapping',
      'Core values, mission & storytelling'
    ],
    iconName: 'Compass'
  },
  {
    id: 'bm-2',
    moduleNumber: '02',
    title: 'Brand Identity Design',
    category: 'identity',
    categoryLabel: 'Strategy & Identity',
    shortDesc: 'Visually distinct, consistent, and memorable visual systems.',
    bullets: [
      'Logo & brand mark design',
      'Color palettes & typography guidelines',
      'Corporate stationery & collateral'
    ],
    iconName: 'Palette'
  },
  {
    id: 'bm-3',
    moduleNumber: '03',
    title: 'Brand Development & Launch',
    category: 'identity',
    categoryLabel: 'Strategy & Identity',
    shortDesc: 'High-impact product naming and go-to-market introduction.',
    bullets: [
      'Brand naming & tagline creation',
      'Product brand architecture',
      'Go-to-market launch planning'
    ],
    iconName: 'Rocket'
  },
  {
    id: 'bm-4',
    moduleNumber: '04',
    title: 'Digital Branding & Presence',
    category: 'digital',
    categoryLabel: 'Digital & Marketing',
    shortDesc: 'Polished digital touchpoints across web and social platforms.',
    bullets: [
      'Social channel branding & strategy',
      'Website UI/UX brand alignment',
      'Content creation & online reputation'
    ],
    iconName: 'Globe'
  },
  {
    id: 'bm-5',
    moduleNumber: '05',
    title: 'Brand Communication',
    category: 'digital',
    categoryLabel: 'Digital & Marketing',
    shortDesc: 'Unified messaging and promotional campaigns across media.',
    bullets: [
      'Integrated marketing campaigns',
      'Advertising & sales collateral',
      'PR & executive media relations'
    ],
    iconName: 'Megaphone'
  },
  {
    id: 'bm-6',
    moduleNumber: '06',
    title: 'Monitoring & Performance',
    category: 'performance',
    categoryLabel: 'Monitoring & Refresh',
    shortDesc: 'Data-driven tracking of brand equity and audience sentiment.',
    bullets: [
      'Brand health & equity audits',
      'Customer perception tracking',
      'Actionable performance reports'
    ],
    iconName: 'Activity'
  },
  {
    id: 'bm-7',
    moduleNumber: '07',
    title: 'Repositioning & Refresh',
    category: 'performance',
    categoryLabel: 'Monitoring & Refresh',
    shortDesc: 'Modernizing established brands for changing markets.',
    bullets: [
      'Visual refresh & brand modernization',
      'Messaging realignment',
      'Rebranding launch execution'
    ],
    iconName: 'RefreshCw'
  },
  {
    id: 'bm-8',
    moduleNumber: '08',
    title: 'Corporate & Executive Branding',
    category: 'performance',
    categoryLabel: 'Monitoring & Refresh',
    shortDesc: 'Building high-trust profiles for companies and C-suite leaders.',
    bullets: [
      'Executive thought leadership kits',
      'Founder personal branding',
      'Corporate reputation governance'
    ],
    iconName: 'UserCheck'
  }
];

export const ESTIMATOR_ITEMS: EstimatorItem[] = [
  { id: 'est-1', name: 'Brand Strategy & Identity Design', baseCost: 5500000, category: 'Branding' },
  { id: 'est-2', name: 'Digital Branding & PR Campaign', baseCost: 4500000, category: 'Branding' },
  { id: 'est-3', name: 'Executive Talent Sourcing', baseCost: 6500000, category: 'Recruitment' },
  { id: 'est-4', name: 'Taxation & Regulatory Compliance', baseCost: 3800000, category: 'Taxation' },
  { id: 'est-5', name: 'Corporate Event & Activation', baseCost: 8500000, category: 'Events' },
  { id: 'est-6', name: 'Strategic Business Advisory', baseCost: 6000000, category: 'Consultancy' },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Enterprise Manufacturing Rebrand & Market Repositioning',
    client: 'Mukwano Industrial & Manufacturing Group',
    category: 'Branding',
    impact: '+140% Brand Equity & UGX 15.5B New Pipeline',
    description: 'Complete brand overhaul across 8 modules, transforming a leading Ugandan enterprise into a modern sustainability and market leader.',
    imageUrl: brandStudioImg,
    tags: ['Brand Strategy', 'Visual Identity', 'PR Campaign']
  },
  {
    id: 'cs-2',
    title: 'Executive C-Suite Talent Sourcing & Leadership Placement',
    client: 'FinTech Horizons Uganda (Kampala)',
    category: 'Recruitment',
    impact: '100% On-Time C-Suite Executive Placement',
    description: 'Recruited 6 senior vice presidents and a Chief Commercial Officer within 45 days for a rapidly scaling regional commercial bank in Kampala.',
    imageUrl: teamMeetingImg,
    tags: ['Executive Search', 'Talent Vetting', 'HR Strategy']
  },
  {
    id: 'cs-3',
    title: 'East African Regional Economic & Trade Summit',
    client: 'Kampala Commercial & Trade Directorate',
    category: 'Events',
    impact: '1,200 Delegates & National Media Coverage',
    description: 'Managed full event design, VIP protocol, stage audio-visual production, and experiential brand activations in Kampala.',
    imageUrl: heroOfficeImg,
    tags: ['Event Production', 'PR', 'Spatial Design']
  },
  {
    id: 'cs-4',
    title: 'Corporate Tax Structuring & URA Audit Resolution',
    client: 'Nile Logistics & Energy Group Uganda',
    category: 'Taxation',
    impact: 'UGX 1.2B Tax Savings & 100% URA Audit Clearance',
    description: 'Restructured multi-jurisdictional tax compliance frameworks to prevent regulatory penalties and optimize cash flow in East Africa.',
    imageUrl: brandStudioImg,
    tags: ['Tax Planning', 'Statutory Compliance', 'Audit Support']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Eng. Mukasa Emmanuel',
    role: 'Chief Executive Officer',
    company: 'Mukwano Industrial Group',
    quote: 'Pimpliq Consultancy Ltd completely transformed our brand perception across Uganda and East Africa. Their 8-module brand management process brought absolute clarity, strategic alignment, and immediate commercial traction.',
    rating: 5,
    serviceCategory: 'Brand Management'
  },
  {
    id: 'test-2',
    name: 'Dr. Akileng Sarah',
    role: 'Managing Director',
    company: 'FinTech Horizons Uganda',
    quote: 'Their executive recruitment precision in Kampala is unmatched. Pimpliq delivered senior leaders who aligned perfectly with our corporate culture and aggressive growth targets.',
    rating: 5,
    serviceCategory: 'Recruitment'
  },
  {
    id: 'test-3',
    name: 'Katusiime Brenda',
    role: 'Head of Corporate Communications',
    company: 'Sovereign Global East Africa',
    quote: 'From corporate event management in Kampala to URA tax compliance advisory, Pimpliq demonstrates an incredible standard of professionalism. They live up to their slogan: People, Potential, Progress.',
    rating: 5,
    serviceCategory: 'Event Management'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: '01',
    title: 'Strategic Discovery & Audit',
    desc: 'We conduct in-depth consultations, market research, and operational audits to assess your current standing.'
  },
  {
    stepNumber: '02',
    title: 'Tailored Blueprint & Scope',
    desc: 'Our senior partners engineer a custom action plan aligned with your budget, timeframe, and commercial targets.'
  },
  {
    stepNumber: '03',
    title: 'Agile Execution & Deployment',
    desc: 'We implement the strategies seamlessly across your brand, recruitment, event, or tax operations.'
  },
  {
    stepNumber: '04',
    title: 'Performance Audit & Growth',
    desc: 'Continuous monitoring, KPI evaluation, and refinement to ensure long-term progress and measurable ROI.'
  }
];

export const COMPANY_CONTACT: CompanyContactInfo = {
  phone: '+256702932901',
  phoneDisplay: '0702932901',
  whatsapp: '256702932901',
  whatsappDisplay: '0702932901',
  whatsappUrl: 'https://wa.me/256702932901?text=Hello%20Pimpliq%20Consultancy%20Ltd,%20I%20would%20like%20to%20inquire%20about%20your%20services.',
  email: 'pimpliq@pimpliqconsultancy.com',
  location: 'Along Bunga-Ggaba Road, Kampala, Uganda',
  tiktokHandle: 'Pimpliq Consultancy Ltd',
  tiktokUrl: 'https://www.tiktok.com/@pimpliqconsultancyltd',
  instagramHandle: '@pimpliqconsultancyltd',
  instagramUrl: 'https://www.instagram.com/pimpliqconsultancyltd',
  facebookHandle: 'Pimpliq Consultancy Ltd',
  facebookUrl: 'https://www.facebook.com/pimpliqconsultancyltd',
  socialNote: "We're active on TikTok, Instagram, and Facebook. Connect with our team for strategic inquiries."
};
