import { motion } from 'framer-motion';
import { pageVariants, curtainVariants } from '@/animations/pageTransition';

/**
 * Wraps each routed page. AnimatePresence in the router keeps the old
 * page mounted while the ember curtain wipes over, then the new page
 * settles in. See animations/pageTransition.js for the GSAP/FM rationale.
 */
const Transition = ({ children }) => (
  <>
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
    <motion.div
      variants={curtainVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed inset-0 z-[70] origin-top bg-ember"
      style={{ originY: 0 }}
      aria-hidden
    />
  </>
);

export default Transition;
