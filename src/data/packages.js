export const packages = [
  {
    id: 'spark',
    name: 'Standard',
    price: 50000,
    period: 'per project',
    tagline: 'One sharp deliverable, done properly.',
    highlight: false,
    features: [
      'TraditionalPhotographer-1',
      'Traditional Videographer-1',
      'Album (80Pages) -1 | FHD-Traditional Video-1 | PhotoFrame(18 x 12) -2 | Calendar | Leather Album bag',
      'Digital invitation | All Footages in Pen drive',
    ],
  },
  {
    id: 'signal',
    name: 'Premium',
    price: 80000,
    period: 'per project',
    tagline: 'A campaign that works across every channel.',
    highlight: true,
    features: [
      'TraditionalPhotographer-1 | Traditional Videographer-1 | CandidPhotographer-1',
      'Album (60Pages) -2 | FHD-Traditional Video',
      'PhotoFrame(18 x 12) -2|Calendar|Leather Album bag',
      'Pre(Or)Post Wedding | reels on preorpost weddingshoot',
      'All Footages in Pen drive',
   
    ],
  },
  {
    id: 'orbit',
    name: 'Luxury',
    price: 100000,
    period: 'per month',
    tagline: 'An embedded creative team on retainer.',
    highlight: false,
    features: [
      'engagementphotography-1',
      'TraditionalPhotographer-1 | Traditional Videographer-1 | GuestEntry Videographer-1',
      'candidphotographer-1 | Cinematic videographer-1',
      'drone videography -1|360-Degree reel son wedding',
    ],
  },
];

export const comparisonRows = [
  { label: 'Hero deliverable', values: ['1', '1–2', 'Rolling'] },
  { label: 'Revision rounds', values: ['2', '4', 'Unlimited minor'] },
  { label: 'Production window', values: ['2 weeks', '6 weeks', 'Ongoing'] },
  { label: 'Shoot production', values: [false, true, true] },
  { label: 'Social adaptations', values: [false, true, true] },
  { label: 'Motion toolkit', values: [false, true, true] },
  { label: 'Dedicated Slack channel', values: [false, false, true] },
  { label: 'Quarterly brand reviews', values: [false, false, true] },
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
