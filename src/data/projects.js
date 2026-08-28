import { img } from '@/utils/helpers';
import homeImg from '@/assets/images/home.jpg';
import pro1 from '@/assets/images/pro-2.jpg';
import pro2 from '@/assets/images/pro-3.jpg';
import pro3 from '@/assets/images/pro-4.jpg';
import pro01 from '@/assets/images/pro-1-01.jpg';
import pro02 from '@/assets/images/pro-1-02.jpg';
import pro03 from '@/assets/images/pro-1-03.jpg';
import img1 from '@/assets/images/img-1.jpg';
import img2 from '@/assets/images/img-2.jpg';
import img3 from '@/assets/images/img-3.jpg';
import img4 from '@/assets/images/img-4.jpg';
import img5 from '@/assets/images/img-5.jpg';
import img6 from '@/assets/images/img-6.jpg';
import img7 from '@/assets/images/img-7.jpg';
import img8 from '@/assets/images/img-8.jpg';
import img9 from '@/assets/images/img-9.jpg';

import m1 from '@/assets/images/m-1.jpg';
import m2 from '@/assets/images/m-2.jpg';
import m3 from '@/assets/images/m-3.jpg';

import f1 from '@/assets/images/f-1.jpg';
import f2 from '@/assets/images/f-2.jpg';
import f3 from '@/assets/images/f-3.jpg';
import f4 from '@/assets/images/f-4.jpg';
import f5 from '@/assets/images/f-5.jpg';
import f6 from '@/assets/images/f-6.jpg';

import s1 from '@/assets/images/s-1.jpg';
import s2 from '@/assets/images/s-2.jpg';
import s3 from '@/assets/images/s-3.jpg';
import s4 from '@/assets/images/s-4.jpg';
import s5 from '@/assets/images/s-5.jpg';
import s6 from '@/assets/images/s-6.jpg';
import s7 from '@/assets/images/s-7.jpg';





export const PROJECT_CATEGORIES = [];

export const projects = [
  {
    slug: '   ',
    title: '',

    year: 2026,
    client: '',
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
    slug: '',
    title: '',
 
    year: 2025,
    client: '',
   
    technologies: [],
    summary:
      'Full identity for a coastal fire-cooking restaurant group — mark, menus, signage and a site that smoulders.',
    description:
      'Everything at Salt & Ash is cooked over open flame, so we made fire the identity system itself: a wordmark that chars at its edges, menus printed on smoke-toned stock, and a website where embers drift behind the type.',
    cover: img1,
    gallery: [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
    ],
    accentStat: { value: 3, suffix: 'x', label: 'covers per night after relaunch' },
  },
  {
    slug: '',
    title: '',
    year: 2025,
    client: '',

    technologies: ['React', 'Three.js', 'GSAP', 'Vercel'],
    summary:
      'A WebGL festival site where the lineup orbits a live 3D stage — 40k tickets sold through it in six hours.',
    description:
      'Orbital wanted a site people would screen-record. We modelled the festival main stage in 3D and made it the navigation: each orbiting artist card pulls you into their set time, stage and audio preview without a single page reload.',
    cover: pro2,
    gallery: [
      m1,
      m2,
      m3,
      f1,
    ],
    accentStat: { value: 40, suffix: 'k', label: 'tickets sold in six hours' },
  },
  {
    slug: '',
    title: '',
 
    year: 2026,
    client: '',
   
    technologies: ['Phase One', 'Capture One', 'Premiere Pro'],
    summary:
      'A spring campaign shot entirely on a working sheep farm in the Scottish Borders, in one continuous day of light.',
    description:
      'The SS26 collection is about slowness, so we refused studio light entirely. One farm, one day, dawn to dusk — the campaign runs in chronological order, and the light does the art direction.',
    cover: f5,
    gallery: [
      f2,
      f3,
      f4,
      f5,
      f6,
    ],
    
    accentStat: { value: 212, suffix: '%', label: 'lift in launch-week revenue' },
  },
    {
    slug: '',
    title: '',
 
    year: 2026,
    client: '',
   
    technologies: ['Phase One', 'Capture One', 'Premiere Pro'],
    summary:
      'A spring campaign shot entirely on a working sheep farm in the Scottish Borders, in one continuous day of light.',
    description:
      'The SS26 collection is about slowness, so we refused studio light entirely. One farm, one day, dawn to dusk — the campaign runs in chronological order, and the light does the art direction.',
    cover: s1,
    gallery: [
      s1,
      s2,
      s3,
      s4,
      s5,
      s6,
      s7,
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
