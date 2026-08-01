export const ROUTES = {
  home: '/',
  projects: '/projects',
  projectDetails: '/projects/:slug',
  packages: '/packages',
  reviews: '/reviews',
  about: '/about',
  contact: '/contact',
};

export const projectPath = (slug) => `/projects/${slug}`;
