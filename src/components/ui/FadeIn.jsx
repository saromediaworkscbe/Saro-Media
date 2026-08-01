import Reveal from '@/components/ui/Reveal';

/** Opacity-only variant of Reveal for elements that must not move (e.g. pinned media). */
const FadeIn = (props) => <Reveal y={0} {...props} />;

export default FadeIn;
