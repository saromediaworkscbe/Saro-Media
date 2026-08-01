import { Play } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { videoTestimonials } from '@/data/reviews';
import { cursorProps } from '@/hooks/useCursor';

/** Video testimonial placeholders — swap the button for a player/Modal when footage exists. */
const VideoTestimonials = () => (
  <section className="py-section">
    <Container>
      <SectionTitle eyebrow="On camera" title="Clients, in their own words" className="mb-14" />
      <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-3">
        {videoTestimonials.map((video) => (
          <button
            key={video.id}
            type="button"
            className="group relative aspect-video overflow-hidden border border-ink-line bg-ink-soft text-left"
            aria-label={`Play testimonial from ${video.name}, ${video.company}`}
            {...cursorProps('view', 'Play')}
          >
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ember text-ember transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-ember group-hover:text-ink">
                <Play size={18} className="ml-0.5" aria-hidden />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <span>
                <span className="block text-bone">{video.name}</span>
                <span className="mt-1 block text-sm text-bone-muted">{video.company}</span>
              </span>
              <span className="font-mono text-label text-bone-faint">{video.duration}</span>
            </span>
          </button>
        ))}
      </Reveal>
    </Container>
  </section>
);

export default VideoTestimonials;
