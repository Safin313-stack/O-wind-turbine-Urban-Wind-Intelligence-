export interface SdgCardData {
  number: number;
  code: string;
  title: string;
  category: 'primary' | 'secondary' | 'additional';
  color: string;
  badgeBg: string;
  borderColor: string;
  contribution: string;
  impactExplanation: string;
  targets: string[];
  metrics: string;
}

export const SDG_DATA: SdgCardData[] = [
  {
    number: 7,
    code: 'SDG 7',
    title: 'Affordable and Clean Energy',
    category: 'primary',
    color: '#FCC30B',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    borderColor: 'border-amber-500/40',
    contribution: 'Decentralized Urban Micro-Wind Generation',
    impactExplanation: 'Unlocks previously unharvested urban building wind kinetic energy in high-density megacities like Dhaka, providing 24/7 localized clean electricity without relying on ground-level real estate.',
    targets: ['Target 7.2: Increase substantially the share of renewable energy in the global energy mix', 'Target 7.a: Enhance international cooperation to facilitate access to clean energy research'],
    metrics: 'Generates ~300+ kWh annually per rooftop node while offsetting fossil grid demand during peak hours.',
  },
  {
    number: 11,
    code: 'SDG 11',
    title: 'Sustainable Cities and Communities',
    category: 'secondary',
    color: '#FD9D24',
    badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    borderColor: 'border-orange-500/40',
    contribution: 'Smart Building Integration & Self-Powered IoT',
    impactExplanation: 'Transforms passive high-rise concrete structures into active renewable energy generating nodes with zero acoustic disturbance, powering critical building sensors and emergency systems autonomously.',
    targets: ['Target 11.6: Reduce the adverse per capita environmental impact of cities, including air quality and municipal waste'],
    metrics: 'Enhances building energy resilience during Dhaka load-shedding events and monitors hyper-local urban microclimates.',
  },
  {
    number: 9,
    code: 'SDG 9',
    title: 'Industry, Innovation and Infrastructure',
    category: 'secondary',
    color: '#F36E25',
    badgeBg: 'bg-orange-600/10 text-orange-400 border-orange-600/30',
    borderColor: 'border-orange-600/40',
    contribution: 'AI-Driven Building Aerodynamics & Precision Placement',
    impactExplanation: 'Pioneers computational fluid dynamics (CFD) and edge AI optimization models specifically tailored for tropical urban topologies, turning conventional building infrastructure into smart microgrids.',
    targets: ['Target 9.4: Upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency'],
    metrics: '92% placement optimization accuracy over manual trial-and-error siting methods.',
  },
  {
    number: 13,
    code: 'SDG 13',
    title: 'Climate Action',
    category: 'secondary',
    color: '#3F7E44',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    borderColor: 'border-emerald-500/40',
    contribution: 'Decarbonizing High-Density Urban Built Environments',
    impactExplanation: 'Cities consume 78% of the world’s primary energy and generate more than 70% of greenhouse emissions. O-Wind AI enables building-level self-generation, reducing reliance on fossil-fueled peaker plants.',
    targets: ['Target 13.2: Integrate climate change measures into national policies, strategies and planning'],
    metrics: 'Estimated reduction of ~210 kg CO₂ equivalent per deployed rooftop micro-cluster each year.',
  },
  {
    number: 12,
    code: 'SDG 12',
    title: 'Responsible Consumption and Production',
    category: 'secondary',
    color: '#CF8D2A',
    badgeBg: 'bg-amber-600/10 text-amber-400 border-amber-600/30',
    borderColor: 'border-amber-600/40',
    contribution: 'Additive Manufacturing & Recyclable Materials',
    impactExplanation: 'The physical prototype shell is designed for localized on-demand 3D printing using recycled PETG and biodegradable bioplastics, minimizing supply chain logistics and embodied carbon.',
    targets: ['Target 12.5: Substantially reduce waste generation through prevention, reduction, recycling and reuse'],
    metrics: '85% of structural chassis weight is fabricated from locally reclaimable filament with zero rare-earth toxic slurry.',
  },
  {
    number: 3,
    code: 'SDG 3',
    title: 'Good Health and Well-being',
    category: 'additional',
    color: '#4C9F38',
    badgeBg: 'bg-green-600/10 text-green-400 border-green-600/30',
    borderColor: 'border-green-600/40',
    contribution: 'Hyper-Local Urban Air Quality & PM2.5 Prediction',
    impactExplanation: 'Dhaka consistently ranks among the most air-polluted capital cities globally. O-Wind nodes serve dual duty: harnessing urban wind while continuously monitoring PM2.5/PM10 and feeding predictive health alerts to citizens.',
    targets: ['Target 3.9: Substantially reduce the number of deaths and illnesses from hazardous chemicals and air pollution'],
    metrics: 'Real-time air particulate telemetry with +1h to +5h predictive AI forecasting for urban pedestrians and building managers.',
  }
];
