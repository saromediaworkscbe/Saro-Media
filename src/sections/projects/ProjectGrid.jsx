import { AnimatePresence, motion } from 'framer-motion';
import MediaCard from '@/components/ui/MediaCard';

/**
 * Filterable grid. Framer Motion layout animations handle card
 * enter/exit/reflow on filter change (a job GSAP can't do declaratively
 * against React's reconciler).
 */
const ProjectGrid = ({ projects }) => (
  <motion.div layout className="grid gap-x-6 gap-y-14 md:grid-cols-2">
    <AnimatePresence mode="popLayout">
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

export default ProjectGrid;
