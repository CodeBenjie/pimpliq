import { ServicePillar, BrandModule, CaseStudy, Testimonial, EstimatorItem, Director, CompanyContactInfo } from '../types';

import heroOfficeImg from '../assets/images/hero_ugandan_office_1786641496658.jpg';
import officialLogoImg from '../assets/images/pimpliq_official_logo_1786455272779.jpg';
import nabasaMoreenImg from '../assets/images/nabasa_nobulb_1786966968699.jpg';
import sarahNakateImg from '../assets/images/sarah_nakate.jpg';
import brandStudioImg from '../assets/images/ugandan_brand_studio_1786641516587.jpg';
import teamMeetingImg from '../assets/images/ugandan_team_meeting_1786641505809.jpg';
import ceoPortraitImg from '../assets/images/ugandan_ceo_portrait_1786641526528.jpg';
import mdPortraitImg from '../assets/images/ugandan_md_portrait_1786641538962.jpg';
import commPortraitImg from '../assets/images/ugandan_comm_portrait_1786641549129.jpg';

export const PIMPLIQ_IMAGES = {
  heroOffice: heroOfficeImg,
  officialLogo: officialLogoImg,
  nabasaMoreen: nabasaMoreenImg,
  sarahNakate: sarahNakateImg,
  brandStudio: brandStudioImg,
  teamMeeting: teamMeetingImg,
  ceoPortrait: ceoPortraitImg,
  mdPortrait: mdPortraitImg,
  commPortrait: commPortraitImg,
};

export const DIRECTORS: Director[] = [
  {
    id: 'dir-2',
    name: 'Sarah Nakate',
    role: 'Director & Managing Partner',
    title: 'Executive Advisory & Talent Sourcing',
    bio: 'Oversees executive search, organizational advisory, statutory compliance, and corporate event management. Committed to unlocking human potential and corporate operational excellence.',
    expertise: ['Executive Recruitment', 'Corporate Advisory', 'Statutory Compliance & Tax', 'High-Profile Event Activation'],
    imageUrl: sarahNakateImg,
    quote: 'Sustainable corporate growth begins with the right leaders, clear structures, and flawless execution.'
  },
  {
    id: 'dir-1',
    name: 'Nabasa Moreen',
    role: 'Director & Managing Partner',
    title: 'Brand Strategy & Strategic Development',
    bio: 'Leads Pimpliq’s strategic branding, corporate repositioning, and client growth practices. Dedicated to building enduring institutional brand equity for enterprises across East Africa.',
    expertise: ['360° Brand Strategy', 'Corporate Identity', 'Market Positioning', 'PR & Executive Communications'],
    imageUrl: nabasaMoreenImg,
    quote: 'We don’t just manage brands—we build powerful brand experiences that connect, influence, and drive long-term business success.'
  }
];

