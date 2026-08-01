import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Transition from '@/components/layout/Transition';
import { ScrollTrigger } from '@/animations/gsapSetup';
import { ROUTES } from '@/utils/routes';

// Route-level code splitting: each page is its own chunk.
const Home = lazy(() => import('@/pages/Home'));
const ProjectDetails = lazy(() => import('@/pages/ProjectDetails'));
const Packages = lazy(() => import('@/pages/Packages'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// About, Projects, Reviews and Contact now live as sections on Home (the
// site is one-page for those four). Old links/bookmarks to their standalone
// routes redirect straight to the matching anchor instead of 404ing.
const ProjectsRedirect = () => <Navigate to="/#projects" replace />;
const ReviewsRedirect = () => <Navigate to="/#reviews" replace />;
const AboutRedirect = () => <Navigate to="/#about" replace />;
const ContactRedirect = () => <Navigate to="/#contact" replace />;

const routeMap = [
  { path: ROUTES.home, Component: Home },
  { path: ROUTES.projectDetails, Component: ProjectDetails },
  { path: ROUTES.packages, Component: Packages },
  { path: ROUTES.projects, Component: ProjectsRedirect },
  { path: ROUTES.reviews, Component: ReviewsRedirect },
  { path: ROUTES.about, Component: AboutRedirect },
  { path: ROUTES.contact, Component: ContactRedirect },
  { path: '*', Component: NotFound },
];

const AppRouter = () => {
  const location = useLocation();

  // Hash targets are scrolled to by Navbar's own scrollToHash (it retries
  // for lazy-mounted sections and re-syncs ScrollTrigger before measuring).
  // This effect only resets scroll position on hash-less navigations —
  // duplicating the scroll-to-hash call here raced Navbar's and produced
  // visibly janky, competing scroll animations on nav clicks.
  useEffect(() => {
    if (!location.hash) {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen bg-ink" aria-hidden />} key={location.pathname}>
        <Routes location={location}>
          {routeMap.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <Transition>
                  <Component />
                </Transition>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRouter;
