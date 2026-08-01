import { img } from '@/utils/helpers';
import homeImg from '@/assets/images/home.jpg';
import pro1 from '@/assets/images/pro-2.jpg';
import pro2 from '@/assets/images/pro-3.jpg';
import pro3 from '@/assets/images/pro-4.jpg';
import pro01 from '@/assets/images/pro-1-01.jpg';
import pro02 from '@/assets/images/pro-1-02.jpg';
import pro03 from '@/assets/images/pro-1-03.jpg';


export const PROJECT_CATEGORIES = [];

export const projects = [
  {
    slug: 'nocturne-motors',
    title: 'Nocturne Motors',
    category: 'Film',
    year: 2026,
    client: 'Nocturne Motors',
    services: ['Direction', 'Cinematography', 'Post-production'],
    technologies: ['RED Komodo', 'DaVinci Resolve', 'After Effects', 'Cinema 4D'],
    summary:
      'A 90-second launch film for an electric hypercar, shot over three nights in a decommissioned power station.',
    description:
      'Nocturne asked for a launch film that felt less like a car ad and more like a heist. We built the entire narrative around the sound of the car — near silence — and let the environment carry the tension. Every light source in the film is practical.',
    cover: homeImg,
    gallery: [
      pro01,
      pro02,
      pro03,
    ],
    accentStat: { value: 14, suffix: 'M', label: 'organic views in week one' },
  },
  {
    slug: 'salt-and-ash',
    title: 'Salt & Ash',
    category: 'Branding',
    year: 2025,
    client: 'Salt & Ash Restaurants',
    services: ['Identity', 'Art Direction', 'Packaging'],
    technologies: ['Figma', 'Illustrator', 'Blender', 'GSAP'],
    summary:
      'Full identity for a coastal fire-cooking restaurant group — mark, menus, signage and a site that smoulders.',
    description:
      'Everything at Salt & Ash is cooked over open flame, so we made fire the identity system itself: a wordmark that chars at its edges, menus printed on smoke-toned stock, and a website where embers drift behind the type.',
    cover: pro1,
    gallery: [
      img('photo-1517248135467-4c7edcad34c4'),
      img('photo-1552566626-52f8b828add9'),
      img('photo-1466978913421-dad2ebd01d17'),
    ],
    accentStat: { value: 3, suffix: 'x', label: 'covers per night after relaunch' },
  },
  {
    slug: 'orbital-festival',
    title: 'Orbital Festival',
    category: 'Digital',
    year: 2025,
    client: 'Orbital Music Group',
    services: ['Web Design', 'Development', 'WebGL'],
    technologies: ['React', 'Three.js', 'GSAP', 'Vercel'],
    summary:
      'A WebGL festival site where the lineup orbits a live 3D stage — 40k tickets sold through it in six hours.',
    description:
      'Orbital wanted a site people would screen-record. We modelled the festival main stage in 3D and made it the navigation: each orbiting artist card pulls you into their set time, stage and audio preview without a single page reload.',
    cover: pro2,
    gallery: [
      img('photo-1459749411175-04bf5292ceea'),
      img('photo-1493225457124-a3eb161ffa5f'),
      img('photo-1514320291840-2e0a9bf2a9ae'),
    ],
    accentStat: { value: 40, suffix: 'k', label: 'tickets sold in six hours' },
  },
  {
    slug: 'field-notes-ss26',
    title: 'Field Notes SS26',
    category: 'Campaign',
    year: 2026,
    client: 'Field Notes Apparel',
    services: ['Campaign', 'Photography', 'Social'],
    technologies: ['Phase One', 'Capture One', 'Premiere Pro'],
    summary:
      'A spring campaign shot entirely on a working sheep farm in the Scottish Borders, in one continuous day of light.',
    description:
      'The SS26 collection is about slowness, so we refused studio light entirely. One farm, one day, dawn to dusk — the campaign runs in chronological order, and the light does the art direction.',
    cover: pro3,
    gallery: [
      img('photo-1469334031218-e382a71b716b'),
      img('photo-1483985988355-763728e1935b'),
      img('photo-1445205170230-053b83016050'),
    ],
    accentStat: { value: 212, suffix: '%', label: 'lift in launch-week revenue' },
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug) => {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
};

export const featuredProjects = projects.slice(0, 4);
