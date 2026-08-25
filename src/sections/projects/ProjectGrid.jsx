import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MediaCard from '@/components/ui/MediaCard';
import { ScrollTrigger } from '@/animations/gsapSetup';

const ProjectGrid = ({ projects }) => {
  const gridRef = useRef(null);
  const refreshTimeout = useRef(null);

  // Debounced: only refreshes once, ~150ms after the LAST resize/layout
  // event, instead of once per frame during every animation.
  const scheduleRefresh = () => {
    clearTimeout(refreshTimeout.current);
    refreshTimeout.current = setTimeout(() => {
      ScrollTrigger.refresh();
      if (window.lenis) window.lenis.resize();
    }, 150);
  };

  useEffect(() => {
    if (!gridRef.current) return;
    const ro = new ResizeObserver(scheduleRefresh);
    ro.observe(gridRef.current);
    return () => {
      ro.disconnect();
      clearTimeout(refreshTimeout.current);
    };
  }, []);

  return (
    <motion.div ref={gridRef} layout className="grid gap-x-6 gap-y-14 md:grid-cols-2">
      <AnimatePresence mode="popLayout" onExitComplete={scheduleRefresh}>
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            layout
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={index % 2 === 1 ? 'md:mt-24' : ''}
          >
            <MediaCard project={project} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectGrid;
