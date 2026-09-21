export const packages = [
   {
    id: 'Pre wedding shoot ',
    name: 'Pre wedding shoot ',
    price: 31999,
    period: 'per event',
    tagline: 'Essential coverage for your special day.',
    highlight: false,
    features: [
      'Candid Photographer-1',
      'Cinematic Videographer-1',
     
    ],
    delivery:[
      'premium Album (80 Pages) -2',
      'Save the date Poster',
      'Selective Edited Photos',
      'Cinematic Highlights Reel',
      'Raw footage in Pendrive'

    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 55000,
    period: 'per event',
    tagline: 'Essential coverage for your special day.',
    highlight: false,
    features: [
      '1 Traditional Photographer',
      '1 Traditional Videographer',
    ],
     delivery:[
      'Wedding Album 80 Pages - 1',
      'Full HD Traditional Video',
      'PhotoFrame(18 x 12) - 2',
      'Calendar | Album bag',
      'All Footages in Pen drive'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 85000,
    period: 'per event',
    tagline: 'Comprehensive coverage with candid photography.',
    highlight: true,
    features: [
      '1 Traditional Photographer',
      '1 Candid Photographer',
      '1 Traditional Videographer',
      'Pre or Post Wedding Photoshoot',
    ],
     delivery:[
      'Mini Booklet Album -1',
      'pre wedding mini booklet -1',
      'PhotoFrame(18 x 12) - 3',
      'Calendar | Leather Album bag',
      'All Footages in Pen drive',
      'Save the date Poster',
      'Selective Edited Photos',
    ]
  },
  {
    id: 'luxury',
    name: 'Luxury',
    price: 180000,
    period: 'per event',
    tagline: 'The ultimate complete cinematic wedding experience.',
    highlight: false,
    features: [
      'Engagement Photography',
      '1 Traditional Photographer',
      '1 Traditional Videographer',
      '1 Guest Entry Videographer',
      '1 Candid Photographer',
      '1 Cinematic Videographer',
      '1 Drone Videography',
      'Pre/Post Photoshoot, Videography',
    ],
    delivery:[
      'premium Album (80 Pages) -2 ',
      'pre wedding mini booklet -1',
      'PhotoFrame(18 x 12)-4',
      'Traditional Wedding Video Highlights',
      'Traditional Wedding Full Video',
      'Cinematic FULL HD Video',
      'Guest Entry Video',
      'Calendar | Leather Album bag',
      'Save the date Poster',
      'Selective Edited Photos',
      'All Footages in Pen drive',
    ]
  },
 
];

export const comparisonRows = [
  { label: 'Traditional Photographer', values: [true, true, true, true] },
  { label: 'Traditional Videographer', values: [true, true, true, true] },
  { label: 'Candid Photographer', values: [false, true, true, true] },
  { label: 'Cinematic Videographer', values: [false, false, true, true] },
  { label: 'Drone Coverage', values: [false, false, true, true] },
  { label: 'Pre / Post Wedding Shoot', values: [false, true, true, true] },
  { label: 'Engagement Shoot', values: [false, false, true, true] },
  { label: 'Edited Reels & Highlights', values: [false, true, true, true] },
];

export const faqs = [
  {
    question: 'How do projects start?',
    answer:
      'Every project starts with a 45-minute call and a one-page brief we write together. You approve the brief, we book the production window, and a 50% deposit locks the dates.',
  },
  {
    question: 'Do you work with clients outside the US?',
    answer:
      'About half our clients are in Europe and Asia. We schedule overlap hours for every timezone and have shot on location in eleven countries.',
  },
  {
    question: 'What counts as a revision round?',
    answer:
      'A consolidated set of notes from your side, answered with a new cut or design pass from ours. Small fixes — typos, a swapped image — never count against your rounds.',
  },
  {
    question: 'Who owns the work?',
    answer:
      'You do, fully, on final payment. We license nothing back and hand over source files. We only ask for permission to show the work in our portfolio.',
  },
  {
    question: 'Can we upgrade a package mid-project?',
    answer:
      'Yes — you only pay the difference. Roughly a third of Spark projects grow into Signal once teams see the first cut.',
  },
];

export const packageTerms = [
  {
    id: 'coverage',
    title: 'Event Coverage',
    description: 'This package covers only the reception and wedding day. (04:00 PM to 01:00 PM)',
    icon: 'Clock',
  },
  {
    id: 'extra-hours',
    title: 'Extra Services',
    description: 'Extra hours or additional services will be charged separately.',
    icon: 'PlusCircle',
  },
  {
    id: 'readiness',
    title: 'Preparation Time',
    description: 'The couple should be ready at least 1 hour before the event for individual photography .',
    icon: 'UserCheck',
  },
  {
    id: 'albums',
    title: 'Album Photo Limit',
    description: 'Each album includes 200–250 selected photos. Additional photos/sheets will be charged extra.',
    icon: 'Image',
  },
  {
    id: 'travel',
    title: 'Outstation Travel',
    description: 'Travel charges will apply for events outside Coimbatore.',
    icon: 'MapPin',
  },
  {
    id: 'outdoor',
    title: 'Outdoor & Pre-Wedding',
    description: 'For outdoor/pre-wedding shoots, travel, accommodation and location charges are to be covered by the client.',
    icon: 'Compass',
  },
];

export const paymentTerms = [
  {
    step: '01',
    percentage: '50%',
    title: 'Advance Payment',
    description: '50% advance is required to confirm the booking.',
    highlight: true,
  },
  {
    step: '02',
    percentage: '40%',
    title: 'Event Day',
    description: '40% on the event day.',
    highlight: false,
  },
  {
    step: '03',
    percentage: '10%',
    title: 'Final Delivery',
    description: 'The remaining 10% on final delivery.',
    highlight: false,
  },
];