export const CORE_PILLARS: ServicePillar[] = [
  {
    id: 'brand-management',
    title: '1. Brand Management Practice',
    subtitle: 'Comprehensive Strategy, Identity & Market Positioning',
    category: 'Brand Management',
    description: 'We take a research-driven, holistic approach to brand management across 8 specialized modules, ensuring every element aligns with your business goals and commands market authority.',
    iconName: 'Bullhorn',
    isFeatured: true,
    features: [
      'Brand Strategy & Market Positioning',
      'Visual Identity & Style Manuals',
      'Go-to-Market Launch Campaigns',
      'Digital Branding & Social Management',
      'Brand Performance Audits & Repositioning',
      'Corporate & C-Suite Executive Branding'
    ],
    deliverables: [
      '360° Brand Strategy Framework & Messaging Matrix',
      'Comprehensive Brand Style Manuals (Logos, Color Palettes, Typography)',
      'Digital & Multi-Channel Marketing Playbooks',
      'Quarterly Brand Equity & Reputation Monitoring Reports',
      'Executive Thought Leadership & PR Positioning Kits'
    ]
  },
  {
    id: 'recruitment-talent',
    title: '2. Recruitment & Talent Sourcing',
    subtitle: 'Connecting High-Growth Enterprises with Exceptional Leaders',
    category: 'Recruitment',
    description: 'Pimpliq connects organizations with top-tier talent tailored to corporate growth objectives through rigorous candidate audits, executive search, and strategic team placement.',
    iconName: 'UserCheck',
    isFeatured: false,
    features: [
      'Executive Search & C-Suite Headhunting',
      'Specialized Technical & Management Sourcing',
      'Background, Qualification & Competency Audits',
      'Strategic Workforce & Onboarding Frameworks'
    ],
    deliverables: [
      'Vetted Executive Candidate Shortlists with Behavioral Assessments',
      'Salary Benchmarking & Compensation Structure Reports',
      'Seamless Onboarding & Cultural Integration Guidelines',
      '90-Day Talent Retention Guarantee'
    ]
  },
  {
    id: 'event-management',
    title: '3. Event Management & Activation',
    subtitle: 'Landmark Corporate Experiences & Experiential Launches',
    category: 'Events',
    description: 'We plan, coordinate, and execute landmark corporate events, brand activation campaigns, conferences, and gala launches with flawless production quality and media impact.',
    iconName: 'CalendarHeart',
    isFeatured: false,
    features: [
      'Corporate Product Launches & Gala Events',
      'Experiential Brand Activations & Campaigns',
      'End-to-End Production, Stage & AV Logistics',
      'Vendor Management & PR Coordination'
    ],
    deliverables: [
      'Turnkey Event Architecture & Spatial Design',
      'Full Technical Run-of-Show & Media Coverage',
      'VIP Attendee Management & Experiential Gifting',
      'Post-Event ROI & Media Reach Analytics'
    ]
  },
  {
    id: 'taxation-compliance',
    title: '4. Taxation & Regulatory Compliance',
    subtitle: 'Strategic Governance, Corporate Tax Planning & Audit Readiness',
    category: 'Taxation',
    description: 'Reliable tax planning and regulatory compliance support that safeguards corporate assets, optimizes financial efficiency, and ensures 100% compliance with statutory requirements.',
    iconName: 'FileCheck2',
    isFeatured: false,
    features: [
      'Corporate Tax Planning & Advisory',
      'Statutory & Regulatory Filings',
      'Tax Audit Preparation & Representation',
      'Financial Risk Mitigation Frameworks'
    ],
    deliverables: [
      'Corporate Tax Optimization Strategy',
      'Timely Filing of VAT, Income Tax, and WHT Returns',
      'Audit-Ready Documentation & Health Checks',
      'Quarterly Regulatory Risk Assessments'
    ]
  },
  {
    id: 'business-consultancy',
    title: '5. Strategic Business Consultancy',
    subtitle: 'Operational Excellence, Scaling & Market Expansion',
    category: 'Consultancy',
    description: 'Tailored business advisory solutions designed to streamline operations, drive sustainable revenue growth, foster innovation, and unlock full organizational potential.',
    iconName: 'TrendingUp',
    isFeatured: false,
    features: [
      'Enterprise Growth & Scaling Strategy',
      'Operational Optimization & Process Engineering',
      'Market Feasibility & Expansion Studies',
      'Organizational Restructuring & Advisory'
    ],
    deliverables: [
      '5-Year Strategic Corporate Growth Blueprint',
      'Process Bottleneck Elimination Roadmap',
      'Market Entry & Competitive Intelligence Reports',
      'Change Management Implementation Guidelines'
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
    shortDesc: 'We define the foundation of your brand to ensure clarity, direction, and market alignment.',
    bullets: [
      'Brand positioning & market analysis',
      'Target audience identification & persona mapping',
      'Competitive landscape evaluation',
      'Mission, vision, & core values definition',
      'Brand messaging framework & storytelling'
    ],
    iconName: 'Compass'
  },
  {
    id: 'bm-2',
    moduleNumber: '02',
    title: 'Brand Identity Design',
    category: 'identity',
    categoryLabel: 'Strategy & Identity',
    shortDesc: 'We create visually compelling, consistent, and memorable brand identities.',
    bullets: [
      'Logo design & primary brand marks',
      'Color palette & typography selection',
      'Brand guidelines & style manuals',
      'Corporate identity collateral (cards, letterheads)'
    ],
    iconName: 'Palette'
  },
  {
    id: 'bm-3',
    moduleNumber: '03',
    title: 'Brand Development & Launch',
    category: 'identity',
    categoryLabel: 'Strategy & Identity',
    shortDesc: 'We bring your brand to life and introduce it to the market with maximum impact.',
    bullets: [
      'Brand naming & tagline creation',
      'Product & service brand architecture',
      'Brand launch campaign strategies',
      'Go-to-market planning & execution'
    ],
    iconName: 'Rocket'
  },
  {
    id: 'bm-4',
    moduleNumber: '04',
    title: 'Digital Branding & Online Presence',
    category: 'digital',
    categoryLabel: 'Digital & Marketing',
    shortDesc: 'We ensure your brand stands out in the modern digital ecosystem.',
    bullets: [
      'Social media channel branding & management',
      'Website branding & UI/UX alignment',
      'Online reputation & review management',
      'Content creation & brand storytelling',
      'Targeted digital ad campaigns'
    ],
    iconName: 'Globe'
  },
  {
    id: 'bm-5',
    moduleNumber: '05',
    title: 'Brand Communication & Marketing',
    category: 'digital',
    categoryLabel: 'Digital & Marketing',
    shortDesc: 'We help you communicate your brand story consistently across all touchpoints.',
    bullets: [
      'Integrated marketing strategy development',
      'Advertising & promotional collateral',
      'Multi-channel campaign planning',
      'Public relations & media awareness drives'
    ],
    iconName: 'Megaphone'
  },
  {
    id: 'bm-6',
    moduleNumber: '06',
    title: 'Brand Monitoring & Performance',
    category: 'performance',
    categoryLabel: 'Monitoring & Refresh',
    shortDesc: 'We track, analyze, and continuously improve your brand equity with data.',
    bullets: [
      'Comprehensive brand audits & evaluations',
      'Customer perception & sentiment analysis',
      'Market feedback loops & consumer insights',
      'Performance reporting & growth recommendations'
    ],
    iconName: 'Activity'
  },
  {
    id: 'bm-7',
    moduleNumber: '07',
    title: 'Brand Repositioning & Refresh',
    category: 'performance',
    categoryLabel: 'Monitoring & Refresh',
    shortDesc: 'We revitalize established brands to stay relevant in changing markets.',
    bullets: [
      'Complete brand redesign & modernization',
      'Refining messaging for modern audiences',
      'Market repositioning strategies',
      'Rebranding campaign execution'
    ],
    iconName: 'RefreshCw'
  },
  {
    id: 'bm-8',
    moduleNumber: '08',
    title: 'Corporate & Personal Branding',
    category: 'performance',
    categoryLabel: 'Monitoring & Refresh',
    shortDesc: 'We build high-trust identities for both organizations and C-suite leaders.',
    bullets: [
      'Executive & C-suite leadership branding',
      'Personal brand strategy for founders',
      'Corporate reputation management & PR'
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
    avatarUrl: ceoPortraitImg,
    rating: 5,
    serviceCategory: 'Brand Management'
  },
  {
    id: 'test-2',
    name: 'Dr. Akileng Sarah',
    role: 'Managing Director',
    company: 'FinTech Horizons Uganda',
    quote: 'Their executive recruitment precision in Kampala is unmatched. Pimpliq delivered senior leaders who aligned perfectly with our corporate culture and aggressive growth targets.',
    avatarUrl: mdPortraitImg,
    rating: 5,
    serviceCategory: 'Recruitment'
  },
  {
    id: 'test-3',
    name: 'Katusiime Brenda',
    role: 'Head of Corporate Communications',
    company: 'Sovereign Global East Africa',
    quote: 'From corporate event management in Kampala to URA tax compliance advisory, Pimpliq demonstrates an incredible standard of professionalism. They live up to their slogan: People, Potential, Progress.',
    avatarUrl: commPortraitImg,
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
